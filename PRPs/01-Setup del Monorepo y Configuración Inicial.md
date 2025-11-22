PRP-001: Setup del Monorepo y Configuración Inicial
🎯 Objetivo
Configurar la estructura base del monorepo con npm workspaces, establecer las herramientas de desarrollo compartidas (ESLint, Prettier, TypeScript, Husky) y crear la estructura de carpetas inicial para los proyectos frontend (Next.js) y backend (NestJS).

📋 Contexto
Este es el primer paso del proyecto "Mercado Libre Challenge". Crearemos un monorepo que contendrá:

Frontend: Aplicación Next.js 14+ con App Router
Backend: API REST con NestJS que simula el API de Mercado Libre
Shared: Tipos y utilidades compartidas entre frontend y backend
Este setup debe facilitar el desarrollo, mantener consistencia de código y preparar el proyecto para escalabilidad.

🏗️ Arquitectura del Monorepo
meli-challenge/
├── apps/
│ ├── frontend/ # Next.js Application
│ └── backend/ # NestJS API
├── packages/
│ └── shared-types/ # TypeScript types compartidos
├── .github/
│ └── workflows/
│ └── ci.yml # GitHub Actions CI/CD
├── .husky/ # Git hooks
│ ├── pre-commit
│ └── commit-msg
├── .vscode/ # VS Code settings
│ ├── settings.json
│ └── extensions.json
├── node_modules/
├── .eslintrc.js # ESLint config compartida
├── .prettierrc.js # Prettier config
├── .gitignore
├── .nvmrc # Node version
├── package.json # Root package.json
├── tsconfig.base.json # Base TypeScript config
└── README.md # Documentación principal
📁 Estructura Detallada de Carpetas
Root Level
meli-challenge/
├── apps/
│ ├── frontend/
│ │ ├── src/
│ │ ├── public/
│ │ ├── package.json
│ │ ├── tsconfig.json
│ │ ├── next.config.js
│ │ └── tailwind.config.ts
│ └── backend/
│ ├── src/
│ ├── test/
│ ├── package.json
│ ├── tsconfig.json
│ └── nest-cli.json
├── packages/
│ └── shared-types/
│ ├── src/
│ │ ├── index.ts
│ │ └── entities/
│ ├── package.json
│ └── tsconfig.json
🔧 Tecnologías y Versiones
Core
Node.js: >= 18.17.0 (LTS)
npm: >= 9.0.0
TypeScript: ^5.3.0
Herramientas de Desarrollo
ESLint: ^8.56.0
Prettier: ^3.1.0
Husky: ^8.0.0
lint-staged: ^15.2.0
commitlint: ^18.4.0
@commitlint/config-conventional: ^18.4.0
Frontend (Next.js)
Next.js: ^14.1.0
React: ^18.2.0
TypeScript: ^5.3.0
Tailwind CSS: ^3.4.0
Backend (NestJS)
@nestjs/core: ^10.3.0
@nestjs/common: ^10.3.0
@nestjs/platform-express: ^10.3.0
reflect-metadata: ^0.2.0
rxjs: ^7.8.0
✅ Tareas Específicas
Fase 1: Inicialización del Proyecto
Crear directorio raíz meli-challenge
Inicializar repositorio git
Crear estructura de carpetas base
Configurar Node.js version con .nvmrc
Fase 2: Configuración de npm Workspaces
Crear package.json root con workspaces
Configurar scripts compartidos en root
Establecer política de versionado
Fase 3: Setup de Aplicaciones
Crear aplicación Next.js en apps/frontend
Crear aplicación NestJS en apps/backend
Crear package shared-types en packages/
Fase 4: Configuración de TypeScript
Crear tsconfig.base.json con configuración compartida
Configurar tsconfig.json para frontend
Configurar tsconfig.json para backend
Configurar tsconfig.json para shared-types
Configurar path aliases
Fase 5: Configuración de Code Quality
Instalar y configurar ESLint
Instalar y configurar Prettier
Configurar reglas de ESLint específicas para Next.js
Configurar reglas de ESLint específicas para NestJS
Integrar ESLint con Prettier
Fase 6: Git Hooks con Husky
Instalar Husky
Configurar pre-commit hook con lint-staged
Configurar commit-msg hook con commitlint
Configurar Conventional Commits
Fase 7: VS Code Configuration
Crear .vscode/settings.json
Crear .vscode/extensions.json
Configurar formateo automático en save
Fase 8: GitHub Actions CI/CD
Crear workflow básico de CI
Configurar jobs para lint y type-check
Preparar estructura para tests futuros
Fase 9: Documentación
Crear README.md principal
Documentar comandos de desarrollo
Documentar estructura del proyecto
Crear CONTRIBUTING.md
📝 Implementación Detallada

