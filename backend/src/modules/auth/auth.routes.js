// src/modules/auth/auth.routes.js
// Clean routing layer for Auth Module

import { Router } from 'express';
import controller from './auth.controller.js';

const router = Router();

/**
 * Route → Handler mapping
 * controller.<method> names must match what you export from the controller file.
 * (If you want, I can regenerate your controller with named exports.)
 */

// SIGNUP
router.post('/signup', controller.signup);

// LOGIN
router.post('/login', controller.login);

// REQUEST OTP
router.post('/request-otp', controller.requestOtp);

// VERIFY OTP
router.post('/verify-otp', controller.verifyOtp);

// REFRESH TOKEN
router.post('/refresh-token', controller.refreshToken);

// LOGOUT
router.post('/logout', controller.logout);

// REQUEST PASSWORD RESET
router.post('/request-password-reset', controller.requestPasswordReset);

// RESET PASSWORD
router.post('/reset-password', controller.resetPassword);

export default router;
