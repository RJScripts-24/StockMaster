// src/modules/warehouses/warehouse.routes.js
// Routing layer for Warehouses module (JavaScript, ESM)
// Maps HTTP routes to controller handlers defined in warehouse.controller.js

import { Router } from 'express';
import WarehouseController from './warehouse.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js';
import permit from '../../shared/middlewares/permissionMiddleware.js'; // optional role guard (admin/manager/warehouse)

const router = Router();

/**
 * Collection routes
 * - GET  /api/warehouses       -> list warehouses (protected)
 * - POST /api/warehouses       -> create warehouse (admin/manager)
 */
router.get('/', authMiddleware, permit('admin', 'manager'), WarehouseController.getAllWarehouses);
router.post('/', authMiddleware, permit('admin', 'manager'), WarehouseController.createWarehouse);

/**
 * Static/detail routes should appear before dynamic parameters if needed.
 * Here we don't have static routes that conflict with :id, but if you add any,
 * place them above the ':id' route definitions.
 */

/**
 * Resource routes
 * - GET    /api/warehouses/:id
 * - PUT    /api/warehouses/:id
 * - DELETE /api/warehouses/:id
 */
router.get('/:id', authMiddleware, permit('admin', 'manager', 'warehouse'), WarehouseController.getWarehouseById);
router.put('/:id', authMiddleware, permit('admin', 'manager'), WarehouseController.updateWarehouse);
router.delete('/:id', authMiddleware, permit('admin'), WarehouseController.deleteWarehouse);

/**
 * Optional nested routes (locations/racks) can be mounted here if you implement them later:
 * e.g. router.post('/:id/locations', authMiddleware, permit('admin','manager'), WarehouseController.createLocation);
 */

export default router;
