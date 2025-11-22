// src/modules/products/product.controller.js
// Controller for product management (JavaScript, ESM)

import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';
import ProductService from './product.service.js';

const ProductController = {
  /**
   * POST /api/products
   * Body: { name, sku, categoryId?, description?, unit?, initialStock? }
   */
  async createProduct(req, res, next) {
    try {
      const payload = req.body;

      const product = await ProductService.createProduct(payload);

      return res.status(201).json({
        status: 'success',
        data: product,
      });
    } catch (err) {
      logger.error('Create product failed', err);
      next(err);
    }
  },

  /**
   * GET /api/products
   * Query: page, perPage, categoryId, search
   */
  async getAllProducts(req, res, next) {
    try {
      const filters = {
        page: req.query.page,
        perPage: req.query.perPage,
        search: req.query.search,
        categoryId: req.query.categoryId,
      };

      const result = await ProductService.getAllProducts(filters);

      return res.json({
        status: 'success',
        ...result,
      });
    } catch (err) {
      logger.error('Fetch products failed', err);
      next(err);
    }
  },

  /**
   * GET /api/products/:id
   */
  async getProductById(req, res, next) {
    try {
      const productId = Number(req.params.id);

      const product = await ProductService.getProductById(productId);
      if (!product) throw new AppError('Product not found', 404);

      return res.json({
        status: 'success',
        data: product,
      });
    } catch (err) {
      logger.error('Fetch product by ID failed', err);
      next(err);
    }
  },

  /**
   * PUT /api/products/:id
   */
  async updateProduct(req, res, next) {
    try {
      const productId = Number(req.params.id);
      const updates = req.body;

      const product = await ProductService.updateProduct(productId, updates);
      if (!product) throw new AppError('Product not found', 404);

      return res.json({
        status: 'success',
        data: product,
      });
    } catch (err) {
      logger.error('Update product failed', err);
      next(err);
    }
  },

  /**
   * DELETE /api/products/:id
   */
  async deleteProduct(req, res, next) {
    try {
      const productId = Number(req.params.id);

      const deleted = await ProductService.deleteProduct(productId);
      if (!deleted) throw new AppError('Product not found', 404);

      return res.json({
        status: 'success',
        message: 'Product deleted successfully',
      });
    } catch (err) {
      logger.error('Delete product failed', err);
      next(err);
    }
  },

  /**
   * PATCH /api/products/:id/stock
   * Body: { quantityChange }
   * NOTE: Real adjustments happen in Adjustment Module — this is a prototype shortcut.
   */
  async adjustStock(req, res, next) {
    try {
      const productId = Number(req.params.id);
      const { quantityChange } = req.body;

      if (typeof quantityChange !== 'number') {
        throw new AppError('quantityChange must be a number', 400);
      }

      const result = await ProductService.adjustStock(productId, quantityChange);

      return res.json({
        status: 'success',
        data: result,
      });
    } catch (err) {
      logger.error('Stock adjustment failed', err);
      next(err);
    }
  },
};

export default ProductController;
