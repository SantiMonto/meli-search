# PRP-009: Frontend - Infrastructure Layer

## 🎯 Objetivo

Implementar la capa de infraestructura del frontend que proporciona implementaciones concretas de los repositorios definidos en el dominio. Esta capa incluirá el HTTP client configurado, el repositorio de API que consume el backend, integración con React Query para caching y state management, y manejo de errores de red.

## 📋 Contexto

La capa de infraestructura es donde se implementan los "adaptadores" que conectan el dominio con servicios externos (en este caso, el backend API). Usaremos fetch nativo con configuración personalizada y React Query para manejo de estado asíncrono, caching, y revalidación automática.

## 🏗️ Arquitectura Hexagonal - Capa de Infraestructura

```
┌─────────────────────────────────────────────────────────────┐
│                  CAPA DE DOMINIO                            │
│  ┌────────────────────────────────────────────────┐        │
│  │    IProductRepository (Interface/Port)         │        │
│  │    - search(query, limit, offset)              │        │
│  │    - getById(id)                               │        │
│  └────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                          ▲
                          │ implements
                          │
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE INFRAESTRUCTURA                        │
│                                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │    ApiProductRepository (Adapter)              │        │
│  │    - Implementa IProductRepository             │        │
│  │    - Usa HttpClient                            │        │
│  │    - Maneja errores HTTP                       │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         HttpClient                             │        │
│  │    - Configuración de fetch                    │        │
│  │    - Base URL                                  │        │
│  │    - Headers                                   │        │
│  │    - Error handling                            │        │
│  │    - Interceptors                              │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Backend API                            │        │
│  │    - GET /api/v1/products/search               │        │
│  │    - GET /api/v1/products/:id                  │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/frontend/src/infrastructure/
├── http/                              # HTTP Client
│   ├── http-client.ts
│   ├── http-error.ts
│   ├── interceptors/
│   │   ├── error.interceptor.ts
│   │   ├── logging.interceptor.ts
│   │   └── index.ts
│   └── index.ts
│
├── repositories/                      # Repository implementations
│   ├── api-product.repository.ts
│   └── index.ts
│
├── config/                            # Configuration
│   ├── api.config.ts
│   ├── query-client.config.ts
│   └── index.ts
│
└── providers/                         # React providers
    ├── query-provider.tsx
    └── index.ts
```

## 🔧 Tecnologías

### Core

- **fetch API**: Native browser API
- **@tanstack/react-query**: ^5.28.0 (data fetching & caching)
- **@meli/shared-types**: workspace:\* (tipos compartidos)

### Dev Dependencies

- **@testing-library/react**: ^14.2.0
- **msw**: ^2.0.0 (Mock Service Worker para tests)

## ✅ Tareas Específicas

### Fase 1: HTTP Client Base

1. [ ] Crear `HttpClient` con configuración base
2. [ ] Implementar métodos GET, POST, PUT, DELETE
3. [ ] Configurar base URL desde env
4. [ ] Agregar headers por defecto
5. [ ] Implementar timeout

### Fase 2: Error Handling

6. [ ] Crear `HttpError` custom class
7. [ ] Implementar error interceptor
8. [ ] Mapear errores HTTP a excepciones del dominio
9. [ ] Manejar network errors

### Fase 3: Interceptors

10. [ ] Crear logging interceptor (dev only)
11. [ ] Configurar interceptors en HttpClient

### Fase 4: API Product Repository

12. [ ] Implementar `ApiProductRepository`
13. [ ] Implementar método `search()`
14. [ ] Implementar método `getById()`
15. [ ] Transformar responses a entidades del dominio
16. [ ] Manejar errores y lanzar excepciones apropiadas

### Fase 5: React Query Configuration

17. [ ] Configurar QueryClient con defaults
18. [ ] Crear QueryProvider component
19. [ ] Configurar retry logic
20. [ ] Configurar stale time y cache time
21. [ ] Configurar refetch on window focus

### Fase 6: API Configuration

22. [ ] Crear configuración de API endpoints
23. [ ] Validar variables de entorno
24. [ ] Exportar constantes de configuración

