# Backend - Mercado Libre Search API

API REST mock para búsqueda y detalle de productos, simulando la API de Mercado Libre.

## 🚀 Tecnologías

- **NestJS** 10.3.0 - Framework backend
- **TypeScript** 5.1.3
- **Swagger/OpenAPI** - Documentación automática
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de datos

## 📁 Arquitectura

El proyecto sigue **Arquitectura Hexagonal (Ports & Adapters)**:

```
src/
├── domain/              # Capa de Dominio (lógica de negocio pura)
│   ├── entities/        # Entidades del dominio
│   ├── value-objects/   # Value Objects
│   ├── exceptions/      # Excepciones de dominio
│   ├── repositories/    # Interfaces (Ports)
│   └── use-cases/       # Casos de uso
│
├── infrastructure/      # Capa de Infraestructura (adaptadores)
│   ├── persistence/     # Repositorios concretos
│   │   └── mock/        # Mock data y MockProductRepository
│   └── config/          # Configuración
│
└── presentation/        # Capa de Presentación (HTTP)
    ├── controllers/     # Controllers REST
    ├── dto/             # DTOs de request/response
    ├── filters/         # Exception filters
    └── interceptors/    # Interceptors
```

## 🔧 Variables de Entorno

Copia `.env.example` a `.env` y ajusta según necesites:

```bash
cp .env.example .env
```

### Variables disponibles:

- `NODE_ENV`: Entorno de ejecución (development, production, test)
- `PORT`: Puerto del servidor (default: 3000)
- `CORS_ORIGIN`: Origen permitido para CORS (default: http://localhost:3000)
- `API_PREFIX`: Prefijo de la API (default: api/v1)
- `SWAGGER_ENABLED`: Habilitar Swagger UI (default: true)
- `SWAGGER_PATH`: Ruta de Swagger UI (default: api)
- `MOCK_DELAY_MIN`: Delay mínimo simulado en ms (default: 200)
- `MOCK_DELAY_MAX`: Delay máximo simulado en ms (default: 800)

## 📦 Instalación

Desde la raíz del monorepo:

```bash
npm install
```

## 🏃 Ejecución

### Desarrollo (con hot-reload)

```bash
# Usa ts-node para ejecución directa de TypeScript
npm run start:dev --workspace=apps/backend
```

> **Nota:** El backend corre en el puerto 3000 por defecto.

### Troubleshooting

Si el puerto 3000 está ocupado:

```bash
# Buscar proceso en puerto 3000
lsof -i :3000

# Matar proceso (reemplazar PID)
kill -9 <PID>
```

### Producción

```bash
npm run build --workspace=apps/backend
npm run start --workspace=apps/backend
```

## 🧪 Testing

```bash
# Unit tests
npm run test --workspace=apps/backend

# Test coverage
npm run test:cov --workspace=apps/backend

# E2E tests
npm run test:e2e --workspace=apps/backend
```

## 📚 Documentación API (Swagger)

Una vez iniciado el servidor, visita:

```
http://localhost:3000/api
```

## 🔗 Endpoints

### Products

- **GET** `/api/v1/products/search?q={query}&limit={limit}&offset={offset}`
  - Buscar productos por query
  - Query params:
    - `q` (required): Término de búsqueda
    - `limit` (optional): Resultados por página (default: 10, max: 50)
    - `offset` (optional): Offset para paginación (default: 0)

- **GET** `/api/v1/products/:id`
  - Obtener detalle de un producto
  - Params:
    - `id`: ID del producto (formato: MLA seguido de números)

### Health

- **GET** `/health`
  - Health check del servicio

## 🎯 Ejemplos de Uso

### Buscar productos

```bash
curl http://localhost:3000/api/v1/products/search?q=iphone&limit=10
```

### Obtener detalle de producto

```bash
curl http://localhost:3000/api/v1/products/MLA123456789
```

### Health check

```bash
curl http://localhost:3000/health
```

## 🗂️ Mock Data

Los datos mock se encuentran en:

- `src/infrastructure/persistence/mock/data/products-search-iphone.json`
- `src/infrastructure/persistence/mock/data/products-detail.json`

El repositorio mock simula delays de red (200-800ms) para una experiencia más realista.
Los datos incluyen **imágenes reales de alta calidad** para los productos de prueba (iPhone 13, 16 Pro Max, etc.).

## 🔍 Linting y Type-checking

```bash
# Lint
npm run lint --workspace=apps/backend

# Lint fix
npm run lint:fix --workspace=apps/backend

# Type check
npm run type-check --workspace=apps/backend
```

## 📝 Notas de Implementación

- **Arquitectura Hexagonal**: Separación clara entre dominio, aplicación e infraestructura
- **Dependency Injection**: Uso de NestJS DI para inversión de dependencias
- **Exception Handling**: Filters globales para manejo consistente de errores
- **Validation**: DTOs validados con class-validator
- **Logging**: Interceptor para logging de requests/responses
- **CORS**: Habilitado para desarrollo con frontend
- **Swagger**: Documentación automática de todos los endpoints
