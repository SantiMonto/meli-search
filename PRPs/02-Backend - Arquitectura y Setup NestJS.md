# PRP-002: Backend - Arquitectura y Setup NestJS

## 🎯 Objetivo

Implementar la arquitectura hexagonal (Ports & Adapters) en el backend NestJS, establecer la estructura de módulos, configurar DTOs con validación, implementar Swagger/OpenAPI para documentación de la API, y preparar la base para los casos de uso de búsqueda y detalle de productos.

## 📋 Contexto

El backend actuará como un servicio mock que simula la API de Mercado Libre. Debe exponer endpoints REST bien documentados, validar datos de entrada, y estar preparado para implementar la lógica de negocio en los siguientes PRPs. La arquitectura hexagonal nos permitirá separar la lógica de dominio de los detalles de implementación, facilitando el testing y mantenimiento.

## 🏗️ Arquitectura Hexagonal para NestJS

```
┌─────────────────────────────────────────────────────────────┐
│                     INFRASTRUCTURE LAYER                     │
│  apps/backend/src/infrastructure/                           │
│  ├── controllers/      (HTTP/REST)                         │
│  ├── repositories/     (Mock Implementations)              │
│  └── config/           (Configuration)                     │
└───────────┼──────────────────┼───────────────────┼──────────┘
            │                  │                   │
            │                  ▼                   │
┌───────────┼──────────────────────────────────────┼──────────┐
│           │          APPLICATION LAYER           │          │
│           │   apps/backend/src/domain/use-cases/         │
│           └──▶│      Use Cases/Services  │◀─────┘          │
│               │  - SearchProductsUseCase │                  │
│               │  - GetProductDetailUseCase│                 │
│               └────────────┬─────────────┘                  │
└────────────────────────────┼────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        DOMAIN LAYER                          │
│  apps/backend/src/domain/                                    │
│  ├── entities/         (Core Models)                       │
│  ├── repositories/     (Ports/Interfaces)                  │
│  └── value-objects/    (Domain Values)                     │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura Detallada de Carpetas Backend

```
apps/backend/
├── src/
│   ├── app.module.ts                    # Main Application Module
│   ├── main.ts                          # Entry Point
│   │
│   ├── domain/                          # Domain Layer (Business Logic)
│   │   ├── entities/                    # Core Entities
│   │   │   ├── product.entity.ts
│   │   │   └── search-result.entity.ts
│   │   ├── repositories/                # Repository Interfaces (Ports)
│   │   │   └── product.repository.interface.ts
│   │   ├── use-cases/                   # Application Use Cases
│   │   │   ├── search-products.use-case.ts
│   │   │   └── get-product-detail.use-case.ts
│   │   └── value-objects/               # Value Objects
│   │       └── price.vo.ts
│   │
│   ├── infrastructure/                  # Infrastructure Layer
│   │   ├── config/                      # Configuration
│   │   ├── controllers/                 # HTTP Controllers
│   │   │   └── products.controller.ts
│   │   ├── repositories/                # Repository Implementations
│   │   │   └── mock-product.repository.ts
│   │   └── persistence/                 # Data Persistence (Mock Data)
│   │
│   └── presentation/                    # Presentation Layer (Modules)
│       └── modules/
│           └── products/
│               └── products.module.ts
│
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Tecnologías y Librerías

### Core Dependencies

- **@nestjs/core**: ^10.3.0
- **@nestjs/common**: ^10.3.0
- **@nestjs/platform-express**: ^10.3.0
- **@nestjs/config**: ^3.1.1 - Manejo de configuración y variables de entorno
- **@nestjs/swagger**: ^7.1.17 - Documentación OpenAPI
- **@nestjs/throttler**: ^5.0.1 - Rate limiting
- **class-validator**: ^0.14.0 - Validación de DTOs
- **class-transformer**: ^0.5.1 - Transformación de objetos
- **rxjs**: ^7.8.0

### Development Dependencies

- **@nestjs/cli**: ^10.2.0
- **@nestjs/testing**: ^10.3.0
- **@types/express**: ^4.17.17
- **@types/jest**: ^29.5.2
- **@types/node**: ^20.3.1
- **@types/supertest**: ^6.0.0
- **jest**: ^29.5.0
- **supertest**: ^6.3.3
- **ts-jest**: ^29.1.0

## ✅ Tareas Específicas

### Fase 1: Configuración Base

1. [ ] Instalar dependencias necesarias
2. [ ] Configurar variables de entorno (.env files)
3. [ ] Configurar @nestjs/config
4. [ ] Configurar validación de schema con Joi
5. [ ] Configurar CORS y seguridad básica

### Fase 2: Configuración de Swagger

6. [ ] Instalar @nestjs/swagger
7. [ ] Configurar Swagger en main.ts
8. [ ] Crear decoradores personalizados para documentación
9. [ ] Configurar metadata y tags

### Fase 3: Common Layer (Infraestructura Compartida)

10. [ ] Crear filtros de excepciones globales
11. [ ] Crear interceptores (logging, transform)
12. [ ] Configurar pipes de validación
13. [ ] Configurar throttling/rate limiting

### Fase 4: Domain Layer - Entities

14. [ ] Crear entidad Product
15. [ ] Crear entidad SearchResult
16. [ ] Crear entidades relacionadas (Shipping, Installment, Review)
17. [ ] Crear Value Objects (Price, ProductId)
18. [ ] Crear interfaces de repositorios (ports)

### Fase 5: Application Layer - DTOs

19. [ ] Crear DTOs de request (SearchProductsDto)
20. [ ] Crear DTOs de response (ProductListResponseDto, ProductDetailResponseDto)
21. [ ] Agregar validaciones con class-validator
22. [ ] Agregar decoradores de Swagger a DTOs

### Fase 6: Application Layer - Services

23. [ ] Crear SearchProductsService
24. [ ] Crear GetProductDetailService
25. [ ] Implementar lógica de negocio básica
26. [ ] Crear mappers para transformación de datos

### Fase 7: Infrastructure Layer

27. [ ] Crear ProductsController con endpoints REST
28. [ ] Documentar endpoints con Swagger decorators
29. [ ] Implementar MockProductRepository
30. [ ] Crear datos mock basados en el JSON proporcionado

### Fase 8: Module Configuration