### Fase 7: Testing

25. [ ] Configurar MSW para mock de API
26. [ ] Tests de HttpClient
27. [ ] Tests de ApiProductRepository
28. [ ] Tests de error handling

### Fase 8: Documentación

29. [ ] JSDoc en clases y métodos
30. [ ] Documentar configuración de env variables

## 📝 Implementación Detallada

### 1. `infrastructure/config/api.config.ts`

```typescript
/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

/**
 * Get API base URL from environment
 */
export const getApiBaseUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
  }

  return url;
};

/**
 * API endpoints configuration
 */
export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    PRODUCTS: {
      SEARCH: '/api/v1/products/search',
      DETAIL: (id: string) => `/api/v1/products/${id}`,
    },
    HEALTH: '/api/v1/health',
  },
  TIMEOUT: 10000, // 10 seconds
} as const;

/**
 * Request configuration
 */
export const REQUEST_CONFIG = {
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;
```

### 2. `infrastructure/http/http-error.ts`

```typescript
/**
 * HTTP Error class
 * Represents an error from an HTTP request
 */
export class HttpError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly response?: any,
  ) {
    super(message);
    this.name = 'HttpError';
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Check if error is a client error (4xx)
   */
  isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  /**
   * Check if error is a server error (5xx)
   */
  isServerError(): boolean {
    return this.statusCode >= 500 && this.statusCode < 600;
  }

  /**
   * Check if error is not found (404)
   */
  isNotFound(): boolean {
    return this.statusCode === 404;
  }

  /**
   * Check if error is unauthorized (401)
   */
  isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  /**
   * Check if error is forbidden (403)
   */
  isForbidden(): boolean {
    return this.statusCode === 403;
  }
}

/**
 * Network Error class
 * Represents a network connectivity error
 */
export class NetworkError extends Error {
  constructor(message: string = 'Network request failed') {
    super(message);
    this.name = 'NetworkError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Timeout Error class
 * Represents a request timeout
 */
export class TimeoutError extends Error {
  constructor(message: string = 'Request timeout') {
    super(message);
    this.name = 'TimeoutError';
    Error.captureStackTrace(this, this.constructor);
  }
}
```

### 3. `infrastructure/http/http-client.ts`

```typescript
import { API_CONFIG, REQUEST_CONFIG } from '../config/api.config';
import { HttpError, NetworkError, TimeoutError } from './http-error';

/**
 * HTTP Client options
 */
export interface HttpClientOptions {
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * HTTP Client
 * Wrapper around fetch API with error handling and interceptors
 */
export class HttpClient {
  private baseUrl: string;
  private defaultTimeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_CONFIG.BASE_URL, options: HttpClientOptions = {}) {
    this.baseUrl = baseUrl;
    this.defaultTimeout = options.timeout || API_CONFIG.TIMEOUT;
    this.defaultHeaders = {
      ...REQUEST_CONFIG.HEADERS,
      ...options.headers,
    };
  }

  /**
   * Perform GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
    options?: HttpClientOptions,
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    return this.request<T>(url, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * Perform POST request
   */
  async post<T>(endpoint: string, body?: any, options?: HttpClientOptions): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * Perform PUT request
   */
  async put<T>(endpoint: string, body?: any, options?: HttpClientOptions): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    });
  }

  /**
   * Perform DELETE request
   */
  async delete<T>(endpoint: string, options?: HttpClientOptions): Promise<T> {
    const url = this.buildUrl(endpoint);
    return this.request<T>(url, {
      method: 'DELETE',
      ...options,
    });
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number>): string {
    const url = new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  /**
   * Perform HTTP request with timeout and error handling
   */
  private async request<T>(url: string, options: RequestInit & HttpClientOptions = {}): Promise<T> {
    const { timeout = this.defaultTimeout, headers, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Log request in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[HTTP] ${fetchOptions.method || 'GET'} ${url}`, {
          status: response.status,
        });
      }

      // Handle non-OK responses
      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      // Parse JSON response
      const data = await response.json();
      return data as T;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle abort (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new TimeoutError(`Request timeout after ${timeout}ms`);
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw new NetworkError('Network request failed. Please check your connection.');
      }

      // Re-throw HttpError
      if (error instanceof HttpError) {
        throw error;
      }

      // Unknown error
      throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }

  /**
   * Handle error response
   */
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: any;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const message = errorData.message || `HTTP Error ${response.status}`;

    throw new HttpError(message, response.status, errorData);
  }
}

