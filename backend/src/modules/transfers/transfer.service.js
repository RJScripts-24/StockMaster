// modules/transfers/transfer.service.js
// Service layer for internal transfers
// Assumes a Prisma-like client is exported from ../../config/db as `{ prisma }`

const { prisma } = require('../../config/db');

/**
 * Create a transfer (draft by default)
 * payload: { fromWarehouseId, toWarehouseId, items: [{ productId, quantity, fromLocationId?, toLocationId? }], notes?, createdBy }
 */
async function createTransfer(payload) {
  if (!payload || !payload.items || !Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('Invalid payload: items are required');
  }

  // Basic shape validation (more detailed DTO validation should be applied at controller/middleware)
  const transferData = {
    fromWarehouseId: payload.fromWarehouseId,
    toWarehouseId: payload.toWarehouseId,
    status: payload.status || 'DRAFT',
    notes: payload.notes || null,
    createdBy: payload.createdBy || null,
    // createdAt will be handled by DB
    transferItems: {
      create: payload.items.map((it) => ({
        productId: it.productId,
        quantity: it.quantity,
        fromLocationId: it.fromLocationId || null,
        toLocationId: it.toLocationId || null,
      })),
    },
  };

  const created = await prisma.transfer.create({
    data: transferData,
    include: { transferItems: true },
  });

  return created;
}

/**
 * List transfers with filters and pagination
 * filters: { status, fromWarehouseId, toWarehouseId, productId, dateFrom, dateTo }
 * opts: { page, limit }
 */
async function listTransfers(filters = {}, opts = { page: 1, limit: 25 }) {
  const where = {};
  if (filters.status) where.status = filters.status;
  if (filters.fromWarehouseId) where.fromWarehouseId = Number(filters.fromWarehouseId);
  if (filters.toWarehouseId) where.toWarehouseId = Number(filters.toWarehouseId);
  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
    if (filters.dateTo) where.createdAt.lte = new Date(filters.dateTo);
  }

  // If filtering by productId we need a relation filter
  if (filters.productId) {
    where.transferItems = {
      some: {
        productId: Number(filters.productId),
      },
    };
  }

  const page = Math.max(1, Number(opts.page) || 1);
  const limit = Math.max(1, Number(opts.limit) || 25);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.transfer.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { transferItems: true },
      skip,
      take: limit,
    }),
    prisma.transfer.count({ where }),
  ]);

  return { items, total, page, limit };
}

/**
 * Get single transfer by id
 */
async function getTransferById(id) {
  const transfer = await prisma.transfer.findUnique({
    where: { id: Number(id) },
    include: { transferItems: true },
  });
  return transfer;
}

/**
 * Update transfer (only allowed for non-executed transfers)
 */
async function updateTransfer(id, updates) {
  const existing = await prisma.transfer.findUnique({ where: { id: Number(id) }, include: { transferItems: true } });
  if (!existing) throw new Error('Transfer not found');
  if (existing.status === 'DONE' || existing.status === 'CANCELED') throw new Error('Cannot modify a completed or canceled transfer');

  // If items provided, we will replace them (simple approach). In production prefer granular item updates.
  const data = {};
  if (updates.fromWarehouseId) data.fromWarehouseId = updates.fromWarehouseId;
  if (updates.toWarehouseId) data.toWarehouseId = updates.toWarehouseId;
  if (updates.notes !== undefined) data.notes = updates.notes;
  if (updates.status) data.status = updates.status;
  if (updates.modifiedBy) data.modifiedBy = updates.modifiedBy;

  // Transaction: delete old items + create new ones if provided
  const updated = await prisma.$transaction(async (tx) => {
    if (updates.items && Array.isArray(updates.items)) {
      await tx.transferItem.deleteMany({ where: { transferId: Number(id) } });
      for (const it of updates.items) {
        await tx.transferItem.create({ data: {
          transferId: Number(id),
          productId: it.productId,
          quantity: it.quantity,
          fromLocationId: it.fromLocationId || null,
          toLocationId: it.toLocationId || null,
        }});
      }
    }

    const u = await tx.transfer.update({ where: { id: Number(id) }, data, include: { transferItems: true } });
    return u;
  });

  return updated;
}

