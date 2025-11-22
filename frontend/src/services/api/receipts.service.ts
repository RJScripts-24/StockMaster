import { apiClient } from './client';
import { Receipt, CreateReceiptRequest, PaginatedResponse, PaginationParams } from '../../types';

export const receiptsService = {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Receipt>> {
    return await apiClient.get<PaginatedResponse<Receipt>>('/receipts', params);
  },

  async getById(id: number): Promise<Receipt> {
    return await apiClient.get<Receipt>(`/receipts/${id}`);
  },

  async create(data: CreateReceiptRequest): Promise<Receipt> {
    return await apiClient.post<Receipt>('/receipts', data);
  },

  async update(id: number, data: Partial<CreateReceiptRequest>): Promise<Receipt> {
    return await apiClient.put<Receipt>(`/receipts/${id}`, data);
  },

  async complete(id: number): Promise<Receipt> {
    return await apiClient.post<Receipt>(`/receipts/${id}/complete`);
  },

  async cancel(id: number): Promise<Receipt> {
    return await apiClient.post<Receipt>(`/receipts/${id}/cancel`);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/receipts/${id}`);
  },
};
