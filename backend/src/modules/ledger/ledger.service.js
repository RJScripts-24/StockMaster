// Source/Spec: /mnt/data/StockMaster.pdf
// modules/ledger/ledger.service.js
// Service layer for stock ledger operations
// Assumes a Prisma client exported from ../../config/db as `{ prisma }`

const { prisma } = require('../../config/db');
const { Parser } = require('json2csv');

/**
 * Create a single ledger entry
 * data: { productId, change, type, referenceType, referenceId, locationId, createdBy, note }
 */
async function createEntry(data) {
  if (!data || !data.productId || typeof data.change !== 'number') {
    throw new Error('Invalid ledger entry payload');
  }

  const entry = await prisma.ledger.create({ data });
  return entry;
}

/**
 * Bulk create ledger entries inside an existing transaction or standalone
 * entries: [{ productId, change, type, referenceType, referenceId, locationId, createdBy, note }]
 * txClient (optional): a Prisma transaction client to use
 */
async function bulkCreateEntries(entries = [], txClient = null) {
  if (!Array.isArray(entries) || entries.length === 0) return [];
  const client = txClient || prisma;
  const created = await client.ledger.createMany({ data: entries, skipDuplicates: false });
  return created; // note: createMany returns count info, not objects
}

/**
 * List ledger entries with filters and pagination
 * filters: { productId, locationId, type, dateFrom, dateTo }
 */
async function listLedgerEntries(filters = {}, opts = { page: 1, limit: 50 }) {
  const where = {};
  if (filters.productId) where.productId = Number(filters.productId);
  if (filters.locationId) where.locationId = Number(filters.locationId);
  if (filters.type) where.type = filters.type;
  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
    if (filters.dateTo) where.createdAt.lte = new Date(filters.dateTo);
  }

  const page = Math.max(1, Number(opts.page) || 1);
  const limit = Math.max(1, Number(opts.limit) || 50);
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.ledger.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.ledger.count({ where }),
  ]);

  return { items, total, page, limit };
}

/**
 * Get a single ledger entry by id
 */
async function getLedgerById(id) {
  const entry = await prisma.ledger.findUnique({ where: { id: Number(id) } });
  return entry;
}

/**
 * Compute current balance for a product optionally scoped to a location
 * This sums up all ledger.change values for the product (+/-)
 */
async function getProductBalance(productId, locationId = null) {
  if (!productId) throw new Error('productId is required');

  const where = { productId: Number(productId) };
  if (locationId !== null && locationId !== undefined) where.locationId = Number(locationId);

  const agg = await prisma.ledger.aggregate({
    _sum: { change: true },
    where,
  });

  const sum = (agg && agg._sum && agg._sum.change) ? Number(agg._sum.change) : 0;
  return sum;
}

/**
 * Export ledger entries as CSV (returns CSV string)
 * Accepts same filters as listLedgerEntries but no pagination
 */
async function exportLedgerCSV(filters = {}) {
  const where = {};
  if (filters.productId) where.productId = Number(filters.productId);
  if (filters.locationId) where.locationId = Number(filters.locationId);
  if (filters.type) where.type = filters.type;
  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
    if (filters.dateTo) where.createdAt.lte = new Date(filters.dateTo);
  }

  const items = await prisma.ledger.findMany({ where, orderBy: { createdAt: 'desc' } });

  const fields = ['id', 'productId', 'change', 'type', 'referenceType', 'referenceId', 'locationId', 'createdBy', 'note', 'createdAt'];
  const parser = new Parser({ fields });
  const csv = parser.parse(items);
  return csv;
}

/**
 * Reconcile ledger against stock table to find discrepancies
 * Returns array of { productId, locationId, ledgerQty, stockQty, delta }
 */
async function reconcileLedger({ productIds = null, locationIds = null } = {}) {
  // Build queries to aggregate ledger sums and fetch current stock
  const ledgerWhere = {};
  if (productIds && Array.isArray(productIds)) ledgerWhere.productId = { in: productIds.map(Number) };
  if (locationIds && Array.isArray(locationIds)) ledgerWhere.locationId = { in: locationIds.map(Number) };

  // Aggregate ledger sums grouped by productId + locationId
  const ledgerSums = await prisma.$queryRaw`
    SELECT "productId", "locationId", SUM("change") as "ledgerQty"
    FROM "Ledger"
    ${Object.keys(ledgerWhere).length ? prisma.raw('WHERE 1=1') : prisma.raw('')}
    GROUP BY "productId", "locationId";
  `; // Note: raw query used for grouping; adapt if your DB naming differs

  // Fetch stock records
  const stockWhere = {};
  if (productIds && Array.isArray(productIds)) stockWhere.productId = { in: productIds.map(Number) };
  if (locationIds && Array.isArray(locationIds)) stockWhere.locationId = { in: locationIds.map(Number) };

  const stocks = await prisma.stock.findMany({ where: stockWhere });

  // Map stocks by productId|locationId
  const stockMap = new Map();
  for (const s of stocks) {
    const key = `${s.productId}::${s.locationId}`;
    stockMap.set(key, Number(s.quantity || 0));
  }

  // Compare
  const results = [];
  for (const row of ledgerSums) {
    const pid = Number(row.productId);
    const lid = row.locationId !== null ? Number(row.locationId) : null;
    const ledgerQty = Number(row.ledgerQty || 0);
    const key = `${pid}::${lid}`;
    const stockQty = stockMap.has(key) ? stockMap.get(key) : 0;
    const delta = ledgerQty - stockQty;
    if (delta !== 0) {
      results.push({ productId: pid, locationId: lid, ledgerQty, stockQty, delta });
    }
  }

  return results;
}

module.exports = {
  createEntry,
  bulkCreateEntries,
  listLedgerEntries,
  getLedgerById,
  getProductBalance,
  exportLedgerCSV,
  reconcileLedger,
};
