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
# Iniciar servicios (en terminales separadas):

# Terminal 1 - Backend
npm run dev:backend   # http://localhost:3000

# Terminal 2 - Frontend
npm run dev:frontend  # http://localhost:3001

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

## 💡 Decisiones Técnicas Destacadas

### 1. Arquitectura de Monorepo

Se optó por un **monorepo** gestionado con `npm workspaces` para facilitar la gestión de dependencias y compartir código (como tipos TypeScript) entre el frontend y el backend sin necesidad de publicar paquetes privados.

### 2. Arquitectura Hexagonal (Ports & Adapters)

Tanto en frontend como en backend se implementó una **Arquitectura Hexagonal**.

- **Frontend**: Permite desacoplar la lógica de negocio (Use Cases, Entities) de la UI (React Components) y de la infraestructura (API Calls). Esto facilita el testing unitario de la lógica core sin depender de React.
- **Backend**: Separa el dominio de la capa HTTP (Controllers) y de la persistencia (Repositories), permitiendo cambiar la base de datos o el framework web con mínimo impacto en el negocio.

### 3. Definición de Arquitectura Backend: Monolito Modular

Para este desafío, la arquitectura del backend se define como un **Monolito Modular**.

Al ser una API que simula un servicio de búsqueda con un alcance acotado, un monolito permite tener todo el dominio unificado, facilitando el desarrollo, el testing y el despliegue en una sola unidad.

**Modularidad (NestJS)**: Aunque es un monolito, el uso de Módulos de NestJS permite una separación lógica clara (Modules, Controllers, Services), lo que evita el "spaghetti code" y facilita el escalamiento y la mantenibilidad.

### 4. Next.js App Router

Se utilizó **Next.js 14+ con App Router** para aprovechar las ventajas de los **React Server Components (RSC)**.

- Mejora el rendimiento inicial (menor JS enviado al cliente).
- Simplifica el data fetching en el servidor.
- Optimización automática de imágenes y fuentes.

### 5. NestJS & Swagger

Para el backend se eligió **NestJS** por su robustez, inyección de dependencias y estructura modular. Se integró **Swagger** para tener una documentación viva de la API, facilitando la integración con el frontend.

### 6. Testing Strategy

- **Unit Testing**: Jest para lógica de negocio y componentes aislados.
- **E2E Testing**: Playwright para probar flujos completos de usuario en el frontend.

---

## 🚀 Mejoras Futuras

Si tuviera más tiempo, implementaría las siguientes mejoras:

- **Base de Datos Real**: Reemplazar el mock repository con una base de datos real (PostgreSQL o MongoDB) usando un ORM como Prisma o TypeORM e implementarla con docker para pruebas en local.
- **Accesibilidad (A11y)**: Realizar una auditoría completa con herramientas como axe-core y mejorar la navegación por teclado y soporte para lectores de pantalla.
- **Internacionalización (i18n)**: Implementar soporte para múltiples idiomas (Español, Portugués, Inglés).
- **State Management**: Evaluar Zustand o Redux si la complejidad del estado global aumentara significativamente (actualmente Context + React Query es suficiente).
- **Filtros**: Permitir que el usuario pueda ver los productos conforme a sus requerimientos prioritarios (precio, marca, A-Z, entre otros).
- **Despliegue**: Desplegar ambos proyectos en plataformas gratuitas (Vercel, Netlify, Railway, Render, entre otros).
- **Carrusel de Promociones**: Mejorar la página de presentación añadiendo carrusel con promociones como las de Black Friday.
- **Navegación Completa**: Añadir los componentes para cada uno de los links que hasta el momento llevan a la página de NOT FOUND.
- **Perfil de Usuario**: Añadir el componente para el perfil del usuario.
- **OAuth**: Hacer login mediante Google, Facebook, entre otros.

---

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
