// src/modules/receipts/receipt.routes.js
// Routing layer for Receipts module (JavaScript, ESM)
// Maps HTTP routes to controller handlers defined in receipt.controller.js

import { Router } from 'express';
import ReceiptController from './receipt.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js';
import permit from '../../shared/middlewares/permissionMiddleware.js'; // optional role guard

const router = Router();

/**
 * Collection routes
 * - GET  /api/receipts       -> list receipts (protected)
 * - POST /api/receipts       -> create receipt (warehouse/manager/admin)
 */
router.get('/', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ReceiptController.getAllReceipts);
router.post('/', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ReceiptController.createReceipt);

/**
 * Action routes that are more specific should come before dynamic :id routes
 * to avoid being captured by the :id parameter.
 *
 * - POST /api/receipts/:id/validate  -> finalize receipt (increase stock)
 */
router.post('/:id/validate', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ReceiptController.validateReceipt);

/**
 * Resource routes
 * - GET    /api/receipts/:id
 * - PUT    /api/receipts/:id
 * - DELETE /api/receipts/:id
 *
 * Note: update/delete are typically restricted to admin/manager or the creator
 * and disallowed if the receipt is already validated (service enforces this).
 */
router.get('/:id', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ReceiptController.getReceiptById);
router.put('/:id', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ReceiptController.updateReceipt);
router.delete('/:id', authMiddleware, permit('admin', 'manager', 'warehouse', 'user'), ReceiptController.deleteReceipt);

export default router;
