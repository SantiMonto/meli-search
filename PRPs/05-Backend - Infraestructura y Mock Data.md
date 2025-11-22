# PRP-005: Backend - Infraestructura y Mock Data

## 🎯 Objetivo

Implementar la capa de infraestructura del backend que proporciona implementaciones concretas de los repositorios definidos en el dominio. Esta capa incluirá el repositorio mock con datos simulados, servicios de datos mock, y la configuración necesaria para simular delays y errores de forma realista.

## 📋 Contexto

La capa de infraestructura es donde se implementan los "adaptadores" que conectan el dominio con el mundo exterior. En este caso, crearemos un `MockProductRepository` que simula llamadas a la API de Mercado Libre usando datos estáticos, pero con comportamiento realista (delays, paginación, filtrado, etc.).

## 🏗️ Arquitectura Hexagonal - Capa de Infraestructura

```
┌─────────────────────────────────────────────────────────────┐
│                  CAPA DE DOMINIO                            │
│  ┌────────────────────────────────────────────────┐        │
│  │    IProductRepository (Interface/Port)         │        │
│  │    - search(query, limit, offset)              │        │
│  │    - findById(id)                              │        │
│  └────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                          ▲
                          │ implements
                          │
┌─────────────────────────────────────────────────────────────┐
│              CAPA DE INFRAESTRUCTURA                        │
│                                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │    MockProductRepository (Adapter)             │        │
│  │    - Implementa IProductRepository             │        │
│  │    - Usa MockDataService                       │        │
│  │    - Simula delays y errores                   │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         MockDataService                        │        │
│  │    - Carga datos mock                          │        │
│  │    - Filtra por query                          │        │
│  │    - Pagina resultados                         │        │
│  │    - Busca por ID                              │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│                          ▼                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Mock Data (JSON)                       │        │
│  │    - products-search-iphone.json               │        │
│  │    - products-detail.json                      │        │
│  │    - Datos basados en API real de ML           │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/backend/src/
├── infrastructure/                        # Capa de infraestructura
│   ├── persistence/                       # Persistencia de datos
│   │   ├── mock/                          # Mock implementation
│   │   │   ├── data/                      # Datos mock
│   │   │   │   ├── products-search-iphone.json
│   │   │   │   ├── products-search-samsung.json
│   │   │   │   ├── products-detail.json
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── mock-data.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── repositories/
│   │   │   │   ├── mock-product.repository.ts
│   │   │   │   └── index.ts
│   │   │   └── mock.module.ts
│   │   └── index.ts
│   │
│   ├── config/                            # Configuración
│   │   ├── mock.config.ts
│   │   └── index.ts
│   │
│   └── index.ts
```

## 🔧 Tecnologías

### Core

- **NestJS**: Framework base
- **@meli/shared-types**: Tipos compartidos
- **rxjs**: Para delays y simulación asíncrona

### Dev Dependencies

- **@nestjs/testing**: Para testing
- **jest**: Framework de testing

## ✅ Tareas Específicas

### Fase 1: Mock Data (JSON)

1. [ ] Crear `products-search-iphone.json` con datos de búsqueda
2. [ ] Crear `products-search-samsung.json` con más datos
3. [ ] Crear `products-detail.json` con detalles completos
4. [ ] Validar que los JSONs cumplan con interfaces de `@meli/shared-types`

### Fase 2: Configuración Mock

5. [ ] Crear `mock.config.ts` con configuración de delays y comportamiento
6. [ ] Definir probabilidades de error
7. [ ] Configurar delays mínimos y máximos

### Fase 3: Mock Data Service

8. [ ] Implementar `MockDataService` para cargar datos
9. [ ] Implementar búsqueda por query con fuzzy matching
10. [ ] Implementar paginación
11. [ ] Implementar búsqueda por ID
12. [ ] Simular casos de "no encontrado"

### Fase 4: Mock Product Repository

