// src/modules/deliveries/delivery.routes.js
// Routing layer for Deliveries module (JavaScript, ESM)
// Maps HTTP routes to controller handlers defined in delivery.controller.js

import { Router } from 'express';
import DeliveryController from './delivery.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js';
import permit from '../../shared/middlewares/permissionMiddleware.js'; // optional role guard

const router = Router();

/**
 * Collection routes
 * - GET  /api/deliveries       -> list deliveries (protected)
 * - POST /api/deliveries       -> create delivery (warehouse/manager/admin)
 */
router.get('/', authMiddleware, permit('admin', 'manager', 'warehouse'), DeliveryController.getAllDeliveries);
router.post('/', authMiddleware, permit('admin', 'manager', 'warehouse'), DeliveryController.createDelivery);

/**
 * Action routes should come before dynamic :id routes to avoid being captured by the :id param.
 * - POST /api/deliveries/:id/pick     -> mark as picked (reserve items)
 * - POST /api/deliveries/:id/pack     -> mark as packed
 * - POST /api/deliveries/:id/validate -> finalize and decrement stock
 * - POST /api/deliveries/:id/cancel   -> cancel delivery
 */
router.post('/:id/pick', authMiddleware, permit('admin', 'manager', 'warehouse'), DeliveryController.markAsPicked);
router.post('/:id/pack', authMiddleware, permit('admin', 'manager', 'warehouse'), DeliveryController.markAsPacked);
router.post('/:id/validate', authMiddleware, permit('admin', 'manager'), DeliveryController.validateDelivery);
router.post('/:id/cancel', authMiddleware, permit('admin', 'manager'), DeliveryController.cancelDelivery);

/**
 * Resource routes
 * - GET    /api/deliveries/:id
 * - PUT    /api/deliveries/:id
 * - DELETE /api/deliveries/:id
 *
 * Note: update/delete are typically restricted to admin/manager or the creator
 * and disallowed if the delivery is already validated/shipped (service enforces this).
 */
router.get('/:id', authMiddleware, permit('admin', 'manager', 'warehouse'), DeliveryController.getDeliveryById);
router.put('/:id', authMiddleware, permit('admin', 'manager'), DeliveryController.updateDelivery);
router.delete('/:id', authMiddleware, permit('admin', 'manager'), DeliveryController.deleteDelivery);

export default router;