31. [ ] Crear ProductsModule
32. [ ] Configurar inyección de dependencias
33. [ ] Crear HealthModule para health checks
34. [ ] Integrar módulos en AppModule

### Fase 9: Testing Setup

35. [ ] Configurar Jest para unit tests
36. [ ] Configurar Jest para e2e tests
37. [ ] Crear tests de ejemplo
38. [ ] Configurar coverage thresholds

### Fase 10: Documentación

39. [ ] Crear README.md del backend
40. [ ] Documentar arquitectura y decisiones
41. [ ] Documentar endpoints de la API
42. [ ] Crear ejemplos de uso

## 📝 Implementación Detallada

### 1. Actualizar `apps/backend/package.json`

```json
{
  "name": "@meli/backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\"",
    "lint:fix": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/config": "^3.1.1",
    "@nestjs/core": "^10.3.0",
    "@nestjs/platform-express": "^10.3.0",
    "@nestjs/swagger": "^7.1.17",
    "@nestjs/throttler": "^5.0.1",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "joi": "^17.11.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0"
  },
  "devDependencies": {
    "@meli/shared-types": "*",
    "@nestjs/cli": "^10.2.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.3.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^6.0.0",
    "jest": "^29.5.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s", "!**/*.module.ts", "!**/main.ts", "!**/*.interface.ts"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
      "^@meli/shared-types$": "<rootDir>/../../packages/shared-types/src"
    }
  }
}
```

### 2. `.env.example`

```env
# Application
NODE_ENV=development
PORT=3001
API_PREFIX=api/v1

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# Swagger
SWAGGER_ENABLED=true
SWAGGER_TITLE=Mercado Libre Challenge API
SWAGGER_DESCRIPTION=API documentation for Mercado Libre Challenge
SWAGGER_VERSION=1.0
SWAGGER_PATH=api/docs

# Mock Data
MOCK_DELAY_MS=500
```

### 3. `.env.development`

```env
NODE_ENV=development
PORT=3001
API_PREFIX=api/v1
CORS_ORIGIN=http://localhost:3000
THROTTLE_TTL=60
THROTTLE_LIMIT=100
SWAGGER_ENABLED=true
SWAGGER_TITLE=Mercado Libre Challenge API
SWAGGER_DESCRIPTION=API documentation for Mercado Libre Challenge
SWAGGER_VERSION=1.0
SWAGGER_PATH=api/docs
MOCK_DELAY_MS=500
```

### 4. `src/config/configuration.ts`

```typescript
export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3001,
    apiPrefix: process.env.API_PREFIX || 'api/v1',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100,
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
    title: process.env.SWAGGER_TITLE || 'Mercado Libre Challenge API',
    description: process.env.SWAGGER_DESCRIPTION || 'API documentation',
    version: process.env.SWAGGER_VERSION || '1.0',
    path: process.env.SWAGGER_PATH || 'api/docs',
  },
  mock: {
    delayMs: parseInt(process.env.MOCK_DELAY_MS, 10) || 500,
  },
});
```

### 5. `src/config/validation.schema.ts`

```typescript
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3001),
  API_PREFIX: Joi.string().default('api/v1'),
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(100),
  SWAGGER_ENABLED: Joi.boolean().default(true),
  SWAGGER_TITLE: Joi.string().default('API'),
  SWAGGER_DESCRIPTION: Joi.string().default('API documentation'),
  SWAGGER_VERSION: Joi.string().default('1.0'),
  SWAGGER_PATH: Joi.string().default('api/docs'),
  MOCK_DELAY_MS: Joi.number().default(500),
});
```

### 6. `src/config/swagger.config.ts`

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService);
  const swaggerEnabled = configService.get<boolean>('swagger.enabled');

  if (!swaggerEnabled) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription(configService.get<string>('swagger.description'))
    .setVersion(configService.get<string>('swagger.version'))
    .addTag('products', 'Product operations')
    .addTag('search', 'Search operations')
    .addTag('health', 'Health check operations')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = configService.get<string>('swagger.path');

  SwaggerModule.setup(swaggerPath, app, document, {
    customSiteTitle: 'MeLi Challenge API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  console.log(`📚 Swagger documentation available at: /${swaggerPath}`);
}
```

### 7. `src/common/filters/http-exception.filter.ts`

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || 'Internal server error',
      error:
        typeof exceptionResponse === 'object' && 'error' in exceptionResponse
          ? (exceptionResponse as any).error
          : HttpStatus[status],
    };

    response.status(status).json(errorResponse);
  }
}
```

### 8. `src/common/filters/all-exceptions.filter.ts`

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.message : 'Internal server error';

    console.error('Exception caught:', exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    });
  }
}
```

### 9. `src/common/interceptors/logging.interceptor.ts`

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        this.logger.log(`${method} ${url} ${response.statusCode} - ${delay}ms`);
      }),
    );
  }
}
```

### 10. `src/common/interceptors/transform.interceptor.ts`

```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

### 11. `src/common/decorators/api-response.decorator.ts`

```typescript
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccessResponse = <TModel extends Type<any>>(model: TModel, isArray = false) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  }
                : { $ref: getSchemaPath(model) },
              statusCode: { type: 'number', example: 200 },
              timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            },
          },
        ],
      },
    }),
  );
};

export const ApiErrorResponses = () => {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        properties: {
          statusCode: { type: 'number', example: 400 },
          timestamp: { type: 'string' },
          path: { type: 'string' },
          method: { type: 'string' },
          message: { type: 'string' },
          error: { type: 'string' },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
    }),
  );
};
```

### 12. `src/modules/products/domain/entities/product.entity.ts`

```typescript
import { Shipping } from './shipping.entity';
import { Installment } from './installment.entity';
import { Review } from './review.entity';

