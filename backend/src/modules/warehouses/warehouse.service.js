// src/modules/warehouses/warehouse.service.js
// Service layer for warehouse operations (JavaScript, ESM)

import prisma, { runTransaction } from '../../config/db.js';
import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';

const DEFAULT_PER_PAGE = Number(process.env.PER_PAGE_DEFAULT || 20);

const WarehouseService = {
  /**
   * Create a warehouse
   * payload: { name, code, location?, description?, metadata? }
   * Returns created warehouse (safe fields).
   */
  async createWarehouse(payload = {}) {
    const { name, code, location, description, metadata, createdBy } = payload;

    if (!name) throw new AppError('Warehouse name is required', 400);
    if (!code) throw new AppError('Warehouse code is required', 400);

    try {
      // ensure unique code (best-effort)
      const existing = await prisma.warehouse.findUnique({ where: { code } }).catch(() => null);
      if (existing) {
        throw new AppError('Warehouse with this code already exists', 409);
      }

      const created = await prisma.warehouse.create({
        data: {
          name,
          code,
          location: location || null,
          description: description || null,
          metadata: metadata || null, // assumes JSON field or string, depending on schema
          createdBy: createdBy || null,
        },
        select: {
          id: true,
          name: true,
          code: true,
          location: true,
          description: true,
          metadata: true,
          createdBy: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return created;
    } catch (err) {
      logger.error('createWarehouse failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to create warehouse', 500, { originalError: err.message });
    }
  },

  /**
   * Get paginated warehouses.
   * options: { page = 1, perPage = 20, search, userId }
   * Returns { meta, data }
   */
  async getAllWarehouses(options = {}) {
    const page = Number(options.page) > 0 ? Number(options.page) : 1;
    const perPage = Number(options.perPage) > 0 ? Number(options.perPage) : DEFAULT_PER_PAGE;
    const skip = (page - 1) * perPage;

    const where = {};
    
    // Filter by userId if provided
    if (options.userId) {
      where.createdBy = Number(options.userId);
    }
    
    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { code: { contains: options.search, mode: 'insensitive' } },
        { location: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    try {
      const [total, warehouses] = await Promise.all([
        prisma.warehouse.count({ where }),
        prisma.warehouse.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      return {
        meta: {
          page,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage),
        },
        data: warehouses,
      };
    } catch (err) {
      logger.error('getAllWarehouses failed', err);
      throw new AppError('Failed to fetch warehouses', 500, { originalError: err.message });
    }
  },

  /**
   * Get warehouse by id
   * If locations/racks exist in schema, include them for detail view.
   */
  async getWarehouseById(id) {
    if (!id) throw new AppError('Warehouse id is required', 400);

    try {
      const warehouse = await prisma.warehouse.findUnique({
        where: { id: Number(id) },
      });

      return warehouse;
    } catch (err) {
      logger.error('getWarehouseById failed', err);
      throw new AppError('Failed to fetch warehouse', 500);
    }
  },

  /**
   * Update warehouse meta data
   * updates: { name?, code?, location?, description?, metadata? }
   */
  async updateWarehouse(id, updates = {}) {
    if (!id) throw new AppError('Warehouse id is required', 400);

    // prevent accidental overwrite of timestamps/ids
    const safeUpdates = { ...updates };
    delete safeUpdates.id;
    delete safeUpdates.createdAt;
    delete safeUpdates.updatedAt;

    try {
      const updated = await prisma.warehouse.update({
        where: { id: Number(id) },
        data: safeUpdates,
        select: {
          id: true,
          name: true,
          code: true,
          location: true,
          description: true,
          metadata: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return updated;
    } catch (err) {
      logger.error('updateWarehouse failed', err);
      // Prisma P2025 = record not found
      if (err && err.code === 'P2025') {
        throw new AppError('Warehouse not found', 404);
      }
      // Unique constraint on code
      if (err && err.code === 'P2002' && err.meta?.target?.includes('code')) {
        throw new AppError('Warehouse code already in use', 409);
      }
      throw new AppError('Failed to update warehouse', 500, { originalError: err.message });
    }
  },

  /**
   * Delete warehouse (hard delete).
   * Returns true on success, false if not found.
   * If you prefer soft-delete, update to mark `deletedAt` instead.
   */
  async deleteWarehouse(id) {
    if (!id) throw new AppError('Warehouse id is required', 400);

    try {
      await prisma.warehouse.delete({ where: { id: Number(id) } });
      return true;
    } catch (err) {
      logger.error('deleteWarehouse failed', err);
      if (err && err.code === 'P2025') {
        return false;
      }
      throw new AppError('Failed to delete warehouse', 500);
    }
  },

  /**
   * Create a location/rack inside a warehouse (optional)
   * payload: { code, name, description, metadata }
   * Returns created location object.
   * This helper is resilient: if 'location' model doesn't exist it throws a friendly error.
   */
  async createLocation(warehouseId, payload = {}) {
    const { code, name, description, metadata } = payload;
    if (!warehouseId) throw new AppError('warehouseId is required', 400);
    if (!code || !name) throw new AppError('location code and name required', 400);

    try {
      if (!prisma.location || typeof prisma.location.create !== 'function') {
        throw new AppError('Location model not present in Prisma schema', 500);
      }

      // ensure warehouse exists
      const warehouse = await prisma.warehouse.findUnique({ where: { id: Number(warehouseId) } });
      if (!warehouse) throw new AppError('Warehouse not found', 404);

      const created = await prisma.location.create({
        data: {
          code,
          name,
          description: description || null,
          metadata: metadata || null,
          warehouseId: Number(warehouseId),
        },
      });

      return created;
    } catch (err) {
      logger.error('createLocation failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to create location', 500, { originalError: err.message });
    }
  },

  /**
   * Example: transfer stock between two warehouses (high-level helper).
   * This demonstrates using runTransaction for atomic multi-step ops.
   * - productId, fromWarehouseId, toWarehouseId, quantity, userId
   *
   * NOTE: This method assumes you have an inventory model (prisma.inventory) and ledger model (prisma.ledger).
   */
  async transferStock({ productId, fromWarehouseId, toWarehouseId, quantity, userId = null }) {
    if (!productId || !fromWarehouseId || !toWarehouseId) {
      throw new AppError('productId, fromWarehouseId and toWarehouseId are required', 400);
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
      throw new AppError('quantity must be a positive number', 400);
    }

    try {
      return await runTransaction(async (tx) => {
        if (!tx.inventory || !tx.ledger) {
          throw new AppError('Inventory or ledger model missing in Prisma schema', 500);
        }

        // decrement from source
        const fromInv = await tx.inventory.findFirst({
          where: { productId: Number(productId), warehouseId: Number(fromWarehouseId) },
        });
        if (!fromInv || (fromInv.quantity || 0) < quantity) {
          throw new AppError('Insufficient stock in source warehouse', 400);
        }

        await tx.inventory.update({
          where: { id: fromInv.id },
          data: { quantity: fromInv.quantity - quantity },
        });

        // increment at destination
        const toInvExisting = await tx.inventory.findFirst({
          where: { productId: Number(productId), warehouseId: Number(toWarehouseId) },
        });

        let toInv;
        if (toInvExisting) {
          toInv = await tx.inventory.update({
            where: { id: toInvExisting.id },
            data: { quantity: toInvExisting.quantity + quantity },
          });
        } else {
          toInv = await tx.inventory.create({
            data: { productId: Number(productId), warehouseId: Number(toWarehouseId), quantity },
          });
        }

        // ledger entries for both sides
        await tx.ledger.create({
          data: {
            productId: Number(productId),
            warehouseId: Number(fromWarehouseId),
            change: -quantity,
            reason: 'transfer_out',
            createdById: userId ? Number(userId) : null,
          },
        });

        await tx.ledger.create({
          data: {
            productId: Number(productId),
            warehouseId: Number(toWarehouseId),
            change: quantity,
            reason: 'transfer_in',
            createdById: userId ? Number(userId) : null,
          },
        });

        return { from: fromInv, to: toInv };
      });
    } catch (err) {
      logger.error('transferStock failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to transfer stock', 500, { originalError: err.message });
    }
  },
};

export default WarehouseService;