13. [ ] Implementar `MockProductRepository` que implemente `IProductRepository`
14. [ ] Implementar método `search()` con delay simulado
15. [ ] Implementar método `findById()` con delay simulado
16. [ ] Manejar excepciones del dominio
17. [ ] Simular errores aleatorios (opcional)

### Fase 5: Module Configuration

18. [ ] Crear `MockModule` de NestJS
19. [ ] Configurar provider de `PRODUCT_REPOSITORY`
20. [ ] Exportar servicios necesarios

### Fase 6: Testing

21. [ ] Tests unitarios de `MockDataService`
22. [ ] Tests de integración de `MockProductRepository`
23. [ ] Verificar que cumple contrato de `IProductRepository`
24. [ ] Tests de casos edge (query vacío, ID inválido, etc.)

### Fase 7: Documentación

25. [ ] JSDoc en servicios y repositorio
26. [ ] Documentar estructura de datos mock
27. [ ] Crear guía para agregar más datos mock

## 📝 Implementación Detallada

### 1. `infrastructure/persistence/mock/data/products-search-iphone.json`

```json
{
  "query": "iphone",
  "paging": {
    "total": 1500,
    "offset": 0,
    "limit": 50
  },
  "results": [
    {
      "id": "MLA123456789",
      "title": "Apple iPhone 13 (128 GB) - Medianoche",
      "price": 1367999,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA123456789-012023-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 113999.92,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2",
        "logistic_type": "fulfillment"
      },
      "reviews": {
        "rating_average": 4.9,
        "total": 35
      }
    },
    {
      "id": "MLA987654321",
      "title": "Apple iPhone 16 Pro Max 256gb - Titanio Natural",
      "price": 2299000,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_987654-MLA987654321-092024-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 191583.33,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2",
        "logistic_type": "fulfillment"
      },
      "reviews": {
        "rating_average": 5.0,
        "total": 12
      }
    },
    {
      "id": "MLA555555555",
      "title": "iPhone 8 64 GB Plata - Reacondicionado Certificado",
      "price": 412500,
      "currency_id": "ARS",
      "condition": "used",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_555555-MLA555555555-052023-F.webp",
      "installments": {
        "quantity": 6,
        "amount": 68750,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": false
      },
      "reviews": {
        "rating_average": 5.0,
        "total": 2
      }
    },
    {
      "id": "MLA111222333",
      "title": "Apple iPhone 14 Pro (256 GB) - Morado Oscuro",
      "price": 1899000,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_111222-MLA111222333-082023-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 158250,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2",
        "logistic_type": "fulfillment"
      },
      "reviews": {
        "rating_average": 4.8,
        "total": 89
      }
    },
    {
      "id": "MLA444555666",
      "title": "iPhone 11 128 GB Negro - Liberado",
      "price": 899999,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_444555-MLA444555666-032023-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 74999.92,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2"
      },
      "reviews": {
        "rating_average": 4.7,
        "total": 156
      }
    },
    {
      "id": "MLA777888999",
      "title": "Apple iPhone 15 (512 GB) - Azul",
      "price": 2150000,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_777888-MLA777888999-112024-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 179166.67,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2",
        "logistic_type": "fulfillment"
      },
      "reviews": {
        "rating_average": 4.9,
        "total": 45
      }
    },
    {
      "id": "MLA222333444",
      "title": "iPhone SE (3ra Generación) 64 GB - Medianoche",
      "price": 649000,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_222333-MLA222333444-042023-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 54083.33,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2"
      },
      "reviews": {
        "rating_average": 4.6,
        "total": 78
      }
    },
    {
      "id": "MLA888999000",
      "title": "Apple iPhone 12 Pro Max 256 GB - Grafito",
      "price": 1599000,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_888999-MLA888999000-062023-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 133250,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2",
        "logistic_type": "fulfillment"
      },
      "reviews": {
        "rating_average": 4.9,
        "total": 234
      }
    },
    {
      "id": "MLA333444555",
      "title": "iPhone XR 64 GB - Rojo - Reacondicionado",
      "price": 549000,
      "currency_id": "ARS",
      "condition": "used",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_333444-MLA333444555-022023-F.webp",
      "installments": {
        "quantity": 6,
        "amount": 91500,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": false
      },
      "reviews": {
        "rating_average": 4.3,
        "total": 19
      }
    },
    {
      "id": "MLA999000111",
      "title": "Apple iPhone 13 Pro (1 TB) - Verde Alpino",
      "price": 2499000,
      "currency_id": "ARS",
      "condition": "new",
      "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_999000-MLA999000111-072023-F.webp",
      "installments": {
        "quantity": 12,
        "amount": 208250,
        "rate": 0,
        "currency_id": "ARS"
      },
      "shipping": {
        "free_shipping": true,
        "mode": "me2",
        "logistic_type": "fulfillment"
      },
      "reviews": {
        "rating_average": 5.0,
        "total": 67
      }
    }
  ]
}
```

