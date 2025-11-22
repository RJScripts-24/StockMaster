import { apiClient } from './client';
import { Adjustment, CreateAdjustmentRequest, PaginatedResponse, PaginationParams } from '../../types';

export const adjustmentsService = {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Adjustment>> {
    return await apiClient.get<PaginatedResponse<Adjustment>>('/adjustments', params);
  },

  async getById(id: number): Promise<Adjustment> {
    return await apiClient.get<Adjustment>(`/adjustments/${id}`);
  },

  async create(data: CreateAdjustmentRequest): Promise<Adjustment> {
    return await apiClient.post<Adjustment>('/adjustments', data);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/adjustments/${id}`);
  },
};
