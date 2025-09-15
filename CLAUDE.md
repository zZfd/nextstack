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

- **PostgreSQL 16** (Alpine) via Docker Compose
- Default port: 5433
- Development database: nextstack_dev

- **MinIO** - S3-compatible storage for development
- API port: 9000
- Console port: 9001
- Local file storage and bucket management

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

## Rules

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

- **Express.js** HTTP server (port 3001)

#### 2. API Communication Layer (`packages/api` + `packages/trpc`)

- **tRPC v11.5.1**: End-to-end type-safe RPC communication
- **Procedure Types**:
  - `publicProcedure`: Open access
  - `protectedProcedure`: Requires authentication
  - `optionalAuthProcedure`: Optional authentication

#### 3. Authentication Layer (`packages/auth`)

- **Better Auth v1.3.9**: JWT-based session management
- **Endpoints**: `/api/auth/*`
- **Prisma Adapter**: Direct database integration

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

### Development Workflow: Adding New API Endpoints

#### 1. Define Data Model (if needed)

```prisma
// packages/database/prisma/schema/example.prisma
model Example {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
}
```

#### 2. Create Validation Schema

```typescript
// packages/validators/src/example.ts
export const CreateExampleSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
});
```

#### 3. Implement tRPC Router

```typescript
// packages/api/src/routers/example.ts
export const exampleRouter = router({
  create: protectedProcedure
    .input(CreateExampleSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.example.create({ data: input });
    }),
});
```

#### 4. Register Router

```typescript
// packages/api/src/router.ts
return router({
  // ... existing routers
  example: exampleRouter,
});
```

#### 5. Use in Frontend

```typescript
// Frontend usage with full type safety
const { data } = trpc.example.create.useMutation();
```