### 2. `infrastructure/persistence/mock/data/products-detail.json`

```json
{
  "MLA123456789": {
    "id": "MLA123456789",
    "title": "Apple iPhone 13 (128 GB) - Medianoche",
    "price": 1367999,
    "original_price": 1523244.99,
    "currency_id": "ARS",
    "available_quantity": 15,
    "sold_quantity": 342,
    "condition": "new",
    "permalink": "https://www.mercadolibre.com.ar/p/MLA123456789",
    "pictures": [
      {
        "id": "1",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA123456789-012023-F.webp"
      },
      {
        "id": "2",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_123457-MLA123456789-012023-F.webp"
      },
      {
        "id": "3",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_123458-MLA123456789-012023-F.webp"
      },
      {
        "id": "4",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_123459-MLA123456789-012023-F.webp"
      }
    ],
    "installments": {
      "quantity": 12,
      "amount": 113999.92,
      "rate": 0,
      "currency_id": "ARS"
    },
    "shipping": {
      "free_shipping": true,
      "mode": "me2",
      "logistic_type": "fulfillment",
      "store_pick_up": false
    },
    "seller_address": {
      "city": {
        "name": "CABA"
      },
      "state": {
        "name": "Buenos Aires"
      }
    },
    "attributes": [
      {
        "id": "BRAND",
        "name": "Marca",
        "value_name": "Apple"
      },
      {
        "id": "MODEL",
        "name": "Modelo",
        "value_name": "iPhone 13"
      },
      {
        "id": "STORAGE_CAPACITY",
        "name": "Capacidad de almacenamiento",
        "value_name": "128 GB"
      },
      {
        "id": "COLOR",
        "name": "Color",
        "value_name": "Medianoche"
      },
      {
        "id": "SCREEN_SIZE",
        "name": "Tamaño de pantalla",
        "value_name": "6.1 pulgadas"
      }
    ],
    "warranty": "Garantía del vendedor: 12 meses",
    "description": "El iPhone 13 viene con el sistema de dos cámaras más impresionante en un iPhone, para que tomes fotos espectaculares con mucha o poca luz. El modo Cine añade poca profundidad de campo y cambia el enfoque automáticamente en tus videos. Y te da más tranquilidad gracias a una funcionalidad de seguridad que salva vidas.",
    "reviews": {
      "rating_average": 4.9,
      "total": 35
    }
  },
  "MLA987654321": {
    "id": "MLA987654321",
    "title": "Apple iPhone 16 Pro Max 256gb - Titanio Natural",
    "price": 2299000,
    "original_price": 2599000,
    "currency_id": "ARS",
    "available_quantity": 8,
    "sold_quantity": 89,
    "condition": "new",
    "permalink": "https://www.mercadolibre.com.ar/p/MLA987654321",
    "pictures": [
      {
        "id": "1",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_987654-MLA987654321-092024-F.webp"
      },
      {
        "id": "2",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_987655-MLA987654321-092024-F.webp"
      },
      {
        "id": "3",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_987656-MLA987654321-092024-F.webp"
      }
    ],
    "installments": {
      "quantity": 12,
      "amount": 191583.33,
      "rate": 0,
      "currency_id": "ARS"
    },
    "shipping": {
      "free_shipping": true,
      "mode": "me2",
      "logistic_type": "fulfillment",
      "store_pick_up": false
    },
    "seller_address": {
      "city": {
        "name": "CABA"
      },
      "state": {
        "name": "Buenos Aires"
      }
    },
    "attributes": [
      {
        "id": "BRAND",
        "name": "Marca",
        "value_name": "Apple"
      },
      {
        "id": "MODEL",
        "name": "Modelo",
        "value_name": "iPhone 16 Pro Max"
      },
      {
        "id": "STORAGE_CAPACITY",
        "name": "Capacidad de almacenamiento",
        "value_name": "256 GB"
      },
      {
        "id": "COLOR",
        "name": "Color",
        "value_name": "Titanio Natural"
      },
      {
        "id": "SCREEN_SIZE",
        "name": "Tamaño de pantalla",
        "value_name": "6.9 pulgadas"
      }
    ],
    "warranty": "Garantía del vendedor: 12 meses",
    "description": "El iPhone 16 Pro Max es el más avanzado de la línea. Con chip A18 Pro, sistema de cámaras profesional y pantalla Super Retina XDR de 6.9 pulgadas. Diseño en titanio de grado aeroespacial.",
    "reviews": {
      "rating_average": 5.0,
      "total": 12
    }
  },
  "MLA555555555": {
    "id": "MLA555555555",
    "title": "iPhone 8 64 GB Plata - Reacondicionado Certificado",
    "price": 412500,
    "currency_id": "ARS",
    "available_quantity": 3,
    "sold_quantity": 45,
    "condition": "used",
    "permalink": "https://www.mercadolibre.com.ar/p/MLA555555555",
    "pictures": [
      {
        "id": "1",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_555555-MLA555555555-052023-F.webp"
      },
      {
        "id": "2",
        "url": "https://http2.mlstatic.com/D_NQ_NP_2X_555556-MLA555555555-052023-F.webp"
      }
    ],
    "installments": {
      "quantity": 6,
      "amount": 68750,
      "rate": 0,
      "currency_id": "ARS"
    },
    "shipping": {
      "free_shipping": false
    },
    "seller_address": {
      "city": {
        "name": "Rosario"
      },
      "state": {
        "name": "Santa Fe"
      }
    },
    "attributes": [
      {
        "id": "BRAND",
        "name": "Marca",
        "value_name": "Apple"
      },
      {
        "id": "MODEL",
        "name": "Modelo",
        "value_name": "iPhone 8"
      },
      {
        "id": "STORAGE_CAPACITY",
        "name": "Capacidad de almacenamiento",
        "value_name": "64 GB"
      },
      {
        "id": "COLOR",
        "name": "Color",
        "value_name": "Plata"
      }
    ],
    "warranty": "Garantía del vendedor: 6 meses",
    "description": "iPhone 8 reacondicionado certificado. Batería nueva, pantalla original, carcasa en excelente estado. Incluye cargador y cable.",
    "reviews": {
      "rating_average": 5.0,
      "total": 2
    }
  }
}
```

