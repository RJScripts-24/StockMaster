// Source/Spec: /mnt/data/StockMaster.pdf
// modules/dashboard/dashboard.controller.js
// Controller for dashboard endpoints (KPIs, snapshots, filters)

const express = require('express');
const router = express.Router();

// Services (assumed to exist)
const productService = require('../../modules/products/product.service');
const ledgerService = require('../../modules/ledger/ledger.service');
const receiptService = require('../../modules/receipts/receipt.service');
const deliveryService = require('../../modules/deliveries/delivery.service');
const transferService = require('../../modules/transfers/transfer.service');

// Response helpers
function sendSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}
function sendError(next, err) {
  return next(err);
}

/**
 * GET /api/dashboard
 * Returns a dashboard snapshot including core KPIs and quick lists
 * Query params (optional): warehouseId, categoryId, lowStockThreshold
 */
async function getDashboardSnapshot(req, res, next) {
  try {
    const warehouseId = req.query.warehouseId ? Number(req.query.warehouseId) : null;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;
    const lowStockThreshold = req.query.lowStockThreshold ? Number(req.query.lowStockThreshold) : 10;

    // Total products in stock (optionally scoped to warehouse)
    const totalProducts = await productService.countProductsInStock({ warehouseId, categoryId });

    // Low stock items
    const lowStockItems = await productService.listLowStockItems({ warehouseId, categoryId, threshold: lowStockThreshold, limit: 10 });

    // Pending receipts
    const pendingReceipts = await receiptService.countReceiptsByStatus('PENDING', { warehouseId });

    // Pending deliveries
    const pendingDeliveries = await deliveryService.countDeliveriesByStatus('PENDING', { warehouseId });

    // Internal transfers scheduled
    const scheduledTransfers = await transferService.countTransfersByStatus('SCHEDULED', { warehouseId });

    const snapshot = {
      kpis: {
        totalProducts,
        lowStockCount: Array.isArray(lowStockItems) ? lowStockItems.length : 0,
        pendingReceipts,
        pendingDeliveries,
        scheduledTransfers,
      },
      lists: {
        lowStockItems,
      },
    };

    return sendSuccess(res, snapshot);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/dashboard/kpis
 * Returns only the KPI numbers (useful for small widgets)
 */
async function getKPIs(req, res, next) {
  try {
    const warehouseId = req.query.warehouseId ? Number(req.query.warehouseId) : null;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;

    const totalProducts = await productService.countProductsInStock({ warehouseId, categoryId });
    const lowStockCount = await productService.countLowStockItems({ warehouseId, categoryId });
    const pendingReceipts = await receiptService.countReceiptsByStatus('PENDING', { warehouseId });
    const pendingDeliveries = await deliveryService.countDeliveriesByStatus('PENDING', { warehouseId });
    const scheduledTransfers = await transferService.countTransfersByStatus('SCHEDULED', { warehouseId });

    return sendSuccess(res, { totalProducts, lowStockCount, pendingReceipts, pendingDeliveries, scheduledTransfers });
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/dashboard/stock-history
 * Returns recent ledger changes (default last 30 entries) for charting
 * Query params: limit
 */
async function getStockHistory(req, res, next) {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 30;
    const filters = {};
    if (req.query.productId) filters.productId = Number(req.query.productId);
    if (req.query.locationId) filters.locationId = Number(req.query.locationId);
    if (req.query.dateFrom) filters.dateFrom = req.query.dateFrom;
    if (req.query.dateTo) filters.dateTo = req.query.dateTo;

    const entries = await ledgerService.listLedgerEntries(filters, { page: 1, limit });
    // entries.items is expected
    return sendSuccess(res, entries.items || []);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/dashboard/recent-movements
 * Returns a combined recent activity feed from receipts, deliveries, transfers, adjustments
 */
async function getRecentMovements(req, res, next) {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const warehouseId = req.query.warehouseId ? Number(req.query.warehouseId) : null;

    // Fetch recent items from different services in parallel
    const [recentReceipts, recentDeliveries, recentTransfers] = await Promise.all([
      receiptService.listRecentReceipts({ warehouseId, limit: Math.ceil(limit / 3) }),
      deliveryService.listRecentDeliveries({ warehouseId, limit: Math.ceil(limit / 3) }),
      transferService.listRecentTransfers({ warehouseId, limit: Math.ceil(limit / 3) }),
    ]);

    // Normalize and merge
    const normalized = [];
    (recentReceipts || []).forEach((r) => normalized.push({ type: 'RECEIPT', ts: r.createdAt, payload: r }));
    (recentDeliveries || []).forEach((d) => normalized.push({ type: 'DELIVERY', ts: d.createdAt, payload: d }));
    (recentTransfers || []).forEach((t) => normalized.push({ type: 'TRANSFER', ts: t.createdAt, payload: t }));

    normalized.sort((a, b) => new Date(b.ts) - new Date(a.ts));

    return sendSuccess(res, normalized.slice(0, limit));
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/dashboard/stats
 * Returns dashboard statistics matching frontend DashboardStats interface
 * Expected format: { totalProducts, totalWarehouses, totalLocations, lowStockProducts, recentReceipts, recentDeliveries, recentTransfers }
 */
async function getStats(req, res, next) {
  try {
    const { prisma } = require('../../config/db');
    
    // Count total products
    const totalProducts = await prisma.product.count();
    
    // Count total warehouses
    const totalWarehouses = await prisma.warehouse.count();
    
    // Count total inventory locations (unique product-warehouse combinations)
    const totalLocations = await prisma.inventory.count();
    
    // Count low stock products (inventory with quantity <= 10)
    const lowStockProducts = await prisma.inventory.count({
      where: {
        quantity: {
          lte: 10
        }
      }
    });
    
    // Count recent receipts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentReceipts = await prisma.receipt.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });
    
    // Count recent deliveries (last 7 days)
    const recentDeliveries = await prisma.delivery.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });
    
    // Count recent transfers (last 7 days)
    const recentTransfers = await prisma.transfer.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });
    
    const stats = {
      totalProducts,
      totalWarehouses,
      totalLocations,
      lowStockProducts,
      recentReceipts,
      recentDeliveries,
      recentTransfers
    };
    
    return res.status(200).json(stats);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/dashboard/stock-levels
 * Returns current stock levels across all locations
 */
async function getStockLevels(req, res, next) {
  try {
    const { prisma } = require('../../config/db');
    
    const stockLevels = await prisma.inventory.findMany({
      include: {
        product: true,
        warehouse: true
      },
      orderBy: {
        quantity: 'desc'
      }
    });
    
    return res.status(200).json(stockLevels);
  } catch (err) {
    return sendError(next, err);
  }
}

/**
 * GET /api/dashboard/low-stock
 * Returns products with low stock levels (below reorder point)
 */
async function getLowStock(req, res, next) {
  try {
    const { prisma } = require('../../config/db');
    
    // Get all inventory with low stock (quantity <= 10)
    const lowStock = await prisma.inventory.findMany({
      where: {
        quantity: {
          lte: 10
        }
      },
      include: {
        product: true,
        warehouse: true
      },
      orderBy: {
        quantity: 'asc'
      }
    });
    
    return res.status(200).json(lowStock);
  } catch (err) {
    return sendError(next, err);
  }
}

// Routes
router.get('/', getDashboardSnapshot);
router.get('/kpis', getKPIs);
router.get('/stock-history', getStockHistory);
router.get('/recent-movements', getRecentMovements);
router.get('/stats', getStats);
router.get('/stock-levels', getStockLevels);
router.get('/low-stock', getLowStock);

module.exports = router;