/**
 * Default HTTP client instance
 */
export const httpClient = new HttpClient();
```

### 4. `infrastructure/repositories/api-product.repository.ts`

```typescript
import { IProductRepository } from '../../core/repositories/product.repository.interface';
import { Product } from '../../core/entities/product.entity';
import { SearchResult } from '../../core/entities/search-result.entity';
import { ProductNotFoundException } from '../../core/exceptions/product-not-found.exception';
import { NetworkException } from '../../core/exceptions/network.exception';
import { HttpClient, HttpError, NetworkError } from '../http/http-client';
import { API_CONFIG } from '../config/api.config';
import { ISearchResultResponse, IProductDetail } from '@meli/shared-types';

/**
 * API Product Repository
 * Implements IProductRepository using HTTP API
 */
export class ApiProductRepository implements IProductRepository {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Search products by query
   * @param query - Search term
   * @param limit - Maximum number of results
   * @param offset - Pagination offset
   * @returns SearchResult with products and pagination
   * @throws NetworkException if request fails
   */
  async search(query: string, limit: number, offset: number): Promise<SearchResult> {
    try {
      const response = await this.httpClient.get<ISearchResultResponse>(
        API_CONFIG.ENDPOINTS.PRODUCTS.SEARCH,
        { q: query, limit, offset },
      );

      // Transform API response to domain entity
      return SearchResult.fromResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get product by ID
   * @param id - Product ID
   * @returns Product entity
   * @throws ProductNotFoundException if product not found
   * @throws NetworkException if request fails
   */
  async getById(id: string): Promise<Product> {
    try {
      const response = await this.httpClient.get<IProductDetail>(
        API_CONFIG.ENDPOINTS.PRODUCTS.DETAIL(id),
      );

      // Transform API response to domain entity
      return Product.fromDetail(response);
    } catch (error) {
      // Handle 404 specifically
      if (error instanceof HttpError && error.isNotFound()) {
        throw new ProductNotFoundException(id);
      }

      this.handleError(error);
    }
  }

  /**
   * Handle errors and convert to domain exceptions
   */
  private handleError(error: unknown): never {
    if (error instanceof NetworkError) {
      throw new NetworkException(
        'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      );
    }

    if (error instanceof HttpError) {
      if (error.isServerError()) {
        throw new NetworkException(
          'Error del servidor. Por favor, intenta más tarde.',
          error.statusCode,
        );
      }

      throw new NetworkException(
        error.message || 'Error al realizar la solicitud',
        error.statusCode,
      );
    }

    // Unknown error
    throw new NetworkException(
      error instanceof Error ? error.message : 'Error desconocido al realizar la solicitud',
    );
  }
}

/**
 * Default API product repository instance
 */
export const apiProductRepository = new ApiProductRepository(new HttpClient());
```

### 5. `infrastructure/config/query-client.config.ts`

```typescript
import { QueryClient, DefaultOptions } from '@tanstack/react-query';

/**
 * Default options for React Query
 */
const defaultOptions: DefaultOptions = {
  queries: {
    // Stale time: 5 minutes
    staleTime: 5 * 60 * 1000,

    // Cache time: 10 minutes
    gcTime: 10 * 60 * 1000,

    // Retry failed requests
    retry: 2,

    // Retry delay (exponential backoff)
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

    // Refetch on window focus
    refetchOnWindowFocus: true,

    // Refetch on reconnect
    refetchOnReconnect: true,

    // Don't refetch on mount if data is fresh
    refetchOnMount: false,
  },
  mutations: {
    // Retry mutations once
    retry: 1,
  },
};

/**
 * Create and configure QueryClient
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions,
  });
};

/**
 * Query keys factory
 * Centralized query keys for consistency
 */
export const queryKeys = {
  products: {
    all: ['products'] as const,
    search: (query: string, limit: number, offset: number) =>
      [...queryKeys.products.all, 'search', { query, limit, offset }] as const,
    detail: (id: string) => [...queryKeys.products.all, 'detail', id] as const,
  },
} as const;
```

### 6. `infrastructure/providers/query-provider.tsx`

```typescript
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { createQueryClient } from '../config/query-client.config';

/**
 * Query Provider Props
 */
interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * Query Provider Component
 * Provides React Query context to the application
 */
export function QueryProvider({ children }: QueryProviderProps) {
  // Create QueryClient instance (only once per app)
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
```

### 7. `infrastructure/http/__tests__/http-client.test.ts`

```typescript
import { HttpClient } from '../http-client';
import { HttpError, NetworkError, TimeoutError } from '../http-error';

// Mock fetch
global.fetch = jest.fn();

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient('http://localhost:3001');
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should perform GET request successfully', async () => {
      const mockData = { id: '1', name: 'Test' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const result = await httpClient.get('/test');

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          method: 'GET',
        }),
      );
    });

    it('should build URL with query parameters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({}),
      });

      await httpClient.get('/test', { q: 'search', limit: 10 });

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/test?q=search&limit=10',
        expect.any(Object),
      );
    });

    it('should throw HttpError on 404', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ message: 'Resource not found' }),
      });

      await expect(httpClient.get('/test')).rejects.toThrow(HttpError);
    });

    it('should throw NetworkError on network failure', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(httpClient.get('/test')).rejects.toThrow(NetworkError);
    });

    it('should throw TimeoutError on timeout', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(
        () =>
          new Promise((_, reject) => {
            setTimeout(() => reject(new DOMException('Aborted', 'AbortError')), 100);
          }),
      );

      await expect(httpClient.get('/test', undefined, { timeout: 50 })).rejects.toThrow(
        TimeoutError,
      );
    });
  });

  describe('post', () => {
    it('should perform POST request with body', async () => {
      const mockData = { id: '1' };
      const postData = { name: 'Test' };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockData,
      });

      const result = await httpClient.post('/test', postData);

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/test',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
        }),
      );
    });
  });
});
```

### 8. `infrastructure/repositories/__tests__/api-product.repository.test.ts`

```typescript
import { ApiProductRepository } from '../api-product.repository';
import { HttpClient, HttpError } from '../../http/http-client';
import { ProductNotFoundException } from '../../../core/exceptions/product-not-found.exception';
import { NetworkException } from '../../../core/exceptions/network.exception';
import { Currency, ProductCondition } from '@meli/shared-types';