1. Root package.json
   json
   {
   "name": "meli-challenge",
   "version": "1.0.0",
   "private": true,
   "description": "Mercado Libre Frontend Challenge - Full Stack Implementation",
   "keywords": ["mercadolibre", "challenge", "nextjs", "nestjs", "monorepo"],
   "author": "Tu Nombre",
   "license": "MIT",
   "workspaces": [
   "apps/*",
   "packages/*"
   ],
   "scripts": {
   "dev": "npm run dev --workspaces --if-present",
   "dev:frontend": "npm run dev --workspace=apps/frontend",
   "dev:backend": "npm run dev --workspace=apps/backend",
   "build": "npm run build --workspaces --if-present",
   "build:frontend": "npm run build --workspace=apps/frontend",
   "build:backend": "npm run build --workspace=apps/backend",
   "lint": "npm run lint --workspaces --if-present",
   "lint:fix": "npm run lint:fix --workspaces --if-present",
   "format": "prettier --write \"**/\*.{ts,tsx,js,jsx,json,md}\"",
   "format:check": "prettier --check \"**/_.{ts,tsx,js,jsx,json,md}\"",
   "type-check": "npm run type-check --workspaces --if-present",
   "test": "npm run test --workspaces --if-present",
   "test:watch": "npm run test:watch --workspaces --if-present",
   "test:cov": "npm run test:cov --workspaces --if-present",
   "prepare": "husky install",
   "clean": "rm -rf node_modules apps/_/node*modules packages/*/node*modules apps/*/.next apps/\*/dist"
   },
   "devDependencies": {
   "@commitlint/cli": "^18.4.0",
   "@commitlint/config-conventional": "^18.4.0",
   "@typescript-eslint/eslint-plugin": "^6.15.0",
   "@typescript-eslint/parser": "^6.15.0",
   "eslint": "^8.56.0",
   "eslint-config-prettier": "^9.1.0",
   "eslint-plugin-prettier": "^5.1.0",
   "husky": "^8.0.0",
   "lint-staged": "^15.2.0",
   "prettier": "^3.1.0",
   "typescript": "^5.3.0"
   },
   "engines": {
   "node": ">=18.17.0",
   "npm": ">=9.0.0"
   }
   }
2. .nvmrc
   18.17.0
3. tsconfig.base.json
   json
   {
   "compilerOptions": {
   "target": "ES2022",
   "lib": ["ES2022"],
   "module": "commonjs",
   "moduleResolution": "node",
   "esModuleInterop": true,
   "allowSyntheticDefaultImports": true,
   "strict": true,
   "skipLibCheck": true,
   "forceConsistentCasingInFileNames": true,
   "resolveJsonModule": true,
   "declaration": true,
   "declarationMap": true,
   "sourceMap": true,
   "noUnusedLocals": true,
   "noUnusedParameters": true,
   "noImplicitReturns": true,
   "noFallthroughCasesInSwitch": true,
   "incremental": true,
   "baseUrl": ".",
   "paths": {
   "@meli/shared-types": ["packages/shared-types/src"]
   }
   },
   "exclude": ["node_modules", "dist", ".next"]
   }
4. .eslintrc.js
   javascript
   module.exports = {
   root: true,
   parser: '@typescript-eslint/parser',
   parserOptions: {
   ecmaVersion: 2022,
   sourceType: 'module',
   },
   plugins: ['@typescript-eslint', 'prettier'],
   extends: [
   'eslint:recommended',
   'plugin:@typescript-eslint/recommended',
   'plugin:prettier/recommended',
   ],
   rules: {
   'prettier/prettier': 'error',
   '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
   '@typescript-eslint/explicit-function-return-type': 'off',
   '@typescript-eslint/explicit-module-boundary-types': 'off',
   '@typescript-eslint/no-explicit-any': 'warn',
   },
   env: {
   node: true,
   es2022: true,
   },
   };