/**
 * Execute / validate a transfer. This will:
 * - check transfer status
 * - for each item, decrement stock from source location and increment stock at destination
 * - create ledger entries for each movement
 * - mark transfer as DONE
 *
 * opts: { executedBy }
 */
async function executeTransfer(id, opts = {}) {
  const executedBy = opts.executedBy || null;

  return prisma.$transaction(async (tx) => {
    const transfer = await tx.transfer.findUnique({ where: { id: Number(id) }, include: { transferItems: true } });
    if (!transfer) throw new Error('Transfer not found');
    if (transfer.status === 'DONE') throw new Error('Transfer already executed');
    if (transfer.status === 'CANCELED') throw new Error('Transfer is canceled');

    // Validate stock availability for each item (if fromWarehouseId provided)
    for (const item of transfer.transferItems) {
      // Determine source location id (either item.fromLocationId or default warehouse stock location)
      const fromLocationId = item.fromLocationId || null;
      const toLocationId = item.toLocationId || null;

      if (fromLocationId) {
        // Check stock exists and is sufficient
        const stockRecord = await tx.stock.findUnique({ where: { id: Number(fromLocationId) } });
        // NOTE: this assumes a stock table keyed by location id; adapt to your schema
        if (!stockRecord) throw new Error(`Source location not found for item ${item.id}`);

        // If stock is tracked per product+location
        const stockByProduct = await tx.stock.findFirst({
          where: { locationId: Number(fromLocationId), productId: item.productId },
        });
        if (!stockByProduct || stockByProduct.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ${item.productId} at source location`);
        }
      }
    }

    // Apply stock movements and ledger entries
    for (const item of transfer.transferItems) {
      const fromLocationId = item.fromLocationId || null;
      const toLocationId = item.toLocationId || null;

      // Decrement source location
      if (fromLocationId) {
        await tx.stock.updateMany({
          where: { locationId: Number(fromLocationId), productId: item.productId },
          data: { quantity: { decrement: item.quantity } },
        });

        await tx.ledger.create({ data: {
          productId: item.productId,
          change: -Math.abs(item.quantity),
          type: 'TRANSFER_OUT',
          referenceType: 'TRANSFER',
          referenceId: transfer.id,
          locationId: Number(fromLocationId),
          createdBy: executedBy,
        }});
      }

      // Increment destination location
      if (toLocationId) {
        // upsert stock at destination
        const existing = await tx.stock.findFirst({ where: { locationId: Number(toLocationId), productId: item.productId } });
        if (existing) {
          await tx.stock.updateMany({
            where: { id: existing.id },
            data: { quantity: { increment: item.quantity } },
          });
        } else {
          await tx.stock.create({ data: { locationId: Number(toLocationId), productId: item.productId, quantity: item.quantity } });
        }

        await tx.ledger.create({ data: {
          productId: item.productId,
          change: Math.abs(item.quantity),
          type: 'TRANSFER_IN',
          referenceType: 'TRANSFER',
          referenceId: transfer.id,
          locationId: Number(toLocationId),
          createdBy: executedBy,
        }});
      }
    }

    // Mark transfer as DONE and set executed metadata
    const executed = await tx.transfer.update({ where: { id: Number(id) }, data: { status: 'DONE', executedBy, executedAt: new Date() }, include: { transferItems: true } });

    return executed;
  });
}

/**
 * Cancel a transfer
 */
async function cancelTransfer(id, opts = {}) {
  const canceledBy = opts.canceledBy || null;
  const existing = await prisma.transfer.findUnique({ where: { id: Number(id) } });
  if (!existing) throw new Error('Transfer not found');
  if (existing.status === 'DONE') throw new Error('Cannot cancel a completed transfer');

  const canceled = await prisma.transfer.update({ where: { id: Number(id) }, data: { status: 'CANCELED', canceledBy, canceledAt: new Date() } });
  return canceled;
}

module.exports = {
  createTransfer,
  listTransfers,
  getTransferById,
  updateTransfer,
  executeTransfer,
  cancelTransfer,
};