export class Product {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly price: number,
    public readonly currencyId: string,
    public readonly condition: 'new' | 'used',
    public readonly thumbnail?: string,
    public readonly pictures?: Array<{ id: string; url: string }>,
    public readonly availableQuantity?: number,
    public readonly soldQuantity?: number,
    public readonly originalPrice?: number,
    public readonly permalink?: string,
    public readonly shipping?: Shipping,
    public readonly installments?: Installment,
    public readonly reviews?: Review,
    public readonly attributes?: Array<{
      id: string;
      name: string;
      valueName: string;
    }>,
    public readonly warranty?: string,
    public readonly description?: string,
    public readonly sellerAddress?: {
      city: { name: string };
      state: { name: string };
    },
  ) {}

  get isFreeShipping(): boolean {
    return this.shipping?.freeShipping ?? false;
  }

  get hasDiscount(): boolean {
    return !!this.originalPrice && this.originalPrice > this.price;
  }

  get discountPercentage(): number {
    if (!this.hasDiscount) return 0;
    return Math.round(((this.originalPrice! - this.price) / this.originalPrice!) * 100);
  }

  get isAvailable(): boolean {
    return (this.availableQuantity ?? 0) > 0;
  }
}
```

### 13. `src/modules/products/domain/entities/search-result.entity.ts`

```typescript
import { Product } from './product.entity';

export class SearchResult {
  constructor(
    public readonly query: string,
    public readonly results: Product[],
    public readonly paging: {
      total: number;
      offset: number;
      limit: number;
    },
  ) {}

  get totalResults(): number {
    return this.paging.total;
  }

  get hasResults(): boolean {
    return this.results.length > 0;
  }

  get currentPage(): number {
    return Math.floor(this.paging.offset / this.paging.limit) + 1;
  }

  get totalPages(): number {
    return Math.ceil(this.paging.total / this.paging.limit);
  }
}
```

### 14. `src/modules/products/domain/entities/shipping.entity.ts`

```typescript
export class Shipping {
  constructor(
    public readonly freeShipping: boolean,
    public readonly mode?: string,
    public readonly logisticType?: string,
    public readonly storePickUp?: boolean,
  ) {}
}
```

### 15. `src/modules/products/domain/entities/installment.entity.ts`

```typescript
export class Installment {
  constructor(
    public readonly quantity: number,
    public readonly amount: number,
    public readonly rate?: number,
    public readonly currencyId?: string,
  ) {}

  get isInterestFree(): boolean {
    return this.rate === 0;
  }

  get totalAmount(): number {
    return this.quantity * this.amount;
  }
}
```

### 16. `src/modules/products/domain/entities/review.entity.ts`

```typescript
export class Review {
  constructor(
    public readonly ratingAverage: number,
    public readonly total: number,
  ) {}

  get hasReviews(): boolean {
    return this.total > 0;
  }

  get isHighlyRated(): boolean {
    return this.ratingAverage >= 4.5;
  }
}
```

### 17. `src/modules/products/domain/value-objects/price.vo.ts`

```typescript
export class Price {
  constructor(
    private readonly amount: number,
    private readonly currency: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.amount < 0) {
      throw new Error('Price amount cannot be negative');
    }
    if (!this.currency || this.currency.length !== 3) {
      throw new Error('Invalid currency code');
    }
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  format(): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
    }).format(this.amount);
  }

  equals(other: Price): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}
```

### 18. `src/modules/products/domain/value-objects/product-id.vo.ts`

```typescript
export class ProductId {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Product ID cannot be empty');
    }
    // Validar formato MLA seguido de números
    if (!/^MLA\d+$/.test(this.value)) {
      throw new Error('Invalid Product ID format. Expected format: MLA followed by numbers');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
```

### 19. `src/modules/products/domain/repositories/product.repository.interface.ts`

```typescript
import { Product } from '../entities/product.entity';
import { SearchResult } from '../entities/search-result.entity';

export interface IProductRepository {
  /**
   * Search products by query string
   * @param query Search term
   * @param limit Number of results per page
   * @param offset Pagination offset
   */
  search(query: string, limit: number, offset: number): Promise<SearchResult>;

  /**
   * Find a product by its ID
   * @param id Product ID
   */
  findById(id: string): Promise<Product | null>;

  /**
   * Get all products (for testing purposes)
   */
  findAll(): Promise<Product[]>;
}

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
```

### 20. `src/modules/products/application/dto/request/search-products.dto.ts`

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchProductsDto {
  @ApiProperty({
    description: 'Search query term',
    example: 'iphone',
    minLength: 1,
  })
  @IsString()
  @IsNotEmpty({ message: 'Query cannot be empty' })
  query: string;

  @ApiPropertyOptional({
    description: 'Number of results per page',
    example: 10,
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Pagination offset',
    example: 0,
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
```

### 21. `src/modules/products/application/dto/response/product-list.response.dto.ts`

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShippingDto } from './shipping.dto';
import { InstallmentDto } from './installment.dto';
import { ReviewDto } from './review.dto';

export class ProductListItemDto {
  @ApiProperty({ example: 'MLA123456789' })
  id: string;

  @ApiProperty({ example: 'Apple iPhone 13 (128 GB) - Medianoche' })
  title: string;

  @ApiProperty({ example: 1367999 })
  price: number;

  @ApiProperty({ example: 'ARS' })
  currencyId: string;

  @ApiProperty({ example: 'new', enum: ['new', 'used'] })
  condition: 'new' | 'used';

  @ApiPropertyOptional({ example: 'https://http2.mlstatic.com/...' })
  thumbnail?: string;

  @ApiPropertyOptional({ type: ShippingDto })
  shipping?: ShippingDto;

  @ApiPropertyOptional({ type: InstallmentDto })
  installments?: InstallmentDto;

  @ApiPropertyOptional({ type: ReviewDto })
  reviews?: ReviewDto;
}

export class ProductListResponseDto {
  @ApiProperty({ type: [ProductListItemDto] })
  results: ProductListItemDto[];

  @ApiProperty({ example: 'iphone' })
  query: string;