5. .prettierrc.js
   javascript
   module.exports = {
   semi: true,
   trailingComma: 'all',
   singleQuote: true,
   printWidth: 100,
   tabWidth: 2,
   useTabs: false,
   arrowParens: 'always',
   endOfLine: 'lf',
   };
6. .prettierignore
   node_modules
   .next
   dist
   build
   coverage
   \*.lock
   package-lock.json
7. .gitignore

# Dependencies

node_modules/
.pnp
.pnp.js

# Testing

coverage/
\*.coverage

# Next.js

.next/
out/
build/

# NestJS

dist/

# Environment

.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs

logs
_.log
npm-debug.log_

# OS

.DS_Store
Thumbs.db

# IDE

.vscode/_
!.vscode/settings.json
!.vscode/extensions.json
.idea/
_.swp
\*.swo

# Misc

.turbo 8. commitlint.config.js
javascript
module.exports = {
extends: ['@commitlint/config-conventional'],
rules: {
'type-enum': [
2,
'always',
[
'feat',
'fix',
'docs',
'style',
'refactor',
'perf',
'test',
'chore',
'revert',
'ci',
'build',
],
],
'subject-case': [2, 'never', ['upper-case']],
'subject-empty': [2, 'never'],
'subject-full-stop': [2, 'never', '.'],
'type-empty': [2, 'never'],
},
}; 9. .husky/pre-commit
bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

npx lint-staged 10. .husky/commit-msg
bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/\_/husky.sh"

npx --no -- commitlint --edit "$1" 11. lint-staged.config.js
javascript
module.exports = {
'_.{ts,tsx,js,jsx}': [
'eslint --fix',
'prettier --write',
],
'_.{json,md}': [
'prettier --write',
],
}; 12. .vscode/settings.json
json
{
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
},
"typescript.tsdk": "node_modules/typescript/lib",
"typescript.enablePromptUseWorkspaceTsdk": true,
"files.exclude": {
"**/.git": true,
"**/.DS_Store": true,
"**/node_modules": true,
"**/.next": true,
"**/dist": true
},
"search.exclude": {
"**/node_modules": true,
"**/package-lock.json": true,
"**/.next": true,
"\*\*/dist": true
}
} 13. .vscode/extensions.json
json
{
"recommendations": [
"esbenp.prettier-vscode",
"dbaeumer.vscode-eslint",
"bradlc.vscode-tailwindcss",
"prisma.prisma",
"usernamehw.errorlens",
"streetsidesoftware.code-spell-checker"
]
} 14. .github/workflows/ci.yml
yaml
name: CI

on:
push:
branches: [main, develop]
pull_request:
branches: [main, develop]

jobs:
lint-and-type-check:
runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Check formatting
        run: npm run format:check

test-frontend:
runs-on: ubuntu-latest
needs: lint-and-type-check

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run frontend tests
        run: npm run test --workspace=apps/frontend

test-backend:
runs-on: ubuntu-latest
needs: lint-and-type-check

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run backend tests
        run: npm run test --workspace=apps/backend

build:
runs-on: ubuntu-latest
needs: [test-frontend, test-backend]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build all workspaces
        run: npm run build

15. Frontend apps/frontend/package.json
    json
    {
    "name": "@meli/frontend",
    "version": "1.0.0",
    "private": true,
    "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
    },
    "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
    },
    "devDependencies": {
    "@meli/shared-types": "\*",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
    }
    }
16. Frontend apps/frontend/tsconfig.json
    json
    {
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "noEmit": true,
    "isolatedModules": true,
    "incremental": true,
    "plugins": [
    {
    "name": "next"
    }
    ],
    "paths": {
    "@/_": ["./src/_"],
    "@meli/shared-types": ["../../packages/shared-types/src"]
    }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
    }
