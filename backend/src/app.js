// src/app.js
// Express application setup (JavaScript version)

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from './shared/middlewares/errorHandler.js';
import { requestLogger } from './shared/middlewares/requestLogger.js';

// Import all module routes
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import productRoutes from './modules/products/product.routes.js';
import warehouseRoutes from './modules/warehouses/warehouse.routes.js';
import receiptRoutes from './modules/receipts/receipt.routes.js';
import deliveryRoutes from './modules/deliveries/delivery.routes.js';
import transferRoutes from './modules/transfers/transfer.routes.js';
import adjustmentRoutes from './modules/adjustments/adjustment.routes.js';
import ledgerRoutes from './modules/ledger/ledger.controller.js'; // if using controller as router
import dashboardRoutes from './modules/dashboard/dashboard.routes.js'; // if exists

const app = express();

// Core middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));
app.use(requestLogger);

// API base route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'StockMaster Backend API',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/adjustments', adjustmentRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
