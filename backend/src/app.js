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
import { registerTransferRoutes } from './modules/transfers/transfer.routes.js';
import { registerAdjustmentRoutes } from './modules/adjustments/adjustment.routes.js';
import { registerLedgerRoutes } from './modules/ledger/ledger.routes.js';
import { registerDashboardRoutes } from './modules/dashboard/dashboard.routes.js';

// OTP Auth router (new)
import otpAuthRouter from './routes/auth.js';


const app = express();

// Core middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('dev'));
app.use(requestLogger);

// Mount OTP-based auth routes at /api/auth
app.use('/api/auth', otpAuthRouter);


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

// Register modules that use register*Routes pattern
registerTransferRoutes(app);
registerAdjustmentRoutes(app);
registerLedgerRoutes(app);
registerDashboardRoutes(app);

// Error handler (must be last)
app.use(errorHandler);

export default app;
