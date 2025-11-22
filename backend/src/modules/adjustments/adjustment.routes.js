// Source: /mnt/data/StockMaster.pdf
// modules/adjustments/adjustment.routes.js
// Registers routes for adjustments module and mounts controller-level router.

const adjustmentsControllerRouter = require('./adjustment.controller');

// Optional auth middleware (adjust path as per your project layout)
let authMiddleware;
try {
  authMiddleware = require('../../shared/middlewares/authMiddleware');
} catch (e) {
  authMiddleware = (req, res, next) => next();
}

/**
 * Register adjustment routes on the provided Express `app` instance.
 * @param {import('express').Application} app
 */
function registerAdjustmentRoutes(app) {
  const mw = (typeof authMiddleware === 'function') ? authMiddleware : (authMiddleware && authMiddleware.authMiddleware) || ((req, res, next) => next());

  const express = require('express');
  const router = express.Router();

  // Apply auth middleware to all adjustment endpoints
  router.use(mw);

  // Delegate to controller router
  router.use('/', adjustmentsControllerRouter);

  // Mount at /api/adjustments
  app.use('/api/adjustments', router);
}

module.exports = { registerAdjustmentRoutes };