### 3. `infrastructure/config/mock.config.ts`

```typescript
/**
 * Mock configuration
 * Controls behavior of mock repository
 */
export const MOCK_CONFIG = {
  /**
   * Simulated network delay range (ms)
   */
  DELAY: {
    MIN: 200,
    MAX: 800,
  },

  /**
   * Error simulation
   */
  ERROR_SIMULATION: {
    ENABLED: false, // Set to true to randomly simulate errors
    PROBABILITY: 0.05, // 5% chance of error
  },

  /**
   * Search configuration
   */
  SEARCH: {
    /**
     * Minimum query length
     */
    MIN_QUERY_LENGTH: 1,

    /**
     * Default limit if not provided
     */
    DEFAULT_LIMIT: 10,

    /**
     * Maximum limit allowed
     */
    MAX_LIMIT: 50,

    /**
     * Enable fuzzy matching
     */
    FUZZY_MATCHING: true,
  },

  /**
   * Pagination
   */
  PAGINATION: {
    DEFAULT_OFFSET: 0,
  },
} as const;
```

### 4. `infrastructure/persistence/mock/services/mock-data.service.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { ISearchResultResponse, IProductDetail, IProductListItem } from '@meli/shared-types';
import * as searchIphoneData from '../data/products-search-iphone.json';
import * as productsDetailData from '../data/products-detail.json';

