// shared/utils/pagination.js
// Utility helpers for parsing pagination params and building metadata
// Used by services/controllers to standardize pagination behavior
// Reference spec: /mnt/data/StockMaster.pdf

/**
 * Safely parse integers and apply defaults
 */
function _parsePositiveInt(value, defaultValue) {
  const v = Number(value);
  if (!Number.isFinite(v) || Number.isNaN(v) || v <= 0) return defaultValue;
  return Math.floor(v);
}

/**
 * Get pagination parameters from a request query-like object
 * Accepts: { page, limit, sortBy, sortDir }
 * Returns: { page, limit, skip, take, sortBy, sortDir }
 */
function getPaginationParams(query = {}, opts = {}) {
  const defaultPage = opts.defaultPage || 1;
  const defaultLimit = opts.defaultLimit || 25;
  const maxLimit = opts.maxLimit || 200;

  const page = _parsePositiveInt(query.page, defaultPage);
  let limit = _parsePositiveInt(query.limit, defaultLimit);
  if (limit > maxLimit) limit = maxLimit;

  const skip = (page - 1) * limit;
  const take = limit;

  const sortBy = query.sortBy || opts.defaultSortBy || 'createdAt';
  const sortDir = (query.sortDir || opts.defaultSortDir || 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc';

  return { page, limit, skip, take, sortBy, sortDir };
}

/**
 * Build pagination metadata for responses
 * total: total number of items
 * page, limit: current page & limit
 */
function getPaginationMeta(total = 0, page = 1, limit = 25) {
  const totalPages = Math.max(1, Math.ceil(Number(total || 0) / Number(limit || 1)));
  return {
    total: Number(total || 0),
    page: Number(page || 1),
    limit: Number(limit || 25),
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/**
 * Helper to adapt pagination params to Prisma-style options
 * Example usage:
 * const { skip, take, sortBy, sortDir } = getPaginationParams(req.query);
 * const items = await prisma.model.findMany({ where, skip, take, orderBy: { [sortBy]: sortDir } });
 */
function toPrismaOrder(sortBy, sortDir) {
  // Prisma expects { field: 'asc' | 'desc' }
  return { [sortBy]: sortDir };
}

module.exports = { getPaginationParams, getPaginationMeta, toPrismaOrder };