  @ApiProperty({
    example: { total: 1500, offset: 0, limit: 10 },
  })
  paging: {
    total: number;
    offset: number;
    limit: number;
  };
}
```

### 22. `src/modules/products/application/dto/response/product-detail.response.dto.ts`

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ShippingDto } from './shipping.dto';
import { InstallmentDto } from './installment.dto';
import { ReviewDto } from './review.dto';

export class ProductAttributeDto {
  @ApiProperty({ example: 'BRAND' })
  id: string;

  @ApiProperty({ example: 'Marca' })
  name: string;

  @ApiProperty({ example: 'Apple' })
  valueName: string;
}

export class ProductPictureDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'https://http2.mlstatic.com/...' })
  url: string;
}

export class SellerAddressDto {
  @ApiProperty({ example: { name: 'CABA' } })
  city: { name: string };

  @ApiProperty({ example: { name: 'Buenos Aires' } })
  state: { name: string };
}

export class ProductDetailResponseDto {
  @ApiProperty({ example: 'MLA998877665' })
  id: string;

  @ApiProperty({ example: 'Apple iPhone 16 Pro (256gb) - Nuevo - Liberado - Caja Sellada' })
  title: string;

  @ApiProperty({ example: 2509380.59 })
  price: number;

  @ApiPropertyOptional({ example: 3023244.99 })
  originalPrice?: number;

  @ApiProperty({ example: 'ARS' })
  currencyId: string;

  @ApiPropertyOptional({ example: 3 })
  availableQuantity?: number;

  @ApiPropertyOptional({ example: 5 })
  soldQuantity?: number;

  @ApiProperty({ example: 'new', enum: ['new', 'used'] })
  condition: 'new' | 'used';

  @ApiPropertyOptional({ example: 'https://www.mercadolibre.com.ar/p/MLA998877665' })
  permalink?: string;

  @ApiPropertyOptional({ type: [ProductPictureDto] })
  pictures?: ProductPictureDto[];

  @ApiPropertyOptional({ type: InstallmentDto })
  installments?: InstallmentDto;

  @ApiPropertyOptional({ type: ShippingDto })
  shipping?: ShippingDto;

  @ApiPropertyOptional({ type: SellerAddressDto })
  sellerAddress?: SellerAddressDto;

  @ApiPropertyOptional({ type: [ProductAttributeDto] })
  attributes?: ProductAttributeDto[];

  @ApiPropertyOptional({ example: 'Garantía del vendedor: 3 meses' })
  warranty?: string;

  @ApiPropertyOptional({ example: 'Descripción detallada del producto...' })
  description?: string;

  @ApiPropertyOptional({ type: ReviewDto })
  reviews?: ReviewDto;
}
```

### 23. `src/modules/products/application/dto/response/shipping.dto.ts`

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShippingDto {
  @ApiProperty({ example: true })
  freeShipping: boolean;

  @ApiPropertyOptional({ example: 'me2' })
  mode?: string;

  @ApiPropertyOptional({ example: 'fulfillment' })
  logisticType?: string;

  @ApiPropertyOptional({ example: false })
  storePickUp?: boolean;
}
```

### 24. `src/modules/products/application/dto/response/installment.dto.ts`

```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InstallmentDto {
  @ApiProperty({ example: 12 })
  quantity: number;

  @ApiProperty({ example: 113999.92 })
  amount: number;

  @ApiPropertyOptional({ example: 0 })
  rate?: number;

  @ApiPropertyOptional({ example: 'ARS' })
  currencyId?: string;
}
```

### 25. `src/modules/products/application/dto/response/review.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty({ example: 4.9 })
  ratingAverage: number;

  @ApiProperty({ example: 35 })
  total: number;
}
```

### 26. `src/modules/products/application/services/search-products.service.ts`

```typescript
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/repositories/product.repository.interface';
import { SearchResult } from '../../domain/entities/search-result.entity';

