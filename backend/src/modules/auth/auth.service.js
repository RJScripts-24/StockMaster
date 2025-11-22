// src/modules/auth/auth.service.js
// Auth service for StockMaster (JavaScript, ESM)
// Implements signup, login, OTP flows, refresh tokens, password reset.
// Uses Prisma if available; otherwise uses in-memory fallback stores.

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import config from '../../config/index.js';
import prisma from '../../config/db.js'; // may be a real prisma client
import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);
const ACCESS_TOKEN_EXPIRES_IN = config.jwt.expiresIn || '7d';
const REFRESH_TOKEN_EXPIRES_DAYS = Number(process.env.REFRESH_TOKEN_DAYS || 30);

// In-memory stores (prototype). Keys:
//  - otps: Map<identifier, { otp, expiresAt }>
//  - refreshStore: Map<token, { userId, expiresAt }>
//  - passwordResets: Map<token, { userId, expiresAt }>
const otps = new Map();
const refreshStore = new Map();
const passwordResets = new Map();

/**
 * Nodemailer transporter (prototype - logs emails).
 * Replace with real SMTP using config.mail when ready.
 */
const transporter = nodemailer.createTransport({
  // For prototype: use ethereal or simply a stub
  streamTransport: true,
  newline: 'unix',
  buffer: true,
});

/**
 * Helper: send email (prototype)
 */
async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: config.mail.from || 'no-reply@stockmaster.local',
      to,
      subject,
      text,
      html,
    });
    // streamTransport returns the message in `info.message` as a Buffer
    logger.info(`Email sent to ${to} (prototype). preview:\n${info.message || '(no preview)'} `);
    return info;
  } catch (err) {
    logger.error('Failed to send email', err);
    // For prototype don't fail hard — log and continue
    return null;
  }
}

/**
 * Helper: generate JWT access token
 */
function generateAccessToken(user) {
  const payload = {
    sub: String(user.id),
    email: user.email,
    role: user.role || 'user',
  };
  return jwt.sign(payload, config.jwt.secret, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

/**
 * Helper: generate refresh token (random string)
 */
function generateRefreshToken() {
  return crypto.randomBytes(48).toString('hex');
}

/**
 * Try to persist a refresh token in the DB (optional).
 * Falls back to in-memory storage if DB model not present.
 */
async function persistRefreshToken(token, userId) {
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_DAYS * 24 * 60 * 60 * 1000);
  // Try DB persistence if prisma has refreshToken model
  try {
    if (prisma && prisma.refreshToken && typeof prisma.refreshToken.create === 'function') {
      await prisma.refreshToken.create({
        data: {
          token,
          userId: Number(userId),
          expiresAt,
        },
      });
      return { token, expiresAt, persistedInDb: true };
    }
  } catch (err) {
    logger.warn('persistRefreshToken: prisma.refreshToken.create failed, falling back to memory store', err);
  }

  // Fallback to memory
  refreshStore.set(token, { userId: Number(userId), expiresAt });
  return { token, expiresAt, persistedInDb: false };
}

/**
 * Remove refresh token from storage (DB or memory)
 */
async function revokeRefreshToken(token) {
  try {
    if (prisma && prisma.refreshToken && typeof prisma.refreshToken.delete === 'function') {
      await prisma.refreshToken.delete({ where: { token } });
      return true;
    }
  } catch (err) {
    // ignore if not found or model missing; fallback below
  }
  if (refreshStore.has(token)) {
    refreshStore.delete(token);
    return true;
  }
  return false;
}

/**
 * Find refresh token record (DB or memory)
 */
async function findRefreshToken(token) {
  try {
    if (prisma && prisma.refreshToken && typeof prisma.refreshToken.findUnique === 'function') {
      const rec = await prisma.refreshToken.findUnique({ where: { token } });
      if (rec) return { userId: rec.userId, expiresAt: rec.expiresAt, persistedInDb: true };
    }
  } catch (err) {
    logger.warn('findRefreshToken: prisma lookup failed, falling back to memory', err);
  }

  const rec = refreshStore.get(token);
  if (rec) return { ...rec, persistedInDb: false };
  return null;
}

/**
 * Create or fetch user by email. Returns the user record object.
 * Expects Prisma user model fields: id, email, name, password, role, createdAt
 */
async function findUserByEmail(email) {
  if (!prisma || !prisma.user) {
    // In prototype without Prisma, throw an error — controller can catch and user can seed users manually.
    throw new AppError('Database client not available (prisma.user missing).', 500);
  }
  return prisma.user.findUnique({ where: { email } });
}

async function createUser(payload) {
  if (!prisma || !prisma.user) {
    throw new AppError('Database client not available (prisma.user missing).', 500);
  }
  const { name, email, password, role } = payload;
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      role: role || 'user',
    },
  });
}

