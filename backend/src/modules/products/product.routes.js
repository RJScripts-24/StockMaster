// src/modules/products/product.routes.js
// Routing layer for Products module (JavaScript, ESM)
// Maps HTTP routes to controller handlers defined in product.controller.js

import { Router } from 'express';
import ProductController from './product.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js'; // ensures req.user
import permit from '../../shared/middlewares/permissionMiddleware.js'; // optional role guard

const router = Router();

/**
 * Public or protected collection routes
 * - GET  /api/products        -> list products (protected for inventory teams if desired)
 * - POST /api/products        -> create product (admin/manager)
 */
router.get('/', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ProductController.getAllProducts);
router.post('/', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ProductController.createProduct);

/**
 * Single-resource routes
 * Note: keep static routes (if any) before dynamic :id routes to avoid conflicts.
 */
router.get('/:id', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ProductController.getProductById);
router.put('/:id', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ProductController.updateProduct);
router.delete('/:id', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ProductController.deleteProduct);

/**
 * Stock adjustment endpoint (prototype shortcut)
 * - PATCH /api/products/:id/stock
 * Body: { quantityChange, warehouseId?, reason? }
 */
router.patch('/:id/stock', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ProductController.adjustStock);

export default router;
