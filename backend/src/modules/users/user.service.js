// src/modules/users/user.service.js
// Service layer for user operations (JavaScript, ESM)

import bcrypt from 'bcrypt';
import prisma from '../../config/db.js';
import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

const UserService = {
  /**
   * Get paginated list of users.
   * options: { page = 1, perPage = 20, search, role }
   */
  async getAllUsers(options = {}) {
    const page = Number(options.page) > 0 ? Number(options.page) : 1;
    const perPage = Number(options.perPage) > 0 ? Number(options.perPage) : 20;
    const skip = (page - 1) * perPage;

    const where = {};
    if (options.search) {
      // simple search on name or email
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { email: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.role) {
      where.role = options.role;
    }

    try {
      const [total, users] = await Promise.all([
        prisma.user.count({ where }),
        prisma.user.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
      ]);

      return {
        meta: {
          page,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage),
        },
        data: users,
      };
    } catch (err) {
      logger.error('getAllUsers failed', err);
      throw new AppError('Failed to fetch users', 500, { originalError: err.message });
    }
  },

  /**
   * Get single user by id
   */
  async getUserById(id) {
    if (!id) throw new AppError('User id is required', 400);

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (err) {
      logger.error('getUserById failed', err);
      throw new AppError('Failed to fetch user', 500);
    }
  },

  /**
   * Create a new user (admin action)
   * payload: { name, email, password, role }
   */
  async createUser(payload) {
    const { name, email, password, role } = payload || {};
    if (!email || !password) throw new AppError('email and password are required', 400);

    try {
      // Check existing
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        throw new AppError('A user with that email already exists', 409);
      }

      const hashed = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await prisma.user.create({
        data: {
          name: name || null,
          email,
          password: hashed,
          role: role || 'user',
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      return user;
    } catch (err) {
      logger.error('createUser failed', err);
      if (err instanceof AppError) throw err;
      throw new AppError('Failed to create user', 500);
    }
  },

  /**
   * Update user by id.
   * updates: { name?, email?, password?, role? }
   * Returns updated user (selects non-sensitive fields)
   */
  async updateUser(id, updates = {}) {
    if (!id) throw new AppError('User id is required', 400);

    const data = { ...updates };

    // If password provided, hash it
    if (data.password) {
      try {
        data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
      } catch (err) {
        logger.error('Failed to hash password during update', err);
        throw new AppError('Failed to update user password', 500);
      }
    }

    // Prevent accidental nulling of email/name unless explicitly set
    // (caller should control payload)
    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (err) {
      // If record not found, Prisma throws — normalize to 404
      logger.error('updateUser failed', err);
      if (err.code === 'P2025') {
        // record does not exist
        throw new AppError('User not found', 404);
      }
      throw new AppError('Failed to update user', 500);
    }
  },

  /**
   * Delete user by id (hard delete).
   * Returns true on success, false if not found.
   */
  async deleteUser(id) {
    if (!id) throw new AppError('User id is required', 400);

    try {
      await prisma.user.delete({ where: { id: Number(id) } });
      return true;
    } catch (err) {
      logger.error('deleteUser failed', err);
      if (err.code === 'P2025') {
        // record does not exist
        return false;
      }
      throw new AppError('Failed to delete user', 500);
    }
  },
};

export default UserService;