17. Frontend apps/frontend/next.config.js
    javascript
    /\*_ @type {import('next').NextConfig} _/
    const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@meli/shared-types'],
    images: {
    domains: ['http2.mlstatic.com'],
    },
    env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    },
    };

module.exports = nextConfig; 18. Frontend apps/frontend/tailwind.config.ts
typescript
import type { Config } from 'tailwindcss';

const config: Config = {
content: [
'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
'./src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
],
theme: {
extend: {
colors: {
primary: {
DEFAULT: '#3483FA',
dark: '#2968C8',
},
success: '#00A650',
warning: '#F7B500',
error: '#F23D4F',
background: {
DEFAULT: '#EBEBEB',
paper: '#FFFFFF',
},
text: {
primary: '#333333',
secondary: '#666666',
},
},
},
},
plugins: [],
};

export default config; 19. Backend apps/backend/package.json
json
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
"lint": "eslint \"{src,apps,libs,test}/**/\*.ts\"",
"lint:fix": "eslint \"{src,apps,libs,test}/**/_.ts\" --fix",
"type-check": "tsc --noEmit",
"test": "jest",
"test:watch": "jest --watch",
"test:cov": "jest --coverage",
"test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
"test:e2e": "jest --config ./test/jest-e2e.json"
},
"dependencies": {
"@nestjs/common": "^10.3.0",
"@nestjs/core": "^10.3.0",
"@nestjs/platform-express": "^10.3.0",
"@nestjs/swagger": "^7.1.17",
"class-transformer": "^0.5.1",
"class-validator": "^0.14.0",
"reflect-metadata": "^0.2.0",
"rxjs": "^7.8.0"
},
"devDependencies": {
"@meli/shared-types": "_",
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
}
} 20. Backend apps/backend/tsconfig.json
json
{
"extends": "../../tsconfig.base.json",
"compilerOptions": {
"module": "commonjs",
"declaration": true,
"removeComments": true,
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"allowSyntheticDefaultImports": true,
"target": "ES2022",
"sourceMap": true,
"outDir": "./dist",
"baseUrl": "./",
"incremental": true,
"skipLibCheck": true,
"strictNullChecks": false,
"noImplicitAny": false,
"strictBindCallApply": false,
"forceConsistentCasingInFileNames": false,
"noFallthroughCasesInSwitch": false,
"paths": {
"@meli/shared-types": ["../../packages/shared-types/src"]
}
},
"include": ["src/**/*"],
"exclude": ["node_modules", "dist", "test"]
} 21. Backend apps/backend/nest-cli.json
json
{
"$schema": "https://json.schemastore.org/nest-cli",
"collection": "@nestjs/schematics",
"sourceRoot": "src",
"compilerOptions": {
"deleteOutDir": true
}
} 22. Shared Types packages/shared-types/package.json
json
{
"name": "@meli/shared-types",
"version": "1.0.0",
"main": "./src/index.ts",
"types": "./src/index.ts",
"scripts": {
"type-check": "tsc --noEmit"
},
"devDependencies": {
"typescript": "^5.3.0"
}
} 23. Shared Types packages/shared-types/tsconfig.json
json
{
"extends": "../../tsconfig.base.json",
"compilerOptions": {
"composite": true,
"declaration": true,
"declarationMap": true,
"outDir": "./dist",
"rootDir": "./src"
},
"include": ["src/**/*"],
"exclude": ["node_modules", "dist"]
} 24. Root README.md
markdown

# Mercado Libre Frontend Challenge - Full Stack Implementation

Implementación full-stack del desafío técnico de Mercado Libre, utilizando arquitectura hexagonal en un monorepo con Next.js y NestJS.

## 🏗️ Arquitectura

Este proyecto está organizado como un **monorepo** utilizando npm workspaces:
meli-challenge/
├── apps/
│ ├── frontend/ # Next.js 14 (App Router)
│ └── backend/ # NestJS API
└── packages/
└── shared-types/ # TypeScript types compartidos

### Frontend (Next.js)

- **Framework**: Next.js 14 con App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context API
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
cd meli-challenge

# Instalar dependencias de todo el monorepo
npm install
```

### Desarrollo

```bash
# Iniciar frontend y backend simultáneamente
npm run dev

