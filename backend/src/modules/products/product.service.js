// src/modules/products/product.service.js
// Service layer for product operations (JavaScript, ESM)

import prisma, { runTransaction } from '../../config/db.js';
import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';

/**
 * Notes / Assumptions:
 * - Prisma has a `product` model. Fields used: id, name, sku, description, unit, categoryId, createdAt, updatedAt
 * - Optional models that, if present, will be used:
 *    - inventory: { id, productId, warehouseId, quantity }
 *    - ledger (or stockMovement): records stock changes for audit
 * - If optional models are missing, the service will still attempt to operate
 *   (e.g., update a `stock` field on product if you keep aggregate stock there).
 */

const DEFAULT_PER_PAGE = Number(process.env.PER_PAGE_DEFAULT || 20);

const ProductService = {
  /**
   * Create a product.
   * payload: { name, sku, description, unit, categoryId, initialStock?, initialWarehouseId? }
   */
  async createProduct(payload = {}) {
    const { name, sku, description, unit, categoryId, initialStock, initialWarehouseId } = payload;

    if (!name || !sku) throw new AppError('name and sku are required', 400);

    try {
      // Check SKU uniqueness (best-effort)
      const existing = await prisma.product.findUnique({ where: { sku } }).catch(() => null);
      if (existing) throw new AppError('Product with this SKU already exists', 409);

      // Use transaction if we need to create product + inventory atomically
      if (typeof initialStock === 'number') {
        return await runTransaction(async (tx) => {
          const created = await tx.product.create({
            data: { name, sku, description: description || null, unit: unit || null, categoryId: categoryId || null },
          });

          // Try to create inventory record if inventory model exists
          if (tx.inventory && typeof tx.inventory.create === 'function') {
            await tx.inventory.create({
              data: {
                productId: created.id,
                warehouseId: initialWarehouseId ? Number(initialWarehouseId) : null,
                quantity: initialStock,
              },
            });
          } else {
            // Optionally, try to update an aggregate stock field on product if exists
            try {
              await tx.product.update({
                where: { id: created.id },
                data: { stock: initialStock }, // will fail if 'stock' field absent
              });
            } catch (err) {
              // Ignore if product.stock doesn't exist
            }
          }

          // Optionally create a ledger entry if model exists
          if (tx.ledger && typeof tx.ledger.create === 'function') {
            await tx.ledger.create({
              data: {
                productId: created.id,
                warehouseId: initialWarehouseId ? Number(initialWarehouseId) : null,
                change: initialStock,
                reason: 'initial_stock',
                createdById: null,
              },
            });
          }

          // return a safe representation
          return {
            id: created.id,
            name: created.name,
            sku: created.sku,
            description: created.description,
            unit: created.unit,
            categoryId: created.categoryId,
            createdAt: created.createdAt,
            updatedAt: created.updatedAt,
            initialStock: initialStock,
            initialWarehouseId: initialWarehouseId || null,
          };
        });
      }

      // Without initial stock, just create product
      const created = await prisma.product.create({
        data: { name, sku, description: description || null, unit: unit || null, categoryId: categoryId || null },
      });

      return {
        id: created.id,
        name: created.name,
        sku: created.sku,
        description: created.description,
        unit: created.unit,
        categoryId: created.categoryId,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
      };
    } catch (err) {
      logger.error('createProduct failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to create product', 500, { originalError: err.message });
    }
  },

  /**
   * Get paginated products with optional search/filter.
   * filters: { page, perPage, search, categoryId }
   */
  async getAllProducts(filters = {}) {
    const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
    const perPage = Number(filters.perPage) > 0 ? Number(filters.perPage) : DEFAULT_PER_PAGE;
    const skip = (page - 1) * perPage;

    const where = {};
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { sku: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    if (filters.categoryId) {
      where.categoryId = Number(filters.categoryId);
    }

    try {
      const [total, products] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { createdAt: 'desc' },
          include: {
            // if you have inventory relation, include aggregated stock info if present
            inventory: true, // safe to include; if relation doesn't exist Prisma will throw — catch below
          },
        }).catch(async (err) => {
          // Fallback: try findMany without relation include (for schemas without inventory)
          if (err.code === 'P2020' || /relation.*does not exist/i.test(String(err.message))) {
            return prisma.product.findMany({
              where,
              skip,
              take: perPage,
              orderBy: { createdAt: 'desc' },
            });
          }
          throw err;
        }),
      ]);

      // If inventory relation exists, aggregate inventory per product for quick summary
      const data = Array.isArray(products)
        ? products.map((p) => {
            // if p.inventory exists (array), compute total quantity
            let totalQuantity = null;
            if (p.inventory && Array.isArray(p.inventory)) {
              totalQuantity = p.inventory.reduce((s, it) => s + (it.quantity || 0), 0);
            } else if (typeof p.stock === 'number') {
              totalQuantity = p.stock;
            }
            // remove heavy inventory list if present — keep summary
            const { inventory, ...rest } = p;
            return { ...rest, totalQuantity };
          })
        : [];

      return {
        meta: {
          page,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage),
        },
        data,
      };
    } catch (err) {
      logger.error('getAllProducts failed', err);
      throw new AppError('Failed to fetch products', 500, { originalError: err.message });
    }
  },

  /**
   * Get a product by id (with optional inventory details)
   */
  async getProductById(id) {
    if (!id) throw new AppError('Product id is required', 400);

    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          inventory: true, // will be ignored if relation absent via catch below
        },
      }).catch(async (err) => {
        // Fallback without include
        if (err.code === 'P2020' || /relation.*does not exist/i.test(String(err.message))) {
          return prisma.product.findUnique({ where: { id: Number(id) } });
        }
        throw err;
      });

      if (!product) return null;

      let totalQuantity = null;
      if (product.inventory && Array.isArray(product.inventory)) {
        totalQuantity = product.inventory.reduce((s, it) => s + (it.quantity || 0), 0);
      } else if (typeof product.stock === 'number') {
        totalQuantity = product.stock;
      }

      const { inventory, ...rest } = product;
      return { ...rest, totalQuantity, inventory: Array.isArray(inventory) ? inventory : undefined };
    } catch (err) {
      logger.error('getProductById failed', err);
      throw new AppError('Failed to fetch product', 500);
    }
  },

  /**
   * Update a product's metadata (not stock).
   * updates: { name?, sku?, description?, unit?, categoryId? }
   */
  async updateProduct(id, updates = {}) {
    if (!id) throw new AppError('Product id is required', 400);

    // Prevent updating id fields accidentally
    const safeUpdates = { ...updates };
    delete safeUpdates.id;
    delete safeUpdates.createdAt;
    delete safeUpdates.updatedAt;

    try {
      const updated = await prisma.product.update({
        where: { id: Number(id) },
        data: safeUpdates,
        select: {
          id: true,
          name: true,
          sku: true,
          description: true,
          unit: true,
          categoryId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return updated;
    } catch (err) {
      logger.error('updateProduct failed', err);
      if (err.code === 'P2025') throw new AppError('Product not found', 404);
      throw new AppError('Failed to update product', 500);
    }
  },

  /**
   * Delete product (hard delete).
   * Returns true on success, false if not found.
   */
  async deleteProduct(id) {
    if (!id) throw new AppError('Product id is required', 400);

    try {
      await prisma.product.delete({ where: { id: Number(id) } });
      return true;
    } catch (err) {
      logger.error('deleteProduct failed', err);
      if (err.code === 'P2025') return false;
      throw new AppError('Failed to delete product', 500);
    }
  },

  /**
   * Adjust stock for a product, optionally scoped to a warehouse.
   * - productId: product id
   * - quantityChange: positive to add, negative to remove
   * - options: { warehouseId, reason, userId }
   *
   * Returns current inventory record or new aggregated quantity.
   */
  async adjustStock(productId, quantityChange, options = {}) {
    const { warehouseId = null, reason = 'adjustment', userId = null } = options;

    if (!productId) throw new AppError('productId is required', 400);
    if (typeof quantityChange !== 'number') throw new AppError('quantityChange must be a number', 400);

    try {
      return await runTransaction(async (tx) => {
        // Prefer per-warehouse inventory model if present
        if (tx.inventory && typeof tx.inventory.upsert === 'function') {
          // Find existing inventory record
          const where = {
            productId_warehouseId: { productId: Number(productId), warehouseId: warehouseId ? Number(warehouseId) : null },
          };

          // Try update via upsert (some prisma schemas can't use composite unique if not defined;
          // if composite unique fails, fallback to findFirst + update/create)
          try {
            const inv = await tx.inventory.upsert({
              where,
              create: {
                productId: Number(productId),
                warehouseId: warehouseId ? Number(warehouseId) : null,
                quantity: quantityChange,
              },
              update: {
                quantity: { increment: quantityChange },
              },
            });

            // Create ledger entry if ledger model exists
            if (tx.ledger && typeof tx.ledger.create === 'function') {
              await tx.ledger.create({
                data: {
                  productId: Number(productId),
                  warehouseId: warehouseId ? Number(warehouseId) : null,
                  change: quantityChange,
                  reason,
                  createdById: userId ? Number(userId) : null,
                },
              });
            }

            return inv;
          } catch (err) {
            // Fallback flow: findFirst + update/create
            const existing = await tx.inventory.findFirst({
              where: { productId: Number(productId), warehouseId: warehouseId ? Number(warehouseId) : null },
            });

            if (existing) {
              const updated = await tx.inventory.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantityChange },
              });

              if (tx.ledger && typeof tx.ledger.create === 'function') {
                await tx.ledger.create({
                  data: {
                    productId: Number(productId),
                    warehouseId: warehouseId ? Number(warehouseId) : null,
                    change: quantityChange,
                    reason,
                    createdById: userId ? Number(userId) : null,
                  },
                });
              }

              return updated;
            } else {
              const created = await tx.inventory.create({
                data: {
                  productId: Number(productId),
                  warehouseId: warehouseId ? Number(warehouseId) : null,
                  quantity: quantityChange,
                },
              });

              if (tx.ledger && typeof tx.ledger.create === 'function') {
                await tx.ledger.create({
                  data: {
                    productId: Number(productId),
                    warehouseId: warehouseId ? Number(warehouseId) : null,
                    change: quantityChange,
                    reason,
                    createdById: userId ? Number(userId) : null,
                  },
                });
              }

              return created;
            }
          }
        }

        // If no inventory model, try updating aggregate product.stock field if present
        try {
          const updated = await tx.product.update({
            where: { id: Number(productId) },
            data: { stock: { increment: quantityChange } }, // works if 'stock' is Int and Prisma supports increment
          });

          // attempt ledger entry if possible
          if (tx.ledger && typeof tx.ledger.create === 'function') {
            await tx.ledger.create({
              data: {
                productId: Number(productId),
                warehouseId: null,
                change: quantityChange,
                reason,
                createdById: userId ? Number(userId) : null,
              },
            });
          }

          return updated;
        } catch (err) {
          // If product update fails because 'stock' field not present, we can't persist stock
          logger.warn('adjustStock: inventory and product.stock not available or update failed', err);
          throw new AppError('Stock adjustment failed: no inventory model or product.stock field available', 500);
        }
      });
    } catch (err) {
      logger.error('adjustStock failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to adjust stock', 500, { originalError: err.message });
    }
  },
};

export default ProductService;
