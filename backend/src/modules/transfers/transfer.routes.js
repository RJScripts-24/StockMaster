// Source/Spec: /mnt/data/StockMaster.pdf
// modules/transfers/transfer.routes.js
// Registers routes for transfer module and mounts controller-level router.

/**
 * This file exports a single function `registerTransferRoutes(app)` which
 * mounts the transfers router at `/api/transfers` and applies optional
 * middlewares (e.g. authentication).
 *
 * It expects `modules/transfers/transfer.controller.js` to export an Express
 * Router (which we generated earlier).
 */

const path = require('path');
const transfersControllerRouter = require('./transfer.controller');

// Optional auth middleware (adjust path as per your project layout)
let authMiddleware;
try {
  // prefer named export if using CommonJS wrapper
  authMiddleware = require('../../shared/middlewares/authMiddleware');
} catch (e) {
  // fallback: no-op middleware if not present yet
  authMiddleware = (req, res, next) => next();
}

/**
 * Register transfer routes on the provided Express `app` instance.
 * @param {import('express').Application} app
 */
function registerTransferRoutes(app) {
  // Mount controller router with auth middleware applied to all transfer endpoints
  // If your auth middleware exports an object (e.g. { authMiddleware }) adjust accordingly.
  const mw = (typeof authMiddleware === 'function') ? authMiddleware : (authMiddleware && authMiddleware.authMiddleware) || ((req, res, next) => next());

  // Create a router to apply middleware then delegate to controller router
  const express = require('express');
  const router = express.Router();

  // Apply auth to all transfer endpoints
  router.use(mw);

  // Delegate to controller router which contains route handlers
  router.use('/', transfersControllerRouter);

  // Mount at /api/transfers
  app.use('/api/transfers', router);
}

module.exports = { registerTransferRoutes };
