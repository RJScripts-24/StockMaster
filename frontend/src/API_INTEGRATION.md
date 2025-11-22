# API Integration Guide

This document explains how the frontend is structured to integrate with the backend API.

## Directory Structure

The frontend follows the same modular structure as the backend for easy integration:

```
frontend/
├── services/
│   └── api/
│       ├── client.ts              # Base API client with error handling
│       ├── auth.service.ts        # Auth module (/modules/auth)
│       ├── products.service.ts    # Products module (/modules/products)
│       ├── warehouses.service.ts  # Warehouses module (/modules/warehouses)
│       ├── receipts.service.ts    # Receipts module (/modules/receipts)
│       ├── deliveries.service.ts  # Deliveries module (/modules/deliveries)
│       ├── transfers.service.ts   # Transfers module (/modules/transfers)
│       ├── adjustments.service.ts # Adjustments module (/modules/adjustments)
│       ├── dashboard.service.ts   # Dashboard module (/modules/dashboard)
│       ├── ledger.service.ts      # Ledger module (/modules/ledger)
│       ├── users.service.ts       # Users module (/modules/users)
│       └── index.ts               # Service exports
├── types/
│   └── index.ts                   # TypeScript interfaces matching backend models
└── components/                    # React components using services
```

## Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your environment:
   ```env
   # Backend API URL
   VITE_API_URL=http://localhost:3000/api
   
   # Use mock data (true = offline mode, false = connect to backend)
   VITE_USE_MOCK_DATA=false
   ```

## Offline Mode (Mock Data)

The frontend works in offline mode by default. Each service has fallback mock data that is used when:
- The backend is not running
- API calls fail
- `VITE_USE_MOCK_DATA=true` is set

This allows development without the backend running.

## Connecting to Backend

To connect to your actual backend:

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Update `.env` in the frontend:
   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_USE_MOCK_DATA=false
   ```

3. Restart the frontend dev server

## API Service Structure

Each service follows this pattern:

```typescript
import { apiClient } from './client';
import { SomeType } from '../../types';

export const someService = {
  async getAll(params) {
    try {
      return await apiClient.get('/endpoint', params);
    } catch (error) {
      // Fallback to mock data
      return mockData;
    }
  },
  
  async getById(id) { /* ... */ },
  async create(data) { /* ... */ },
  async update(id, data) { /* ... */ },
  async delete(id) { /* ... */ },
};
```

## API Endpoints Mapping

The services map directly to your backend routes:

| Service | Backend Module | Endpoints |
|---------|---------------|-----------|
| authService | /modules/auth | POST /auth/login, /auth/register |
| productsService | /modules/products | GET/POST/PUT/DELETE /products |
| warehousesService | /modules/warehouses | GET/POST/PUT/DELETE /warehouses |
| receiptsService | /modules/receipts | GET/POST/PUT/DELETE /receipts |
| deliveriesService | /modules/deliveries | GET/POST/PUT/DELETE /deliveries |
| transfersService | /modules/transfers | GET/POST/PUT/DELETE /transfers |
| adjustmentsService | /modules/adjustments | GET/POST/PUT/DELETE /adjustments |
| dashboardService | /modules/dashboard | GET /dashboard/stats |
| ledgerService | /modules/ledger | GET /ledger |
| usersService | /modules/users | GET/PUT/DELETE /users |

## Authentication

The API client handles authentication automatically:

```typescript
import { authService, setAuthToken } from './services/api';

// Login
const response = await authService.login({ email, password });
// Token is automatically stored and used in subsequent requests

// Logout
await authService.logout();
// Token is automatically cleared
```

## Using Services in Components

Example usage in a React component:

```typescript
import { useEffect, useState } from 'react';
import { productsService, Product } from '../services/api';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsService.getAll({ page: 1, limit: 10 });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... render
}
```

## Error Handling

The API client provides automatic error handling:
- Network errors are caught and logged
- When `VITE_USE_MOCK_DATA=true`, errors fallback to mock data
- Error responses include status codes and messages

## TypeScript Types

All types in `/types/index.ts` match the backend Prisma models:
- User
- Product
- Warehouse
- Location
- Receipt
- Delivery
- Transfer
- Adjustment
- LedgerEntry

## Next Steps

1. **Start Backend**: Ensure your backend is running
2. **Configure Environment**: Update `.env` with correct API URL
3. **Test Connection**: Try logging in to verify connection
4. **Update Components**: Components are already structured to use services
5. **Add Features**: Build new features using the service layer

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend has CORS configured:
```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
```

### Authentication Issues
- Check that JWT tokens are being sent in headers
- Verify backend auth middleware is working
- Check token expiration

### API Not Found
- Verify `VITE_API_URL` is correct
- Ensure backend routes match service endpoints
- Check backend is running on correct port
