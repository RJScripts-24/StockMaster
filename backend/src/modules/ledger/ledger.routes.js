// Source: /mnt/data/StockMaster.pdf
// modules/ledger/ledger.routes.js
// Registers ledger routes and mounts the controller-level router.

const ledgerControllerRouter = require('./ledger.controller');

// Optional auth middleware (adjust path as needed)
let authMiddleware;
try {
  authMiddleware = require('../../shared/middlewares/authMiddleware');
} catch (e) {
  authMiddleware = (req, res, next) => next(); // fallback no-op
}

/**
 * Register ledger routes on the provided Express `app` instance.
 * @param {import('express').Application} app
 */
function registerLedgerRoutes(app) {
  const mw =
    typeof authMiddleware === 'function'
      ? authMiddleware
      : (authMiddleware && authMiddleware.authMiddleware) || ((req, res, next) => next());

  const express = require('express');
  const router = express.Router();

  // Apply auth middleware to all ledger endpoints
  router.use(mw);

  // Delegate to the ledger controller router
  router.use('/', ledgerControllerRouter);

  // Mount at /api/ledger
  app.use('/api/ledger', router);
}

module.exports = { registerLedgerRoutes };
