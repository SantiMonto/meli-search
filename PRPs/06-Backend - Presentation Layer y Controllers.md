# PRP-006: Backend - Presentation Layer y Controllers

## 🎯 Objetivo

Implementar la capa de presentación del backend que expone la lógica de negocio a través de endpoints REST. Esta capa incluirá controllers, DTOs de presentación, filtros de excepciones, interceptores, pipes de validación, y documentación Swagger/OpenAPI.

## 📋 Contexto

La capa de presentación es la interfaz entre el mundo exterior (HTTP) y la lógica de negocio. Transforma requests HTTP en comandos del dominio y responses del dominio en respuestas HTTP. Debe ser delgada, delegando toda la lógica a los casos de uso.

## 🏗️ Arquitectura - Capa de Presentación

```
┌─────────────────────────────────────────────────────────────┐
│              HTTP CLIENT (Frontend)                         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              PRESENTATION LAYER                             │
│                                                             │
│  ┌────────────────────────────────────────────────┐        │
│  │         Global Exception Filter                │        │
│  │  - Captura excepciones del dominio             │        │
│  │  - Convierte a HTTP responses                  │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Validation Pipe                        │        │
│  │  - Valida DTOs con class-validator             │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Controllers                            │        │
│  │  - ProductsController                          │        │
│  │    GET /api/v1/products/search                 │        │
│  │    GET /api/v1/products/:id                    │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                  │
│  ┌────────────────────────────────────────────────┐        │
│  │         Response DTOs                          │        │
│  │  - SearchResultResponseDto                     │        │
│  │  - ProductDetailResponseDto                    │        │
│  │  - ErrorResponseDto                            │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   DOMAIN LAYER                              │
│              (Use Cases & Entities)                         │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas

```
apps/backend/src/
├── presentation/                          # Capa de presentación
│   ├── controllers/                       # Controllers HTTP
│   │   ├── products/
│   │   │   ├── products.controller.ts
│   │   │   ├── dto/
│   │   │   │   ├── search-query.dto.ts
│   │   │   │   ├── product-id-param.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── __tests__/
│   │   │       └── products.controller.spec.ts
│   │   ├── health/
│   │   │   └── health.controller.ts
│   │   └── index.ts
│   │
│   ├── dto/                               # Response DTOs
│   │   ├── responses/
│   │   │   ├── search-result.response.dto.ts
│   │   │   ├── product-detail.response.dto.ts
│   │   │   ├── product-list-item.response.dto.ts
│   │   │   ├── error.response.dto.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── filters/                           # Exception filters
│   │   ├── http-exception.filter.ts
│   │   ├── domain-exception.filter.ts
│   │   ├── all-exceptions.filter.ts
│   │   └── index.ts
│   │
│   ├── interceptors/                      # Interceptors
│   │   ├── logging.interceptor.ts
│   │   ├── transform.interceptor.ts
│   │   └── index.ts
│   │
│   ├── pipes/                             # Custom pipes
│   │   ├── validation.pipe.ts
│   │   └── index.ts
│   │
│   └── modules/                           # Feature modules
│       ├── products/
│       │   └── products.module.ts
│       └── index.ts
│
├── app.module.ts                          # Root module
└── main.ts                                # Bootstrap
```

## 🔧 Tecnologías

### Core

- **NestJS**: Framework base
- **@nestjs/swagger**: Documentación OpenAPI
- **@nestjs/common**: Decoradores y utilities
- **class-validator**: Validación de DTOs
- **class-transformer**: Transformación de datos

### Dev Dependencies

- **@nestjs/testing**: Testing
- **supertest**: E2E testing

## ✅ Tareas Específicas

### Fase 1: Response DTOs

1. [ ] Crear `ProductListItemResponseDto`
2. [ ] Crear `ProductDetailResponseDto`
3. [ ] Crear `SearchResultResponseDto`
4. [ ] Crear `ErrorResponseDto`
5. [ ] Agregar decoradores de Swagger

### Fase 2: Request DTOs y Validación

6. [ ] Crear `SearchQueryDto` con validaciones
7. [ ] Crear `ProductIdParamDto` con validaciones
8. [ ] Configurar `ValidationPipe` global

### Fase 3: Exception Filters

9. [ ] Crear `DomainExceptionFilter` para excepciones del dominio
10. [ ] Crear `HttpExceptionFilter` para excepciones HTTP
11. [ ] Crear `AllExceptionsFilter` como fallback
12. [ ] Configurar filtros globalmente

### Fase 4: Interceptors

13. [ ] Crear `LoggingInterceptor` para logging de requests
14. [ ] Crear `TransformInterceptor` para transformar responses
15. [ ] Configurar interceptors globalmente

### Fase 5: Controllers

16. [ ] Implementar `ProductsController` con endpoints
17. [ ] Implementar `HealthController` para health checks
18. [ ] Agregar decoradores de Swagger
19. [ ] Configurar CORS

### Fase 6: Modules

20. [ ] Crear `ProductsModule` con providers
21. [ ] Configurar `AppModule` con imports
22. [ ] Configurar Swagger en `main.ts`

### Fase 7: Testing

23. [ ] Tests unitarios de controllers
24. [ ] Tests E2E de endpoints
25. [ ] Tests de exception filters
26. [ ] Tests de interceptors

### Fase 8: Documentación

27. [ ] Configurar Swagger UI
28. [ ] Documentar todos los endpoints
29. [ ] Agregar ejemplos de responses
30. [ ] Crear README de API

## 📝 Implementación Detallada

### 1. `presentation/dto/responses/product-list-item.response.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IProductListItem, ProductCondition, Currency } from '@meli/shared-types';