/**
 * Public API
 */
const AuthService = {
  /**
   * Generate token for user (helper for signup)
   */
  generateTokenForUser(user) {
    return generateAccessToken(user);
  },

  /**
   * Signup: create a new user with hashed password.
   * payload: { name, email, password, role? }
   */
  async signup(payload) {
    const { email, password, name, role } = payload;
    if (!email || !password) throw new AppError('email and password required', 400);

    // Check existing user
    const existing = await prisma.user.findUnique({ where: { email } }).catch(() => null);
    if (existing) throw new AppError('User already exists with this email', 409);

    // Hash password
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
  },

  /**
   * Login: validate credentials and return { user, accessToken, refreshToken }
   */
  async login({ email, password }) {
    if (!email || !password) throw new AppError('email and password required', 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError('Invalid credentials', 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError('Invalid credentials', 401);

    // Sign tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    await persistRefreshToken(refreshToken, user.id);

    // strip password before returning user
    const { password: _p, ...safeUser } = user;

    return { user: safeUser, accessToken, refreshToken };
  },

  /**
   * Request OTP (for passwordless login or 2FA).
   * payload: { email } or { phone }
   */
  async requestOtp(payload) {
    const identifier = payload.email || payload.phone;
    if (!identifier) throw new AppError('email or phone required to request OTP', 400);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + (config.otp.expiryMinutes || 10) * 60 * 1000);
    otps.set(identifier, { otp, expiresAt });

    // Send OTP via email if email provided
    if (payload.email) {
      await sendEmail({
        to: payload.email,
        subject: 'Your StockMaster OTP',
        text: `Your OTP is: ${otp}. It expires at ${expiresAt.toISOString()}`,
      });
    } else {
      // For phone, you would integrate an SMS provider. For prototype we log it.
      logger.info(`OTP requested for ${identifier}: ${otp} (expires ${expiresAt.toISOString()})`);
    }

    return true;
  },

  /**
   * Verify OTP.
   * Input: { identifier, otp }
   * If valid: return tokens similar to login (and create user if not present?).
   * Current behaviour: if user exists, login; otherwise returns an error.
   */
  async verifyOtp({ identifier, otp }) {
    if (!identifier || !otp) throw new AppError('identifier and otp required', 400);

    const rec = otps.get(identifier);
    if (!rec) throw new AppError('No OTP requested for this identifier', 400);
    if (new Date() > rec.expiresAt) {
      otps.delete(identifier);
      throw new AppError('OTP expired', 400);
    }
    if (rec.otp !== String(otp)) throw new AppError('Invalid OTP', 401);

    // OTP is valid — clear it
    otps.delete(identifier);

    // Find user by email (identifier)
    const user = await prisma.user.findUnique({ where: { email: identifier } });
    if (!user) {
      // Option: auto-provision a user for passwordless flows
      // For now return a friendly error
      throw new AppError('No user found for this identifier', 404);
    }

    // Issue tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    await persistRefreshToken(refreshToken, user.id);

    const { password: _p, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
  },

  /**
   * Refresh access token using refresh token.
   * Returns new tokens or null.
   */
  async refreshToken(refreshToken) {
    if (!refreshToken) throw new AppError('refreshToken required', 400);

    const rec = await findRefreshToken(refreshToken);
    if (!rec) throw new AppError('Invalid refresh token', 401);

    if (new Date() > new Date(rec.expiresAt)) {
      // revoke if expired
      await revokeRefreshToken(refreshToken);
      throw new AppError('Refresh token expired', 401);
    }

    // Load user
    const user = await prisma.user.findUnique({ where: { id: Number(rec.userId) } });
    if (!user) {
      await revokeRefreshToken(refreshToken);
      throw new AppError('User not found for refresh token', 404);
    }

    // Issue new tokens (rotate refresh token)
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();
    await persistRefreshToken(newRefreshToken, user.id);
    // Revoke old refresh token
    await revokeRefreshToken(refreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  },

  /**
   * Logout: revoke refresh token (and optionally user sessions)
   * Accepts { refreshToken, userId }
   */
  async logout({ refreshToken, userId } = {}) {
    if (refreshToken) {
      await revokeRefreshToken(refreshToken);
    } else if (userId) {
      // Revoke all refresh tokens for a user (if DB supports)
      try {
        if (prisma && prisma.refreshToken && typeof prisma.refreshToken.deleteMany === 'function') {
          await prisma.refreshToken.deleteMany({ where: { userId: Number(userId) } });
          return true;
        }
      } catch (err) {
        logger.warn('logout: failed to delete tokens via prisma', err);
      }

      // Fallback: remove from in-memory store
      for (const [token, rec] of refreshStore.entries()) {
        if (rec.userId === Number(userId)) refreshStore.delete(token);
      }
    }
    return true;
  },

  /**
   * Request password reset: generate token, store in memory (or user.resetToken if prisma supports),
   * and email reset link.
   */
  async requestPasswordReset(email) {
    if (!email) throw new AppError('email required', 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError('No user found with that email', 404);

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Try to persist on user model if fields exist
    let persisted = false;
    try {
      if (prisma && prisma.user && typeof prisma.user.update === 'function') {
        // This assumes your Prisma User model has resetToken & resetTokenExpires fields
        await prisma.user.update({
          where: { id: user.id },
          data: { resetToken: token, resetTokenExpires: expiresAt },
        });
        persisted = true;
      }
    } catch (err) {
      logger.warn('requestPasswordReset: failed to persist on user model; using in-memory', err);
    }

    if (!persisted) {
      passwordResets.set(token, { userId: user.id, expiresAt });
    }

    // Send email with reset link (frontend URL should handle token)
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    await sendEmail({
      to: user.email,
      subject: 'StockMaster Password Reset',
      text: `Reset your password using this link: ${resetUrl}. Link expires at: ${expiresAt.toISOString()}`,
    });

    return true;
  },

  /**
   * Reset password using token
   * Input: { token, newPassword }
   */
  async resetPassword({ token, newPassword }) {
    if (!token || !newPassword) throw new AppError('token and newPassword required', 400);

    let rec = null;
    // Try user lookup by token in DB
    try {
      if (prisma && prisma.user && typeof prisma.user.findFirst === 'function') {
        const u = await prisma.user.findFirst({
          where: {
            resetToken: token,
            resetTokenExpires: { gt: new Date() },
          },
        });
        if (u) rec = { userId: u.id, persistedInDb: true };
      }
    } catch (err) {
      logger.warn('resetPassword: prisma findFirst failed; falling back to memory', err);
    }

    if (!rec) {
      const mem = passwordResets.get(token);
      if (!mem) throw new AppError('Invalid or expired token', 400);
      if (new Date() > mem.expiresAt) {
        passwordResets.delete(token);
        throw new AppError('Token expired', 400);
      }
      rec = { userId: mem.userId, persistedInDb: false };
    }

    // Update user's password
    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);

    try {
      await prisma.user.update({
        where: { id: Number(rec.userId) },
        data: {
          password: hashed,
          // clear reset token fields if they exist
          resetToken: null,
          resetTokenExpires: null,
        },
      });
    } catch (err) {
      logger.error('Failed to update user password', err);
      throw new AppError('Failed to reset password', 500);
    }

    // Clean up in-memory token
    if (!rec.persistedInDb) {
      passwordResets.delete(token);
    }

    // Optionally revoke user's refresh tokens
    try {
      if (prisma && prisma.refreshToken && typeof prisma.refreshToken.deleteMany === 'function') {
        await prisma.refreshToken.deleteMany({ where: { userId: Number(rec.userId) } });
      } else {
        // fallback: delete from memory store
        for (const [t, r] of refreshStore.entries()) {
          if (r.userId === Number(rec.userId)) refreshStore.delete(t);
        }
      }
    } catch (err) {
      logger.warn('resetPassword: failed to revoke refresh tokens', err);
    }

    return true;
  },
};

export default AuthService;
