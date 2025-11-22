// modules/adjustments/adjustment.service.js
// Service layer for stock adjustments
// Assumes a Prisma client exported from ../../config/db as `{ prisma }`

const { prisma } = require('../../config/db');

/**
 * Create an adjustment (DRAFT by default)
 * payload: { warehouseId, locationId, items: [{ productId, countedQuantity, note? }], reason?, createdBy }
 */
async function createAdjustment(payload) {
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('Invalid payload: items are required');
  }

  const data = {
    warehouseId: payload.warehouseId || null,
    locationId: payload.locationId || null,
    reason: payload.reason || null,
    status: payload.status || 'DRAFT',
    notes: payload.notes || null,
    createdBy: payload.createdBy || null,
    adjustmentItems: {
      create: payload.items.map((it) => ({
        productId: it.productId,
        countedQuantity: it.countedQuantity,
        note: it.note || null,
      })),
    },
  };

  const created = await prisma.adjustment.create({ data, include: { adjustmentItems: true } });
  return created;
}

/**
 * List adjustments with simple filters and pagination
 */
async function listAdjustments(filters = {}, opts = { page: 1, limit: 25 }) {
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.warehouseId) where.warehouseId = Number(filters.warehouseId);
  if (filters.locationId) where.locationId = Number(filters.locationId);
  if (filters.productId) {
    where.adjustmentItems = { some: { productId: Number(filters.productId) } };
  }
  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
    if (filters.dateTo) where.createdAt.lte = new Date(filters.dateTo);
  }

  const page = Math.max(1, Number(opts.page) || 1);
  const limit = Math.max(1, Number(opts.limit) || 25);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.adjustment.findMany({ where, orderBy: { createdAt: 'desc' }, include: { adjustmentItems: true }, skip, take: limit }),
    prisma.adjustment.count({ where }),
  ]);

  return { items, total, page, limit };
}

/**
 * Get single adjustment by id
 */
async function getAdjustmentById(id) {
  const adj = await prisma.adjustment.findUnique({ where: { id: Number(id) }, include: { adjustmentItems: true } });
  return adj;
}

/**
 * Update adjustment (only allowed if not applied)
 * updates may include replacement items array
 */
async function updateAdjustment(id, updates) {
  const existing = await prisma.adjustment.findUnique({ where: { id: Number(id) }, include: { adjustmentItems: true } });
  if (!existing) throw new Error('Adjustment not found');
  if (existing.status === 'APPLIED' || existing.status === 'CANCELED') throw new Error('Cannot modify an applied or canceled adjustment');

  const data = {};
  if (updates.warehouseId !== undefined) data.warehouseId = updates.warehouseId;
  if (updates.locationId !== undefined) data.locationId = updates.locationId;
  if (updates.reason !== undefined) data.reason = updates.reason;
  if (updates.notes !== undefined) data.notes = updates.notes;
  if (updates.status !== undefined) data.status = updates.status;
  if (updates.modifiedBy !== undefined) data.modifiedBy = updates.modifiedBy;

  const updated = await prisma.$transaction(async (tx) => {
    if (updates.items && Array.isArray(updates.items)) {
      await tx.adjustmentItem.deleteMany({ where: { adjustmentId: Number(id) } });
      for (const it of updates.items) {
        await tx.adjustmentItem.create({ data: {
          adjustmentId: Number(id),
          productId: it.productId,
          countedQuantity: it.countedQuantity,
          note: it.note || null,
        } });
      }
    }

    const u = await tx.adjustment.update({ where: { id: Number(id) }, data, include: { adjustmentItems: true } });
    return u;
  });

  return updated;
}

/**
 * Apply / validate adjustment. This will:
 * - for each adjustment item, compute delta = countedQuantity - currentStock
 * - update/create stock records accordingly
 * - create ledger entries for each delta
 * - mark adjustment as APPLIED
 * opts: { appliedBy }
 */
async function applyAdjustment(id, opts = {}) {
  const appliedBy = opts.appliedBy || null;

  return prisma.$transaction(async (tx) => {
    const adj = await tx.adjustment.findUnique({ where: { id: Number(id) }, include: { adjustmentItems: true } });
    if (!adj) throw new Error('Adjustment not found');
    if (adj.status === 'APPLIED') throw new Error('Adjustment already applied');
    if (adj.status === 'CANCELED') throw new Error('Adjustment is canceled');

    const locationId = adj.locationId || null;

    for (const item of adj.adjustmentItems) {
      // Fetch existing stock for product at location
      const stockRecord = await tx.stock.findFirst({ where: { locationId: locationId ? Number(locationId) : null, productId: item.productId } });
      const currentQty = stockRecord ? Number(stockRecord.quantity) : 0;
      const delta = Number(item.countedQuantity) - currentQty; // positive => increase, negative => decrease

      if (delta === 0) {
        // No change, but we may still want to log a no-op audit entry. Skipping for brevity.
        continue;
      }

      if (stockRecord) {
        // Update existing stock
        await tx.stock.update({ where: { id: stockRecord.id }, data: { quantity: currentQty + delta } });
      } else {
        // Create stock at location
        await tx.stock.create({ data: { locationId: locationId ? Number(locationId) : null, productId: item.productId, quantity: item.countedQuantity } });
      }

      // Create ledger entry
      await tx.ledger.create({ data: {
        productId: item.productId,
        change: delta,
        type: 'ADJUSTMENT',
        referenceType: 'ADJUSTMENT',
        referenceId: adj.id,
        locationId: locationId ? Number(locationId) : null,
        createdBy: appliedBy,
      } });
    }

    // Mark as APPLIED
    const applied = await tx.adjustment.update({ where: { id: Number(id) }, data: { status: 'APPLIED', appliedBy, appliedAt: new Date() }, include: { adjustmentItems: true } });
    return applied;
  });
}

/**
 * Cancel an adjustment (only if not applied)
 */
async function cancelAdjustment(id, opts = {}) {
  const canceledBy = opts.canceledBy || null;
  const existing = await prisma.adjustment.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new Error('Adjustment not found');
  if (existing.status === 'APPLIED') throw new Error('Cannot cancel an applied adjustment');

  const canceled = await prisma.adjustment.update({ where: { id: Number(id) }, data: { status: 'CANCELED', canceledBy, canceledAt: new Date() } });
  return canceled;
}

module.exports = {
  createAdjustment,
  listAdjustments,
  getAdjustmentById,
  updateAdjustment,
  applyAdjustment,
  cancelAdjustment,
};