/**
 * Product list item response DTO
 * Used in search results
 */
export class ProductListItemResponseDto implements IProductListItem {
  @ApiProperty({
    description: 'Product ID',
    example: 'MLA123456789',
  })
  id: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Apple iPhone 13 (128 GB) - Medianoche',
  })
  title: string;

  @ApiProperty({
    description: 'Product price',
    example: 1367999,
  })
  price: number;

  @ApiProperty({
    description: 'Currency ID',
    enum: Currency,
    example: Currency.ARS,
  })
  currencyId: Currency;

  @ApiProperty({
    description: 'Product condition',
    enum: ProductCondition,
    example: ProductCondition.NEW,
  })
  condition: ProductCondition;

  @ApiProperty({
    description: 'Thumbnail URL',
    example: 'https://http2.mlstatic.com/D_NQ_NP_2X_123456-MLA123456789-012023-F.webp',
    required: false,
  })
  thumbnail?: string;

  @ApiProperty({
    description: 'Shipping information',
    required: false,
  })
  shipping?: {
    freeShipping: boolean;
    mode?: string;
    logisticType?: string;
    storePickUp?: boolean;
  };

  @ApiProperty({
    description: 'Installment information',
    required: false,
  })
  installments?: {
    quantity: number;
    amount: number;
    rate?: number;
    currencyId?: Currency;
  };

  @ApiProperty({
    description: 'Product reviews',
    required: false,
  })
  reviews?: {
    ratingAverage: number;
    total: number;
  };
}
```

### 2. `presentation/dto/responses/product-detail.response.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IProductDetail, ProductCondition, Currency } from '@meli/shared-types';

/**
 * Product detail response DTO
 * Full product information
 */
export class ProductDetailResponseDto implements IProductDetail {
  @ApiProperty({ description: 'Product ID', example: 'MLA123456789' })
  id: string;

  @ApiProperty({
    description: 'Product title',
    example: 'Apple iPhone 13 (128 GB) - Medianoche',
  })
  title: string;

  @ApiProperty({ description: 'Current price', example: 1367999 })
  price: number;

