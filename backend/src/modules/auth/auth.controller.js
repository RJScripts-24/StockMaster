// src/modules/auth/auth.controller.js
// Express router for authentication endpoints (JavaScript)
// Delegates heavy lifting to auth.service.js — keep controllers thin.

import { Router } from 'express';
import AppError from '../../server/appError.js';
import logger from '../../server/logger.js';
import AuthService from './auth.service.js'; // expected to export functions used below

const router = Router();

/**
 * Standard success response helper
 */
function success(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    status: 'success',
    ...data,
  });
}

/**
 * POST /api/auth/signup
 * Body: { name, email, password, role? }
 */
router.post('/signup', async (req, res, next) => {
  try {
    const payload = req.body;
    // Basic validation (service should do full validation)
    if (!payload.email || !payload.password) {
      throw new AppError('Email and password are required', 400);
    }

    const user = await AuthService.signup(payload);

    // Do not return sensitive fields
    const { password, ...safeUser } = user;

    logger.info(`User signed up: ${safeUser.email}`);
    return success(res, { data: { user: safeUser } }, 201);
  } catch (err) {
    logger.error('Signup failed', err);
    return next(err);
  }
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { user, accessToken, refreshToken }
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const result = await AuthService.login({ email, password });
    // expected result: { user, accessToken, refreshToken }
    if (!result) {
      throw new AppError('Invalid credentials', 401);
    }

    logger.info(`User logged in: ${email}`);
    return success(res, { data: result }, 200);
  } catch (err) {
    logger.error('Login error', err);
    return next(err);
  }
});

/**
 * POST /api/auth/request-otp
 * Body: { email or phone }
 * For passwordless login / 2FA
 */
router.post('/request-otp', async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.email && !payload.phone) {
      throw new AppError('email or phone is required to request OTP', 400);
    }

    await AuthService.requestOtp(payload);
    return success(res, { message: 'OTP requested' }, 200);
  } catch (err) {
    logger.error('Request OTP failed', err);
    return next(err);
  }
});

/**
 * POST /api/auth/verify-otp
 * Body: { emailOrPhone, otp }
 */
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { identifier, otp } = req.body; // identifier can be email or phone
    if (!identifier || !otp) {
      throw new AppError('identifier and otp are required', 400);
    }

    const result = await AuthService.verifyOtp({ identifier, otp });
    // expected result could be { user, accessToken, refreshToken } or a boolean
    if (!result) {
      throw new AppError('Invalid or expired OTP', 401);
    }

    return success(res, { data: result }, 200);
  } catch (err) {
    logger.error('Verify OTP failed', err);
    return next(err);
  }
});

/**
 * POST /api/auth/refresh-token
 * Body: { refreshToken }
 * Returns new accessToken (+ optionally new refreshToken)
 */
router.post('/refresh-token', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new AppError('refreshToken is required', 400);
    }

    const tokens = await AuthService.refreshToken(refreshToken);
    if (!tokens) throw new AppError('Invalid refresh token', 401);

    return success(res, { data: tokens }, 200);
  } catch (err) {
    logger.error('Refresh token failed', err);
    return next(err);
  }
});

/**
 * POST /api/auth/logout
 * Body: { refreshToken } (optional)
 * Invalidate refresh token server-side (if you store them)
 */
router.post('/logout', async (req, res, next) => {
  try {
    const { refreshToken, userId } = req.body;
    await AuthService.logout({ refreshToken, userId });
    return success(res, { message: 'Logged out' }, 200);
  } catch (err) {
    logger.error('Logout failed', err);
    return next(err);
  }
});

/**
 * POST /api/auth/request-password-reset
 * Body: { email }
 * Sends reset token/link to email
 */
router.post('/request-password-reset', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new AppError('email is required', 400);

    await AuthService.requestPasswordReset(email);
    return success(res, { message: 'Password reset requested' }, 200);
  } catch (err) {
    logger.error('Request password reset failed', err);
    return next(err);
  }
});

/**
 * POST /api/auth/reset-password
 * Body: { token, newPassword }
 */
router.post('/reset-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      throw new AppError('token and newPassword are required', 400);
    }

    await AuthService.resetPassword({ token, newPassword });
    return success(res, { message: 'Password reset successful' }, 200);
  } catch (err) {
    logger.error('Reset password failed', err);
    return next(err);
  }
});

export default router;
