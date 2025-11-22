import { apiClient } from './client';
import { LedgerEntry, PaginatedResponse, PaginationParams } from '../../types';

export const ledgerService = {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<LedgerEntry>> {
    return await apiClient.get<PaginatedResponse<LedgerEntry>>('/ledger', params);
  },

  async getByProduct(productId: number, params?: PaginationParams): Promise<PaginatedResponse<LedgerEntry>> {
    return await apiClient.get<PaginatedResponse<LedgerEntry>>(`/ledger/product/${productId}`, params);
  },

  async getByLocation(locationId: number, params?: PaginationParams): Promise<PaginatedResponse<LedgerEntry>> {
    return await apiClient.get<PaginatedResponse<LedgerEntry>>(`/ledger/location/${locationId}`, params);
  },
};
