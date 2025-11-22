// Source/Spec: /mnt/data/StockMaster.pdf
// modules/dashboard/dashboard.service.js
// Service layer to provide dashboard KPIs and quick lists
// Assumes Prisma client exported from ../../config/db as `{ prisma }`

const { prisma } = require('../../config/db');

/**
 * Count distinct products that have stock > 0, optionally scoped to warehouse or category
 * opts: { warehouseId, categoryId }
 */
async function countProductsInStock(opts = {}) {
  const where = {};
  if (opts.warehouseId) {
    // assuming stock has warehouseId or location -> location has warehouseId. Here we support direct warehouseId on stock.
    where.warehouseId = Number(opts.warehouseId);
  }
  if (opts.categoryId) {
    where.product = { categoryId: Number(opts.categoryId) };
  }

  // Group by productId and sum quantities, then count groups with sum > 0
  const groups = await prisma.stock.groupBy({
    by: ['productId'],
    where,
    _sum: { quantity: true },
  });

  const positiveCount = groups.filter((g) => (g._sum && Number(g._sum.quantity || 0) > 0)).length;
  return positiveCount;
}

/**
 * Count low stock items (distinct products where total stock <= threshold)
 */
async function countLowStockItems(opts = {}) {
  const threshold = Number(opts.threshold || 10);
  const where = {};
  if (opts.warehouseId) where.warehouseId = Number(opts.warehouseId);
  if (opts.categoryId) where.product = { categoryId: Number(opts.categoryId) };

  const groups = await prisma.stock.groupBy({
    by: ['productId'],
    where,
    _sum: { quantity: true },
  });

  const low = groups.filter((g) => (g._sum && Number(g._sum.quantity || 0) <= threshold));
  return low.length;
}

/**
 * List low stock items with product info
 * opts: { warehouseId, categoryId, threshold, limit }
 */
async function listLowStockItems(opts = {}) {
  const threshold = Number(opts.threshold || 10);
  const limit = Number(opts.limit || 20);
  const where = {};
  if (opts.warehouseId) where.warehouseId = Number(opts.warehouseId);
  if (opts.categoryId) where.product = { categoryId: Number(opts.categoryId) };

  // Aggregate quantities by product
  const groups = await prisma.stock.groupBy({
    by: ['productId'],
    where,
    _sum: { quantity: true },
  });

  const lowProductIds = groups.filter((g) => (g._sum && Number(g._sum.quantity || 0) <= threshold)).map((g) => g.productId);
  if (lowProductIds.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: lowProductIds } },
    include: { categories: true, /* adjust relation name if different */ },
    take: limit,
  });

  // Attach computed stock quantity
  const qtyMap = new Map(groups.map((g) => [g.productId, Number(g._sum.quantity || 0)]));
  const result = products.map((p) => ({ product: p, totalQuantity: qtyMap.get(p.id) || 0 }));
  return result;
}

/**
 * Count receipts by status (e.g. 'PENDING', 'DONE')
 */
async function countReceiptsByStatus(status, opts = {}) {
  const where = {};
  if (status) where.status = status;
  if (opts.warehouseId) where.warehouseId = Number(opts.warehouseId);
  const c = await prisma.receipt.count({ where });
  return c;
}

/**
 * Count deliveries by status
 */
async function countDeliveriesByStatus(status, opts = {}) {
  const where = {};
  if (status) where.status = status;
  if (opts.warehouseId) where.warehouseId = Number(opts.warehouseId);
  const c = await prisma.delivery.count({ where });
  return c;
}

/**
 * Count transfers by status
 */
async function countTransfersByStatus(status, opts = {}) {
  const where = {};
  if (status) where.status = status;
  if (opts.warehouseId) {
    // count transfers where either from or to warehouse matches
    where.OR = [{ fromWarehouseId: Number(opts.warehouseId) }, { toWarehouseId: Number(opts.warehouseId) }];
  }
  const c = await prisma.transfer.count({ where });
  return c;
}

/**
 * Recent receipts list for activity feed
 * opts: { warehouseId, limit }
 */
async function listRecentReceipts(opts = {}) {
  const limit = Number(opts.limit || 10);
  const where = {};
  if (opts.warehouseId) where.warehouseId = Number(opts.warehouseId);

  const items = await prisma.receipt.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit });
  return items;
}

/**
 * Recent deliveries list
 */
async function listRecentDeliveries(opts = {}) {
  const limit = Number(opts.limit || 10);
  const where = {};
  if (opts.warehouseId) where.warehouseId = Number(opts.warehouseId);

  const items = await prisma.delivery.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit });
  return items;
}

/**
 * Recent transfers list
 */
async function listRecentTransfers(opts = {}) {
  const limit = Number(opts.limit || 10);
  const where = {};
  if (opts.warehouseId) where.OR = [{ fromWarehouseId: Number(opts.warehouseId) }, { toWarehouseId: Number(opts.warehouseId) }];

  const items = await prisma.transfer.findMany({ where, orderBy: { createdAt: 'desc' }, take: limit });
  return items;
}

module.exports = {
  countProductsInStock,
  countLowStockItems,
  listLowStockItems,
  countReceiptsByStatus,
  countDeliveriesByStatus,
  countTransfersByStatus,
  listRecentReceipts,
  listRecentDeliveries,
  listRecentTransfers,
};
