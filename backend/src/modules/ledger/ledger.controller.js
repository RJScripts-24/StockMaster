// Source/Spec: /mnt/data/StockMaster.pdf
// modules/ledger/ledger.controller.js
// Controller for ledger endpoints

const express = require('express');
const router = express.Router();
const ledgerService = require('../../modules/ledger/ledger.service');

// Simple response helpers
function sendSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}
function sendError(next, err) {
  return next(err);
}

/**
 * POST /api/ledger
 * Create a ledger entry (usually used internally by other services)
 */
async function createEntry(req, res, next) {
  try {
    const payload = req.body;
    if (req.user && req.user.id) payload.createdBy = payload.createdBy || req.user.id;

    const entry = await ledgerService.createEntry(payload);
    return sendSuccess(res, entry, 201);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/ledger
 * List ledger entries with filters and pagination
 */
async function listEntries(req, res, next) {
  try {
    const filters = {
      productId: req.query.productId,
      locationId: req.query.locationId,
      type: req.query.type,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;

    const result = await ledgerService.listLedgerEntries(filters, { page, limit });
    return sendSuccess(res, result);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/ledger/:id
 */
async function getEntryById(req, res, next) {
  try {
    const { id } = req.params;
    const entry = await ledgerService.getLedgerById(id);
    if (!entry) return res.status(404).json({ success: false, message: 'Ledger entry not found' });
    return sendSuccess(res, entry);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/ledger/balance
 * Query params: productId, optional locationId
 */
async function getBalance(req, res, next) {
  try {
    const productId = req.query.productId;
    const locationId = req.query.locationId;
    if (!productId) return res.status(400).json({ success: false, message: 'productId is required' });

    const balance = await ledgerService.getProductBalance(productId, locationId);
    return sendSuccess(res, { productId: Number(productId), locationId: locationId ? Number(locationId) : null, balance });
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/ledger/export
 * Returns CSV string (content-type text/csv)
 */
async function exportCSV(req, res, next) {
  try {
    const filters = {
      productId: req.query.productId,
      locationId: req.query.locationId,
      type: req.query.type,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    };

    const csv = await ledgerService.exportLedgerCSV(filters);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="ledger_export.csv"');
    return res.status(200).send(csv);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * POST /api/ledger/reconcile
 * Body: { productIds?: [], locationIds?: [] }
 */
async function reconcile(req, res, next) {
  try {
    const body = req.body || {};
    const results = await ledgerService.reconcileLedger({ productIds: body.productIds || null, locationIds: body.locationIds || null });
    return sendSuccess(res, results);
  } catch (err) {
    return sendError(next, err);
  }
}

// Routes
router.post('/', createEntry);
router.get('/', listEntries);
router.get('/export', exportCSV);
router.get('/balance', getBalance);
router.get('/:id', getEntryById);
router.post('/reconcile', reconcile);

module.exports = router;
