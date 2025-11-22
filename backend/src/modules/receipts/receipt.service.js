// src/modules/receipts/receipt.service.js
// Service for handling receipts (Goods Received Notes) — JavaScript, ESM

import prisma, { runTransaction } from '../../config/db.js';
import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';

const DEFAULT_PER_PAGE = Number(process.env.PER_PAGE_DEFAULT || 20);

/**
 * Receipt statuses:
 *  - draft (editable)
 *  - pending (created but not validated)
 *  - validated (stock has been updated)
 *  - cancelled
 */

const ReceiptService = {
  /**
   * Create a receipt (draft or pending)
   * payload example:
   * {
   *   referenceNo,
   *   supplierName,
   *   warehouseId,
   *   status = 'pending',
   *   items: [{ productId, quantity, unitPrice? }]
   * }
   *
   * userId: id of creator
   */
  async createReceipt(payload = {}, userId = null) {
    const { referenceNo, supplierName, warehouseId, status = 'pending', items = [] } = payload;

    if (!supplierName) throw new AppError('supplierName is required', 400);
    if (!warehouseId) throw new AppError('warehouseId is required', 400);
    if (!Array.isArray(items) || items.length === 0) {
      // allow empty items if you want drafts; otherwise require at least one item
      // throw new AppError('items must be a non-empty array', 400);
    }

    try {
      const created = await prisma.receipt.create({
        data: {
          referenceNo: referenceNo || null,
          supplierName,
          warehouseId: Number(warehouseId),
          status,
          createdById: userId ? Number(userId) : null,
          items: {
            create: items.map((it) => ({
              productId: Number(it.productId),
              quantity: Number(it.quantity),
              unitPrice: typeof it.unitPrice === 'number' ? it.unitPrice : null,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return created;
    } catch (err) {
      logger.error('createReceipt failed', err);
      throw new AppError('Failed to create receipt', 500, { originalError: err.message });
    }
  },

  /**
   * Pagination + filters
   * filters: { page, perPage, status, supplier, warehouseId, search }
   */
  async getAllReceipts(filters = {}) {
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const perPage = Number(filters.perPage) > 0 ? Number(filters.perPage) : DEFAULT_PER_PAGE;
    const skip = (page - 1) * perPage;

    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.supplier) where.supplierName = { contains: filters.supplier, mode: 'insensitive' };
    if (filters.warehouseId) where.warehouseId = Number(filters.warehouseId);
    if (filters.search) {
      where.OR = [
        { referenceNo: { contains: filters.search, mode: 'insensitive' } },
        { supplierName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    try {
      const [total, receipts] = await Promise.all([
        prisma.receipt.count({ where }),
        prisma.receipt.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { createdAt: 'desc' },
          include: {
            items: {
              include: { product: true }, // optional; if missing, Prisma will throw — catch below
            },
            warehouse: true, // optional
            createdBy: { select: { id: true, name: true, email: true } },
          },
        }).catch(async (err) => {
          // Fallback if include references missing relations
          logger.warn('getAllReceipts: include failed, retrying without nested includes', err.message);
          return prisma.receipt.findMany({
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
        data: receipts,
      };
    } catch (err) {
      logger.error('getAllReceipts failed', err);
      throw new AppError('Failed to fetch receipts', 500, { originalError: err.message });
    }
  },

  /**
   * Get receipt by id
   */
  async getReceiptById(id) {
    if (!id) throw new AppError('Receipt id is required', 400);

    try {
      const receipt = await prisma.receipt.findUnique({
        where: { id: Number(id) },
        include: {
          items: { include: { product: true } },
          warehouse: true,
          createdBy: { select: { id: true, name: true, email: true } },
          validatedBy: { select: { id: true, name: true, email: true } },
        },
      }).catch(async (err) => {
        // fallback to lighter include if nested relations absent
        logger.warn('getReceiptById: include failed, retrying without nested includes', err.message);
        return prisma.receipt.findUnique({
          where: { id: Number(id) },
          include: { items: true },
        });
      });

      return receipt;
    } catch (err) {
      logger.error('getReceiptById failed', err);
      throw new AppError('Failed to fetch receipt', 500, { originalError: err.message });
    }
  },

  /**
   * Update receipt metadata/items.
   * Only allowed if receipt is NOT validated.
   * updates can include supplierName, referenceNo, warehouseId, items (replace semantics)
   */
  async updateReceipt(id, updates = {}) {
    if (!id) throw new AppError('Receipt id is required', 400);

    try {
      const receipt = await prisma.receipt.findUnique({ where: { id: Number(id) } });
      if (!receipt) throw new AppError('Receipt not found', 404);
      if (receipt.status === 'validated') throw new AppError('Cannot update a validated receipt', 400);

      // If items provided, replace them (simple approach). For partial updates you'd implement diffs.
      const { items, supplierName, referenceNo, warehouseId, status } = updates;

      const updated = await prisma.$transaction(async (tx) => {
        // Update basic fields
        const data = {};
        if (supplierName !== undefined) data.supplierName = supplierName;
        if (referenceNo !== undefined) data.referenceNo = referenceNo;
        if (warehouseId !== undefined) data.warehouseId = Number(warehouseId);
        if (status !== undefined) data.status = status;

        const rec = await tx.receipt.update({
          where: { id: Number(id) },
          data,
        });

        if (Array.isArray(items)) {
          // delete existing items then create new ones
          await tx.receiptItem.deleteMany({ where: { receiptId: Number(id) } });
          if (items.length > 0) {
            await tx.receiptItem.createMany({
              data: items.map((it) => ({
                receiptId: Number(id),
                productId: Number(it.productId),
                quantity: Number(it.quantity),
                unitPrice: typeof it.unitPrice === 'number' ? it.unitPrice : null,
              })),
            });
          }
        }

        // re-load receipt with items
        return tx.receipt.findUnique({ where: { id: Number(id) }, include: { items: true } });
      });

      return updated;
    } catch (err) {
      logger.error('updateReceipt failed', err);
      // map Prisma "record not found" error
      if (err && err.code === 'P2025') throw new AppError('Receipt not found', 404);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to update receipt', 500, { originalError: err.message });
    }
  },

  /**
   * Validate a receipt:
   * - Ensure it's not validated already
   * - For each item: increase inventory (per warehouse), create ledger entries
   * - Mark receipt as validated with validatedById and validatedAt and status='validated'
   *
   * All done inside a transaction to ensure atomicity.
   *
   * userId: who validated (for ledger/audit)
   */
  async validateReceipt(id, userId = null) {
    if (!id) throw new AppError('Receipt id is required', 400);

    try {
      return await runTransaction(async (tx) => {
        const receipt = await tx.receipt.findUnique({
          where: { id: Number(id) },
          include: { items: true },
        });

        if (!receipt) throw new AppError('Receipt not found', 404);
        if (receipt.status === 'validated') throw new AppError('Receipt already validated', 400);
        if (!Array.isArray(receipt.items) || receipt.items.length === 0) {
          // Depending on business rules, you might allow validating empty receipts — here we disallow.
          throw new AppError('Cannot validate a receipt without items', 400);
        }

        const warehouseId = receipt.warehouseId;

        // For each item: upsert inventory + create ledger entry
        for (const item of receipt.items) {
          const productId = Number(item.productId);
          const qty = Number(item.quantity);

          // Prefer composite unique upsert if schema supports unique constraint on productId+warehouseId
          if (tx.inventory && typeof tx.inventory.upsert === 'function') {
            try {
              await tx.inventory.upsert({
                where: {
                  productId_warehouseId: { productId, warehouseId },
                },
                create: {
                  productId,
                  warehouseId,
                  quantity: qty,
                },
                update: {
                  quantity: { increment: qty },
                },
              });
            } catch (err) {
              // If upsert fails due to missing unique index, fallback to findFirst + create/update
              logger.warn('inventory.upsert failed, falling back to findFirst/update/create', err.message);
              const existing = await tx.inventory.findFirst({
                where: { productId, warehouseId },
              });
              if (existing) {
                await tx.inventory.update({
                  where: { id: existing.id },
                  data: { quantity: existing.quantity + qty },
                });
              } else {
                await tx.inventory.create({
                  data: { productId, warehouseId, quantity: qty },
                });
              }
            }
          } else if (tx.product && typeof tx.product.update === 'function') {
            // Fall back to incrementing an aggregate 'stock' field on product if inventory model missing
            try {
              await tx.product.update({
                where: { id: productId },
                data: { stock: { increment: qty } },
              });
            } catch (err) {
              logger.warn('product.stock update failed during receipt validation', err.message);
              throw new AppError('Inventory model or product.stock field not available to persist stock', 500);
            }
          } else {
            throw new AppError('No inventory or product.stock mechanism available to update stock', 500);
          }

          // Create ledger/stock movement entry if available
          if (tx.ledger && typeof tx.ledger.create === 'function') {
            await tx.ledger.create({
              data: {
                productId,
                warehouseId,
                change: qty,
                reason: 'receipt_validated',
                referenceType: 'receipt',
                referenceId: receipt.id,
                createdById: userId ? Number(userId) : null,
              },
            });
          }
        }

        // Mark receipt validated
        const validatedAt = new Date();
        const updatedReceipt = await tx.receipt.update({
          where: { id: Number(id) },
          data: { status: 'validated', validatedAt, validatedById: userId ? Number(userId) : null },
          include: { items: true },
        });

        return updatedReceipt;
      });
    } catch (err) {
      logger.error('validateReceipt failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to validate receipt', 500, { originalError: err.message });
    }
  },

  /**
   * Delete a receipt.
   * Only allowed if not validated. Performs cascade delete of items.
   */
  async deleteReceipt(id) {
    if (!id) throw new AppError('Receipt id is required', 400);

    try {
      const receipt = await prisma.receipt.findUnique({ where: { id: Number(id) } });
      if (!receipt) return false;
      if (receipt.status === 'validated') {
        throw new AppError('Cannot delete a validated receipt', 400);
      }

      // delete items then receipt (transactionally)
      await prisma.$transaction(async (tx) => {
        await tx.receiptItem.deleteMany({ where: { receiptId: Number(id) } });
        await tx.receipt.delete({ where: { id: Number(id) } });
      });

      return true;
    } catch (err) {
      logger.error('deleteReceipt failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to delete receipt', 500, { originalError: err.message });
    }
  },
};

export default ReceiptService;