/**
 * Mock Data Service
 * Handles loading and querying mock data
 */
@Injectable()
export class MockDataService {
  private readonly logger = new Logger(MockDataService.name);

  // In-memory data store
  private searchData: Map<string, ISearchResultResponse> = new Map();
  private detailData: Map<string, IProductDetail> = new Map();

  constructor() {
    this.loadMockData();
  }

  /**
   * Load mock data into memory
   */
  private loadMockData(): void {
    this.logger.log('Loading mock data...');

    // Load search data
    this.searchData.set('iphone', searchIphoneData as ISearchResultResponse);

    // Load detail data
    const details = productsDetailData as Record<string, IProductDetail>;
    Object.entries(details).forEach(([id, detail]) => {
      this.detailData.set(id, detail);
    });

    this.logger.log(
      `Loaded ${this.searchData.size} search datasets and ${this.detailData.size} product details`,
    );
  }

  /**
   * Search products by query
   * @param query - Search term
   * @param limit - Results per page
   * @param offset - Pagination offset
   * @returns Search results with pagination
   */
  search(query: string, limit: number, offset: number): ISearchResultResponse {
    const normalizedQuery = query.toLowerCase().trim();

    // Try exact match first
    let searchResult = this.searchData.get(normalizedQuery);

    // If no exact match, try fuzzy matching
    if (!searchResult) {
      searchResult = this.fuzzySearch(normalizedQuery);
    }

    // If still no results, return empty
    if (!searchResult) {
      return {
        query,
        results: [],
        paging: {
          total: 0,
          offset: 0,
          limit,
        },
      };
    }

    // Apply pagination
    const paginatedResults = this.paginateResults(searchResult.results, limit, offset);

    return {
      query,
      results: paginatedResults,
      paging: {
        total: searchResult.results.length,
        offset,
        limit,
      },
    };
  }

  /**
   * Fuzzy search across all datasets
   * @param query - Search term
   * @returns First matching dataset or null
   */
  private fuzzySearch(query: string): ISearchResultResponse | null {
    for (const [key, data] of this.searchData.entries()) {
      if (key.includes(query) || query.includes(key)) {
        return data;
      }

      // Check if any product title matches
      const hasMatch = data.results.some((product) => product.title.toLowerCase().includes(query));

      if (hasMatch) {
        // Filter results to only matching products
        return {
          ...data,
          results: data.results.filter((product) => product.title.toLowerCase().includes(query)),
        };
      }
    }

    return null;
  }

  /**
   * Paginate results
   * @param results - All results
   * @param limit - Results per page
   * @param offset - Pagination offset
   * @returns Paginated results
   */
  private paginateResults(
    results: IProductListItem[],
    limit: number,
    offset: number,
  ): IProductListItem[] {
    return results.slice(offset, offset + limit);
  }

  /**
   * Find product by ID
   * @param id - Product ID
   * @returns Product detail or null if not found
   */
  findById(id: string): IProductDetail | null {
    return this.detailData.get(id) || null;
  }

  /**
   * Get all product IDs
   * @returns Array of product IDs
   */
  getAllProductIds(): string[] {
    return Array.from(this.detailData.keys());
  }

