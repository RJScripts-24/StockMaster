// modules/adjustments/adjustment.controller.js
// Handles stock adjustment CRUD + validate operations

const express = require('express');
const router = express.Router();
const adjustmentService = require('../../modules/adjustments/adjustment.service');

// Utility responders
function ok(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}
function fail(next, err) {
  return next(err);
}

/**
 * Create a stock adjustment (DRAFT by default)
 * POST /api/adjustments
 */
async function createAdjustment(req, res, next) {
  try {
    const body = req.body;
    if (req.user && req.user.id) body.createdBy = req.user.id;

    const result = await adjustmentService.createAdjustment(body);
    return ok(res, result, 201);
  } catch (err) {
    return fail(next, err);
  }
}

/**
 * List adjustments with filters
 * GET /api/adjustments
 */
async function listAdjustments(req, res, next) {
  try {
    const filters = {
      status: req.query.status,
      productId: req.query.productId,
      warehouseId: req.query.warehouseId,
      locationId: req.query.locationId,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;

    const result = await adjustmentService.listAdjustments(filters, { page, limit });
    return ok(res, result);
  } catch (err) {
    return fail(next, err);
  }
}

/**
 * Get adjustment by ID
 * GET /api/adjustments/:id
 */
async function getAdjustmentById(req, res, next) {
  try {
    const { id } = req.params;
    const data = await adjustmentService.getAdjustmentById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Adjustment not found' });
    return ok(res, data);
  } catch (err) {
    return fail(next, err);
  }
}

/**
 * Update adjustment (DRAFT only)
 * PATCH /api/adjustments/:id
 */
async function updateAdjustment(req, res, next) {
  try {
    const { id } = req.params;
    const body = req.body;
    if (req.user && req.user.id) body.modifiedBy = req.user.id;

    const result = await adjustmentService.updateAdjustment(id, body);
    return ok(res, result);
  } catch (err) {
    return fail(next, err);
  }
}

/**
 * Apply/validate adjustment (moves stock + ledger entry)
 * POST /api/adjustments/:id/apply
 */
async function applyAdjustment(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user && req.user.id;

    const result = await adjustmentService.applyAdjustment(id, { appliedBy: userId });
    return ok(res, result);
  } catch (err) {
    return fail(next, err);
  }
}

/**
 * Cancel a draft adjustment
 * POST /api/adjustments/:id/cancel
 */
async function cancelAdjustment(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user && req.user.id;

    const result = await adjustmentService.cancelAdjustment(id, { canceledBy: userId });
    return ok(res, result);
  } catch (err) {
    return fail(next, err);
  }
}

// Bind routes
router.post('/', createAdjustment);
router.get('/', listAdjustments);
router.get('/:id', getAdjustmentById);
router.patch('/:id', updateAdjustment);
router.post('/:id/apply', applyAdjustment);
router.post('/:id/cancel', cancelAdjustment);

module.exports = router;