// Mock HttpClient
jest.mock('../../http/http-client');

describe('ApiProductRepository', () => {
  let repository: ApiProductRepository;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = new HttpClient() as jest.Mocked<HttpClient>;
    repository = new ApiProductRepository(mockHttpClient);
  });

  describe('search', () => {
    it('should search products successfully', async () => {
      const mockResponse = {
        query: 'iphone',
        results: [
          {
            id: 'MLA123',
            title: 'iPhone 13',
            price: 1000,
            currencyId: Currency.ARS,
            condition: ProductCondition.NEW,
          },
        ],
        paging: {
          total: 100,
          offset: 0,
          limit: 10,
        },
      };

      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      const result = await repository.search('iphone', 10, 0);

      expect(result.query).toBe('iphone');
      expect(result.products).toHaveLength(1);
      expect(result.paging.total).toBe(100);
    });

    it('should throw NetworkException on network error', async () => {
      mockHttpClient.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(repository.search('iphone', 10, 0)).rejects.toThrow(NetworkException);
    });
  });

  describe('getById', () => {
    it('should get product by ID successfully', async () => {
      const mockResponse = {
        id: 'MLA123',
        title: 'iPhone 13',
        price: 1000,
        currencyId: Currency.ARS,
        condition: ProductCondition.NEW,
      };

      mockHttpClient.get.mockResolvedValueOnce(mockResponse);

      const result = await repository.getById('MLA123');

      expect(result.id).toBe('MLA123');
      expect(result.title).toBe('iPhone 13');
    });

    it('should throw ProductNotFoundException on 404', async () => {
      const error = new HttpError('Not found', 404);
      mockHttpClient.get.mockRejectedValueOnce(error);

      await expect(repository.getById('MLA999')).rejects.toThrow(ProductNotFoundException);
    });
  });
});
```

### 9. `app/layout.tsx` (Updated with QueryProvider)

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/infrastructure/providers/query-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mercado Libre - Busca productos',
  description: 'Encuentra los mejores productos en Mercado Libre',
  keywords: ['mercado libre', 'productos', 'compras', 'ecommerce'],
  authors: [{ name: 'Tu Nombre' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FFE600',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-gray-100 font-sans antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

### 10. `infrastructure/index.ts`

```typescript
// HTTP
export * from './http/http-client';
export * from './http/http-error';

