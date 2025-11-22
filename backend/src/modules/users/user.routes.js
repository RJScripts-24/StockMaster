// src/modules/users/user.routes.js
// Routing layer for User module (JavaScript, ESM)
// Maps HTTP routes to controller handlers defined in user.controller.js

import { Router } from 'express';
import UserController from './user.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js'; // protect routes
import permit from '../../shared/middlewares/permissionMiddleware.js'; // optional role-based guard (if present)

const router = Router();

/**
 * Public/admin routes
 * - GET    /api/users           -> list users (protected, typically admin/manager)
 * - POST   /api/users           -> create user (protected, admin)
 */
router.get('/', authMiddleware, permit('admin', 'manager'), UserController.getAllUsers);
router.post('/', authMiddleware, permit('admin'), UserController.createUser);

/**
 * User resource routes (protected)
 * - GET    /api/users/:id
 * - PUT    /api/users/:id
 * - DELETE /api/users/:id
 */
router.get('/:id', authMiddleware, permit('admin', 'manager'), UserController.getUserById);
router.put('/:id', authMiddleware, permit('admin'), UserController.updateUser);
router.delete('/:id', authMiddleware, permit('admin'), UserController.deleteUser);

/**
 * Profile routes (authenticated user)
 * - GET /api/users/profile
 * - PUT /api/users/profile
 */
router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);

export default router;
