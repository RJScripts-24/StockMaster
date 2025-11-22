// src/modules/deliveries/delivery.service.js
// Service layer for delivery (outgoing) orders — JavaScript, ESM
//
// Responsibilities:
// - createDelivery (draft/pending)
// - getAllDeliveries (pagination/filtering)
// - getDeliveryById
// - updateDelivery (if not validated/shipped)
// - markAsPicked (reserve stock / mark picked)
// - markAsPacked
// - validateDelivery (finalize, decrement stock, ledger entries)
// - cancelDelivery / deleteDelivery
//
// Assumptions / recommended Prisma models:
// - Delivery { id, referenceNo, customerName, warehouseId, status, createdById, pickedById, packedById, validatedById, validatedAt, createdAt, updatedAt }
// - DeliveryItem { id, deliveryId, productId, quantity }
// - Inventory { id, productId, warehouseId, quantity } (composite unique productId+warehouseId recommended)
// - Reservation (optional) { id, productId, warehouseId, deliveryId, quantity } OR use inventory.reserved field
// - Ledger (or stockMovement) { id, productId, warehouseId, change, reason, referenceType, referenceId, createdById, createdAt }

import prisma, { runTransaction } from '../../config/db.js';
import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';

const DEFAULT_PER_PAGE = Number(process.env.PER_PAGE_DEFAULT || 20);

/**
 * Delivery statuses:
 *  - draft
 *  - pending
 *  - picked
 *  - packed
 *  - validated / shipped
 *  - cancelled
 */