# O iniciar individualmente:
npm run dev:frontend  # Frontend en http://localhost:3000
npm run dev:backend   # Backend en http://localhost:3001
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
# Lint de todo el código
npm run lint

# Fix automático de problemas de lint
npm run lint:fix

# Formatear código con Prettier
npm run format

# Verificar formateo
npm run format:check
```

## 📦 Estructura del Proyecto

### Frontend (`apps/frontend`)

src/
├── app/ # Next.js App Router
├── core/ # Domain layer (entities, use cases)
├── infrastructure/ # External adapters (API clients)
├── presentation/ # UI components, hooks, state
└── shared/ # Utilities, constants, types

### Backend (`apps/backend`)

src/
├── application/ # Use cases, DTOs
├── domain/ # Entities, repository interfaces
├── infrastructure/ # Controllers, repositories implementation
└── main.ts # Application entry point

## 🛠️ Stack Tecnológico

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Jest + React Testing Library

### Backend

- NestJS
- TypeScript
- Swagger/OpenAPI
- Jest

### DevOps & Tools

- npm workspaces
- ESLint + Prettier
- Husky + lint-staged
- Conventional Commits
- GitHub Actions

## 📝 Conventional Commits

Este proyecto utiliza [Conventional Commits](https://www.conventionalcommits.org/):
feat: nueva funcionalidad
fix: corrección de bugs
docs: cambios en documentación
style: formateo, puntos y comas faltantes, etc
refactor: refactorización de código
test: agregar o actualizar tests
chore: cambios en build, configuración, etc

## 🔗 Enlaces Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

MIT

## 👤 Author

Tu Nombre 25. CONTRIBUTING.md
markdown

# Contributing Guide

## Flujo de Trabajo

1. Crea una rama desde `develop`:

```bash
   git checkout -b feat/nueva-funcionalidad
```

2. Realiza tus cambios siguiendo las guías de estilo

3. Ejecuta los checks localmente:

```bash
   npm run lint
   npm run type-check
   npm run test
```

4. Commit siguiendo Conventional Commits:

```bash
   git commit -m "feat: agregar búsqueda de productos"