  /**
   * Check if product exists
   * @param id - Product ID
   * @returns True if product exists
   */
  exists(id: string): boolean {
    return this.detailData.has(id);
  }
}
```

### 5. `infrastructure/persistence/mock/repositories/mock-product.repository.ts`

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { IProductRepository } from '../../../../domain/repositories/product.repository.interface';
import { Product } from '../../../../domain/entities/product.entity';
import { SearchResult } from '../../../../domain/entities/search-result.entity';
import { Paging } from '../../../../domain/entities/paging.entity';
import { ProductNotFoundException } from '../../../../domain/exceptions/product-not-found.exception';
import { MockDataService } from '../services/mock-data.service';
import { MOCK_CONFIG } from '../../../config/mock.config';

/**
 * Mock Product Repository
 * Implements IProductRepository using mock data
 */
@Injectable()
export class MockProductRepository implements IProductRepository {
  private readonly logger = new Logger(MockProductRepository.name);

  constructor(private readonly mockDataService: MockDataService) {}

  /**
   * Search products by query
   * @param query - Search term
   * @param limit - Maximum number of results
   * @param offset - Pagination offset
   * @returns SearchResult with products and pagination
   */
  async search(query: string, limit: number, offset: number): Promise<SearchResult> {
    this.logger.debug(`Searching products: query="${query}", limit=${limit}, offset=${offset}`);

    // Simulate network delay
    await this.simulateDelay();

    // Simulate error (if enabled)
    this.simulateError('search');

    // Get data from mock service
    const searchResponse = this.mockDataService.search(query, limit, offset);

    // Convert to domain entities
    const products = searchResponse.results.map((item) => Product.fromListItem(item));

    const paging = new Paging(
      searchResponse.paging.total,
      searchResponse.paging.offset,
      searchResponse.paging.limit,
    );

    const searchResult = new SearchResult(query, products, paging);

    this.logger.debug(`Found ${products.length} products`);

    return searchResult;
  }

  /**
   * Find product by ID
   * @param id - Product ID
   * @returns Product entity
   * @throws ProductNotFoundException if product not found
   */
  async findById(id: string): Promise<Product> {
    this.logger.debug(`Finding product by ID: ${id}`);

    // Simulate network delay
    await this.simulateDelay();

    // Simulate error (if enabled)
    this.simulateError('findById');

    // Get data from mock service
    const productDetail = this.mockDataService.findById(id);

    if (!productDetail) {
      this.logger.warn(`Product not found: ${id}`);
      throw new ProductNotFoundException(id);
    }

    // Convert to domain entity
    const product = Product.fromDetail(productDetail);

    this.logger.debug(`Found product: ${product.title}`);

    return product;
  }

  /**
   * Simulate network delay
   */
  private async simulateDelay(): Promise<void> {
    const delay =
      Math.random() * (MOCK_CONFIG.DELAY.MAX - MOCK_CONFIG.DELAY.MIN) + MOCK_CONFIG.DELAY.MIN;

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * Simulate random errors (for testing error handling)
   * @param operation - Operation name
   */
  private simulateError(operation: string): void {
    if (!MOCK_CONFIG.ERROR_SIMULATION.ENABLED) {
      return;
    }

    const shouldError = Math.random() < MOCK_CONFIG.ERROR_SIMULATION.PROBABILITY;

    if (shouldError) {
      this.logger.error(`Simulated error in ${operation}`);
      throw new Error(`Simulated error in ${operation}`);
    }
  }
}
```

### 6. `infrastructure/persistence/mock/mock.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { MockDataService } from './services/mock-data.service';
import { MockProductRepository } from './repositories/mock-product.repository';
import { PRODUCT_REPOSITORY } from '../../../domain/repositories/product.repository.interface';

/**
 * Mock Module
 * Provides mock implementations of repositories
 */
