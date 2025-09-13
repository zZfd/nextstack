## Project Goal

The goal of the project is to use Monorepo architecture to create a full stack typeScript development Scaffold and provide necessary development templates.

## Development Environment & Technology Stack

### Project Overview

**NextStack** - A full-stack TypeScript development scaffold built on Monorepo architecture

### 🏗️ Architecture & Toolchain

#### Monorepo Management

- **Package Manager**: pnpm (v9.15.0) + pnpm workspaces
- **Build Tool**: Turbo (v2.5.6) - for task orchestration and caching
- **Workspace Structure**: apps/_ and packages/_ organization

### Core Technology Stack

#### Frontend Applications (apps/)

1. **nextstack-web** - Next.js 15.1.8 Web Application
   - React 19.0.0 + React DOM
   - tRPC client integration
   - TypeScript support

2. **nextstack-mobile** - React Native (Expo 53)
   - React Native 0.79.5
   - Expo Router 5.1.5
   - Cross-platform mobile app

3. **nextstack-admin** - Admin dashboard
4. **nextstack-api** - API service

#### Shared Packages (packages/)

1. **@nextstack/ui** - Component Library
   - Tamagui UI Framework (v1.132.23)
   - Storybook 9.1.5 for component documentation
   - React Native Web support

2. **@nextstack/database** - Data Layer
   - Prisma ORM (v6.15.0)
   - PostgreSQL database

3. **@nextstack/trpc** - Type-safe API Communication
   - tRPC v11.5.1
   - End-to-end type safety

4. **@nextstack/api** - Shared API logic
5. **@nextstack/tsconfig** - Shared TypeScript configuration
6. **@nextstack/eslint-config** - Shared ESLint configuration

### 🛠️ Development Environment

#### Database

- **PostgreSQL 16** (Alpine) via Docker Compose
- Default port: 5433
- Development database: nextstack_dev

#### Quality Assurance

- **TypeScript 5.9.2** - Strict type checking
- **ESLint 9.17.0** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks
- **lint-staged 16.1.6** - Pre-commit checks

### 🚀 Available Scripts

#### Root Level Commands

```bash
# Development
pnpm typecheck    # Type checking
pnpm lint         # Code linting
pnpm format       # Code formatting

# Database
pnpm db:dev       # Start development database
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema changes
pnpm db:studio    # Database GUI

# Cleanup
pnpm clean        # Clean all build artifacts
```

## Rules

### Typescript Rules

- Should not use any `any` type
- Should not use `var`

### Coding Rules

- Everything should be in English