  @ApiProperty({
    description: 'Original price (before discount)',
    example: 1523244.99,
    required: false,
  })
  originalPrice?: number;

  @ApiProperty({ enum: Currency, example: Currency.ARS })
  currencyId: Currency;

  @ApiProperty({ description: 'Available quantity', example: 15, required: false })
  availableQuantity?: number;

  @ApiProperty({ description: 'Sold quantity', example: 342, required: false })
  soldQuantity?: number;

  @ApiProperty({ enum: ProductCondition, example: ProductCondition.NEW })
  condition: ProductCondition;

  @ApiProperty({
    description: 'Product permalink',
    example: 'https://www.mercadolibre.com.ar/p/MLA123456789',
    required: false,
  })
  permalink?: string;

  @ApiProperty({
    description: 'Product pictures',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        url: { type: 'string' },
      },
    },
    required: false,
  })
  pictures?: Array<{ id: string; url: string }>;

  @ApiProperty({ description: 'Installment information', required: false })
  installments?: {
    quantity: number;
    amount: number;
    rate?: number;
    currencyId?: Currency;
  };

  @ApiProperty({ description: 'Shipping information', required: false })
  shipping?: {
    freeShipping: boolean;
    mode?: string;
    logisticType?: string;
    storePickUp?: boolean;
  };

  @ApiProperty({ description: 'Seller address', required: false })
  sellerAddress?: {
    city: { name: string };
    state: { name: string };
  };

  @ApiProperty({
    description: 'Product attributes',
    type: 'array',
    required: false,
  })
  attributes?: Array<{
    id: string;
    name: string;
    valueName: string;
  }>;

  @ApiProperty({
    description: 'Warranty information',
    example: 'Garantía del vendedor: 12 meses',
    required: false,
  })
  warranty?: string;

  @ApiProperty({
    description: 'Product description',
    example: 'El iPhone 13 viene con el sistema de dos cámaras...',
    required: false,
  })
  description?: string;

  @ApiProperty({ description: 'Product reviews', required: false })
  reviews?: {
    ratingAverage: number;
    total: number;
  };
}
```

### 3. `presentation/dto/responses/search-result.response.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { ISearchResultResponse } from '@meli/shared-types';
import { ProductListItemResponseDto } from './product-list-item.response.dto';

/**
 * Paging information
 */
class PagingDto {
  @ApiProperty({ description: 'Total results', example: 1500 })
  total: number;

  @ApiProperty({ description: 'Current offset', example: 0 })
  offset: number;

  @ApiProperty({ description: 'Results per page', example: 10 })
  limit: number;
}

/**
 * Search result response DTO
 */
export class SearchResultResponseDto implements ISearchResultResponse {
  @ApiProperty({
    description: 'Search query',
    example: 'iphone',
  })
  query: string;

  @ApiProperty({
    description: 'Search results',
    type: [ProductListItemResponseDto],
  })
  results: ProductListItemResponseDto[];

  @ApiProperty({
    description: 'Pagination information',
    type: PagingDto,
  })
  paging: PagingDto;
}
```

### 4. `presentation/dto/responses/error.response.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IErrorResponse, ErrorCode } from '@meli/shared-types';

/**
 * Error response DTO
 */
export class ErrorResponseDto implements IErrorResponse {
  @ApiProperty({
    description: 'HTTP status code',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/v1/products/MLA123',
  })
  path: string;

  @ApiProperty({
    description: 'HTTP method',
    example: 'GET',
  })
  method: string;

  @ApiProperty({
    description: 'Error message',
    example: 'Product with ID MLA123 not found',
  })
  message: string;

  @ApiProperty({
    description: 'Error name',
    example: 'Not Found',
    required: false,
  })
  error?: string;

  @ApiProperty({
    description: 'Error code',
    enum: ErrorCode,
    example: ErrorCode.PRODUCT_NOT_FOUND,
    required: false,
  })
  code?: ErrorCode;