@Module({
  providers: [
    MockDataService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: MockProductRepository,
    },
  ],
  exports: [PRODUCT_REPOSITORY, MockDataService],
})
export class MockModule {}
```

### 7. `infrastructure/persistence/mock/services/__tests__/mock-data.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MockDataService } from '../mock-data.service';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockDataService],
    }).compile();

    service = module.get<MockDataService>(MockDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should return results for "iphone" query', () => {
      const result = service.search('iphone', 10, 0);

      expect(result.query).toBe('iphone');
      expect(result.results.length).toBeGreaterThan(0);
      expect(result.results.length).toBeLessThanOrEqual(10);
      expect(result.paging.total).toBeGreaterThan(0);
    });

    it('should return empty results for unknown query', () => {
      const result = service.search('xyzabc123', 10, 0);

      expect(result.query).toBe('xyzabc123');
      expect(result.results).toHaveLength(0);
      expect(result.paging.total).toBe(0);
    });

    it('should paginate results correctly', () => {
      const page1 = service.search('iphone', 3, 0);
      const page2 = service.search('iphone', 3, 3);

      expect(page1.results).toHaveLength(3);
      expect(page2.results).toHaveLength(3);
      expect(page1.results[0].id).not.toBe(page2.results[0].id);
    });

    it('should handle case-insensitive search', () => {
      const lowerCase = service.search('iphone', 10, 0);
      const upperCase = service.search('IPHONE', 10, 0);
      const mixedCase = service.search('IpHoNe', 10, 0);

      expect(lowerCase.results.length).toBe(upperCase.results.length);
      expect(lowerCase.results.length).toBe(mixedCase.results.length);
    });

    it('should respect limit parameter', () => {
      const result = service.search('iphone', 5, 0);

      expect(result.results.length).toBeLessThanOrEqual(5);
      expect(result.paging.limit).toBe(5);
    });
  });

  describe('findById', () => {
    it('should return product detail for valid ID', () => {
      const product = service.findById('MLA123456789');

      expect(product).toBeDefined();
      expect(product?.id).toBe('MLA123456789');
      expect(product?.title).toBeDefined();
      expect(product?.price).toBeGreaterThan(0);
    });

    it('should return null for invalid ID', () => {
      const product = service.findById('MLA999999999');

      expect(product).toBeNull();
    });

    it('should return product with all detail fields', () => {
      const product = service.findById('MLA123456789');

      expect(product).toBeDefined();
      expect(product?.pictures).toBeDefined();
      expect(product?.attributes).toBeDefined();
      expect(product?.description).toBeDefined();
    });
  });

  describe('exists', () => {
    it('should return true for existing product', () => {
      expect(service.exists('MLA123456789')).toBe(true);
    });

    it('should return false for non-existing product', () => {
      expect(service.exists('MLA999999999')).toBe(false);
    });
  });

  describe('getAllProductIds', () => {
    it('should return array of product IDs', () => {
      const ids = service.getAllProductIds();

      expect(Array.isArray(ids)).toBe(true);
      expect(ids.length).toBeGreaterThan(0);
      expect(ids).toContain('MLA123456789');
    });
  });
});
```

### 8. `infrastructure/persistence/mock/repositories/__tests__/mock-product.repository.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MockProductRepository } from '../mock-product.repository';
import { MockDataService } from '../../services/mock-data.service';
import { ProductNotFoundException } from '../../../../../domain/exceptions/product-not-found.exception';

