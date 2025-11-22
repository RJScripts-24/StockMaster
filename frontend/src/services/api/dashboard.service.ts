import { apiClient } from './client';
import { DashboardStats, StockLevel } from '../../types';

export const dashboardService = {
  /**
   * Get dashboard statistics
   * GET /api/dashboard/stats
   */
  async getStats(): Promise<DashboardStats> {
    return await apiClient.get<DashboardStats>('/dashboard/stats');
  },

  /**
   * Get stock levels
   * GET /api/dashboard/stock-levels
   */
  async getStockLevels(): Promise<StockLevel[]> {
    return await apiClient.get<StockLevel[]>('/dashboard/stock-levels');
  },

  /**
   * Get low stock products
   * GET /api/dashboard/low-stock
   */
  async getLowStock(): Promise<StockLevel[]> {
    return await apiClient.get<StockLevel[]>('/dashboard/low-stock');
  },
};