@Injectable()
export class SearchProductsService {
  private readonly logger = new Logger(SearchProductsService.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(query: string, limit: number = 10, offset: number = 0): Promise<SearchResult> {
    this.logger.log(`Searching products with query: "${query}"`);

    // Simular delay de red
    const mockDelay = this.configService.get<number>('mock.delayMs', 500);
    await this.delay(mockDelay);

    const searchResult = await this.productRepository.search(query, limit, offset);

    this.logger.log(`Found ${searchResult.results.length} products for query: "${query}"`);

    return searchResult;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
```

### 27. `src/modules/products/application/services/get-product-detail.service.ts`

```typescript
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductDetailService {
  private readonly logger = new Logger(GetProductDetailService.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(id: string): Promise<Product> {
    this.logger.log(`Getting product detail for ID: ${id}`);

    // Simular delay de red
    const mockDelay = this.configService.get<number>('mock.delayMs', 500);
    await this.delay(mockDelay);

    const product = await this.productRepository.findById(id);

    if (!product) {
      this.logger.warn(`Product not found: ${id}`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    this.logger.log(`Product found: ${product.title}`);
    return product;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
```

### 28. `src/modules/products/application/mappers/product.mapper.ts`

```typescript
import { Product } from '../../domain/entities/product.entity';
import { Shipping } from '../../domain/entities/shipping.entity';
import { Installment } from '../../domain/entities/installment.entity';
import { Review } from '../../domain/entities/review.entity';
import {
  ProductListItemDto,
  ProductListResponseDto,
} from '../dto/response/product-list.response.dto';
import { ProductDetailResponseDto } from '../dto/response/product-detail.response.dto';
import { SearchResult } from '../../domain/entities/search-result.entity';

export class ProductMapper {
  static toListItemDto(product: Product): ProductListItemDto {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      currencyId: product.currencyId,
      condition: product.condition,
      thumbnail: product.thumbnail,
      shipping: product.shipping
        ? {
            freeShipping: product.shipping.freeShipping,
            mode: product.shipping.mode,
            logisticType: product.shipping.logisticType,
            storePickUp: product.shipping.storePickUp,
          }
        : undefined,
      installments: product.installments
        ? {
            quantity: product.installments.quantity,
            amount: product.installments.amount,
            rate: product.installments.rate,
            currencyId: product.installments.currencyId,
          }
        : undefined,
      reviews: product.reviews
        ? {
            ratingAverage: product.reviews.ratingAverage,
            total: product.reviews.total,
          }
        : undefined,
    };
  }

  static toDetailDto(product: Product): ProductDetailResponseDto {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      currencyId: product.currencyId,
      availableQuantity: product.availableQuantity,
      soldQuantity: product.soldQuantity,
      condition: product.condition,
      permalink: product.permalink,
      pictures: product.pictures,
      installments: product.installments
        ? {
            quantity: product.installments.quantity,
            amount: product.installments.amount,
            rate: product.installments.rate,
            currencyId: product.installments.currencyId,
          }
        : undefined,
      shipping: product.shipping
        ? {
            freeShipping: product.shipping.freeShipping,
            mode: product.shipping.mode,
            logisticType: product.shipping.logisticType,
            storePickUp: product.shipping.storePickUp,
          }
        : undefined,
      sellerAddress: product.sellerAddress,
      attributes: product.attributes,
      warranty: product.warranty,
      description: product.description,
      reviews: product.reviews
        ? {
            ratingAverage: product.reviews.ratingAverage,
            total: product.reviews.total,
          }
        : undefined,
    };
  }

  static toListResponseDto(searchResult: SearchResult): ProductListResponseDto {
    return {
      query: searchResult.query,
      results: searchResult.results.map((product) => this.toListItemDto(product)),
      paging: {
        total: searchResult.paging.total,
        offset: searchResult.paging.offset,
        limit: searchResult.paging.limit,
      },
    };
  }

  static toDomain(data: any): Product {
    return new Product(
      data.id,
      data.title,
      data.price,
      data.currency_id || data.currencyId,
      data.condition,
      data.thumbnail,
      data.pictures,
      data.available_quantity || data.availableQuantity,
      data.sold_quantity || data.soldQuantity,
      data.original_price || data.originalPrice,
      data.permalink,
      data.shipping
        ? new Shipping(
            data.shipping.free_shipping ?? data.shipping.freeShipping,
            data.shipping.mode,
            data.shipping.logistic_type ?? data.shipping.logisticType,
            data.shipping.store_pick_up ?? data.shipping.storePickUp,
          )
        : undefined,
      data.installments
        ? new Installment(
            data.installments.quantity,
            data.installments.amount,
            data.installments.rate,
            data.installments.currency_id ?? data.installments.currencyId,
          )
        : undefined,
      data.reviews
        ? new Review(data.reviews.rating_average ?? data.reviews.ratingAverage, data.reviews.total)
        : undefined,
      data.attributes?.map((attr: any) => ({
        id: attr.id,
        name: attr.name,
        valueName: attr.value_name ?? attr.valueName,
      })),
      data.warranty,
      data.description?.plain_text ?? data.description,
      data.seller_address ?? data.sellerAddress,
    );
  }
}
```

### 29. `src/modules/products/infrastructure/data/mock-data.ts`

```typescript
export const MOCK_SEARCH_RESULTS = {
  iphone: {
    query: 'iphone',
    paging: {
      total: 1500,
      offset: 0,
      limit: 3,
    },
    results: [
      {
        id: 'MLA123456789',
        title: 'Apple iPhone 13 (128 GB) - Medianoche',
        price: 1367999,
        currency_id: 'ARS',
        condition: 'new',
        thumbnail: 'https://http2.mlstatic.com/D_123456-MLA0000000000_092023-I.jpg',
        installments: {
          quantity: 12,
          amount: 113999.92,
        },
        shipping: {
          free_shipping: true,
        },
        reviews: {
          rating_average: 4.9,
          total: 35,
        },
      },
      {
        id: 'MLA987654321',
        title: 'Apple iPhone 16 Pro Max 256gb',
        price: 2299000,
        currency_id: 'ARS',
        condition: 'new',
        thumbnail: 'https://http2.mlstatic.com/D_987654-MLA0000000001_092023-I.jpg',
      },
      {
        id: 'MLA555555555',
        title: 'iPhone 8 64 GB Plata - Reacondicionado',
        price: 412500,
        currency_id: 'ARS',
        condition: 'used',
        thumbnail: 'https://http2.mlstatic.com/D_555555-MLA0000000002_092023-I.jpg',
        reviews: {
          rating_average: 5.0,
          total: 2,
        },
      },
    ],
  },
};

export const MOCK_PRODUCTS = {
  MLA123456789: {
    id: 'MLA123456789',
    title: 'Apple iPhone 13 (128 GB) - Medianoche',
    price: 1367999,
    currency_id: 'ARS',
    available_quantity: 10,
    sold_quantity: 150,
    condition: 'new',
    permalink: 'https://www.mercadolibre.com.ar/p/MLA123456789',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_123456-MLA0000000000_092023-I.jpg',
      },
      {
        id: '2',
        url: 'https://http2.mlstatic.com/D_123457-MLA0000000001_092023-I.jpg',
      },
    ],
    installments: {
      quantity: 12,
      amount: 113999.92,
      rate: 0,
      currency_id: 'ARS',
    },
    shipping: {
      free_shipping: true,
      mode: 'me2',
      logistic_type: 'fulfillment',
      store_pick_up: false,
    },
    seller_address: {
      city: { name: 'CABA' },
      state: { name: 'Buenos Aires' },
    },
    attributes: [
      {
        id: 'BRAND',
        name: 'Marca',
        value_name: 'Apple',
      },
      {
        id: 'MODEL',
        name: 'Modelo',
        value_name: 'iPhone 13',
      },
      {
        id: 'STORAGE_CAPACITY',
        name: 'Capacidad de almacenamiento',
        value_name: '128 GB',
      },
    ],
    warranty: 'Garantía del vendedor: 12 meses',
    description: {
      plain_text:
        'El iPhone 13 cuenta con un sistema de cámara dual avanzado que te permite tomar fotos espectaculares con poca luz.',
    },
    reviews: {
      rating_average: 4.9,
      total: 35,
    },
  },
  MLA998877665: {
    id: 'MLA998877665',
    title: 'Apple iPhone 16 Pro (256gb) - Nuevo - Liberado - Caja Sellada',
    price: 2509380.59,
    original_price: 3023244.99,
    currency_id: 'ARS',
    available_quantity: 3,
    sold_quantity: 5,
    condition: 'new',
    permalink: 'https://www.mercadolibre.com.ar/p/MLA998877665',
    pictures: [
      {
        id: '1',
        url: 'https://http2.mlstatic.com/D_987654-MLA0000000000_092023-I.jpg',
      },
      {
        id: '2',
        url: 'https://http2.mlstatic.com/D_987655-MLA0000000001_092023-I.jpg',
      },
    ],
    installments: {
      quantity: 9,
      amount: 278820.07,
      rate: 0,
      currency_id: 'ARS',
    },
    shipping: {
      free_shipping: true,
      mode: 'me2',
      logistic_type: 'fulfillment',
      store_pick_up: false,
    },
    seller_address: {
      city: { name: 'CABA' },
      state: { name: 'Buenos Aires' },
    },
    attributes: [
      {
        id: 'BRAND',
        name: 'Marca',
        value_name: 'Apple',
      },
      {
        id: 'MODEL',
        name: 'Modelo',
        value_name: 'iPhone 16 Pro',
      },
      {
        id: 'STORAGE_CAPACITY',
        name: 'Capacidad de almacenamiento',
        value_name: '256 GB',
      },
    ],
    warranty: 'Garantía del vendedor: 3 meses',
    description: {
      plain_text:
        'El iPhone 16 Pro viene con el sistema de cámaras más impresionante en un iPhone, para que tomes fotos espectaculares con mucha o poca luz.',
    },
    reviews: {
      rating_average: 5.0,
      total: 1,
    },
  },
};
```

### 30. `src/modules/products/infrastructure/repositories/mock-product.repository.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { SearchResult } from '../../domain/entities/search-result.entity';
import { ProductMapper } from '../../application/mappers/product.mapper';
import { MOCK_SEARCH_RESULTS, MOCK_PRODUCTS } from '../data/mock-data';

@Injectable()
export class MockProductRepository implements IProductRepository {
  async search(query: string, limit: number, offset: number): Promise<SearchResult> {
    // Normalizar query
    const normalizedQuery = query.toLowerCase().trim();

    // Buscar en mock data
    const mockData = MOCK_SEARCH_RESULTS[normalizedQuery];

    if (!mockData) {
      // Si no hay datos mock para esta query, retornar resultado vacío
      return new SearchResult(query, [], {
        total: 0,
        offset,
        limit,
      });
    }

    // Aplicar paginación
    const start = offset;
    const end = offset + limit;
    const paginatedResults = mockData.results.slice(start, end);

    // Convertir a entidades de dominio
    const products = paginatedResults.map((item) => ProductMapper.toDomain(item));

    return new SearchResult(query, products, {
      total: mockData.paging.total,
      offset,
      limit,
    });
  }

  async findById(id: string): Promise<Product | null> {
    const mockProduct = MOCK_PRODUCTS[id];

    if (!mockProduct) {
      return null;
    }

    return ProductMapper.toDomain(mockProduct);
  }

  async findAll(): Promise<Product[]> {
    return Object.values(MOCK_PRODUCTS).map((item) => ProductMapper.toDomain(item));
  }
}
```

### 31. `src/modules/products/infrastructure/controllers/products.controller.ts`

```typescript
import {
  Controller,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { SearchProductsDto } from '../../application/dto/request/search-products.dto';
import { ProductListResponseDto } from '../../application/dto/response/product-list.response.dto';
import { ProductDetailResponseDto } from '../../application/dto/response/product-detail.response.dto';
import { SearchProductsService } from '../../application/services/search-products.service';
import { GetProductDetailService } from '../../application/services/get-product-detail.service';
import { ProductMapper } from '../../application/mappers/product.mapper';
import {
  ApiSuccessResponse,
  ApiErrorResponses,
} from '../../../../common/decorators/api-response.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly searchProductsService: SearchProductsService,
    private readonly getProductDetailService: GetProductDetailService,
  ) {}

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Search products',
    description: 'Search for products by query string with pagination',
  })
  @ApiQuery({ name: 'query', description: 'Search term', example: 'iphone' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Results per page',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Pagination offset',
    example: 0,
  })
  @ApiSuccessResponse(ProductListResponseDto)
  @ApiErrorResponses()
  async search(@Query() searchDto: SearchProductsDto): Promise<ProductListResponseDto> {
    const searchResult = await this.searchProductsService.execute(
      searchDto.query,
      searchDto.limit,
      searchDto.offset,
    );

    return ProductMapper.toListResponseDto(searchResult);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get product detail',
    description: 'Get detailed information about a specific product',
  })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 'MLA998877665',
  })
  @ApiSuccessResponse(ProductDetailResponseDto)
  @ApiErrorResponses()
  async getById(@Param('id') id: string): Promise<ProductDetailResponseDto> {
    const product = await this.getProductDetailService.execute(id);
    return ProductMapper.toDetailDto(product);
  }
}
```

### 32. `src/modules/products/products.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ProductsController } from './infrastructure/controllers/products.controller';
import { SearchProductsService } from './application/services/search-products.service';
import { GetProductDetailService } from './application/services/get-product-detail.service';
import { MockProductRepository } from './infrastructure/repositories/mock-product.repository';
import { PRODUCT_REPOSITORY } from './domain/repositories/product.repository.interface';

