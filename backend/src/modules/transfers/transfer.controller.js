const express = require('express');
const router = express.Router();

// Assume transfer.service.js exists and exports the required functions
const transferService = require('../../modules/transfers/transfer.service');

// Helpers
function sendSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

function sendError(next, err) {
  // Let centralized error handler deal with formatting/logging
  return next(err);
}

/**
 * Create a new internal transfer (draft by default)
 * POST /api/transfers
 */
async function createTransfer(req, res, next) {
  try {
    const payload = req.body;
    // Optionally attach creator info if auth middleware sets req.user
    if (req.user && req.user.id) payload.createdBy = req.user.id;

    const transfer = await transferService.createTransfer(payload);
    return sendSuccess(res, transfer, 201);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * List transfers with filters/pagination
 * GET /api/transfers
 */
async function listTransfers(req, res, next) {
  try {
    const filters = {
      status: req.query.status,
      fromWarehouseId: req.query.fromWarehouseId,
      toWarehouseId: req.query.toWarehouseId,
      productId: req.query.productId,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;

    const result = await transferService.listTransfers(filters, { page, limit });
    return sendSuccess(res, result);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * Get a single transfer by id
 * GET /api/transfers/:id
 */
async function getTransferById(req, res, next) {
  try {
    const { id } = req.params;
    const transfer = await transferService.getTransferById(id);
    if (!transfer) return res.status(404).json({ success: false, message: 'Transfer not found' });
    return sendSuccess(res, transfer);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * Update transfer (only allowed for drafts / not executed transfers)
 * PATCH /api/transfers/:id
 */
async function updateTransfer(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.user && req.user.id) updates.modifiedBy = req.user.id;

    const updated = await transferService.updateTransfer(id, updates);
    return sendSuccess(res, updated);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * Execute/validate a transfer - applies stock movements
 * POST /api/transfers/:id/execute
 */
async function executeTransfer(req, res, next) {
  try {
    const { id } = req.params;
    const executorId = req.user && req.user.id;

    const executed = await transferService.executeTransfer(id, { executedBy: executorId });
    return sendSuccess(res, executed);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * Cancel a transfer
 * POST /api/transfers/:id/cancel
 */
async function cancelTransfer(req, res, next) {
  try {
    const { id } = req.params;
    const canceledBy = req.user && req.user.id;

    const canceled = await transferService.cancelTransfer(id, { canceledBy });
    return sendSuccess(res, canceled);
  } catch (err) {
    return sendError(next, err);
  }
}

// Register routes on the router
router.post('/', createTransfer);
router.get('/', listTransfers);
router.get('/:id', getTransferById);
router.patch('/:id', updateTransfer);
router.post('/:id/execute', executeTransfer);
router.post('/:id/cancel', cancelTransfer);

module.exports = router;
