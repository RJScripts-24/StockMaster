// src/modules/users/user.controller.js
// Controller for user-related actions (JavaScript, ESM)

import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';
import UserService from './user.service.js';

const UserController = {
  /**
   * GET /api/users
   */
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return res.json({
        status: 'success',
        data: users,
      });
    } catch (err) {
      logger.error('Error fetching all users', err);
      next(err);
    }
  },

  /**
   * GET /api/users/:id
   */
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(Number(id));

      if (!user) throw new AppError('User not found', 404);

      return res.json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      logger.error('Error fetching user by ID', err);
      next(err);
    }
  },

  /**
   * POST /api/users
   * Body: { name, email, password, role }
   */
  async createUser(req, res, next) {
    try {
      const payload = req.body;

      const user = await UserService.createUser(payload);

      return res.status(201).json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      logger.error('Error creating user', err);
      next(err);
    }
  },

  /**
   * PUT /api/users/:id
   */
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await UserService.updateUser(Number(id), updates);

      if (!user) throw new AppError('User not found', 404);

      return res.json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      logger.error('Error updating user', err);
      next(err);
    }
  },

  /**
   * DELETE /api/users/:id
   */
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const success = await UserService.deleteUser(Number(id));

      if (!success) throw new AppError('User not found', 404);

      return res.json({
        status: 'success',
        message: 'User deleted successfully',
      });
    } catch (err) {
      logger.error('Error deleting user', err);
      next(err);
    }
  },

  /**
   * GET /api/users/profile
   * Authenticated user's own profile
   */
  async getProfile(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new AppError('Unauthorized', 401);

      const user = await UserService.getUserById(Number(userId));

      return res.json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      logger.error('Error fetching profile', err);
      next(err);
    }
  },

  /**
   * PUT /api/users/profile
   */
  async updateProfile(req, res, next) {
    try {
      const userId = req.user?.id;
      if (!userId) throw new AppError('Unauthorized', 401);

      const updates = req.body;

      const user = await UserService.updateUser(Number(userId), updates);

      return res.json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      logger.error('Error updating profile', err);
      next(err);
    }
  },
};

export default UserController;