@Module({
  controllers: [ProductsController],
  providers: [
    SearchProductsService,
    GetProductDetailService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: MockProductRepository,
    },
  ],
  exports: [SearchProductsService, GetProductDetailService],
})
export class ProductsModule {}
```

### 33. `src/modules/health/health.controller.ts`

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
```

### 34. `src/modules/health/health.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
```

### 35. `src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import configuration from './config/configuration';
import { validationSchema } from './config/validation.schema';
import { ProductsModule } from './modules/products/products.module';
import { HealthModule } from './modules/health/health.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: ['.env.development', '.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ProductsModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
```

### 36. `src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Global prefix
  const apiPrefix = configService.get<string>('app.apiPrefix');
  app.setGlobalPrefix(apiPrefix);

  // CORS
  app.enableCors({
    origin: configService.get<string>('cors.origin'),
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger
  setupSwagger(app);

  const port = configService.get<number>('app.port');
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/${configService.get('swagger.path')}`);
}

bootstrap();
```

### 37. `test/jest-e2e.json`

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "moduleNameMapper": {
    "^@meli/shared-types$": "<rootDir>/../packages/shared-types/src"
  }
}
```

### 38. `test/e2e/products.e2e-spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/v1/products/search (GET)', () => {
    it('should return products for valid query', () => {
      return request(app.getHttpServer())
        .get('/api/v1/products/search?query=iphone')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('results');
          expect(res.body.data).toHaveProperty('query', 'iphone');
          expect(res.body.data).toHaveProperty('paging');
          expect(Array.isArray(res.body.data.results)).toBe(true);
        });
    });

    it('should return empty results for unknown query', () => {
      return request(app.getHttpServer())
        .get('/api/v1/products/search?query=zzzzunknownproduct')
        .expect(200)
        .expect((res) => {
          expect(res.body.data.results).toHaveLength(0);
          expect(res.body.data.paging.total).toBe(0);
        });
    });

    it('should validate required query parameter', () => {
      return request(app.getHttpServer()).get('/api/v1/products/search').expect(400);
    });

    it('should apply pagination', () => {
      return request(app.getHttpServer())
        .get('/api/v1/products/search?query=iphone&limit=2&offset=0')
        .expect(200)
        .expect((res) => {
          expect(res.body.data.paging.limit).toBe(2);
          expect(res.body.data.paging.offset).toBe(0);
        });
    });
  });

  describe('/api/v1/products/:id (GET)', () => {
    it('should return product detail for valid ID', () => {
      return request(app.getHttpServer())
        .get('/api/v1/products/MLA123456789')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('id', 'MLA123456789');
          expect(res.body.data).toHaveProperty('title');
          expect(res.body.data).toHaveProperty('price');
        });
    });

    it('should return 404 for invalid ID', () => {
      return request(app.getHttpServer()).get('/api/v1/products/MLA999999999').expect(404);
    });
  });
});
```

### 39. `test/unit/products/services/search-products.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { SearchProductsService } from '../../../../src/modules/products/application/services/search-products.service';
import { PRODUCT_REPOSITORY } from '../../../../src/modules/products/domain/repositories/product.repository.interface';
import { SearchResult } from '../../../../src/modules/products/domain/entities/search-result.entity';