  @ApiProperty({
    description: 'Additional error details',
    required: false,
  })
  details?: Record<string, unknown>;
}
```

### 5. `presentation/controllers/products/dto/search-query.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PAGINATION } from '@meli/shared-types';

/**
 * Search query DTO
 */
export class SearchQueryDto {
  @ApiProperty({
    description: 'Search query term',
    example: 'iphone',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  q: string;

  @ApiProperty({
    description: 'Number of results per page',
    example: 10,
    minimum: PAGINATION.MIN_LIMIT,
    maximum: PAGINATION.MAX_LIMIT,
    default: PAGINATION.DEFAULT_LIMIT,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION.MIN_LIMIT)
  @Max(PAGINATION.MAX_LIMIT)
  limit?: number = PAGINATION.DEFAULT_LIMIT;

  @ApiProperty({
    description: 'Pagination offset',
    example: 0,
    minimum: PAGINATION.MIN_OFFSET,
    default: PAGINATION.DEFAULT_OFFSET,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(PAGINATION.MIN_OFFSET)
  offset?: number = PAGINATION.DEFAULT_OFFSET;
}
```

### 6. `presentation/controllers/products/dto/product-id-param.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { PRODUCT_ID_PATTERN } from '@meli/shared-types';

/**
 * Product ID parameter DTO
 */
export class ProductIdParamDto {
  @ApiProperty({
    description: 'Product ID',
    example: 'MLA123456789',
    pattern: PRODUCT_ID_PATTERN.source,
  })
  @IsString()
  @Matches(PRODUCT_ID_PATTERN, {
    message: 'Invalid product ID format. Expected format: MLA followed by numbers',
  })
  id: string;
}
```

### 7. `presentation/filters/domain-exception.filter.ts`

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { ProductNotFoundException } from '../../../domain/exceptions/product-not-found.exception';
import { InvalidSearchQueryException } from '../../../domain/exceptions/invalid-search-query.exception';
import { ErrorResponseDto } from '../../dto/responses/error.response.dto';
import { ErrorCode } from '@meli/shared-types';

/**
 * Domain Exception Filter
 * Catches domain exceptions and converts them to HTTP responses
 */
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Map domain exceptions to HTTP status codes
    const statusCode = this.getHttpStatus(exception);

    const errorResponse: ErrorResponseDto = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message,
      error: exception.name,
      code: exception.code as ErrorCode,
    };

    this.logger.error(
      `Domain Exception: ${exception.name} - ${exception.message}`,
      exception.stack,
    );

    response.status(statusCode).json(errorResponse);
  }

  /**
   * Map domain exception to HTTP status code
   */
  private getHttpStatus(exception: DomainException): number {
    if (exception instanceof ProductNotFoundException) {
      return HttpStatus.NOT_FOUND;
    }

    if (exception instanceof InvalidSearchQueryException) {
      return HttpStatus.BAD_REQUEST;
    }

    // Default to 500 for unknown domain exceptions
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
```

### 8. `presentation/filters/all-exceptions.filter.ts`

```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ErrorResponseDto } from '../../dto/responses/error.response.dto';

/**
 * All Exceptions Filter
 * Catches all unhandled exceptions as a fallback
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof Error ? exception.message : 'Internal server error';

    const errorResponse: ErrorResponseDto = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error: exception instanceof Error ? exception.name : 'Error',
    };

    this.logger.error(
      `Unhandled Exception: ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(statusCode).json(errorResponse);
  }
}
```

### 9. `presentation/interceptors/logging.interceptor.ts`

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

/**
 * Logging Interceptor
 * Logs all incoming requests and outgoing responses
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, ip } = request;
    const userAgent = request.get('user-agent') || '';

    const now = Date.now();

    this.logger.log(`→ ${method} ${url} - ${ip} - ${userAgent}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const responseTime = Date.now() - now;
          this.logger.log(`← ${method} ${url} - ${responseTime}ms`);
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          this.logger.error(`← ${method} ${url} - ${responseTime}ms - Error: ${error.message}`);
        },
      }),
    );
  }
}
```

### 10. `presentation/interceptors/transform.interceptor.ts`

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { instanceToPlain } from 'class-transformer';

/**
 * Transform Interceptor
 * Transforms class instances to plain objects for JSON serialization
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Transform class instances to plain objects
        return instanceToPlain(data);
      }),
    );
  }
}
```

