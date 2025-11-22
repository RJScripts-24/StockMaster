// src/modules/auth/auth.routes.js
// Clean routing layer for Auth Module

import { Router } from 'express';
import {
	signup,
	login,
	requestOtp,
	verifyOtp,
	refreshToken,
	logout,
	requestPasswordReset,
	resetPassword,
	getCurrentUser
} from './auth.controller.js';
import authMiddleware from '../../shared/middlewares/authMiddleware.js';

const router = Router();

/**
 * Route → Handler mapping
 * controller.<method> names must match what you export from the controller file.
 * (If you want, I can regenerate your controller with named exports.)
 */

// SIGNUP / REGISTER (both routes point to same handler)
router.post('/signup', signup);
router.post('/register', signup);  // Alias for signup

// LOGIN
router.post('/login', login);

// REQUEST OTP
router.post('/request-otp', requestOtp);

// VERIFY OTP
router.post('/verify-otp', verifyOtp);

// REFRESH TOKEN
router.post('/refresh-token', refreshToken);

// LOGOUT
router.post('/logout', logout);

// REQUEST PASSWORD RESET
router.post('/request-password-reset', requestPasswordReset);

// RESET PASSWORD
router.post('/reset-password', resetPassword);

// GET CURRENT USER (protected route)
router.get('/me', authMiddleware, getCurrentUser);

export default router;
