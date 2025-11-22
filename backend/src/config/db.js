// src/config/db.js
// Prisma client wrapper + connect/disconnect helpers for StockMaster backend

import { PrismaClient } from '@prisma/client';
import config from './index.js';
import logger from '../server/logger.js';

const prismaOptions = {};

// Enable Prisma query logging if configured
if (config.db.prismaLog) {
  prismaOptions.log = [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ];
}

// Prevent multiple instances in development (hot reload)
let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaOptions);
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient(prismaOptions);
  }
  prisma = global.__prisma;
}

// Attach query event logging if enabled
if (config.db.prismaLog && prisma.$on) {
  prisma.$on('query', (e) => {
    // Do not log full SQL in prod unless explicitly desired
    logger.info(`Prisma Query: ${e.query} — params: ${e.params} — duration: ${e.duration}ms`);
  });

  prisma.$on('info', (e) => logger.info(`Prisma Info: ${e.message}`));
  prisma.$on('warn', (e) => logger.warn(`Prisma Warn: ${e.message}`));
  prisma.$on('error', (e) => logger.error(`Prisma Error: ${e.message}`));
}

/**
 * Connect to the database.
 * Call this at app startup. Prisma connects lazily but calling connect
 * makes failures visible early.
 */
export async function connectDB() {
  try {
    // Forcibly connect (Prisma >=2.13 supports $connect)
    if (prisma.$connect) {
      await prisma.$connect();
    }
    logger.info('Database connection established');
    return prisma;
  } catch (err) {
    logger.error('Failed to connect to database', err);
    throw err;
  }
}

/**
 * Disconnect from the database.
 * Call this on graceful shutdown.
 */
export async function disconnectDB() {
  try {
    if (prisma.$disconnect) {
      await prisma.$disconnect();
    }
    logger.info('Database connection closed');
  } catch (err) {
    logger.error('Error while disconnecting database', err);
  }
}

/**
 * Helper to run a transaction with optional retry on transient failures.
 * Uses Prisma's $transaction. Retries are useful for serialization errors.
 *
 * @param {function(prisma: PrismaClient): Promise<any>} fn
 * @param {object} options
 * @param {number} [options.retries=2] number of retry attempts
 */
export async function runTransaction(fn, options = {}) {
  const retries = typeof options.retries === 'number' ? options.retries : 2;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Prisma $transaction supports passing an async callback
      return await prisma.$transaction(async (tx) => {
        return await fn(tx);
      });
    } catch (err) {
      // If last attempt, rethrow
      const isLast = attempt === retries;

      // Simple detection for transient DB errors (Postgres serialization/failure)
      const transient =
        err &&
        (err.code === 'P2034' || // example Prisma-specific codes (varies)
          err.code === '40001' || // Postgres serialization_failure
          err.code === '57014' || // query_canceled
          /deadlock detected/i.test(err.message || '') ||
          /serialization/i.test(err.message || ''));

      logger.warn(
        `Transaction attempt ${attempt + 1} failed${transient ? ' (transient?)' : ''}: ${err.message}`
      );

      if (!transient || isLast) {
        // Not transient or out of retries => rethrow
        throw err;
      }

      // Backoff before retrying
      const backoff = 100 * Math.pow(2, attempt); // 100ms, 200ms, 400ms...
      await new Promise((res) => setTimeout(res, backoff));
    }
  }
}

/**
 * Expose the Prisma client for direct use.
 * Example: const { prisma } = require('...'); await prisma.user.findMany()
 */
export default prisma;
export { prisma };