const DeliveryService = {
  /**
   * Create a delivery order
   * payload example:
   * {
   *   referenceNo,
   *   customerName,
   *   warehouseId,
   *   status = 'pending',
   *   items: [{ productId, quantity }]
   * }
   *
   * userId: who created the delivery
   */
  async createDelivery(payload = {}, userId = null) {
    const { referenceNo, customerName, warehouseId, status = 'pending', items = [] } = payload;

    if (!customerName) throw new AppError('customerName is required', 400);
    if (!warehouseId) throw new AppError('warehouseId is required', 400);
    if (!Array.isArray(items) || items.length === 0) {
      // you may allow empty items for drafts, but enforce here for pending orders
      // throw new AppError('items must be a non-empty array', 400);
    }

    try {
      const created = await prisma.delivery.create({
        data: {
          referenceNo: referenceNo || null,
          customerName,
          warehouseId: Number(warehouseId),
          status,
          createdById: userId ? Number(userId) : null,
          items: {
            create: items.map((it) => ({
              productId: Number(it.productId),
              quantity: Number(it.quantity),
            })),
          },
        },
        include: { items: true },
      });

      return created;
    } catch (err) {
      logger.error('createDelivery failed', err);
      throw new AppError('Failed to create delivery', 500, { originalError: err.message });
    }
  },

  /**
   * Get paginated deliveries
   * filters: { page, perPage, status, customer, warehouseId, search }
   */
  async getAllDeliveries(filters = {}) {
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const perPage = Number(filters.perPage) > 0 ? Number(filters.perPage) : DEFAULT_PER_PAGE;
    const skip = (page - 1) * perPage;

    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.customer) where.customerName = { contains: filters.customer, mode: 'insensitive' };
    if (filters.warehouseId) where.warehouseId = Number(filters.warehouseId);
    if (filters.search) {
      where.OR = [
        { referenceNo: { contains: filters.search, mode: 'insensitive' } },
        { customerName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    try {
      const [total, deliveries] = await Promise.all([
        prisma.delivery.count({ where }),
        prisma.delivery.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { createdAt: 'desc' },
          include: {
            items: { include: { product: true } }, // optional include
            warehouse: true,
            createdBy: { select: { id: true, name: true, email: true } },
          },
        }).catch(async (err) => {
          logger.warn('getAllDeliveries: nested include failed, retrying without nested includes', err.message);
          return prisma.delivery.findMany({
            where,
            skip,
            take: perPage,
            orderBy: { createdAt: 'desc' },
            include: { items: true },
          });
        }),
      ]);

      return {
        meta: {
          page,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage),
        },
        data: deliveries,
      };
    } catch (err) {
      logger.error('getAllDeliveries failed', err);
      throw new AppError('Failed to fetch deliveries', 500, { originalError: err.message });
    }
  },

  /**
   * Get single delivery by id
   */
  async getDeliveryById(id) {
    if (!id) throw new AppError('Delivery id is required', 400);

    try {
      const delivery = await prisma.delivery.findUnique({
        where: { id: Number(id) },
        include: {
          items: { include: { product: true } },
          warehouse: true,
          createdBy: { select: { id: true, name: true, email: true } },
          pickedBy: { select: { id: true, name: true } },
          packedBy: { select: { id: true, name: true } },
          validatedBy: { select: { id: true, name: true } },
        },
      }).catch(async (err) => {
        logger.warn('getDeliveryById: includes failed, retrying simpler include', err.message);
        return prisma.delivery.findUnique({ where: { id: Number(id) }, include: { items: true } });
      });

      return delivery;
    } catch (err) {
      logger.error('getDeliveryById failed', err);
      throw new AppError('Failed to fetch delivery', 500, { originalError: err.message });
    }
  },

  /**
   * Update delivery (only if not validated/shipped)
   * updates may include metadata and items (replace semantics)
   */
  async updateDelivery(id, updates = {}) {
    if (!id) throw new AppError('Delivery id is required', 400);

    try {
      const delivery = await prisma.delivery.findUnique({ where: { id: Number(id) } });
      if (!delivery) throw new AppError('Delivery not found', 404);
      if (delivery.status === 'validated' || delivery.status === 'shipped') {
        throw new AppError('Cannot update a validated/shipped delivery', 400);
      }

      const { items, customerName, referenceNo, warehouseId, status } = updates;

      const updated = await prisma.$transaction(async (tx) => {
        const data = {};
        if (customerName !== undefined) data.customerName = customerName;
        if (referenceNo !== undefined) data.referenceNo = referenceNo;
        if (warehouseId !== undefined) data.warehouseId = Number(warehouseId);
        if (status !== undefined) data.status = status;

        const rec = await tx.delivery.update({
          where: { id: Number(id) },
          data,
        });

        if (Array.isArray(items)) {
          // delete existing items then create new ones
          await tx.deliveryItem.deleteMany({ where: { deliveryId: Number(id) } });
          if (items.length > 0) {
            await tx.deliveryItem.createMany({
              data: items.map((it) => ({
                deliveryId: Number(id),
                productId: Number(it.productId),
                quantity: Number(it.quantity),
              })),
            });
          }
        }

        return tx.delivery.findUnique({ where: { id: Number(id) }, include: { items: true } });
      });

      return updated;
    } catch (err) {
      logger.error('updateDelivery failed', err);
      if (err && err.code === 'P2025') throw new AppError('Delivery not found', 404);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to update delivery', 500, { originalError: err.message });
    }
  },

  /**
   * Mark delivery as picked - reserve stock if reservation model or decrement available/reserve fields.
   * This should not permanently decrement inventory; final decrement happens on validateDelivery.
   *
   * Strategy:
   * - If Reservation model present, create reservation records (deliveryId, productId, warehouseId, qty)
   * - Otherwise, decrement inventory.available or increment inventory.reserved if fields exist
   * - Basic checks: ensure enough available stock before reservation
   */
  async markAsPicked(id, userId = null) {
    if (!id) throw new AppError('Delivery id is required', 400);

    try {
      return await runTransaction(async (tx) => {
        const delivery = await tx.delivery.findUnique({ where: { id: Number(id) }, include: { items: true } });
        if (!delivery) throw new AppError('Delivery not found', 404);
        if (delivery.status === 'validated' || delivery.status === 'shipped') {
          throw new AppError('Cannot pick a validated/shipped delivery', 400);
        }

        // For each item, reserve stock
        for (const item of delivery.items) {
          const productId = Number(item.productId);
          const qty = Number(item.quantity);
          const warehouseId = delivery.warehouseId;

          // If Reservation model exists, create reservation
          if (tx.reservation && typeof tx.reservation.create === 'function') {
            // Optionally verify availability first via inventory
            const inv = await tx.inventory.findFirst({ where: { productId, warehouseId } });
            if (!inv || (inv.quantity || 0) < qty) {
              throw new AppError(`Insufficient stock to pick product ${productId}`, 400);
            }
            await tx.reservation.create({
              data: { deliveryId: delivery.id, productId, warehouseId, quantity: qty },
            });
          } else if (tx.inventory && typeof tx.inventory.update === 'function') {
            // If inventory has reserved field, increment reserved and decrement available via atomic update
            // We'll attempt to update using a read-modify-write pattern
            const existing = await tx.inventory.findFirst({ where: { productId, warehouseId } });
            if (!existing || (existing.quantity || 0) < qty) {
              throw new AppError(`Insufficient stock to pick product ${productId}`, 400);
            }

            // If inventory has 'reserved' column:
            if ('reserved' in existing) {
              await tx.inventory.update({
                where: { id: existing.id },
                data: { reserved: (existing.reserved || 0) + qty },
              });
            } else {
              // Otherwise, we don't have reserved column — we keep inventory intact until validation.
              // We can optionally flag the delivery as 'picked' without altering inventory.
              // For prototype, just continue.
            }
          } else {
            // No inventory/reservation model — cannot enforce reservation; just mark as picked.
            logger.warn('markAsPicked: reservation not supported by schema; marking delivery as picked without reservation.');
          }
        }

        // Mark delivery status to 'picked' and record picker
        const picked = await tx.delivery.update({
          where: { id: Number(id) },
          data: { status: 'picked', pickedById: userId ? Number(userId) : null, pickedAt: new Date() },
        });

        return picked;
      });
    } catch (err) {
      logger.error('markAsPicked failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to mark delivery as picked', 500, { originalError: err.message });
    }
  },

  /**
   * Mark delivery as packed (idempotent if already packed)
   */
  async markAsPacked(id, userId = null) {
    if (!id) throw new AppError('Delivery id is required', 400);

    try {
      const delivery = await prisma.delivery.findUnique({ where: { id: Number(id) } });
      if (!delivery) throw new AppError('Delivery not found', 404);
      if (delivery.status === 'validated' || delivery.status === 'shipped') {
        throw new AppError('Cannot pack a validated/shipped delivery', 400);
      }

      const updated = await prisma.delivery.update({
        where: { id: Number(id) },
        data: { status: 'packed', packedById: userId ? Number(userId) : null, packedAt: new Date() },
      });

      return updated;
    } catch (err) {
      logger.error('markAsPacked failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to mark as packed', 500, { originalError: err.message });
    }
  },

  /**
   * Validate delivery: This is the critical operation that decrements inventory (actual outbound).
   * Steps (inside transaction):
   *  - ensure delivery exists and not already validated
   *  - for each item:
   *      - verify available stock (consider reservations if present)
   *      - decrement inventory quantity (or decrement available / increment reserved negative)
   *      - remove reservations if created
   *      - create ledger entries recording negative change
   *  - set delivery status to 'validated'/'shipped', set validatedById and validatedAt
   */
  async validateDelivery(id, userId = null) {
    if (!id) throw new AppError('Delivery id is required', 400);

    try {
      return await runTransaction(async (tx) => {
        const delivery = await tx.delivery.findUnique({ where: { id: Number(id) }, include: { items: true } });
        if (!delivery) throw new AppError('Delivery not found', 404);
        if (delivery.status === 'validated' || delivery.status === 'shipped') {
          throw new AppError('Delivery already validated/shipped', 400);
        }

        const warehouseId = delivery.warehouseId;

        for (const item of delivery.items) {
          const productId = Number(item.productId);
          const qty = Number(item.quantity);

          // If reservation model exists, ensure reservation exists and remove it
          if (tx.reservation && typeof tx.reservation.findFirst === 'function') {
            const resv = await tx.reservation.findFirst({
              where: { deliveryId: delivery.id, productId, warehouseId },
            });
            if (!resv || (resv.quantity || 0) < qty) {
              throw new AppError(`Insufficient reserved quantity to validate delivery for product ${productId}`, 400);
            }
            // remove reservation (or decrement if partial)
            await tx.reservation.delete({ where: { id: resv.id } });
          }

          // Decrement inventory
          if (tx.inventory && typeof tx.inventory.update === 'function') {
            const existing = await tx.inventory.findFirst({ where: { productId, warehouseId } });
            if (!existing || (existing.quantity || 0) < qty) {
              throw new AppError(`Insufficient stock to ship product ${productId}`, 400);
            }

            // perform update
            await tx.inventory.update({
              where: { id: existing.id },
              data: { quantity: existing.quantity - qty },
            });
          } else if (tx.product && typeof tx.product.update === 'function') {
            // fallback to decrement aggregate product.stock field
            try {
              const prod = await tx.product.update({
                where: { id: productId },
                data: { stock: { decrement: qty } },
              });
              // if stock went negative, you may want to check and rollback; Prisma won't auto-check.
              if (prod.stock < 0) {
                throw new AppError(`Stock became negative for product ${productId}`, 500);
              }
            } catch (err) {
              logger.warn('validateDelivery: product.stock decrement failed', err.message);
              throw new AppError('Inventory model missing and product.stock update failed', 500);
            }
          } else {
            throw new AppError('No inventory model available to decrement stock', 500);
          }

          // Create ledger entry if possible
          if (tx.ledger && typeof tx.ledger.create === 'function') {
            await tx.ledger.create({
              data: {
                productId,
                warehouseId,
                change: -qty,
                reason: 'delivery_validated',
                referenceType: 'delivery',
                referenceId: delivery.id,
                createdById: userId ? Number(userId) : null,
              },
            });
          }
        }

        // Mark as validated/shipped
        const validatedAt = new Date();
        const updatedDelivery = await tx.delivery.update({
          where: { id: Number(id) },
          data: { status: 'validated', validatedAt, validatedById: userId ? Number(userId) : null },
          include: { items: true },
        });

        return updatedDelivery;
      });
    } catch (err) {
      logger.error('validateDelivery failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to validate delivery', 500, { originalError: err.message });
    }
  },

  /**
   * Cancel delivery if allowed (not validated/shipped).
   * Also cleans up reservations if present.
   */
  async cancelDelivery(id, userId = null) {
    if (!id) throw new AppError('Delivery id is required', 400);

    try {
      return await runTransaction(async (tx) => {
        const delivery = await tx.delivery.findUnique({ where: { id: Number(id) }, include: { items: true } });
        if (!delivery) throw new AppError('Delivery not found', 404);
        if (delivery.status === 'validated' || delivery.status === 'shipped') {
          throw new AppError('Cannot cancel a validated/shipped delivery', 400);
        }

        // remove reservations if present
        if (tx.reservation && typeof tx.reservation.deleteMany === 'function') {
          await tx.reservation.deleteMany({ where: { deliveryId: delivery.id } });
        } else if (tx.inventory) {
          // if inventory has 'reserved' field, reduce reserved counts based on items (best-effort)
          for (const item of delivery.items) {
            const existing = await tx.inventory.findFirst({
              where: { productId: Number(item.productId), warehouseId: delivery.warehouseId },
            });
            if (existing && 'reserved' in existing && (existing.reserved || 0) >= item.quantity) {
              await tx.inventory.update({
                where: { id: existing.id },
                data: { reserved: existing.reserved - item.quantity },
              });
            }
          }
        }

        const cancelled = await tx.delivery.update({
          where: { id: Number(id) },
          data: { status: 'cancelled', cancelledById: userId ? Number(userId) : null, cancelledAt: new Date() },
          include: { items: true },
        });

        return cancelled;
      });
    } catch (err) {
      logger.error('cancelDelivery failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to cancel delivery', 500, { originalError: err.message });
    }
  },

  /**
   * Delete a delivery (only allowed if not validated)
   */
  async deleteDelivery(id) {
    if (!id) throw new AppError('Delivery id is required', 400);

    try {
      const delivery = await prisma.delivery.findUnique({ where: { id: Number(id) } });
      if (!delivery) return false;
      if (delivery.status === 'validated' || delivery.status === 'shipped') {
        throw new AppError('Cannot delete a validated/shipped delivery', 400);
      }

      await prisma.$transaction(async (tx) => {
        await tx.deliveryItem.deleteMany({ where: { deliveryId: Number(id) } });
        await tx.delivery.delete({ where: { id: Number(id) } });
      });

      return true;
    } catch (err) {
      logger.error('deleteDelivery failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to delete delivery', 500, { originalError: err.message });
    }
  },
};

export default DeliveryService;
