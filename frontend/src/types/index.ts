// User Types
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'MANAGER' | 'STAFF';
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Product Types
export interface Product {
  id: number;
  sku: string;
  name: string;
  description?: string;
  unit?: string;
  categoryId?: number;
  category?: string;
  unitPrice?: number; // Optional - may not exist in database
  reorderPoint?: number; // Optional - may not exist in database
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  sku: string;
  name: string;
  description?: string;
  unit?: string;
  categoryId?: number;
  unitPrice?: number;
  reorderPoint?: number;
}

export interface UpdateProductRequest {
  sku?: string;
  name?: string;
  description?: string;
  unit?: string;
  categoryId?: number;
  unitPrice?: number;
  reorderPoint?: number;
}

// Warehouse Types
export interface Warehouse {
  id: number;
  code: string;
  name: string;
  address?: string;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
  locations?: Location[];
}

export interface Location {
  id: number;
  code: string;
  name: string;
  warehouseId: number;
  warehouse?: Warehouse;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWarehouseRequest {
  code: string;
  name: string;
  address?: string;
  capacity?: number;
}

export interface UpdateWarehouseRequest {
  code?: string;
  name?: string;
  address?: string;
  capacity?: number;
}

export interface CreateLocationRequest {
  code: string;
  name: string;
  warehouseId: number;
}

export interface UpdateLocationRequest {
  code?: string;
  name?: string;
  warehouseId?: number;
}

// Receipt Types
export interface Receipt {
  id: number;
  referenceNo?: string;
  supplierName: string;
  warehouseId: number;
  status: 'pending' | 'validated' | 'cancelled';
  createdById?: number;
  validatedById?: number;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
  items?: ReceiptItem[];
  warehouse?: Warehouse;
  createdBy?: User;
  validatedBy?: User;
}

export interface ReceiptItem {
  id: number;
  receiptId: number;
  productId: number;
  quantity: number;
  unitPrice?: number;
  product?: Product;
}

export interface CreateReceiptRequest {
  supplierName: string;
  warehouseId: number;
  referenceNo?: string;
  items: {
    productId: number;
    quantity: number;
    unitPrice?: number;
  }[];
}

// Delivery Types
export interface Delivery {
  id: number;
  referenceNo?: string;
  customerName: string;
  warehouseId: number;
  status: 'pending' | 'validated' | 'cancelled';
  createdById?: number;
  validatedById?: number;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
  items?: DeliveryItem[];
  warehouse?: Warehouse;
  createdBy?: User;
  validatedBy?: User;
}

export interface DeliveryItem {
  id: number;
  deliveryId: number;
  productId: number;
  quantity: number;
  product?: Product;
}

export interface CreateDeliveryRequest {
  customerName: string;
  warehouseId: number;
  referenceNo?: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}

// Transfer Types
export interface Transfer {
  id: number;
  fromWarehouseId: number;
  toWarehouseId: number;
  status: 'draft' | 'pending' | 'validated' | 'cancelled';
  createdById?: number;
  validatedById?: number;
  validatedAt?: string;
  createdAt: string;
  updatedAt: string;
  items?: TransferItem[];
  fromWarehouse?: Warehouse;
  toWarehouse?: Warehouse;
  createdBy?: User;
  validatedBy?: User;
}

export interface TransferItem {
  id: number;
  transferId: number;
  productId: number;
  quantity: number;
  product?: Product;
}

export interface CreateTransferRequest {
  fromWarehouseId: number;
  toWarehouseId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

// Adjustment Types
export interface Adjustment {
  id: number;
  adjustmentNumber: string;
  locationId: number;
  productId: number;
  quantity: number;
  reason: string;
  adjustmentDate: string;
  createdById: number;
  createdAt: string;
  updatedAt: string;
  location?: Location;
  product?: Product;
}

export interface CreateAdjustmentRequest {
  adjustmentNumber: string;
  locationId: number;
  productId: number;
  quantity: number;
  reason: string;
  adjustmentDate: string;
}

// Ledger Types
export interface LedgerEntry {
  id: number;
  productId: number;
  locationId: number;
  transactionType: 'RECEIPT' | 'DELIVERY' | 'TRANSFER_IN' | 'TRANSFER_OUT' | 'ADJUSTMENT';
  transactionId: number;
  quantity: number;
  balanceAfter: number;
  createdAt: string;
  product?: Product;
  location?: Location;
}

// Dashboard Types
export interface DashboardStats {
  totalProducts: number;
  totalWarehouses: number;
  totalLocations: number;
  lowStockProducts: number;
  recentReceipts: number;
  recentDeliveries: number;
  recentTransfers: number;
}

export interface StockLevel {
  productId: number;
  locationId: number;
  quantity: number;
  product?: Product;
  location?: Location;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: any[];
}