describe('MockProductRepository', () => {
  let repository: MockProductRepository;
  let mockDataService: MockDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockProductRepository, MockDataService],
    }).compile();

    repository = module.get<MockProductRepository>(MockProductRepository);
    mockDataService = module.get<MockDataService>(MockDataService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('search', () => {
    it('should return SearchResult entity', async () => {
      const result = await repository.search('iphone', 10, 0);

      expect(result).toBeDefined();
      expect(result.query).toBe('iphone');
      expect(result.products).toBeDefined();
      expect(result.paging).toBeDefined();
    });

    it('should return Product entities', async () => {
      const result = await repository.search('iphone', 10, 0);

      expect(result.products.length).toBeGreaterThan(0);
      expect(result.products[0]).toHaveProperty('id');
      expect(result.products[0]).toHaveProperty('title');
      expect(result.products[0]).toHaveProperty('price');
    });

    it('should return empty results for unknown query', async () => {
      const result = await repository.search('xyzabc123', 10, 0);

      expect(result.products).toHaveLength(0);
      expect(result.paging.total).toBe(0);
    });

    it('should simulate delay', async () => {
      const start = Date.now();
      await repository.search('iphone', 10, 0);
      const duration = Date.now() - start;

      // Should take at least MIN_DELAY
      expect(duration).toBeGreaterThanOrEqual(200);
    });
  });

  describe('findById', () => {
    it('should return Product entity for valid ID', async () => {
      const product = await repository.findById('MLA123456789');

      expect(product).toBeDefined();
      expect(product.id).toBe('MLA123456789');
      expect(product.title).toBeDefined();
    });

    it('should throw ProductNotFoundException for invalid ID', async () => {
      await expect(repository.findById('MLA999999999')).rejects.toThrow(ProductNotFoundException);
    });

    it('should return Product with domain methods', async () => {
      const product = await repository.findById('MLA123456789');

      expect(typeof product.hasDiscount).toBe('function');
      expect(typeof product.hasFreeShipping).toBe('function');
      expect(typeof product.isNew).toBe('function');
    });

    it('should simulate delay', async () => {
      const start = Date.now();
      await repository.findById('MLA123456789');
      const duration = Date.now() - start;

      // Should take at least MIN_DELAY
      expect(duration).toBeGreaterThanOrEqual(200);
    });
  });
});
```

### 9. `infrastructure/persistence/mock/data/index.ts`

```typescript
export * as searchIphoneData from './products-search-iphone.json';
export * as productsDetailData from './products-detail.json';
```

### 10. `infrastructure/index.ts`

```typescript
export * from './persistence/mock/mock.module';
export * from './config/mock.config';
```

## 🧪 Criterios de Aceptación

- [ ] Archivos JSON de mock data creados y validados
- [ ] Mock data cumple con interfaces de `@meli/shared-types`
- [ ] `MockDataService` implementado con búsqueda y paginación
- [ ] `MockProductRepository` implementa `IProductRepository` correctamente
- [ ] Delays simulados funcionando (200-800ms)
- [ ] Excepciones del dominio lanzadas correctamente
- [ ] `MockModule` configurado con providers correctos
- [ ] Tests unitarios de `MockDataService` con cobertura >= 80%
- [ ] Tests de integración de `MockProductRepository`
- [ ] Búsqueda case-insensitive funcionando
- [ ] Paginación funcionando correctamente
- [ ] Fuzzy matching implementado
- [ ] JSDoc completo en servicios y repositorio
- [ ] TypeScript compila sin errores
- [ ] Linter sin warnings

## 🔗 Dependencias

- **Depende de**:
  - PRP-002 (Backend - Arquitectura y Setup NestJS)
  - PRP-003 (Shared Types Package)
  - PRP-004 (Backend - Dominio y Casos de Uso)
- **Requerido para**:
  - PRP-006 (Backend - Presentation Layer y Controllers)

## 📚 Referencias

- [NestJS - Custom Providers](https://docs.nestjs.com/fundamentals/custom-providers)
- [NestJS - Modules](https://docs.nestjs.com/modules)
- [Dependency Injection Pattern](https://martinfowler.com/articles/injection.html)
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)

## 💡 Notas Adicionales

### Datos Mock Realistas

Los datos mock están basados en respuestas reales de la API de Mercado Libre para garantizar que la estructura sea idéntica a la producción.

### Simulación de Delays

Los delays simulados (200-800ms) representan latencias de red realistas y ayudan a:

- Probar estados de loading en el frontend
- Simular condiciones de red variables
- Detectar race conditions

### Fuzzy Matching

El fuzzy matching permite que búsquedas como "iphone 13" encuentren resultados aunque el dataset esté indexado como "iphone".

### Error Simulation

La simulación de errores está deshabilitada por defecto pero puede activarse para:

- Probar manejo de errores en el frontend
- Validar retry logic
- Simular fallos de red

### Extensibilidad

Para agregar más datos mock:

1. Crear nuevo archivo JSON en `data/`
2. Agregar al `MockDataService` en el método `loadMockData()`
3. Actualizar tests

### Próximos Pasos

Después de este PRP:

1. Implementar la capa de presentación (Controllers)
2. Conectar todo con módulos de NestJS
3. Agregar documentación Swagger
4. Implementar filtros de excepción HTTP
