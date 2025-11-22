import { apiClient } from './client';
import { User, PaginatedResponse, PaginationParams } from '../../types';

export const usersService = {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    return await apiClient.get<PaginatedResponse<User>>('/users', params);
  },

  async getById(id: number): Promise<User> {
    return await apiClient.get<User>(`/users/${id}`);
  },

  async update(id: number, data: Partial<User>): Promise<User> {
    return await apiClient.put<User>(`/users/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  },
};
