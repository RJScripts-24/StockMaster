import { apiClient } from './client';
import { Product, CreateProductRequest, UpdateProductRequest, PaginatedResponse, PaginationParams } from '../../types';

export const productsService = {
  /**
   * Get all products with pagination
   * GET /api/products
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return await apiClient.get<PaginatedResponse<Product>>('/products', params);
  },

  /**
   * Get product by ID
   * GET /api/products/:id
   */
  async getById(id: number): Promise<Product> {
    return await apiClient.get<Product>(`/products/${id}`);
  },

  /**
   * Create new product
   * POST /api/products
   */
  async create(data: CreateProductRequest): Promise<Product> {
    return await apiClient.post<Product>('/products', data);
  },

  /**
   * Update product
   * PUT /api/products/:id
   */
  async update(id: number, data: UpdateProductRequest): Promise<Product> {
    return await apiClient.put<Product>(`/products/${id}`, data);
  },

  /**
   * Delete product
   * DELETE /api/products/:id
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },

  /**
   * Search products
   * GET /api/products/search
   */
  async search(query: string, params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return await apiClient.get<PaginatedResponse<Product>>('/products/search', { query, ...params });
  },
};
