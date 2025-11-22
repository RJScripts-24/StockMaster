// src/jobs/lowStockAlert.job.js
// Periodic job to detect low-stock items and send alerts.
// Reference spec: /mnt/data/StockMaster.pdf
//
// Behavior:
//  - Aggregates stock quantities per product (optionally scoped to warehouse or locations)
//  - Finds products with total quantity <= threshold
//  - Sends alerts via a provided notifier (callback) or logs them
//  - Optionally persists alert records if a `lowStockAlert` model exists in Prisma schema
//
// Usage examples:
// const job = require('./src/jobs/lowStockAlert.job');
// await job.runLowStockAlert({ threshold: 5, warehouseIds: [1], notify: true });
// const scheduler = job.schedule({ intervalMs: 1000*60*30, threshold: 10, notify: true });

const { prisma } = require('../config/db');
const logger = require('../server/logger');
const path = require('path');
const fs = require('fs');

/**
 * Default notifier: logs to console / logger. If you want email/Slack, pass a notifier with `.send(AlertPayload)` method.
 * @param {Array} alerts
 */
async function defaultNotifier(alerts) {
  if (!Array.isArray(alerts) || alerts.length === 0) return;
  for (const a of alerts) {
    logger.warn(`LOW_STOCK ALERT: productId=${a.productId} sku=${a.productSku} name=${a.productName} qty=${a.totalQuantity} threshold=${a.threshold}`);
  }
}

/**
 * Run a single low-stock alert pass.
 * Options:
 *  - threshold (number): items with totalQuantity <= threshold will be flagged. Required.
 *  - warehouseIds (array|null): optional array to scope to warehouses
 *  - locationIds (array|null): optional array to scope to locations
 *  - limit: limit number of results returned
 *  - notify: boolean - whether to call notifier
 *  - notifier: function or object with `send(alerts)` to handle alert delivery
 *  - persist: boolean - whether to persist alerts in DB (if model exists)
 *  - outputPath: optional path to write a JSON report
 */
async function runLowStockAlert({ threshold = 10, warehouseIds = null, locationIds = null, limit = 100, notify = true, notifier = null, persist = false, outputPath = null } = {}) {
  if (!threshold && threshold !== 0) throw new Error('threshold is required');

  logger.info(`lowStockAlert.job - running check (threshold=${threshold})`);

  // Build where clause for stock grouping
  const where = {};
  if (Array.isArray(warehouseIds) && warehouseIds.length) where.warehouseId = { in: warehouseIds.map(Number) };
  if (Array.isArray(locationIds) && locationIds.length) where.locationId = { in: locationIds.map(Number) };

  // Aggregate stock quantities by productId
  let groups = [];
  try {
    groups = await prisma.stock.groupBy({
      by: ['productId'],
      where,
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'asc' } },
      take: Number(limit || 100),
    });
  } catch (err) {
    logger.warn('prisma.groupBy failed for stock; falling back to manual aggregation. Error: ' + err.message);
    // fallback: fetch stocks and aggregate in JS
    const stocks = await prisma.stock.findMany({ where });
    const map = new Map();
    for (const s of stocks) {
      const pid = Number(s.productId);
      map.set(pid, (map.get(pid) || 0) + Number(s.quantity || 0));
    }
    groups = Array.from(map.entries()).map(([productId, sum]) => ({ productId, _sum: { quantity: sum } }));
    groups.sort((a, b) => (a._sum.quantity - b._sum.quantity));
    if (limit) groups = groups.slice(0, limit);
  }

  // Filter by threshold
  const low = groups.filter((g) => (g._sum && Number(g._sum.quantity || 0) <= Number(threshold))).map((g) => ({ productId: Number(g.productId), totalQuantity: Number(g._sum.quantity || 0) }));

  if (low.length === 0) {
    logger.info('lowStockAlert.job - no low stock items found');
    return { generatedAt: new Date().toISOString(), threshold, count: 0, alerts: [] };
  }

  // Fetch product details for alerts
  const productIds = low.map((l) => l.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const prodMap = new Map(products.map((p) => [p.id, p]));

  // Build alerts payload
  const alerts = low.map((l) => {
    const p = prodMap.get(l.productId) || {};
    return {
      productId: l.productId,
      productSku: p.sku || null,
      productName: p.name || null,
      totalQuantity: l.totalQuantity,
      threshold: Number(threshold),
      warehouseIds: warehouseIds || null,
      locationIds: locationIds || null,
    };
  });

  // Notify
  if (notify) {
    try {
      if (notifier) {
        // support both function and object with send()
        if (typeof notifier === 'function') await notifier(alerts);
        else if (typeof notifier.send === 'function') await notifier.send(alerts);
        else await defaultNotifier(alerts);
      } else {
        await defaultNotifier(alerts);
      }
    } catch (err) {
      logger.error('lowStockAlert.job - notifier failed: ' + (err.message || err));
    }
  }

  // Optionally persist alerts
  if (persist) {
    try {
      if (prisma.lowStockAlert) {
        const created = await prisma.lowStockAlert.createMany({ data: alerts.map((a) => ({ productId: a.productId, sku: a.productSku, name: a.productName, quantity: a.totalQuantity, threshold: a.threshold, createdAt: new Date() })) });
        logger.info('lowStockAlert.job - persisted alerts count=' + (created.count || created));
      } else {
        logger.warn('lowStockAlert.job - prisma.lowStockAlert model not found; skipping persistence');
      }
    } catch (err) {
      logger.error('lowStockAlert.job - failed to persist alerts: ' + err.message);
    }
  }

  const report = { generatedAt: new Date().toISOString(), threshold: Number(threshold), count: alerts.length, alerts };

  // Optionally write to disk
  if (outputPath) {
    try {
      const outDir = path.dirname(outputPath);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');
      logger.info('lowStockAlert.job - wrote report to ' + outputPath);
    } catch (err) {
      logger.warn('lowStockAlert.job - failed to write report file: ' + err.message);
    }
  }

  return report;
}

/**
 * Schedule the low stock alert job at an interval.
 * Returns an object with stop() to cancel the interval.
 */
function schedule({ intervalMs = 1000 * 60 * 30, threshold = 10, warehouseIds = null, locationIds = null, limit = 100, notify = true, notifier = null, persist = false, outputDir = null } = {}) {
  const outputPath = outputDir ? path.join(outputDir, `lowstock-${Date.now()}.json`) : null;
  logger.info('lowStockAlert.job - scheduling low stock alert every ' + intervalMs + 'ms (threshold=' + threshold + ')');

  const handle = setInterval(async () => {
    try {
      const rpt = await runLowStockAlert({ threshold, warehouseIds, locationIds, limit, notify, notifier, persist, outputPath });
      if (rpt.count > 0) logger.warn('lowStockAlert.job - found ' + rpt.count + ' low-stock items');
    } catch (err) {
      logger.error('lowStockAlert.job - scheduled run failed: ' + (err.message || err));
    }
  }, intervalMs);

  return { stop: () => clearInterval(handle) };
}

module.exports = { runLowStockAlert, schedule };
