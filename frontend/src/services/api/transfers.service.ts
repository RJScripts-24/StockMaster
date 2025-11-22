import { apiClient } from './client';
import { Transfer, CreateTransferRequest, PaginatedResponse, PaginationParams } from '../../types';

export const transfersService = {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Transfer>> {
    return await apiClient.get<PaginatedResponse<Transfer>>('/transfers', params);
  },

  async getById(id: number): Promise<Transfer> {
    return await apiClient.get<Transfer>(`/transfers/${id}`);
  },

  async create(data: CreateTransferRequest): Promise<Transfer> {
    return await apiClient.post<Transfer>('/transfers', data);
  },

  async complete(id: number): Promise<Transfer> {
    return await apiClient.post<Transfer>(`/transfers/${id}/complete`);
  },

  async cancel(id: number): Promise<Transfer> {
    return await apiClient.post<Transfer>(`/transfers/${id}/cancel`);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/transfers/${id}`);
  },
};