```

5. Push y crea un Pull Request

## Estructura de Commits

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `style`: Formateo, espacios, etc (no cambios de código)
- `refactor`: Refactorización sin cambios funcionales
- `perf`: Mejoras de performance
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, tools, configuración

## Guías de Estilo

### TypeScript

- Usar tipos explícitos cuando mejore la legibilidad
- Evitar `any`, usar `unknown` si es necesario
- Preferir interfaces sobre types para objetos
- Usar enums para constantes relacionadas

### React

- Componentes funcionales con hooks
- Props con TypeScript interfaces
- Nombres descriptivos en PascalCase
- Custom hooks con prefijo `use`

### Naming Conventions

- Archivos: kebab-case (`user-profile.tsx`)
- Componentes: PascalCase (`UserProfile`)
- Funciones/variables: camelCase (`getUserData`)
- Constantes: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- Interfaces: PascalCase con prefijo `I` opcional (`IUser` o `User`)

## Testing

- Escribir tests para toda lógica de negocio
- Tests unitarios para funciones puras
- Tests de integración para flujos completos
- Mínimo 80% de coverage en core domain

## Pull Requests

- Título descriptivo siguiendo Conventional Commits
- Descripción clara del cambio
- Screenshots para cambios UI
- Tests pasando
- Sin conflictos con base branch
  🧪 Criterios de Aceptación
  Estructura de carpetas creada correctamente
  npm workspaces configurado y funcionando
  Aplicación Next.js ejecutándose en puerto 3000
  Aplicación NestJS ejecutándose en puerto 3001
  ESLint sin errores en todo el código
  Prettier formatea correctamente
  TypeScript compila sin errores
  Husky hooks funcionando (pre-commit y commit-msg)
  CI pipeline ejecutándose en GitHub Actions
  README.md completo y claro
  CONTRIBUTING.md documentado
  Shared types package importable desde frontend y backend
  npm run dev inicia ambas apps simultáneamente
  npm run build construye ambas apps sin errores
  npm run lint ejecuta lint en todos los workspaces
  Path aliases configurados y funcionando
  🔗 Dependencias
  Depende de: Ninguno (este es el primer PRP)
  Requerido para: Todos los PRPs posteriores
  📚 Referencias
  Documentación
  npm workspaces
  Next.js Setup
  NestJS First Steps
  TypeScript Configuration
  ESLint Configuration
  Prettier Configuration
  Husky Documentation
  Conventional Commits
  Comandos de Instalación Rápida
  bash

# 1. Crear directorio y inicializar git

mkdir meli-challenge && cd meli-challenge
git init

# 2. Crear .nvmrc

echo "18.17.0" > .nvmrc
nvm use

# 3. Inicializar package.json root

npm init -y

# 4. Crear estructura de carpetas

mkdir -p apps/frontend apps/backend packages/shared-types .github/workflows .vscode .husky

# 5. Instalar dependencias root

npm install -D @commitlint/cli @commitlint/config-conventional @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier husky lint-staged prettier typescript

# 6. Crear Next.js app

cd apps
npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir
cd ..

# 7. Crear NestJS app

cd apps
npx @nestjs/cli new backend
cd ..

# 8. Crear shared-types package

cd packages/shared-types
npm init -y
mkdir src
touch src/index.ts
cd ../..

# 9. Inicializar Husky

npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# 10. Instalar dependencias de todos los workspaces

npm install
💡 Notas Importantes
Para el Agente de IA
Orden de Ejecución: Seguir el orden de las tareas estrictamente
Validación Continua: Después de cada fase, verificar que todo funciona
Versiones: Usar las versiones exactas especificadas para evitar incompatibilidades
Workspaces: Asegurarse de que los workspaces estén correctamente configurados antes de continuar
Path Aliases: Verificar que los path aliases funcionen correctamente entre packages
Troubleshooting Común
Problema: Husky hooks no se ejecutan Solución:

bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
Problema: TypeScript no encuentra @meli/shared-types Solución: Verificar paths en tsconfig.base.json y reiniciar el editor

Problema: ESLint conflictos con Prettier Solución: Verificar que eslint-config-prettier esté al final del array extends

Problema: Next.js no encuentra Tailwind classes Solución: Verificar que los paths en tailwind.config.ts incluyan todas las rutas necesarias

🎯 Resultado Esperado
Al completar este PRP, deberías tener:

✅ Un monorepo funcional con npm workspaces
✅ Dos aplicaciones (Next.js y NestJS) ejecutándose
✅ Package de tipos compartidos funcionando
✅ Herramientas de calidad de código configuradas
✅ Git hooks funcionando
✅ CI/CD básico en GitHub Actions
✅ Documentación completa
✅ VS Code configurado para el proyecto
Estructura Final de Archivos
meli-challenge/
├── .github/
│ └── workflows/
│ └── ci.yml
├── .husky/
│ ├── pre-commit
│ └── commit-msg
├── .vscode/
│ ├── settings.json
│ └── extensions.json
├── apps/
│ ├── frontend/
│ │ ├── public/
│ │ ├── src/
│ │ │ └── app/
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── .eslintrc.json
│ │ ├── next.config.js
│ │ ├── package.json
│ │ ├── postcss.config.js
│ │ ├── tailwind.config.ts
│ │ └── tsconfig.json
│ └── backend/
│ ├── src/
│ │ ├── app.controller.ts
│ │ ├── app.module.ts
│ │ ├── app.service.ts
│ │ └── main.ts
│ ├── test/
│ ├── nest-cli.json
│ ├── package.json
│ └── tsconfig.json
├── packages/
│ └── shared-types/
│ ├── src/
│ │ └── index.ts
│ ├── package.json
│ └── tsconfig.json
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.js
├── commitlint.config.js
├── CONTRIBUTING.md
├── lint-staged.config.js
├── package.json
├── README.md
└── tsconfig.base.json
✨ Siguiente Paso
Una vez completado este PRP, el siguiente paso es:

PRP-002: Backend - Arquitectura y Setup NestJS

Que incluirá:

Arquitectura hexagonal detallada para el backend
Módulos de NestJS (Products, Search)
DTOs y validaciones
Configuración de Swagger
Variables de entorno
