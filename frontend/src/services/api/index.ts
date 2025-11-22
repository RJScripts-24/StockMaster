/**
 * API Services Index
 * 
 * This file exports all API services matching the backend module structure.
 * Each service corresponds to a backend module and provides methods for
 * interacting with the respective API endpoints.
 * 
 * Backend Structure:
 * - /modules/auth -> authService
 * - /modules/products -> productsService
 * - /modules/warehouses -> warehousesService
 * - /modules/receipts -> receiptsService
 * - /modules/deliveries -> deliveriesService
 * - /modules/transfers -> transfersService
 * - /modules/adjustments -> adjustmentsService
 * - /modules/dashboard -> dashboardService
 * - /modules/ledger -> ledgerService
 * - /modules/users -> usersService
 */

export { authService } from './auth.service';
export { productsService } from './products.service';
export { warehousesService } from './warehouses.service';
export { receiptsService } from './receipts.service';
export { deliveriesService } from './deliveries.service';
export { transfersService } from './transfers.service';
export { adjustmentsService } from './adjustments.service';
export { dashboardService } from './dashboard.service';
export { ledgerService } from './ledger.service';
export { usersService } from './users.service';

// Export client utilities
export { apiClient, setAuthToken, getAuthToken, clearAuthToken } from './client';

// Export types
export * from '../../types';
