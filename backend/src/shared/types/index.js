// shared/types/index.js
// JSDoc-based JS equivalent of shared/types/index.d.ts
// Reference: /mnt/data/StockMaster.pdf

/**
 * @typedef {number} ID
 */

/**
 * @typedef {Object} User
 * @property {ID} id
 * @property {string} email
 * @property {string|null} [name]
 * @property {'ADMIN'|'MANAGER'|'STAFF'|string} [role]
 */

/**
 * @typedef {Object} Product
 * @property {ID} id
 * @property {string} name
 * @property {string} sku
 * @property {ID|null} [categoryId]
 * @property {string|null} [unit]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} Warehouse
 * @property {ID} id
 * @property {string} name
 * @property {string|null} [code]
 * @property {string|null} [address]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

/**
 * @typedef {Object} Location
 * @property {ID} id
 * @property {ID} warehouseId
 * @property {string} name
 * @property {string|null} [code]
 */

/**
 * @typedef {Object} Stock
 * @property {ID} id
 * @property {ID} productId
 * @property {ID|null} [locationId]
 * @property {ID|null} [warehouseId]
 * @property {number} quantity
 */

/**
 * @typedef {Object} ReceiptItem
 * @property {ID} [id]
 * @property {ID} productId
 * @property {number} quantity
 * @property {string|null} [note]
 */

/**
 * @typedef {Object} Receipt
 * @property {ID} id
 * @property {ID|null} [supplierId]
 * @property {ID} warehouseId
 * @property {'DRAFT'|'PENDING'|'DONE'|'CANCELED'|string} status
 * @property {ReceiptItem[]} [items]
 * @property {ID|null} [createdBy]
 * @property {string} [createdAt]
 */

/**
 * @typedef {Object} DeliveryItem
 * @property {ID} [id]
 * @property {ID} productId
 * @property {number} quantity
 */

/**
 * @typedef {Object} Delivery
 * @property {ID} id
 * @property {ID|null} [customerId]
 * @property {ID} warehouseId
 * @property {'DRAFT'|'PENDING'|'DONE'|'CANCELED'|string} status
 * @property {DeliveryItem[]} [items]
 * @property {ID|null} [createdBy]
 * @property {string} [createdAt]
 */

/**
 * @typedef {Object} TransferItem
 * @property {ID} [id]
 * @property {ID} [transferId]
 * @property {ID} productId
 * @property {number} quantity
 * @property {ID|null} [fromLocationId]
 * @property {ID|null} [toLocationId]
 */

/**
 * @typedef {Object} Transfer
 * @property {ID} id
 * @property {ID} fromWarehouseId
 * @property {ID} toWarehouseId
 * @property {'DRAFT'|'SCHEDULED'|'DONE'|'CANCELED'|string} status
 * @property {string|null} [notes]
 * @property {TransferItem[]} [transferItems]
 * @property {ID|null} [createdBy]
 * @property {ID|null} [executedBy]
 * @property {string} [createdAt]
 * @property {string|null} [executedAt]
 */

/**
 * @typedef {Object} AdjustmentItem
 * @property {ID} [id]
 * @property {ID} productId
 * @property {number} countedQuantity
 * @property {string|null} [note]
 */

/**
 * @typedef {Object} Adjustment
 * @property {ID} id
 * @property {ID|null} [warehouseId]
 * @property {ID|null} [locationId]
 * @property {'DRAFT'|'APPLIED'|'CANCELED'|string} status
 * @property {AdjustmentItem[]} [adjustmentItems]
 * @property {string|null} [reason]
 * @property {ID|null} [createdBy]
 * @property {ID|null} [appliedBy]
 * @property {string|null} [appliedAt]
 */

/**
 * @typedef {Object} LedgerEntry
 * @property {ID} id
 * @property {ID} productId
 * @property {number} change
 * @property {'RECEIPT'|'DELIVERY'|'TRANSFER_IN'|'TRANSFER_OUT'|'ADJUSTMENT'|string} type
 * @property {string|null} [referenceType]
 * @property {ID|null} [referenceId]
 * @property {ID|null} [locationId]
 * @property {ID|null} [createdBy]
 * @property {string|null} [note]
 * @property {string} [createdAt]
 */

/**
 * @template T
 * @typedef {Object} PaginationResult
 * @property {T[]} items
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 */

/**
 * @typedef {Object} AuthPayload
 * @property {ID} userId
 * @property {string} [email]
 * @property {string} [role]
 * @property {number} [iat]
 * @property {number} [exp]
 */

/**
 * @typedef {import('express').Request & { user?: User|AuthPayload|null }} RequestWithUser
 */

/* ------------------------------------------------------------------ */
/* Small factory helpers (optional) — useful for creating test objects  */
/* ------------------------------------------------------------------ */

/**
 * @param {Partial<User>} u
 * @returns {User}
 */
function createUser(u = {}) {
  return {
    id: u.id || Date.now(),
    email: u.email || 'user@example.com',
    name: u.name || null,
    role: u.role || 'STAFF',
  };
}

/**
 * @param {Partial<Product>} p
 * @returns {Product}
 */
function createProduct(p = {}) {
  return {
    id: p.id || Date.now(),
    name: p.name || 'Unnamed product',
    sku: p.sku || `SKU-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    categoryId: p.categoryId || null,
    unit: p.unit || 'pcs',
    createdAt: p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt || new Date().toISOString(),
  };
}

/**
 * @param {Partial<Transfer>} t
 * @returns {Transfer}
 */
function createTransfer(t = {}) {
  return {
    id: t.id || Date.now(),
    fromWarehouseId: t.fromWarehouseId || 1,
    toWarehouseId: t.toWarehouseId || 2,
    status: t.status || 'DRAFT',
    notes: t.notes || null,
    transferItems: t.transferItems || [],
    createdBy: t.createdBy || null,
    executedBy: t.executedBy || null,
    createdAt: t.createdAt || new Date().toISOString(),
    executedAt: t.executedAt || null,
  };
}

module.exports = {
  // typedefs are for editor only; we export helpers at runtime
  createUser,
  createProduct,
  createTransfer,
};
