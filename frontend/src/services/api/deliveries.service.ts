import { apiClient } from './client';
import { Delivery, CreateDeliveryRequest, PaginatedResponse, PaginationParams } from '../../types';

export const deliveriesService = {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Delivery>> {
    return await apiClient.get<PaginatedResponse<Delivery>>('/deliveries', params);
  },

  async getById(id: number): Promise<Delivery> {
    return await apiClient.get<Delivery>(`/deliveries/${id}`);
  },

  async create(data: CreateDeliveryRequest): Promise<Delivery> {
    return await apiClient.post<Delivery>('/deliveries', data);
  },

  async update(id: number, data: Partial<CreateDeliveryRequest>): Promise<Delivery> {
    return await apiClient.put<Delivery>(`/deliveries/${id}`, data);
  },

  async complete(id: number): Promise<Delivery> {
    return await apiClient.post<Delivery>(`/deliveries/${id}/complete`);
  },

  async cancel(id: number): Promise<Delivery> {
    return await apiClient.post<Delivery>(`/deliveries/${id}/cancel`);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/deliveries/${id}`);
  },
};
