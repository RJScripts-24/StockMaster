// src/jobs/reconcileStock.job.js
// Periodic job to reconcile ledger sums against stock table
// Reference spec: /mnt/data/StockMaster.pdf
// This job computes discrepancies between the ledger (summed changes) and the stock table
// and emits a report. Optionally it will persist a reconciliation report record if a
// `reconciliationReport` model/table exists in Prisma schema.

const fs = require('fs');
const path = require('path');
const { prisma } = require('../config/db');
const logger = require('../server/logger');

/**
 * Run a single reconciliation pass.
 *
 * Options:
 *  - productIds: optional array of product ids to limit the reconciliation
 *  - locationIds: optional array of location ids to limit the reconciliation
 *  - persist: boolean - if true, attempt to persist a reconciliation report record (if model exists)
 *  - outputPath: optional path to write a JSON report file
 */
async function runReconciliation({ productIds = null, locationIds = null, persist = false, outputPath = null } = {}) {
  logger.info('reconcileStock.job - starting reconciliation');

  // Build filters for queries
  const ledgerWhere = {};
  if (Array.isArray(productIds) && productIds.length) ledgerWhere.productId = { in: productIds.map(Number) };
  if (Array.isArray(locationIds) && locationIds.length) ledgerWhere.locationId = { in: locationIds.map(Number) };

  const stockWhere = {};
  if (Array.isArray(productIds) && productIds.length) stockWhere.productId = { in: productIds.map(Number) };
  if (Array.isArray(locationIds) && locationIds.length) stockWhere.locationId = { in: locationIds.map(Number) };

  // Aggregate ledger sums grouped by productId + locationId
  // Use Prisma groupBy if available; fallback to raw SQL if needed
  let ledgerGroups = [];
  try {
    ledgerGroups = await prisma.ledger.groupBy({
      by: ['productId', 'locationId'],
      _sum: { change: true },
      where: ledgerWhere,
    });
  } catch (err) {
    logger.warn('prisma.groupBy failed for ledger; falling back to raw SQL. Error: ' + err.message);
    // Fallback raw query (Postgres syntax)
    const whereClauses = [];
    const replacements = [];
    if (ledgerWhere.productId) {
      whereClauses.push(`\"productId\" IN (${ledgerWhere.productId.in.map((_, idx) => `$${replacements.push(ledgerWhere.productId.in[idx])}`)})`);
    }
    if (ledgerWhere.locationId) {
      whereClauses.push(`\"locationId\" IN (${ledgerWhere.locationId.in.map((_, idx) => `$${replacements.push(ledgerWhere.locationId.in[idx])}`)})`);
    }

    const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const raw = await prisma.$queryRawUnsafe(`
      SELECT "productId", "locationId", SUM("change") as "ledgerQty"
      FROM "Ledger"
      ${whereSQL}
      GROUP BY "productId", "locationId"
    `);
    // raw rows will look like [{ productId, locationId, ledgerQty }, ...]
    ledgerGroups = raw.map((r) => ({ productId: Number(r.productId), locationId: r.locationId === null ? null : Number(r.locationId), _sum: { change: Number(r.ledgerQty) } }));
  }

  // Fetch stock records
  const stocks = await prisma.stock.findMany({ where: stockWhere });

  // Build maps for easy lookup
  const ledgerMap = new Map();
  for (const g of ledgerGroups) {
    const pid = Number(g.productId);
    const lid = g.locationId === undefined ? null : (g.locationId === null ? null : Number(g.locationId));
    const key = `${pid}::${lid}`;
    const sum = (g._sum && g._sum.change) ? Number(g._sum.change) : 0;
    ledgerMap.set(key, sum);
  }

  const stockMap = new Map();
  for (const s of stocks) {
    const pid = Number(s.productId);
    const lid = s.locationId === undefined ? null : (s.locationId === null ? null : Number(s.locationId));
    const key = `${pid}::${lid}`;
    stockMap.set(key, Number(s.quantity || 0));
  }

  // Collect union of keys
  const keys = new Set([...ledgerMap.keys(), ...stockMap.keys()]);

  const discrepancies = [];
  for (const key of keys) {
    const [pidStr, lidStr] = key.split('::');
    const pid = Number(pidStr);
    const lid = lidStr === 'null' ? null : (lidStr ? Number(lidStr) : null);
    const ledgerQty = ledgerMap.has(key) ? Number(ledgerMap.get(key)) : 0;
    const stockQty = stockMap.has(key) ? Number(stockMap.get(key)) : 0;
    const delta = ledgerQty - stockQty;
    if (delta !== 0) {
      discrepancies.push({ productId: pid, locationId: lid, ledgerQty, stockQty, delta });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    totalProductsChecked: keys.size,
    discrepancyCount: discrepancies.length,
    discrepancies,
  };

  // Log summary
  logger.info(`reconcileStock.job - completed. checked=${report.totalProductsChecked} discrepancies=${report.discrepancyCount}`);

  // Optionally persist a reconciliation report record if your Prisma schema has a model
  if (persist) {
    try {
      // Try to write to a `reconciliationReport` model (id, generatedAt, summaryJson)
      if (prisma.reconciliationReport) {
        await prisma.reconciliationReport.create({ data: {
          generatedAt: new Date(),
          totalProductsChecked: report.totalProductsChecked,
          discrepancyCount: report.discrepancyCount,
          reportJson: JSON.stringify(report),
        } });
        logger.info('reconcileStock.job - persisted reconciliationReport');
      } else {
        logger.warn('reconcileStock.job - prisma.reconciliationReport model not found; skipping persistence');
      }
    } catch (err) {
      logger.error('reconcileStock.job - failed to persist reconciliationReport: ' + err.message);
    }
  }

  // Optionally write report to disk
  if (outputPath) {
    try {
      const outDir = path.dirname(outputPath);
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf8');
      logger.info('reconcileStock.job - wrote report to ' + outputPath);
    } catch (err) {
      logger.warn('reconcileStock.job - failed to write report file: ' + err.message);
    }
  }

  return report;
}

/**
 * Convenience helper to schedule reconciliation at an interval.
 * This function returns an object with a `stop()` method to cancel the schedule.
 *
 * Example:
 * const job = schedule({ intervalMs: 1000 * 60 * 60, persist: true });
 * // later: job.stop();
 */
function schedule({ intervalMs = 1000 * 60 * 60, productIds = null, locationIds = null, persist = false, outputDir = null } = {}) {
  const outputPath = outputDir ? path.join(outputDir, `reconciliation-${Date.now()}.json`) : null;
  logger.info('reconcileStock.job - scheduling reconciliation every ' + intervalMs + 'ms');

  const handle = setInterval(async () => {
    try {
      const rpt = await runReconciliation({ productIds, locationIds, persist, outputPath });
      // Optionally, you could notify via email/slack here by integrating notifier
      if (rpt.discrepancyCount > 0) {
        logger.warn(`reconcileStock.job - found ${rpt.discrepancyCount} discrepancies`);
      }
    } catch (err) {
      logger.error('reconcileStock.job - scheduled run failed: ' + (err.message || err));
    }
  }, intervalMs);

  return {
    stop: () => clearInterval(handle),
  };
}

module.exports = { runReconciliation, schedule };
