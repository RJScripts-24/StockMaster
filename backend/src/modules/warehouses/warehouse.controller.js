// src/modules/warehouses/warehouse.controller.js
// Controller for warehouse management (JavaScript, ESM)

import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';
import WarehouseService from './warehouse.service.js';

const WarehouseController = {
  /**
   * POST /api/warehouses
   * Body: { name, code, location?, description? }
   */
  async createWarehouse(req, res, next) {
    try {
      const payload = req.body;

      const warehouse = await WarehouseService.createWarehouse(payload);

      return res.status(201).json({
        status: 'success',
        data: warehouse,
      });
    } catch (err) {
      logger.error('Create warehouse failed', err);
      next(err);
    }
  },

  /**
   * GET /api/warehouses
   * Query: page, perPage, search
   */
  async getAllWarehouses(req, res, next) {
    try {
      const filters = {
        page: req.query.page,
        perPage: req.query.perPage,
        search: req.query.search,
      };

      const result = await WarehouseService.getAllWarehouses(filters);

      return res.json({
        status: 'success',
        ...result,
      });
    } catch (err) {
      logger.error('Fetch warehouses failed', err);
      next(err);
    }
  },

  /**
   * GET /api/warehouses/:id
   */
  async getWarehouseById(req, res, next) {
    try {
      const id = Number(req.params.id);

      const warehouse = await WarehouseService.getWarehouseById(id);
      if (!warehouse) throw new AppError('Warehouse not found', 404);

      return res.json({
        status: 'success',
        data: warehouse,
      });
    } catch (err) {
      logger.error('Fetch warehouse by ID failed', err);
      next(err);
    }
  },

  /**
   * PUT /api/warehouses/:id
   * Body: { name?, code?, location?, description? }
   */
  async updateWarehouse(req, res, next) {
    try {
      const id = Number(req.params.id);
      const updates = req.body;

      const warehouse = await WarehouseService.updateWarehouse(id, updates);
      if (!warehouse) throw new AppError('Warehouse not found', 404);

      return res.json({
        status: 'success',
        data: warehouse,
      });
    } catch (err) {
      logger.error('Update warehouse failed', err);
      next(err);
    }
  },

  /**
   * DELETE /api/warehouses/:id
   */
  async deleteWarehouse(req, res, next) {
    try {
      const id = Number(req.params.id);

      const deleted = await WarehouseService.deleteWarehouse(id);
      if (!deleted) throw new AppError('Warehouse not found', 404);

      return res.json({
        status: 'success',
        message: 'Warehouse deleted successfully',
      });
    } catch (err) {
      logger.error('Delete warehouse failed', err);
      next(err);
    }
  },
};

export default WarehouseController;