describe('SearchProductsService', () => {
  let service: SearchProductsService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      search: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchProductsService,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'mock.delayMs') return 0;
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SearchProductsService>(SearchProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search products successfully', async () => {
    const mockSearchResult = new SearchResult('iphone', [], {
      total: 0,
      offset: 0,
      limit: 10,
    });

    mockRepository.search.mockResolvedValue(mockSearchResult);

    const result = await service.execute('iphone', 10, 0);

    expect(result).toEqual(mockSearchResult);
    expect(mockRepository.search).toHaveBeenCalledWith('iphone', 10, 0);
  });
});
```

### 40. Backend `README.md`

```markdown
# Mercado Libre Challenge - Backend API

API REST desarrollada con NestJS que simula el comportamiento de la API de Mercado Libre. Implementa arquitectura hexagonal (Ports & Adapters) para mantener la lógica de negocio desacoplada de los detalles de implementación.

## 🏗️ Arquitectura

### Arquitectura Hexagonal (Ports & Adapters)
```

Domain Layer (Core Business Logic)
├── Entities: Product, SearchResult, Shipping, etc.
├── Value Objects: Price, ProductId
└── Repository Interfaces (Ports)

Application Layer (Use Cases)
├── Services: SearchProductsService, GetProductDetailService
├── DTOs: Request and Response objects
└── Mappers: Domain ↔ DTO transformations

Infrastructure Layer (External World)
├── Controllers: REST API endpoints
├── Repositories: Mock implementations
└── Data: Mock data files

```

### Principios Aplicados

- **Dependency Inversion**: Dependemos de abstracciones (interfaces), no de implementaciones
- **Single Responsibility**: Cada clase tiene una única razón para cambiar
- **Open/Closed**: Abierto para extensión, cerrado para modificación
- **Interface Segregation**: Interfaces específicas y cohesivas
- **Separation of Concerns**: Cada capa tiene responsabilidades bien definidas

## 📁 Estructura del Proyecto

```

src/
├── common/ # Código compartido
│ ├── decorators/ # Decoradores personalizados
│ ├── filters/ # Exception filters
│ ├── interceptors/ # Interceptors globales
│ └── pipes/ # Validation pipes
├── config/ # Configuración
│ ├── configuration.ts # Config loader
│ ├── validation.schema.ts # Env validation
│ └── swagger.config.ts # Swagger setup
├── modules/
│ ├── products/ # Módulo de Productos
│ │ ├── domain/ # Entidades, VOs, Interfaces
│ │ ├── application/ # Use Cases, DTOs, Mappers
│ │ └── infrastructure/ # Controllers, Repos, Data
│ └── health/ # Health check
├── app.module.ts
└── main.ts

````

## 🚀 Getting Started

### Prerequisitos

- Node.js >= 18.17.0
- npm >= 9.0.0

### Instalación

```bash
# Desde la raíz del monorepo
npm install

# O solo este workspace
npm install --workspace=apps/backend
````

### Configuración

Copia `.env.example` a `.env.development` y ajusta las variables:

```env
NODE_ENV=development
PORT=3001
API_PREFIX=api/v1
CORS_ORIGIN=http://localhost:3000
SWAGGER_ENABLED=true
```

### Desarrollo

```bash
# Modo watch
npm run dev

# Con debug
npm run start:debug
```

### Build