### 11. `presentation/controllers/products/products.controller.ts`

```typescript
import { Controller, Get, Query, Param, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { SearchProductsUseCase } from '../../../domain/use-cases/search-products/search-products.usecase';
import { GetProductDetailUseCase } from '../../../domain/use-cases/get-product-detail/get-product-detail.usecase';
import { SearchQueryDto } from './dto/search-query.dto';
import { ProductIdParamDto } from './dto/product-id-param.dto';
import { SearchResultResponseDto } from '../../dto/responses/search-result.response.dto';
import { ProductDetailResponseDto } from '../../dto/responses/product-detail.response.dto';
import { ErrorResponseDto } from '../../dto/responses/error.response.dto';

/**
 * Products Controller
 * Handles product-related HTTP requests
 */
@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    private readonly searchProductsUseCase: SearchProductsUseCase,
    private readonly getProductDetailUseCase: GetProductDetailUseCase,
  ) {}

  /**
   * Search products
   * GET /api/v1/products/search?q=iphone&limit=10&offset=0
   */
  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search products',
    description: 'Search products by query with pagination',
  })
  @ApiQuery({
    name: 'q',
    description: 'Search query term',
    example: 'iphone',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Results per page',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    description: 'Pagination offset',
    required: false,
    example: 0,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Search results',
    type: SearchResultResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid query',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async search(@Query() query: SearchQueryDto): Promise<SearchResultResponseDto> {
    this.logger.debug(`Searching products: ${JSON.stringify(query)}`);

    // Execute use case
    const searchResult = await this.searchProductsUseCase.execute({
      query: query.q,
      limit: query.limit,
      offset: query.offset,
    });

    // Convert to response DTO
    return searchResult.toResponse() as SearchResultResponseDto;
  }

  /**
   * Get product detail
   * GET /api/v1/products/:id
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get product detail',
    description: 'Get detailed information about a specific product',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 'MLA123456789',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product details',
    type: ProductDetailResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid product ID',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: ErrorResponseDto,
  })
  async getById(@Param() params: ProductIdParamDto): Promise<ProductDetailResponseDto> {
    this.logger.debug(`Getting product detail: ${params.id}`);

    // Execute use case
    const product = await this.getProductDetailUseCase.execute({
      id: params.id,
    });

    // Convert to response DTO
    return product.toDetail() as ProductDetailResponseDto;
  }
}
```

### 12. `presentation/controllers/health/health.controller.ts`

```typescript
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Health check response
 */
interface HealthCheckResponse {
  status: 'ok';
  timestamp: string;
  uptime: number;
  environment: string;
}

/**
 * Health Controller
 * Provides health check endpoint
 */
@ApiTags('health')
@Controller('api/v1/health')
export class HealthController {
  /**
   * Health check endpoint
   * GET /api/v1/health
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Health check',
    description: 'Check if the API is running',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'API is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2024-01-15T10:30:00.000Z' },
        uptime: { type: 'number', example: 12345.67 },
        environment: { type: 'string', example: 'development' },
      },
    },
  })
  check(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
```

### 13. `presentation/modules/products/products.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ProductsController } from '../../controllers/products/products.controller';
import { SearchProductsUseCase } from '../../../domain/use-cases/search-products/search-products.usecase';
import { GetProductDetailUseCase } from '../../../domain/use-cases/get-product-detail/get-product-detail.usecase';
import { MockModule } from '../../../infrastructure/persistence/mock/mock.module';

