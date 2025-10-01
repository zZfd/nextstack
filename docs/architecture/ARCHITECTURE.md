# NextStack - Architecture Documentation

> **Last Updated**: 2025-10-01
> **Version**: 1.0.2
> **Status**: Active Development (Greenfield)

## Table of Contents

- [Overview](#overview)
- [Architecture Philosophy](#architecture-philosophy)
- [Monorepo Structure](#monorepo-structure)
- [Technology Stack](#technology-stack)
- [Core Architectural Patterns](#core-architectural-patterns)
- [Package Documentation](#package-documentation)
- [Development Workflow](#development-workflow)
- [Testing Strategy](#testing-strategy)
- [Security & Best Practices](#security--best-practices)
- [Coding Standards](#coding-standards)
- [Known Constraints](#known-constraints)

---

## Overview

**NextStack** is a full-stack TypeScript monorepo scaffold designed for building modern applications with shared backend logic across multiple platforms (web and mobile).

### Key Characteristics

- **Project Type**: Greenfield with complete architectural freedom
- **Language**: TypeScript 5.9.2 (strict mode)
- **Package Manager**: pnpm v9.15.0 with workspaces
- **Build System**: Turbo v2.5.6
- **Node Version**: >=18.0.0

### Design Philosophy

1. **Type Safety First**: End-to-end type safety from database to UI
2. **Platform Agnostic**: Single API serving multiple client platforms
3. **Developer Experience**: Fast feedback loops, auto-generated types, hot reload
4. **Production Ready**: Structured errors, transactions, graceful shutdown
5. **KISS Principle**: No over-engineering or unnecessary abstractions

---

## Architecture Philosophy

### Separation of Concerns

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │
│  (nextstack-expo, web)                                      │
│  - UI Components                                            │
│  - React Query + tRPC Client                                │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/tRPC
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER                                │
│  (nextstack-server)                                         │
│  - Express Server                                           │
│  - Middleware Stack                                         │
│  - tRPC Adapter                                             │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                 BUSINESS LOGIC LAYER                        │
│  (@nextstack/trpc-router)                                   │
│  - Route Handlers                                           │
│  - Business Rules                                           │
│  - Service Layer                                            │
│  - Error Handling                                           │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   DATA ACCESS LAYER                         │
│  (@nextstack/database)                                      │
│  - Prisma Client                                            │
│  - Database Models                                          │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE                            │
│  - PostgreSQL 16                                            │
│  - MinIO (S3-compatible)                                    │
│  - Redis (future)                                           │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision                     | Rationale                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Standalone API Server**    | Dedicated Express server (not Next.js API routes) enables multi-platform support and clearer separation |
| **Schema-First Development** | Prisma schema generates both DB client and Zod validators, ensuring single source of truth              |
| **tRPC over REST**           | Type-safe RPC with auto-completion, no manual API contracts needed                                      |
| **Monorepo Structure**       | Code sharing between platforms while maintaining clear boundaries                                       |
| **Multi-file Prisma Schema** | Domain-based schema organization (~515 lines split into 10 files) for maintainability                   |

---

## Monorepo Structure

```
nextstack/
│
├── apps/                           # Application Layer
│   ├── nextstack-server/          # Express + tRPC API Server
│   │   ├── src/
│   │   │   ├── index.ts           # Server entry point
│   │   │   ├── middleware/        # Express middleware
│   │   │   │   ├── auth.ts
│   │   │   │   ├── cors.ts
│   │   │   │   ├── rate-limit.ts
│   │   │   │   └── security.ts
│   │   │   └── utils/
│   │   │       └── shutdown.ts    # Graceful shutdown
│   │   ├── tests/
│   │   │   ├── integration/       # Real DB integration tests
│   │   │   └── setup/             # Test configuration
│   │   ├── vitest.config.ts
│   │   └── package.json
│   │
│   ├── nextstack-expo/            # React Native Mobile App
│   │   ├── app/                   # Expo Router (file-based)
│   │   │   ├── _layout.tsx        # Root layout
│   │   │   └── index.tsx
│   │   ├── components/
│   │   │   └── ui/                # shadcn-style components
│   │   ├── lib/
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── useColorScheme.ts
│   │   ├── global.css             # NativeWind styles
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   └── web/                       # (Future) Next.js Web App
│
├── packages/                      # Shared Libraries
│   ├── database/                  # Database Layer
│   │   ├── prisma/
│   │   │   └── schema/            # Multi-file schema
│   │   │       ├── schema.prisma  # Datasource config
│   │   │       ├── enums.prisma
│   │   │       ├── user.prisma
│   │   │       ├── auth.prisma    # Better-Auth tables
│   │   │       ├── profile.prisma
│   │   │       ├── order.prisma
│   │   │       ├── offering.prisma
│   │   │       ├── content.prisma
│   │   │       ├── media.prisma
│   │   │       └── level.prisma
│   │   ├── index.ts               # Export PrismaClient
│   │   └── package.json
│   │
│   ├── auth/                      # Authentication
│   │   ├── src/
│   │   │   ├── index.ts           # Re-exports
│   │   │   ├── server.ts          # Better-Auth config
│   │   │   ├── client.ts          # Client utilities
│   │   │   ├── validation.ts      # Auth validators
│   │   │   └── types.ts           # Session/User types
│   │   └── package.json
│   │
│   ├── trpc-router/               # Business Logic Layer
│   │   ├── src/
│   │   │   ├── router.ts          # Root router
│   │   │   ├── trpc.ts            # tRPC instance
│   │   │   ├── context.ts         # Request context
│   │   │   ├── auth.ts            # Auth helpers
│   │   │   ├── procedures/        # Procedure builders
│   │   │   │   ├── public.ts
│   │   │   │   └── protected.ts
│   │   │   ├── middleware/        # tRPC middleware
│   │   │   │   └── auth.ts
│   │   │   ├── routers/           # Feature routes
│   │   │   │   ├── auth/
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── get-me.ts
│   │   │   │   │   └── get-session.ts
│   │   │   │   └── user/
│   │   │   │       ├── index.ts
│   │   │   │       ├── create-user.ts
│   │   │   │       ├── get-user.ts
│   │   │   │       ├── get-users.ts
│   │   │   │       ├── get-user-by-email.ts
│   │   │   │       ├── update-user.ts
│   │   │   │       ├── delete-user.ts
│   │   │   │       └── get-user-stats.ts
│   │   │   ├── services/          # Business logic
│   │   │   │   └── user/
│   │   │   │       ├── index.ts
│   │   │   │       └── user.selects.ts
│   │   │   ├── errors/            # Error handling
│   │   │   │   ├── index.ts
│   │   │   │   ├── base.error.ts
│   │   │   │   ├── business.error.ts
│   │   │   │   └── application.errors.ts
│   │   │   └── utils/
│   │   │       └── error-handler.ts
│   │   ├── index.ts               # Public exports
│   │   └── package.json
│   │
│   ├── trpc-client/               # Client Utilities
│   │   ├── index.ts               # tRPC client setup
│   │   └── package.json
│   │
│   ├── validators/                # Validation Layer
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── generated/         # Auto-generated from Prisma
│   │   └── package.json
│   │
│   ├── storage/                   # File Storage
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   ├── factory.ts
│   │   │   └── providers/
│   │   │       ├── base.ts
│   │   │       ├── s3.ts          # MinIO/S3
│   │   │       └── local.ts       # Local filesystem
│   │   └── package.json
│   │
│   ├── tsconfig/                  # TypeScript Configs
│   │   ├── base.json
│   │   ├── react-library.json
│   │   └── package.json
│   │
│   └── eslint-config/             # ESLint Configs
│       ├── base.js
│       ├── react.js
│       ├── react-native.js
│       ├── node.js
│       ├── library.js
│       ├── next.js
│       └── package.json
│
├── .husky/                        # Git Hooks
├── docker-compose.yml             # Local dev infrastructure
├── turbo.json                     # Turbo pipeline config
├── pnpm-workspace.yaml            # Workspace definition
├── package.json                   # Root package
├── tsconfig.json                  # Root TS config
├── CLAUDE.md                      # Project instructions
└── ARCHITECTURE.md                # This file
```

---

## Technology Stack

### Backend Stack

| Technology     | Version  | Purpose            |
| -------------- | -------- | ------------------ |
| **TypeScript** | 5.9.2    | Language           |
| **Node.js**    | >=18.0.0 | Runtime            |
| **Express**    | 4.18.2   | HTTP Server        |
| **tRPC**       | 11.5.1   | Type-safe API      |
| **Prisma**     | 6.15.0   | Database ORM       |
| **PostgreSQL** | 16       | Database           |
| **BetterAuth** | 1.3.9    | Authentication     |
| **MinIO**      | latest   | Object Storage     |
| **Zod**        | 3.22.4   | Runtime Validation |

### Frontend Stack (Mobile)

| Technology              | Version  | Purpose                              |
| ----------------------- | -------- | ------------------------------------ |
| **React**               | 19.0.0   | UI Library                           |
| **React Native**        | 0.79.5   | Mobile Framework                     |
| **Expo**                | ~53.0.22 | Development Platform                 |
| **Expo Router**         | ~5.1.5   | File-based Routing                   |
| **NativeWind**          | 4.1.23   | Tailwind for RN                      |
| **@rn-primitives**      | ~1.2.0   | Headless Components (27+ primitives) |
| **TanStack Query**      | 5.80.3   | Data Fetching                        |
| **tRPC React Query**    | 11.5.1   | Type-safe Client                     |
| **Lucide React Native** | 0.544.0  | Icon Library                         |
| **React Hook Form**     | 7.63.0   | Form Management                      |

### DevOps & Tooling

| Technology         | Version | Purpose              |
| ------------------ | ------- | -------------------- |
| **pnpm**           | 9.15.0  | Package Manager      |
| **Turbo**          | 2.5.6   | Build System         |
| **Vitest**         | 3.2.4   | Test Runner          |
| **ESLint**         | 9.17.0  | Linter               |
| **Prettier**       | 3.6.2   | Formatter            |
| **Husky**          | 9.1.7   | Git Hooks            |
| **Docker Compose** | 3.8     | Local Infrastructure |

---

## Core Architectural Patterns

### 1. Hierarchical tRPC Router Pattern

**Pattern**: Namespace-based router organization

```typescript
// packages/trpc-router/src/router.ts
export function createAppRouter(config: {
  version?: string;
  environment?: string;
}) {
  return router({
    // CRUD Operations Namespace
    core: router({
      user: router({
        create: createUser,
        update: updateUser,
        delete: deleteUser,
        get: getUser,
        list: getUsers,
      }),
    }),

    // Business Logic Namespace
    main: router({
      auth: router({
        getMe,
        getSession,
      }),
      user: router({
        getByEmail: getUserByEmail,
        stats: getUserStats,
      }),
    }),

    // System Metadata
    _meta: {
      health: publicProcedure.query(() => ({
        status: 'healthy',
        timestamp: new Date().toISOString(),
      })),
      version: publicProcedure.query(() => ({
        version: config.version || '0.0.0',
        environment: config.environment || 'development',
      })),
    },
  });
}

export type AppRouter = ReturnType<typeof createAppRouter>;
```

**Client Usage**:

```typescript
// Type-safe client calls
trpc.core.user.create.mutate({ email, name });
trpc.main.user.getByEmail.query({ email });
trpc._meta.health.query();
```

**Benefits**:

- Clear separation: `core` for CRUD, `main` for business logic
- Type inference across client/server boundary
- Scalable organization for large APIs

---

### 2. Three-Layer Error Handling

**Pattern**: Structured error hierarchy with HTTP status mapping

```typescript
// Base Layer
export class BaseError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: ErrorDetails;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.INTERNAL_ERROR,
    statusCode = 500,
    details?: ErrorDetails,
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      // Security: Only show stack in development
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}

// Business Layer
export class BusinessError extends BaseError {
  constructor(code: ErrorCode, message: string, statusCode = 400) {
    super(message, code, statusCode, undefined, true);
  }
}

// Application Layer
export class ApplicationError extends BaseError {
  constructor(code: ErrorCode, message: string, statusCode = 500) {
    super(message, code, statusCode, undefined, false);
  }
}
```

**Usage in Procedures**:

```typescript
export const createUser = publicProcedure
  .input(CreateUserSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.$transaction(async tx => {
        const existingUser = await tx.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          throw new BusinessError(
            ErrorCodes.USER_ALREADY_EXISTS,
            'User with this email already exists',
            409
          );
        }

        return await tx.user.create({
          data: { email: input.email, name: input.name },
          select: userWithCountsSelect,
        });
      });
    } catch (error) {
      throw handleServiceError(error); // Maps to tRPC errors
    }
  });
```

**Error Codes**:

```typescript
export enum ErrorCode {
  // Auth
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',

  // Resources
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CONFLICT = 'CONFLICT',

  // Business
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',

  // System
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}
```

---

### 3. Context-Based Authentication

**Pattern**: Request context with optional session/user

```typescript
// packages/trpc-router/src/context.ts
export const createContext = async (opts: CreateContextOptions) => {
  let session: Session | null = null;
  let user: User | null = null;

  if (opts?.req) {
    try {
      // Extract headers (supports both Express and fetch)
      const headers = new Headers();
      const reqHeaders = opts.req.headers;

      if (reqHeaders instanceof Headers) {
        reqHeaders.forEach((value, key) => {
          headers.set(key, value);
        });
      } else {
        // Node.js IncomingHttpHeaders
        Object.entries(reqHeaders).forEach(([key, value]) => {
          if (typeof value === 'string') {
            headers.set(key, value);
          }
        });
      }

      const sessionResult = await opts.auth.api.getSession({ headers });

      if (sessionResult?.session && sessionResult?.user) {
        session = { ...sessionResult.session };
        user = { ...sessionResult.user };
      }
    } catch (error) {
      if (opts.isDevelopment) {
        console.error('Auth session validation failed:', error);
      }
      // Production: silently fail for security
    }
  }

  return {
    db, // Prisma client
    session, // BetterAuth session or null
    user, // User object or null
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
```

**Protected Procedures**:

```typescript
// packages/trpc-router/src/middleware/auth.ts
export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.user,
    },
  });
});

// packages/trpc-router/src/procedures/protected.ts
export const protectedProcedure = publicProcedure.use(isAuthenticated);

export const optionalAuthProcedure = publicProcedure; // No middleware
```

---

### 4. Schema-First Type Generation

**Pattern**: Single source of truth from Prisma schema

```prisma
// packages/database/prisma/schema/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

generator zod {
  provider               = "zod-prisma-types"
  output                 = "../../../validators/src/generated"
  useMultipleFiles       = true
  writeBarrelFiles       = false
  createInputTypes       = true
  createModelTypes       = true
  addInputTypeValidation = false
}
```

**Flow**:

```
Prisma Schema
    ↓
    ├─→ Prisma Client (DB operations)
    └─→ Zod Schemas (Validation)
            ↓
        tRPC Procedures
            ↓
        Type-safe Client
```

**Example**:

```typescript
// Auto-generated: packages/validators/src/generated/User.ts
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

// Usage in tRPC
export const createUser = publicProcedure
  .input(CreateUserSchema) // Auto-validated
  .mutation(async ({ ctx, input }) => {
    // input is fully typed!
    return await ctx.db.user.create({ data: input });
  });
```

---

### 5. Ordered Middleware Stack

**Pattern**: Critical order for Express middleware

```typescript
// apps/nextstack-server/src/index.ts

// 1. Request ID - Must be FIRST (other middleware depend on it)
app.use(requestIdMiddleware);

// 2. Timeout - Early protection against long requests
app.use(timeoutMiddleware);

// 3. Security - Helmet.js headers (XSS, CSRF protection)
app.use(createSecurityMiddleware());

// 4. CORS - Allow cross-origin requests
app.use(createCorsMiddleware());

// 5. Logging - After security, before business logic
app.use(requestLogger);

// 6. Body parsing & compression
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 7. Rate limiting - Protect specific routes
app.use('/trpc', rateLimiter);

// Routes
app.get('/health', healthHandler);
app.use('/api/auth', authHandler);
app.use('/trpc', trpcHandler);

// Error handling - Must be LAST
app.use('*', notFoundHandler);
app.use(globalErrorHandler);
```

**Why Order Matters**:

- Request ID must be first (logged in all subsequent middleware)
- Security headers before any response
- Rate limiting after logging (to log blocked requests)
- Error handlers last (catch all errors)

---

### 6. Provider-Based Storage Abstraction

**Pattern**: Factory pattern for environment-based provider selection

```typescript
// packages/storage/src/index.ts
export interface BaseStorageProvider {
  upload(
    file: Buffer,
    key: string,
    metadata?: Record<string, string>
  ): Promise<string>;
  download(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}

// packages/storage/src/factory.ts
export function createStorageProvider(
  type: 's3' | 'local',
  config: StorageConfig
): BaseStorageProvider {
  switch (type) {
    case 's3':
      return new S3StorageProvider(config);
    case 'local':
      return new LocalStorageProvider(config);
    default:
      throw new Error(`Unknown storage type: ${type}`);
  }
}

export function createStorageProviderFromEnv(): BaseStorageProvider {
  const type = process.env.STORAGE_TYPE || 's3';
  const config = {
    endpoint: process.env.S3_ENDPOINT,
    bucket: process.env.S3_BUCKET,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  };
  return createStorageProvider(type, config);
}
```

**Usage**:

```typescript
// In service layer
const storage = createStorageProviderFromEnv();
const url = await storage.upload(fileBuffer, 'avatars/user-123.jpg');
```

---

### 7. File-Per-Route Organization

**Pattern**: Single procedure per file for scalability

```
routers/user/
├── index.ts              # Re-exports all routes
├── create-user.ts        # POST /core/user/create
├── get-user.ts           # GET /core/user/get
├── get-users.ts          # GET /core/user/list
├── get-user-by-email.ts  # GET /main/user/getByEmail
├── update-user.ts        # PUT /core/user/update
├── delete-user.ts        # DELETE /core/user/delete
└── get-user-stats.ts     # GET /main/user/stats
```

**Benefits**:

- Easy to find specific route logic
- Clear git history per feature
- Avoids merge conflicts
- Simple to test individual routes

---

### 8. Transaction Wrapping for Critical Operations

**Pattern**: Database transactions for data consistency

```typescript
export const createUser = publicProcedure
  .input(CreateUserSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.$transaction(async tx => {
        // 1. Check existing user
        const existingUser = await tx.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          throw new BusinessError(
            ErrorCodes.USER_ALREADY_EXISTS,
            'User with this email already exists',
            409
          );
        }

        // 2. Create user
        const user = await tx.user.create({
          data: {
            email: input.email,
            name: input.name,
          },
        });

        // 3. Create default profile (example)
        await tx.profile.create({
          data: {
            userId: user.id,
            bio: '',
          },
        });

        // All-or-nothing: If any step fails, entire transaction rolls back
        return user;
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  });
```

---

### 9. Real Database Integration Testing

**Pattern**: No mocks - test against real PostgreSQL

```typescript
// apps/nextstack-server/vitest.config.ts
export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup/setup.ts'],
    globalSetup: './tests/setup/globalSetup.ts',
    globalTeardown: './tests/setup/globalTeardown.ts',
    pool: 'forks', // Process isolation
    poolOptions: {
      forks: {
        singleFork: false, // Allow concurrent tests
      },
    },
    testTimeout: 30000, // DB operations need time
  },
});

// tests/integration/api/database-verification.test.ts
describe('Database Real Operations', () => {
  it('should perform full CRUD cycle', async () => {
    // 1. CREATE
    const created = await db.post.create({
      data: { title: 'Test', content: 'Content' },
    });
    expect(created.id).toBeDefined();

    // 2. READ
    const found = await db.post.findUnique({
      where: { id: created.id },
    });
    expect(found).not.toBeNull();

    // 3. UPDATE
    const updated = await db.post.update({
      where: { id: created.id },
      data: { title: 'Updated' },
    });
    expect(updated.title).toBe('Updated');

    // 4. DELETE
    await db.post.delete({ where: { id: updated.id } });

    // 5. VERIFY
    const deleted = await db.post.findUnique({
      where: { id: updated.id },
    });
    expect(deleted).toBeNull();
  });
});
```

**Why Real DB**:

- Tests actual constraints and indexes
- Catches migration issues early
- Validates transaction behavior
- No mock/reality gap

---

## Package Documentation

### @nextstack/database

**Purpose**: Database access layer with Prisma ORM

**Exports**:

```typescript
export const db = new PrismaClient();
export * from '@prisma/client';
```

**Schema Organization** (~515 lines):

- `schema.prisma` - Datasource & generator config
- `enums.prisma` - Shared enumerations
- `user.prisma` - User model
- `auth.prisma` - Better-Auth tables (Session, Account)
- `profile.prisma` - User profiles
- `order.prisma` - Order management
- `offering.prisma` - Service offerings
- `content.prisma` - Content/posts
- `media.prisma` - File/media management
- `level.prisma` - Level/tier system

**Key Models**:

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  emailVerified Boolean  @default(false)
  role          Role     @default(USER)
  avatarFileId  String?  @unique
  avatar        File?    @relation(fields: [avatarFileId], references: [id])

  profiles      Profile[]
  orders        Order[]
  posts         Post[]
  uploadedFiles File[]   @relation("UploadedBy")
  sessions      Session[]
  accounts      Account[]
}
```

**Commands**:

- `pnpm db:generate` - Generate Prisma Client + Zod schemas
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Create and run migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:reset` - Reset database (force)

---

### @nextstack/auth

**Purpose**: BetterAuth wrapper with validation utilities

**Exports**:

```typescript
// Server
export { createAuth, createAuthConfig } from './server';
export type { Auth, AuthConfig } from './server';

// Client
export { createAuthClientWithConfig } from './client';

// Validation
export {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
} from './validation';

// Types
export type { Session, User } from './types';
```

**Configuration**:

```typescript
const auth = createAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  database: db,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
});
```

---

### @nextstack/trpc-router

**Purpose**: Business logic and API route definitions

**Exports**:

```typescript
// Core
export { createAppRouter, type AppRouter } from './src/router';
export {
  createContext,
  createExpressContext,
  type Context,
} from './src/context';
export { createAuthFromConfig, createAuthHandler, type Auth } from './src/auth';

// Layered architecture
export * from './src/services';
export * from './src/errors';
export * from './src/utils/error-handler';

// Procedures
export { publicProcedure } from './src/procedures/public';
export {
  protectedProcedure,
  optionalAuthProcedure,
} from './src/procedures/protected';

// Middleware
export { isAuthenticated, isOptionalAuth } from './src/middleware/auth';
```

**Router Structure**:

- `core.*` - CRUD operations
- `main.*` - Business logic
- `_meta.*` - System information

**Dependencies**:

- `@nextstack/database` - Data access
- `@nextstack/storage` - File storage
- `@nextstack/validators` - Input validation
- `@nextstack/auth` - Authentication
- `@trpc/server` - tRPC framework

---

### @nextstack/trpc-client

**Purpose**: Type-safe tRPC client utilities

**Exports**:

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@nextstack/trpc-router';

export const trpc = createTRPCReact<AppRouter>();
```

**Usage in React/React Native**:

```typescript
const [trpcClient] = useState(() =>
  trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3001/trpc',
      }),
    ],
  })
);

// Wrap app
<trpc.Provider client={trpcClient} queryClient={queryClient}>
  <App />
</trpc.Provider>

// Use in components
const { data, isLoading } = trpc.core.user.list.useQuery();
const createUser = trpc.core.user.create.useMutation();
```

---

### @nextstack/validators

**Purpose**: Zod schemas auto-generated from Prisma

**Generation**:

```bash
pnpm db:generate
# Generates: packages/validators/src/generated/**
```

**Auto-generated Schemas**:

- `UserSchema` - User model validation
- `CreateUserSchema` - User creation input
- `UpdateUserSchema` - User update input
- `ProfileSchema`, `OrderSchema`, etc.

**Manual Schemas** (in `src/index.ts`):

```typescript
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

---

### @nextstack/storage

**Purpose**: S3-compatible file storage abstraction

**Providers**:

- `S3StorageProvider` - AWS S3 / MinIO
- `LocalStorageProvider` - Local filesystem (dev/test)

**Interface**:

```typescript
interface BaseStorageProvider {
  upload(
    file: Buffer,
    key: string,
    metadata?: Record<string, string>
  ): Promise<string>;
  download(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}
```

**Factory Usage**:

```typescript
import { createStorageProviderFromEnv } from '@nextstack/storage';

const storage = createStorageProviderFromEnv();
const url = await storage.upload(buffer, 'avatars/user-123.jpg');
```

---

### @nextstack/tsconfig

**Purpose**: Shared TypeScript configurations

**Configs**:

- `base.json` - Default config for all packages
- `react-library.json` - React-specific config

**base.json**:

```json
{
  "compilerOptions": {
    "strict": true,
    "composite": true,
    "declaration": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "target": "ES2020",
    "skipLibCheck": true
  }
}
```

**Usage in packages**:

```json
{
  "extends": "@nextstack/tsconfig/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

---

### @nextstack/eslint-config

**Purpose**: Shared ESLint configurations

**Configs**:

- `base.js` - TypeScript + Import rules
- `react.js` - React-specific rules
- `react-native.js` - React Native rules
- `node.js` - Node.js rules
- `next.js` - Next.js rules
- `library.js` - Library-specific rules

**Key Rules**:

```javascript
{
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-explicit-any': 'warn',
  'import/order': ['error', {
    groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
    'newlines-between': 'always',
    alphabetize: { order: 'asc', caseInsensitive: true }
  }],
  'no-console': 'warn',
  'prefer-const': 'error',
  'no-var': 'error'
}
```

---

## Development Workflow

### Initial Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Start Docker services
pnpm docker
# Starts: PostgreSQL (port 5433) + MinIO (port 9000/9001)

# 3. Setup environment
cp .env.example .env
# Edit .env with database credentials

# 4. Generate Prisma Client + Zod schemas
pnpm db:generate

# 5. Push schema to database
pnpm db:push

# 6. (Optional) Seed data
pnpm db:seed
```

### Daily Development

```bash
# Start all apps in development mode
pnpm dev
# Runs:
# - nextstack-server (http://localhost:3001)
# - nextstack-expo (expo start)

# In separate terminals:
pnpm --filter nextstack-server dev  # API server only
pnpm --filter nextstack-expo dev    # Mobile app only
```

### Code Quality

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint          # Check all packages
pnpm lint:fix      # Auto-fix issues

# Formatting
pnpm format        # Prettier all files
```

### Database Operations

```bash
# Generate Prisma Client + Zod schemas
pnpm db:generate

# Push schema changes (dev)
pnpm db:push

# Create migration (production)
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio

# Reset database (WARNING: destructive)
pnpm db:reset
```

### Testing

```bash
# Run all tests
pnpm --filter nextstack-server test

# Watch mode
pnpm --filter nextstack-server test:watch

# UI mode
pnpm --filter nextstack-server test:ui

# Integration tests only
pnpm --filter nextstack-server test:integration
```

### Docker Management

```bash
# Start services
pnpm docker

# Stop services (keep data)
pnpm docker:stop

# Stop and remove volumes
pnpm docker:down

# View logs
pnpm docker:logs

# Check status
pnpm docker:status
```

### Turbo Tasks

```bash
# Build all packages
pnpm build

# Clean all build artifacts
pnpm clean

# Run specific task
turbo run build --filter=nextstack-server
turbo run typecheck --filter=@nextstack/database
```

---

## Testing Strategy

### Philosophy

1. **Real Database Tests**: No mocks for database operations
2. **Integration Focus**: Test full request-response cycles
3. **Process Isolation**: Use Vitest's `forks` pool
4. **Fast Feedback**: Watch mode for development

### Test Structure

```
apps/nextstack-server/tests/
├── setup/
│   ├── setup.ts           # Test environment setup
│   ├── globalSetup.ts     # Pre-test initialization
│   └── globalTeardown.ts  # Post-test cleanup
└── integration/
    └── api/
        └── database-verification.test.ts
```

### Example Test

```typescript
import { db } from '@nextstack/database';
import { describe, expect, it } from 'vitest';

describe('User CRUD', () => {
  it('should create and retrieve user', async () => {
    // Create
    const user = await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');

    // Retrieve
    const found = await db.user.findUnique({
      where: { id: user.id },
    });

    expect(found).not.toBeNull();
    expect(found!.name).toBe('Test User');

    // Cleanup
    await db.user.delete({ where: { id: user.id } });
  });
});
```

### Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup/setup.ts'],
    pool: 'forks',
    poolOptions: {
      forks: { singleFork: false },
    },
    testTimeout: 30000,
    include: ['tests/**/*.test.ts'],
  },
});
```

---

## Security & Best Practices

### 1. Environment-Aware Error Details

```typescript
export class BaseError extends Error {
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      // Only in development
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}
```

### 2. Request ID Tracking

```typescript
// middleware/requestId.ts
export const requestIdMiddleware = (req, res, next) => {
  req.requestId = uuid();
  res.setHeader('X-Request-ID', req.requestId);
  next();
};

// Usage in logs
console.error(`❌ Error [${req.requestId}]:`, error);
```

### 3. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/trpc', rateLimiter);
```

### 4. Security Headers (Helmet)

```typescript
import helmet from 'helmet';

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
  })
);
```

### 5. CORS Configuration

```typescript
const corsOptions = {
  origin: env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

### 6. Graceful Shutdown

```typescript
export function setupGracefulShutdown(server: Server) {
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received, shutting down gracefully...`);

    server.close(async () => {
      console.log('HTTP server closed');

      // Close database connections
      await db.$disconnect();
      console.log('Database connections closed');

      process.exit(0);
    });

    // Force shutdown after 30s
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 30000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}
```

### 7. Transaction Support

```typescript
// Always use transactions for multi-step operations
return await ctx.db.$transaction(async (tx) => {
  const user = await tx.user.create({ ... });
  await tx.profile.create({ userId: user.id, ... });
  return user;
});
```

### 8. Input Validation

```typescript
// Always validate with Zod schemas
export const createUser = publicProcedure
  .input(CreateUserSchema) // Zod validation
  .mutation(async ({ ctx, input }) => {
    // input is validated and typed
  });
```

---

## Coding Standards

### File Naming

- **Files**: `kebab-case` (e.g., `create-user.ts`, `get-user-stats.ts`)
- **Types/Schemas**: `PascalCase` (e.g., `CreateUserSchema`, `BaseError`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)
- **Functions**: `camelCase` (e.g., `createUser`, `validateEmail`)

### Import Organization

```typescript
// 1. Node.js built-ins
import path from 'path';
import fs from 'fs';

// 2. External packages
import express from 'express';
import { z } from 'zod';

// 3. Internal packages (workspace)
import { db } from '@nextstack/database';
import { CreateUserSchema } from '@nextstack/validators';

// 4. Relative imports (same package)
import { BaseError } from './errors/base.error';
import { handleServiceError } from '../utils/error-handler';
```

**ESLint auto-sorts** these with `import/order` rule.

### TypeScript Rules

**Strict Mode** enabled:

```json
{
  "strict": true,
  "noUnusedLocals": false, // Handled by ESLint
  "noUnusedParameters": false, // Handled by ESLint
  "forceConsistentCasingInFileNames": true
}
```

**Forbidden**:

- ❌ `any` type (use `unknown` or proper typing)
- ❌ `var` keyword (use `const`/`let`)
- ❌ Relative imports across packages (use `@` aliases)

**Allowed**:

- ✅ Unused vars with `_` prefix: `_unusedParam`
- ✅ Type assertions when necessary: `as const`
- ✅ Non-null assertions when safe: `user!.name`

### Code Comments

```typescript
// Good: Explain WHY, not WHAT
// We use forks pool to ensure database connections are isolated between tests
pool: 'forks';

// Bad: Obvious comment
// Set timeout to 30000
testTimeout: 30000;
```

### Error Messages

**User-facing**: Clear, actionable

```typescript
throw new BusinessError(
  ErrorCodes.USER_ALREADY_EXISTS,
  'A user with this email already exists. Please use a different email or sign in.',
  409
);
```

**Internal**: Technical, with context

```typescript
console.error(`Failed to upload file to S3: ${error.message}`, {
  bucket: config.bucket,
  key: fileKey,
  requestId: req.requestId,
});
```

---

## Known Constraints

### Mandatory Constraints (from CLAUDE.md)

1. **No `any` type** - Strict TypeScript enforcement
2. **No `var`** - Use `const`/`let` only
3. **English only** - Code, comments, docs
4. **Use `@` path aliases** - Never relative imports
5. **KISS principle** - No over-engineering

### Current Issues

1. **Don't run `pnpm type-check`** - Has issues (noted in project docs)
2. **Don't run `pnpm build`** - Not ready for production builds

### Development Constraints

- **Greenfield project** - Complete freedom to change anything
- **No backward compatibility** - Can refactor freely
- **Local dev only** - Docker Compose for PostgreSQL + MinIO

### Future Considerations

- [ ] Add Redis for caching
- [ ] Implement rate limiting per user (not just IP)
- [ ] Add Next.js web app to `apps/`
- [ ] Implement file upload endpoints
- [ ] Add comprehensive E2E tests
- [ ] Setup CI/CD pipeline
- [ ] Production deployment strategy

---

## Turbo Pipeline Configuration

### Task Dependencies

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "typecheck": {
      "dependsOn": ["^typecheck"],
      "cache": true
    },
    "lint": {
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Explanation**:

- `^build` means "run build on all dependencies first"
- `cache: true` enables Turbo's remote/local caching
- `persistent: true` keeps dev servers running

### Global Dependencies

```json
{
  "globalDependencies": ["**/.env.*local", "**/.env"]
}
```

Changes to `.env` files invalidate all caches.

---

## Package Dependency Graph (Detailed)

```
┌─────────────────────────────────────────────────────────────┐
│                     nextstack-server                        │
│                  (Express + tRPC Server)                    │
│                                                             │
│  Dependencies:                                              │
│  ├─ @nextstack/trpc-router ────┐                           │
│  ├─ @nextstack/auth ───────────┼───┐                       │
│  ├─ @trpc/server               │   │                       │
│  ├─ express                    │   │                       │
│  └─ compression, cors, helmet  │   │                       │
└────────────────────────────────┼───┼───────────────────────┘
                                 │   │
┌────────────────────────────────┼───┼───────────────────────┐
│                     nextstack-expo                          │
│                 (React Native Mobile)                       │
│                                                             │
│  Dependencies:                                              │
│  ├─ @nextstack/trpc-client ────┼───┤                       │
│  ├─ @nextstack/auth ───────────┼───┘                       │
│  ├─ @trpc/react-query          │                           │
│  ├─ expo, expo-router          │                           │
│  └─ nativewind, @rn-primitives │                           │
└────────────────────────────────┼─────────────────────────┘
                                 │
┌────────────────────────────────▼─────────────────────────┐
│                  @nextstack/trpc-router                   │
│               (Business Logic & Routes)                   │
│                                                           │
│  Dependencies:                                            │
│  ├─ @nextstack/database ──────┬─────┐                    │
│  ├─ @nextstack/storage ───────┤     │                    │
│  ├─ @nextstack/validators ────┤     │                    │
│  ├─ @nextstack/auth ───────┬──┘     │                    │
│  └─ @trpc/server           │        │                    │
└────────────────────────────┼────────┼──────────────────┘
                             │        │
┌────────────────────────────▼────────┼──────────────────┐
│                 @nextstack/auth                         │
│              (BetterAuth Wrapper)                       │
│                                                         │
│  Dependencies:                                          │
│  ├─ @nextstack/database ────────────┘                  │
│  └─ better-auth                                         │
└─────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────┐
│                @nextstack/database                     │
│                  (Prisma Client)                       │
│                                                        │
│  Dependencies:                                         │
│  └─ @prisma/client                                     │
└────────────────────────────────────────────────────────┘
                             │
                             │ Generates
                             ▼
┌────────────────────────────────────────────────────────┐
│               @nextstack/validators                    │
│           (Auto-generated Zod Schemas)                 │
│                                                        │
│  Dependencies:                                         │
│  └─ zod                                                │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                @nextstack/storage                      │
│          (S3/MinIO Storage Abstraction)                │
│                                                        │
│  Dependencies:                                         │
│  ├─ @aws-sdk/client-s3                                 │
│  ├─ @aws-sdk/s3-request-presigner                      │
│  └─ minio                                              │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│              @nextstack/trpc-client                    │
│            (Type-safe tRPC Client)                     │
│                                                        │
│  Dependencies:                                         │
│  ├─ @nextstack/trpc-router (types only)                │
│  └─ @trpc/client                                       │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│     @nextstack/tsconfig & @nextstack/eslint-config     │
│              (Shared Configurations)                   │
└────────────────────────────────────────────────────────┘
```

---

## Quick Reference

### Common Commands

| Task        | Command                               |
| ----------- | ------------------------------------- |
| Install     | `pnpm install`                        |
| Dev         | `pnpm dev`                            |
| Build       | `pnpm build`                          |
| Lint        | `pnpm lint`                           |
| Type Check  | `pnpm typecheck`                      |
| Format      | `pnpm format`                         |
| Test        | `pnpm --filter nextstack-server test` |
| DB Generate | `pnpm db:generate`                    |
| DB Push     | `pnpm db:push`                        |
| DB Studio   | `pnpm db:studio`                      |
| Docker Up   | `pnpm docker`                         |
| Docker Down | `pnpm docker:down`                    |
| Clean       | `pnpm clean`                          |

### Port Assignments

| Service       | Port |
| ------------- | ---- |
| API Server    | 3001 |
| PostgreSQL    | 5433 |
| MinIO API     | 9000 |
| MinIO Console | 9001 |
| Prisma Studio | 5555 |
| Expo Dev      | 8081 |

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5433/dbname"

# Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Storage
STORAGE_TYPE="s3"
S3_ENDPOINT="http://localhost:9000"
S3_BUCKET="nextstack-dev"
S3_ACCESS_KEY="nextstack_minio"
S3_SECRET_KEY="nextstack_password"

# Server
PORT=3001
NODE_ENV="development"
CORS_ORIGINS="http://localhost:3000,http://localhost:8081"
```

### File Locations

| Purpose       | Path                                            |
| ------------- | ----------------------------------------------- |
| Prisma Schema | `packages/database/prisma/schema/`              |
| tRPC Routes   | `packages/trpc-router/src/routers/`             |
| API Server    | `apps/nextstack-server/src/index.ts`            |
| Mobile App    | `apps/nextstack-expo/app/`                      |
| Tests         | `apps/nextstack-server/tests/`                  |
| Configs       | `packages/tsconfig/`, `packages/eslint-config/` |

---

## Contributing Guidelines

### Before Starting

1. Read `CLAUDE.md` for project-specific rules
2. Review this architecture document
3. Check existing patterns in the codebase
4. Set up local environment (Docker, DB, etc.)

### Development Process

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/user-authentication
   ```

2. **Make Changes**
   - Follow coding standards
   - Use existing patterns
   - Write tests (integration tests preferred)

3. **Commit**

   ```bash
   git add .
   git commit -m "feat: add user authentication endpoints"
   ```

   Husky runs lint-staged automatically.

4. **Test Locally**

   ```bash
   pnpm typecheck
   pnpm lint
   pnpm --filter nextstack-server test
   ```

5. **Push & PR**
   ```bash
   git push origin feature/user-authentication
   ```
   Create PR to `main` branch.

### Commit Message Format

```
<type>: <description>

[optional body]

[optional footer]
```

**Types**:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Performance improvement
- `test:` - Adding missing tests
- `chore:` - Changes to build process or auxiliary tools

---

## Appendix

### Related Documentation

- [CLAUDE.md](./CLAUDE.md) - Project-specific instructions
- [Prisma Schema](./packages/database/prisma/schema/) - Database models
- [tRPC Documentation](https://trpc.io/) - tRPC official docs
- [BetterAuth Documentation](https://www.better-auth.com/) - Auth library docs

### External Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query Docs](https://tanstack.com/query/latest)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [Prisma Docs](https://www.prisma.io/docs)

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-01
**Maintained By**: Development Team
**Next Review**: After major architectural changes
