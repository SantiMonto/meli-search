# Mercado Libre Frontend Challenge - Full Stack Implementation

Implementación full-stack del desafío técnico de Mercado Libre, utilizando arquitectura hexagonal en un monorepo con Next.js y NestJS.

## 🏗️ Arquitectura

Este proyecto está organizado como un **monorepo** utilizando npm workspaces:

```
meli-search/
├── apps/
│   ├── frontend/    # Next.js 16 (App Router)
│   └── backend/     # NestJS API
└── packages/
    └── shared-types/ # TypeScript types compartidos
```

### Frontend (Next.js)

- **Framework**: Next.js 16 con App Router
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Architecture**: Hexagonal (Ports & Adapters)

### Backend (NestJS)

- **Framework**: NestJS
- **Architecture**: Hexagonal (Ports & Adapters)
- **API**: REST con Swagger documentation
- **Data**: Mock data simulando API de Mercado Libre

## 🚀 Getting Started

### Prerequisitos

- Node.js >= 18.17.0
- npm >= 9.0.0

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd meli-search

# Instalar dependencias de todo el monorepo
npm install --legacy-peer-deps
```

### Desarrollo

```bash
# Iniciar frontend y backend simultáneamente
npm run dev

# O iniciar individualmente:
npm run dev:frontend  # Frontend en http://localhost:3001
npm run dev:backend   # Backend en http://localhost:3000
```

### Build

```bash
# Build de todo el monorepo
npm run build

# O build individual:
npm run build:frontend
npm run build:backend
```

### Testing

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage report
npm run test:cov
```

### Linting y Formateo

```bash
# Lint
npm run lint

# Lint y auto-fix
npm run lint:fix

# Format con Prettier
npm run format

# Check format
npm run format:check

# Type check
npm run type-check
```

## 📦 Workspaces

El proyecto utiliza npm workspaces para gestionar múltiples packages:

- `apps/frontend` - Aplicación Next.js
- `apps/backend` - API NestJS
- `packages/shared-types` - Tipos compartidos

## 🛠️ Herramientas de Desarrollo

- **TypeScript**: Tipado estático
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Husky**: Git hooks
- **lint-staged**: Pre-commit linting
- **commitlint**: Conventional commits

## 📝 Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
test: agregar o modificar tests
chore: cambios en build o herramientas
```

## 🏛️ Arquitectura Hexagonal

Tanto el frontend como el backend siguen arquitectura hexagonal:

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│   (Controllers, Components)         │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│        Domain Layer                 │
│   (Entities, Use Cases)             │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│    Infrastructure Layer             │
│   (Repositories, API Clients)       │
└─────────────────────────────────────┘
```

## 📚 Documentación

- [PRPs](/PRPs) - Product Requirement Prompts detallados
- [Frontend README](/apps/frontend/README.md)
- [Backend README](/apps/backend/README.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feat/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feat/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT

## 👨‍💻 Autor

Santiago Monto