```bash
npm run build
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 📡 API Endpoints

### Base URL

```
http://localhost:3001/api/v1
```

### Endpoints

#### Search Products

```http
GET /products/search?query=iphone&limit=10&offset=0
```

**Query Parameters:**

- `query` (required): Search term
- `limit` (optional): Results per page (1-50, default: 10)
- `offset` (optional): Pagination offset (default: 0)

**Response:**

```json
{
  "data": {
    "query": "iphone",
    "results": [...],
    "paging": {
      "total": 1500,
      "offset": 0,
      "limit": 10
    }
  },
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Get Product Detail

```http
GET /products/:id
```

**Parameters:**

- `id`: Product ID (format: MLA + numbers)

**Response:**

```json
{
  "data": {
    "id": "MLA123456789",
    "title": "Apple iPhone 13...",
    "price": 1367999,
    ...
  },
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Health Check

```http
GET /health
```

### API Documentation (Swagger)

Swagger UI disponible en: `http://localhost:3001/api/docs`

## 🧪 Testing

### Unit Tests

Ubicados en `test/unit/`, prueban servicios y mappers de forma aislada.

```bash
npm run test -- search-products.service.spec.ts
```

### Integration Tests

Prueban controllers con sus dependencias.

### E2E Tests

Ubicados en `test/e2e/`, prueban flujos completos de la API.

```bash
npm run test:e2e
```

### Coverage

```bash
npm run test:cov
```

Target: 80% coverage en domain y application layers.

## 🔧 Decisiones Técnicas

### Arquitectura Hexagonal

**Por qué**: Separa lógica de negocio de detalles de implementación, facilitando testing y permitiendo cambiar fácilmente de un mock repository a uno real (API de MercadoLibre, base de datos, etc.)

### DTOs con Class-Validator

**Por qué**: Validación automática de datos de entrada con decoradores declarativos, integrado con NestJS.

### Mappers Explícitos

**Por qué**: Conversión explícita entre capas (Domain ↔ DTO) evita acoplar la API REST con el modelo de dominio.

### Mock Repository

**Por qué**: Simula respuestas de la API de MercadoLibre sin hacer peticiones reales, permitiendo desarrollo offline y tests deterministas.

### Swagger/OpenAPI

**Por qué**: Documentación automática y actualizada de la API, facilita integración con frontend.

## 🔄 Flujo de una Request

```
1. HTTP Request → Controller
2. Controller → DTO validation
3. Controller → Application Service (Use Case)
4. Service → Domain Repository (via interface)
5. Repository → Domain Entities
6. Service → Mapper (Entity → DTO)
7. Controller → Response Interceptor
8. HTTP Response ← Cliente
```

## 🛠️ Herramientas de Desarrollo

- **ESLint**: Linting
- **Prettier**: Formateo de código
- **Jest**: Testing framework
- **Supertest**: E2E testing
- **Swagger**: API documentation

## 📊 Métricas de Calidad

- **TypeScript strict mode**: Habilitado
- **Test coverage**: Target 80%+
- **Linter**: Zero warnings
- **API response time**: < 1s (con mock delay de 500ms)

## 🚧 TODOs / Mejoras Futuras

- [ ] Implementar repository real con API de MercadoLibre
- [ ] Agregar autenticación/autorización
- [ ] Implementar rate limiting por usuario
- [ ] Agregar logs estructurados (Winston/Pino)
- [ ] Implementar caching (Redis)
- [ ] Agregar health checks avanzados
- [ ] Implementar métricas (Prometheus)
- [ ] Docker containerization

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo con watch mode
npm run build        # Build para producción
npm run start        # Iniciar producción
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Fix automático
npm run test         # Unit tests
npm run test:e2e     # E2E tests
npm run test:cov     # Coverage report
npm run type-check   # TypeScript check
```

## 🤝 Contributing

Ver `CONTRIBUTING.md` en la raíz del monorepo.

## 📄 License

MIT

````

## 🧪 Criterios de Aceptación

- [ ] Estructura de carpetas hexagonal implementada
- [ ] Módulo de configuración con validación de variables de entorno
- [ ] Swagger configurado y funcionando en `/api/docs`
- [ ] Filtros de excepción globales funcionando
- [ ] Interceptores de logging y transform funcionando
- [ ] Entidades de dominio creadas con lógica de negocio
- [ ] Value Objects implementados (Price, ProductId)
- [ ] Interfaces de repositorios (ports) definidas
- [ ] DTOs de request con validaciones class-validator
- [ ] DTOs de response con decoradores Swagger
- [ ] Servicios de aplicación implementados
- [ ] Mappers funcionando correctamente
- [ ] MockProductRepository con datos del JSON proporcionado
- [ ] ProductsController con endpoints documentados
- [ ] HealthModule implementado
- [ ] Inyección de dependencias configurada correctamente
- [ ] Tests unitarios de servicios funcionando
- [ ] Tests e2e de endpoints funcionando
- [ ] README.md completo con documentación
- [ ] `npm run dev` inicia el servidor sin errores
- [ ] `npm run build` compila sin errores
- [ ] `npm run test` ejecuta todos los tests exitosamente
- [ ] `npm run lint` sin errores
- [ ] TypeScript compila sin errores
- [ ] Endpoints retornan respuestas correctas
- [ ] Validaciones de DTOs funcionando
- [ ] Manejo de errores funcionando (404, 400, 500)
- [ ] CORS configurado correctamente

## 🔗 Dependencias

- **Depende de**: PRP-001 (Setup del Monorepo)
- **Requerido para**: PRP-006 (Frontend - Arquitectura y Setup)

## 📚 Referencias

### Documentación
- [NestJS Documentation](https://docs.nestjs.com/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Class Validator](https://github.com/typestack/class-validator)
- [Swagger/OpenAPI](https://swagger.io/specification/)
- [Jest Testing](https://jestjs.io/docs/getting-started)

### Artículos y Recursos
- [Domain-Driven Design in NestJS](https://docs.nestjs.com/techniques/domain-driven-design)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [DTOs and Validation](https://docs.nestjs.com/techniques/validation)

## 💡 Notas para el Agente de IA

1. **Orden de Implementación**: Seguir el orden de las fases estrictamente
2. **Testing First**: Implementar tests junto con el código, no al final
3. **Documentación en Código**: Agregar JSDoc a métodos complejos
4. **Validación Continua**: Verificar que cada capa funciona antes de continuar
5. **Nombres Descriptivos**: Usar nombres que expresen intención del negocio
6. **Errores Específicos**: Lanzar excepciones de negocio cuando corresponda
7. **Logs Informativos**: Agregar logs en puntos clave del flujo

### Comandos de Verificación

```bash
# Verificar que todo compila
npm run build --workspace=apps/backend

# Verificar types
npm run type-check --workspace=apps/backend

# Verificar lint
npm run lint --workspace=apps/backend

# Ejecutar tests
npm run test --workspace=apps/backend

# Iniciar en modo dev
npm run dev:backend
````

### Troubleshooting Común

**Problema**: Decoradores no funcionan
**Solución**: Verificar `experimentalDecorators` y `emitDecoratorMetadata` en tsconfig

**Problema**: Inyección de dependencias falla
**Solución**: Verificar que el provider esté en el array `providers` del módulo

**Problema**: Validación de DTOs no funciona
**Solución**: Verificar que el `ValidationPipe` esté configurado globalmente

**Problema**: Swagger no muestra endpoints
**Solución**: Verificar decoradores `@ApiTags()` y que el controller esté en el módulo

## ✨ Siguiente Paso

Una vez completado este PRP, el siguiente es:

**PRP-003: Shared Types Package**

Que incluirá:

- Tipos compartidos entre frontend y backend
- Interfaces de contratos de API
- Enums y constantes compartidas
- Validadores y utilidades comunes
