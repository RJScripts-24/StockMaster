// Source: /mnt/data/StockMaster.pdf
// modules/dashboard/dashboard.routes.js
// Registers dashboard routes and mounts the controller-level router.

const dashboardControllerRouter = require('./dashboard.controller');

// Optional auth middleware (adjust path as needed)
let authMiddleware;
try {
  authMiddleware = require('../../shared/middlewares/authMiddleware');
} catch (e) {
  authMiddleware = (req, res, next) => next(); // fallback no-op
}

/**
 * Register dashboard routes on the provided Express `app` instance.
 * @param {import('express').Application} app
 */
function registerDashboardRoutes(app) {
  const mw =
    typeof authMiddleware === 'function'
      ? authMiddleware
      : (authMiddleware && authMiddleware.authMiddleware) || ((req, res, next) => next());

  const express = require('express');
  const router = express.Router();

  // Apply auth middleware to all dashboard endpoints
  router.use(mw);

  // Delegate to controller router
  router.use('/', dashboardControllerRouter);

  // Mount at /api/dashboard
  app.use('/api/dashboard', router);
}

module.exports = { registerDashboardRoutes };
