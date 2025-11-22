import { apiClient } from './client';
import { 
  Warehouse, 
  Location, 
  CreateWarehouseRequest, 
  UpdateWarehouseRequest,
  CreateLocationRequest,
  UpdateLocationRequest,
  PaginatedResponse, 
  PaginationParams 
} from '../../types';

export const warehousesService = {
  // ========== Warehouses ==========
  
  /**
   * Get all warehouses
   * GET /api/warehouses
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Warehouse>> {
    return await apiClient.get<PaginatedResponse<Warehouse>>('/warehouses', params);
  },

  /**
   * Get warehouse by ID
   * GET /api/warehouses/:id
   */
  async getById(id: number): Promise<Warehouse> {
    return await apiClient.get<Warehouse>(`/warehouses/${id}`);
  },

  /**
   * Create new warehouse
   * POST /api/warehouses
   */
  async create(data: CreateWarehouseRequest): Promise<Warehouse> {
    return await apiClient.post<Warehouse>('/warehouses', data);
  },

  /**
   * Update warehouse
   * PUT /api/warehouses/:id
   */
  async update(id: number, data: UpdateWarehouseRequest): Promise<Warehouse> {
    return await apiClient.put<Warehouse>(`/warehouses/${id}`, data);
  },

  /**
   * Delete warehouse
   * DELETE /api/warehouses/:id
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/warehouses/${id}`);
  },

  // ========== Locations ==========
  
  /**
   * Get all locations
   * GET /api/warehouses/locations
   */
  async getAllLocations(params?: PaginationParams): Promise<PaginatedResponse<Location>> {
    return await apiClient.get<PaginatedResponse<Location>>('/warehouses/locations', params);
  },

  /**
   * Get locations by warehouse ID
   * GET /api/warehouses/:warehouseId/locations
   */
  async getLocationsByWarehouse(warehouseId: number): Promise<Location[]> {
    return await apiClient.get<Location[]>(`/warehouses/${warehouseId}/locations`);
  },

  /**
   * Get location by ID
   * GET /api/warehouses/locations/:id
   */
  async getLocationById(id: number): Promise<Location> {
    return await apiClient.get<Location>(`/warehouses/locations/${id}`);
  },

  /**
   * Create new location
   * POST /api/warehouses/locations
   */
  async createLocation(data: CreateLocationRequest): Promise<Location> {
    return await apiClient.post<Location>('/warehouses/locations', data);
  },

  /**
   * Update location
   * PUT /api/warehouses/locations/:id
   */
  async updateLocation(id: number, data: UpdateLocationRequest): Promise<Location> {
    return await apiClient.put<Location>(`/warehouses/locations/${id}`, data);
  },

  /**
   * Delete location
   * DELETE /api/warehouses/locations/:id
   */
  async deleteLocation(id: number): Promise<void> {
    await apiClient.delete(`/warehouses/locations/${id}`);
  },
};
