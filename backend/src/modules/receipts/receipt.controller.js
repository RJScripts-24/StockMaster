// src/modules/receipts/receipt.controller.js
// Controller for inventory receipts (JavaScript, ESM)

import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';
import ReceiptService from './receipt.service.js';

const ReceiptController = {
  /**
   * POST /api/receipts
   * Body: {
   *   supplierName,
   *   referenceNo?,
   *   warehouseId,
   *   items: [{ productId, quantity }]
   * }
   */
  async createReceipt(req, res, next) {
    try {
      const payload = req.body;
      const userId = req.user?.id || null;

      const receipt = await ReceiptService.createReceipt(payload, userId);

      return res.status(201).json({
        status: 'success',
        data: receipt,
      });
    } catch (err) {
      logger.error('Create receipt failed', err);
      next(err);
    }
  },

  /**
   * GET /api/receipts
   * Query: page, perPage, status, supplier, warehouseId
   */
  async getAllReceipts(req, res, next) {
    try {
      const filters = {
        page: req.query.page,
        perPage: req.query.perPage,
        status: req.query.status,
        supplier: req.query.supplier,
        warehouseId: req.query.warehouseId,
        search: req.query.search,
      };

      const result = await ReceiptService.getAllReceipts(filters);

      return res.json({
        status: 'success',
        ...result,
      });
    } catch (err) {
      logger.error('Fetch receipts failed', err);
      next(err);
    }
  },

  /**
   * GET /api/receipts/:id
   */
  async getReceiptById(req, res, next) {
    try {
      const id = Number(req.params.id);

      const receipt = await ReceiptService.getReceiptById(id);
      if (!receipt) throw new AppError('Receipt not found', 404);

      return res.json({
        status: 'success',
        data: receipt,
      });
    } catch (err) {
      logger.error('Fetch receipt by ID failed', err);
      next(err);
    }
  },

  /**
   * PUT /api/receipts/:id
   * NOT allowed if the receipt is already validated.
   */
  async updateReceipt(req, res, next) {
    try {
      const id = Number(req.params.id);
      const updates = req.body;

      const receipt = await ReceiptService.updateReceipt(id, updates);

      return res.json({
        status: 'success',
        data: receipt,
      });
    } catch (err) {
      logger.error('Update receipt failed', err);
      next(err);
    }
  },

  /**
   * POST /api/receipts/:id/validate
   * Finalizes receipt → increases stock → creates ledger entries.
   */
  async validateReceipt(req, res, next) {
    try {
      const id = Number(req.params.id);
      const userId = req.user?.id || null;

      const validatedReceipt = await ReceiptService.validateReceipt(id, userId);

      return res.json({
        status: 'success',
        data: validatedReceipt,
      });
    } catch (err) {
      logger.error('Validate receipt failed', err);
      next(err);
    }
  },

  /**
   * DELETE /api/receipts/:id
   * Only allowed if receipt is NOT validated.
   */
  async deleteReceipt(req, res, next) {
    try {
      const id = Number(req.params.id);

      const deleted = await ReceiptService.deleteReceipt(id);
      if (!deleted) throw new AppError('Receipt not found or cannot be deleted', 400);

      return res.json({
        status: 'success',
        message: 'Receipt deleted successfully',
      });
    } catch (err) {
      logger.error('Delete receipt failed', err);
      next(err);
    }
  },
};

export default ReceiptController;