// Repositories
export * from './repositories/api-product.repository';

// Config
export * from './config/api.config';
export * from './config/query-client.config';

// Providers
export * from './providers/query-provider';
```

## 🧪 Criterios de Aceptación

- [ ] `HttpClient` implementado con GET, POST, PUT, DELETE
- [ ] Error handling completo (HttpError, NetworkError, TimeoutError)
- [ ] Timeout configurado y funcionando
- [ ] `ApiProductRepository` implementa `IProductRepository`
- [ ] Método `search()` transforma responses a entidades
- [ ] Método `getById()` transforma responses a entidades
- [ ] Errores HTTP mapeados a excepciones del dominio
- [ ] 404 lanza `ProductNotFoundException`
- [ ] Network errors lanzan `NetworkException`
- [ ] QueryClient configurado con defaults apropiados
- [ ] QueryProvider creado y exportado
- [ ] React Query Devtools habilitado en dev
- [ ] Query keys factory creado
- [ ] API config con validación de env variables
- [ ] Tests de HttpClient >= 80% coverage
- [ ] Tests de ApiProductRepository >= 80% coverage
- [ ] JSDoc completo en clases y métodos
- [ ] TypeScript compila sin errores
- [ ] Linter sin warnings

## 🔗 Dependencias

- **Depende de**:
  - PRP-003 (Shared Types Package)
  - PRP-007 (Frontend - Arquitectura y Setup Next.js)
  - PRP-008 (Frontend - Core Domain Layer)
- **Requerido para**:
  - PRP-010 (Frontend - Presentation Layer Base)
  - PRP-011 (Frontend - Feature: Search)

## 📚 Referencias

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)

## 💡 Notas Adicionales

### HttpClient vs Axios

Usamos fetch nativo en lugar de Axios porque:

- ✅ Nativo del navegador (no requiere librería externa)
- ✅ Más ligero (menos bundle size)
- ✅ Suficiente para nuestras necesidades
- ✅ Mejor integración con Next.js

### React Query Benefits

React Query nos proporciona:

- ✅ **Caching automático**: Reduce requests innecesarios
- ✅ **Background refetching**: Mantiene datos frescos
- ✅ **Retry logic**: Reintentos automáticos en fallos
- ✅ **Loading/Error states**: Manejo de estados simplificado
- ✅ **Devtools**: Debugging visual en desarrollo

### Error Handling Strategy

Tres capas de manejo de errores:

1. **HttpClient**: Captura errores de red y HTTP
2. **Repository**: Mapea a excepciones del dominio
3. **UI**: Muestra mensajes amigables al usuario

### Query Keys

Los query keys son importantes para:

- Identificar queries únicas
- Invalidar cache selectivamente
- Compartir cache entre componentes
- Debugging en devtools

### Environment Variables

Asegúrate de configurar en `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Testing con MSW

Mock Service Worker permite:

- Interceptar requests en tests
- Simular responses del backend
- Probar error handling
- Tests más realistas

### Próximos Pasos

Después de este PRP:

1. Crear hooks personalizados que usen React Query
2. Implementar componentes UI base
3. Crear features de búsqueda y detalle
4. Integrar todo en las páginas de Next.js