/**
 * Products Module
 * Provides product-related functionality
 */
@Module({
  imports: [MockModule],
  controllers: [ProductsController],
  providers: [SearchProductsUseCase, GetProductDetailUseCase],
})
export class ProductsModule {}
```

### 14. `app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ProductsModule } from './presentation/modules/products/products.module';
import { HealthController } from './presentation/controllers/health/health.controller';
import { DomainExceptionFilter } from './presentation/filters/domain-exception.filter';
import { AllExceptionsFilter } from './presentation/filters/all-exceptions.filter';
import { LoggingInterceptor } from './presentation/interceptors/logging.interceptor';
import { TransformInterceptor } from './presentation/interceptors/transform.interceptor';

/**
 * App Module
 * Root module of the application
 */
@Module({
  imports: [ProductsModule],
  controllers: [HealthController],
  providers: [
    // Global validation pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // Strip properties that don't have decorators
        forbidNonWhitelisted: true, // Throw error if non-whitelisted properties
        transform: true, // Transform payloads to DTO instances
        transformOptions: {
          enableImplicitConversion: true, // Convert types automatically
        },
      }),
    },
    // Global exception filters (order matters!)
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // Global interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
```

### 15. `main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Mercado Libre Challenge API')
    .setDescription('API for searching and viewing products - Mercado Libre Technical Challenge')
    .setVersion('1.0')
    .addTag('products', 'Product search and details')
    .addTag('health', 'Health check endpoints')
    .addServer('http://localhost:3001', 'Local development')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'ML Challenge API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
```

### 16. `presentation/controllers/products/__tests__/products.controller.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { SearchProductsUseCase } from '../../../../domain/use-cases/search-products/search-products.usecase';
import { GetProductDetailUseCase } from '../../../../domain/use-cases/get-product-detail/get-product-detail.usecase';
import { SearchResult } from '../../../../domain/entities/search-result.entity';
import { Product } from '../../../../domain/entities/product.entity';
import { Paging } from '../../../../domain/entities/paging.entity';
import { ProductCondition, Currency } from '@meli/shared-types';
import { ProductNotFoundException } from '../../../../domain/exceptions/product-not-found.exception';

