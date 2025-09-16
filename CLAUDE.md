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

4. **@nextstack/auth** - Authentication Layer
   - better-auth v1.3.9
   - Secure authentication workflows

5. **@nextstack/storage** - Storage Layer
   - AWS S3 SDK v3.691.0
   - MinIO support for local development

6. **@nextstack/validators** - Data Validation
   - Zod v3.22.4
   - Type-safe schema validation

7. **@nextstack/api** - Shared API logic
8. **@nextstack/tsconfig** - Shared TypeScript configuration
9. **@nextstack/eslint-config** - Shared ESLint configuration

### 🛠️ Development Environment

#### Database & Storage

- **PostgreSQL 16**
- **MinIO**

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
pnpm lint:fix         # Code linting
pnpm format       # Code formatting

# Docker Services
pnpm dev          # Start development services (PostgreSQL + MinIO)
pnpm dev:stop     # Stop development services
pnpm dev:down     # Stop and remove services with volumes
pnpm dev:logs     # View service logs
pnpm dev:status   # Check service status

# Database
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema changes
pnpm db:migrate   # Run database migrations
pnpm db:reset     # Reset database
pnpm db:studio    # Database GUI

# Cleanup
pnpm clean        # Clean all build artifacts
```

## User Rules

- **Keep It Simple**: Follow KISS rule. No over-engineering, no unnecessary abstractions
- **Read First**: Check **[Product Requirements](./docs/PRODUCT.md)** for good understanding
- **Follow Rules**: Check the Coding Rules & existing patterns section for architectural patterns
- **Fetch Documentation**: Use context7 MCP server to get up-to-date library docs when coding
- **Avoid Tunnel Vision**: Don't focus immediately on implementation:
  - Understand the full scope first
  - Check for existing usage and dependencies
  - Consider migration impact before proposing changes
- **Always use `@` path aliases instead of relative imports**
- **Greenfield Freedom**: This is a new project; you can change or rewrite anything. No need to consider backward compatibility for APIs or database schema. Follow best practices and make optimal decisions without legacy constraints.

### Typescript Rules

- Should not use any `any` type
- Should not use `var`

### Language Rules

- Everything should be in English

### Organization Rules

**Enforce Barrel Pattern**

1. One Entry Point: Every module directory must have an index.ts as its sole export file.

2. Centralize Exports: Use index.ts to re-export the directory's public API. Always convert default exports to named exports.

3. Shallow Imports: All imports must target the directory (./components), never a specific file inside it (./components/Button.ts).

4. Critical Check: Prohibit any change that creates a circular dependency between barrels.

## Style guidelines

For comprehensive visual design guidelines and theme specifications, please refer to:

**[Application Theme & Visual Guidelines](./docs/THEME.md)**

The theme document defines our design philosophy of **"Professional, Refined, and Value-Focused"** with the following key principles that should guide all UI component development:

- **Professional**: Reflects photographer verification, streamlined project management, and efficient communication
- **Premium**: Embodies curated visual content, quality merchant products, and overall user experience
- **Efficient**: Demonstrates seamless processes and smooth user workflows
- **Trust**: Platform acts as professional endorsement with reliable guarantees
- **Value-Driven**: Every component should serve measurable business outcomes

#### Visual Style: Modern Refinement

Components should follow the **Modern Refinement** aesthetic that blends:

- Clean efficiency of modern digital products
- Exquisite quality of the luxury sector
- Subtle materiality with soft shadows for depth
- Refined card designs with minimal corner rounding (4-8px)
- Professional data visualization using brand accent colors

All components and pages must align with these visual principles while maintaining the technical rules outlined above.

## Backend Architecture

NextStack implements a **modular layered architecture** based on Monorepo structure, achieving high code reuse and type safety.

### Architecture Overview

The backend follows a **modern microservice-style architecture** with clear separation of concerns:

```
┌─────────────────┐
│   Client Apps   │ (Web, Mobile, Admin)
└─────────────────┘
        │
        ▼ tRPC Client
┌─────────────────┐
│  API Service    │ apps/nextstack-api (Express.js)
└─────────────────┘
        │
        ▼ HTTP/tRPC
┌─────────────────┐
│  tRPC Layer     │ packages/api + packages/trpc
└─────────────────┘
        │
        ▼ Procedures
┌─────────────────┐
│ Business Logic  │ Routers + Middleware
└─────────────────┘
        │
        ▼ Prisma ORM
┌─────────────────┐
│   Data Layer    │ packages/database (PostgreSQL)
└─────────────────┘
```

### Core Components

#### 1. API Service Layer (`apps/nextstack-api`)

- **Express.js**

#### 2. API Communication Layer (`packages/api` + `packages/trpc`)

- **tRPC v11.5.1**

#### 3. Authentication Layer (`packages/auth`)

- **Better Auth v1.3.9**

#### 4. Data Access Layer (`packages/database`)

- **Prisma ORM v6.15.0** with PostgreSQL 16
- **Features**:
  - Zod integration for type validation

#### 5. Storage Layer (`packages/storage`)

- **Multi-provider Architecture**:
  - **S3 Provider**: AWS S3 compatible storage
  - **MinIO Provider**: Local development storage
  - **Local Provider**: File system storage

#### 6. Validation Layer (`packages/validators`)

- **Zod v3.22.4**: Schema validation
- **Auto-generated** validators from Prisma models
- **Type-safe** input/output validation
