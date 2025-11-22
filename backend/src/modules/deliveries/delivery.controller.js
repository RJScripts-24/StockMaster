// src/modules/deliveries/delivery.controller.js
// Controller for delivery orders (outgoing shipments) — JavaScript (ESM)
// Responsibilities:
// - create delivery order (draft/pending)
// - list/search deliveries
// - view a delivery
// - update (if not validated)
// - transition steps: pick -> pack -> validate (decrement stock)
// - cancel / delete
//
// Relies on: DeliveryService, AppError, logger
// Routes expected to be mounted at /api/deliveries

import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';
import DeliveryService from './delivery.service.js';

const DeliveryController = {
  /**
   * POST /api/deliveries
   * Body:
   * {
   *   referenceNo?,
   *   customerName,
   *   warehouseId,
   *   items: [{ productId, quantity }],
   *   status = 'pending' // or 'draft'
   * }
   */
  async createDelivery(req, res, next) {
    try {
      const payload = req.body;
      const userId = req.user?.id || null;

      const delivery = await DeliveryService.createDelivery(payload, userId);

      return res.status(201).json({
        status: 'success',
        data: delivery,
      });
    } catch (err) {
      logger.error('Create delivery failed', err);
      next(err);
    }
  },

  /**
   * GET /api/deliveries
   * Query: page, perPage, status, customer, warehouseId, search
   */
  async getAllDeliveries(req, res, next) {
    try {
      const filters = {
        page: req.query.page,
        perPage: req.query.perPage,
        status: req.query.status,
        customer: req.query.customer,
        warehouseId: req.query.warehouseId,
        search: req.query.search,
      };

      const result = await DeliveryService.getAllDeliveries(filters);

      return res.json({
        status: 'success',
        ...result,
      });
    } catch (err) {
      logger.error('Fetch deliveries failed', err);
      next(err);
    }
  },

  /**
   * GET /api/deliveries/:id
   */
  async getDeliveryById(req, res, next) {
    try {
      const id = Number(req.params.id);

      const delivery = await DeliveryService.getDeliveryById(id);
      if (!delivery) throw new AppError('Delivery not found', 404);

      return res.json({
        status: 'success',
        data: delivery,
      });
    } catch (err) {
      logger.error('Fetch delivery by ID failed', err);
      next(err);
    }
  },

  /**
   * PUT /api/deliveries/:id
   * Updates metadata/items; disallowed if already validated/shipped
   */
  async updateDelivery(req, res, next) {
    try {
      const id = Number(req.params.id);
      const updates = req.body;

      const updated = await DeliveryService.updateDelivery(id, updates);

      return res.json({
        status: 'success',
        data: updated,
      });
    } catch (err) {
      logger.error('Update delivery failed', err);
      next(err);
    }
  },

  /**
   * POST /api/deliveries/:id/pick
   * Marks delivery as picked (reserves stock if your flow requires)
   */
  async markAsPicked(req, res, next) {
    try {
      const id = Number(req.params.id);
      const userId = req.user?.id || null;

      const picked = await DeliveryService.markAsPicked(id, userId);

      return res.json({
        status: 'success',
        data: picked,
      });
    } catch (err) {
      logger.error('Mark as picked failed', err);
      next(err);
    }
  },

  /**
   * POST /api/deliveries/:id/pack
   * Marks delivery as packed
   */
  async markAsPacked(req, res, next) {
    try {
      const id = Number(req.params.id);
      const userId = req.user?.id || null;

      const packed = await DeliveryService.markAsPacked(id, userId);

      return res.json({
        status: 'success',
        data: packed,
      });
    } catch (err) {
      logger.error('Mark as packed failed', err);
      next(err);
    }
  },

  /**
   * POST /api/deliveries/:id/validate
   * Finalizes delivery: decrements stock (actual outbound), creates ledger entries,
   * sets status to 'shipped' or 'validated' depending on your model.
   */
  async validateDelivery(req, res, next) {
    try {
      const id = Number(req.params.id);
      const userId = req.user?.id || null;

      const validated = await DeliveryService.validateDelivery(id, userId);

      return res.json({
        status: 'success',
        data: validated,
      });
    } catch (err) {
      logger.error('Validate delivery failed', err);
      next(err);
    }
  },

  /**
   * POST /api/deliveries/:id/cancel
   * Cancels a delivery if allowed (e.g., not validated/shipped)
   */
  async cancelDelivery(req, res, next) {
    try {
      const id = Number(req.params.id);
      const userId = req.user?.id || null;

      const cancelled = await DeliveryService.cancelDelivery(id, userId);

      return res.json({
        status: 'success',
        data: cancelled,
      });
    } catch (err) {
      logger.error('Cancel delivery failed', err);
      next(err);
    }
  },

  /**
   * DELETE /api/deliveries/:id
   * Remove delivery record (only when allowed by business rules)
   */
  async deleteDelivery(req, res, next) {
    try {
      const id = Number(req.params.id);

      const deleted = await DeliveryService.deleteDelivery(id);
      if (!deleted) throw new AppError('Delivery not found or cannot be deleted', 400);

      return res.json({
        status: 'success',
        message: 'Delivery deleted successfully',
      });
    } catch (err) {
      logger.error('Delete delivery failed', err);
      next(err);
    }
  },
};

export default DeliveryController;