describe('ProductsController', () => {
  let controller: ProductsController;
  let searchUseCase: jest.Mocked<SearchProductsUseCase>;
  let getDetailUseCase: jest.Mocked<GetProductDetailUseCase>;

  beforeEach(async () => {
    const mockSearchUseCase = {
      execute: jest.fn(),
    };

    const mockGetDetailUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: SearchProductsUseCase,
          useValue: mockSearchUseCase,
        },
        {
          provide: GetProductDetailUseCase,
          useValue: mockGetDetailUseCase,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    searchUseCase = module.get(SearchProductsUseCase);
    getDetailUseCase = module.get(GetProductDetailUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should return search results', async () => {
      const mockSearchResult = new SearchResult('iphone', [], new Paging(100, 0, 10));

      searchUseCase.execute.mockResolvedValue(mockSearchResult);

      const result = await controller.search({
        q: 'iphone',
        limit: 10,
        offset: 0,
      });

      expect(result.query).toBe('iphone');
      expect(result.paging.total).toBe(100);
      expect(searchUseCase.execute).toHaveBeenCalledWith({
        query: 'iphone',
        limit: 10,
        offset: 0,
      });
    });
  });

  describe('getById', () => {
    it('should return product detail', async () => {
      const mockProduct = new Product(
        'MLA123456789',
        'iPhone 13',
        1000,
        Currency.ARS,
        ProductCondition.NEW,
      );

      getDetailUseCase.execute.mockResolvedValue(mockProduct);

      const result = await controller.getById({ id: 'MLA123456789' });

      expect(result.id).toBe('MLA123456789');
      expect(result.title).toBe('iPhone 13');
      expect(getDetailUseCase.execute).toHaveBeenCalledWith({
        id: 'MLA123456789',
      });
    });

    it('should throw ProductNotFoundException for invalid ID', async () => {
      getDetailUseCase.execute.mockRejectedValue(new ProductNotFoundException('MLA999999999'));

      await expect(controller.getById({ id: 'MLA999999999' })).rejects.toThrow(
        ProductNotFoundException,
      );
    });
  });
});
```

### 17. `.env.example`

```env
# Server
PORT=3001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# API
API_VERSION=v1
```

## 🧪 Criterios de Aceptación

- [ ] Todos los Response DTOs creados con decoradores Swagger
- [ ] Request DTOs con validaciones de class-validator
- [ ] `ValidationPipe` configurado globalmente
- [ ] `DomainExceptionFilter` captura excepciones del dominio
- [ ] `AllExceptionsFilter` como fallback
- [ ] `LoggingInterceptor` registra requests/responses
- [ ] `TransformInterceptor` transforma responses
- [ ] `ProductsController` con endpoints funcionando
- [ ] `HealthController` implementado
- [ ] `ProductsModule` configurado correctamente
- [ ] `AppModule` con providers globales
- [ ] Swagger UI funcionando en `/api/docs`
- [ ] CORS configurado
- [ ] Tests unitarios de controllers >= 80% coverage
- [ ] Tests E2E de endpoints
- [ ] Documentación Swagger completa
- [ ] TypeScript compila sin errores
- [ ] Linter sin warnings

## 🔗 Dependencias

- **Depende de**:
  - PRP-002 (Backend - Arquitectura y Setup NestJS)
  - PRP-003 (Shared Types Package)
  - PRP-004 (Backend - Dominio y Casos de Uso)
  - PRP-005 (Backend - Infraestructura y Mock Data)
- **Requerido para**:
  - PRP-007 (Frontend - Arquitectura y Setup Next.js)

## 📚 Referencias

- [NestJS - Controllers](https://docs.nestjs.com/controllers)
- [NestJS - Exception Filters](https://docs.nestjs.com/exception-filters)
- [NestJS - Interceptors](https://docs.nestjs.com/interceptors)
- [NestJS - Pipes](https://docs.nestjs.com/pipes)
- [NestJS - OpenAPI (Swagger)](https://docs.nestjs.com/openapi/introduction)
- [class-validator](https://github.com/typestack/class-validator)

## 💡 Notas Adicionales

### Orden de Ejecución de Filtros

Los filtros se ejecutan en el orden inverso al que se registran:

1. `AllExceptionsFilter` (último registrado, primero en ejecutarse)
2. `DomainExceptionFilter` (primero registrado, segundo en ejecutarse)

### Validación Automática

El `ValidationPipe` global valida automáticamente todos los DTOs de entrada usando decoradores de `class-validator`.

### Swagger UI

Accesible en `http://localhost:3001/api/docs` con documentación interactiva completa.

### CORS

Configurado para permitir requests desde el frontend (Next.js en puerto 3000).

### Logging

El `LoggingInterceptor` registra:

- Request: método, URL, IP, user-agent
- Response: tiempo de respuesta
- Errors: mensaje de error

### Error Handling

Tres capas de manejo de errores:

1. **Domain Exceptions**: Convertidas a HTTP responses apropiados
2. **HTTP Exceptions**: Manejadas por NestJS
3. **Unknown Exceptions**: Capturadas por `AllExceptionsFilter`

### Testing Strategy

- **Unit Tests**: Controllers con mocks de use cases
- **E2E Tests**: Endpoints completos con supertest
- **Integration Tests**: Filtros e interceptors

### Próximos Pasos

¡El backend está completo! Ahora podemos pasar al frontend:

1. PRP-007: Frontend - Arquitectura y Setup Next.js
2. PRP-008: Frontend - Core Domain Layer
3. PRP-009: Frontend - Infrastructure Layer
4. Y así sucesivamente...
