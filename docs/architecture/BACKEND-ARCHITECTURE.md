# Backend Architecture Analysis

> **Last Updated**: 2025-10-01
> **Version**: 1.0.0
> **Scope**: Express Server + tRPC API + PostgreSQL Database

## Table of Contents

- [Overview](#overview)
- [API Architecture](#api-architecture)
- [Database Design](#database-design)
- [Service Layer Organization](#service-layer-organization)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling Strategy](#error-handling-strategy)
- [Middleware Stack](#middleware-stack)
- [Security Patterns](#security-patterns)
- [External Integrations](#external-integrations)
- [Performance Optimization](#performance-optimization)

---

## Overview

The NextStack backend is built as a **standalone Express server** with **tRPC** for type-safe API communication, **Prisma** for database access, and **BetterAuth** for authentication. This architecture enables serving multiple frontend clients (web, mobile) from a single API source.

### Key Characteristics

- **Runtime**: Node.js >=18.0.0
- **Framework**: Express 4.18.2
- **API Protocol**: tRPC 11.5.1 (type-safe RPC)
- **Database**: PostgreSQL 16 via Prisma 6.15.0
- **Authentication**: BetterAuth 1.3.9 with Prisma adapter
- **Storage**: MinIO (S3-compatible object storage)
- **Type Safety**: End-to-end from database to client

---

## API Architecture

### Three-Layer Router Hierarchy

```typescript
AppRouter
├─ core.*         # CRUD Operations (Create, Read, Update, Delete)
├─ main.*         # Business Logic (Complex operations)
└─ _meta.*        # System Metadata (Health, version)
```

#### Layer 1: Core Router (CRUD)

**Purpose**: Basic data manipulation operations

```typescript
// packages/trpc-router/src/router.ts
core: router({
  user: router({
    create: createUser,    // POST - Create new user
    update: updateUser,    // PUT - Update existing user
    delete: deleteUser,    // DELETE - Remove user
    get: getUser,          // GET - Fetch single user by ID
    list: getUsers,        // GET - Fetch paginated user list
  }),
})
```

**Client Usage**:
```typescript
// Type-safe API calls
await trpc.core.user.create.mutate({ email, name });
await trpc.core.user.list.query({ page: 1, limit: 10 });
```

#### Layer 2: Main Router (Business Logic)

**Purpose**: Complex business operations and domain-specific queries

```typescript
main: router({
  auth: router({
    getMe,         // GET - Current user profile
    getSession,    // GET - Session validation
  }),
  user: router({
    getByEmail: getUserByEmail,  // GET - Lookup by email
    stats: getUserStats,         // GET - User statistics
  }),
})
```

**Client Usage**:
```typescript
const { data } = await trpc.main.auth.getMe.useQuery();
const stats = await trpc.main.user.stats.query({ userId });
```

#### Layer 3: Meta Router (System Info)

**Purpose**: Health checks and system metadata

```typescript
_meta: {
  health: publicProcedure.query(() => ({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  })),
  version: publicProcedure.query(() => ({
    version: '0.0.0',
    environment: 'development',
  })),
}
```

### Request Flow

```
┌──────────────────────────────────────────────────────────────┐
│ 1. CLIENT REQUEST                                            │
│    trpc.core.user.create.mutate({ email, name })             │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. HTTP LAYER (Express Middleware Stack)                    │
│    ├─ Request ID Assignment                                  │
│    ├─ Timeout Protection                                     │
│    ├─ Security Headers (Helmet)                              │
│    ├─ CORS Validation                                        │
│    ├─ Request Logging                                        │
│    └─ Rate Limiting (100 req/15min per IP)                   │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. tRPC LAYER                                                │
│    ├─ Router Resolution (core.user.create)                   │
│    ├─ Input Validation (Zod schema from Prisma)              │
│    └─ Context Creation (db, session, user)                   │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. PROCEDURE EXECUTION                                       │
│    ├─ Middleware Check (authentication if protected)         │
│    ├─ Business Logic (create-user.ts)                        │
│    └─ Database Transaction (Prisma)                          │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. DATABASE LAYER                                            │
│    ├─ Query Execution (PostgreSQL)                           │
│    ├─ Constraint Validation                                  │
│    └─ Data Return with Relations                             │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. RESPONSE                                                  │
│    ├─ Error Handling (if any)                                │
│    ├─ Response Serialization                                 │
│    └─ Type-safe Return to Client                             │
└──────────────────────────────────────────────────────────────┘
```

### File-Per-Procedure Organization

**Pattern**: One file per route for maintainability

```
packages/trpc-router/src/routers/user/
├── index.ts              # Re-exports all procedures
├── create-user.ts        # POST /core/user/create
├── update-user.ts        # PUT /core/user/update
├── delete-user.ts        # DELETE /core/user/delete
├── get-user.ts           # GET /core/user/get
├── get-users.ts          # GET /core/user/list
├── get-user-by-email.ts  # GET /main/user/getByEmail
└── get-user-stats.ts     # GET /main/user/stats
```

**Benefits**:
- ✅ Easy code navigation
- ✅ Clear git history per feature
- ✅ Reduced merge conflicts
- ✅ Simple to test individually

---

## Database Design

### Prisma Schema Organization

**Multi-File Schema** (~515 lines split into 10 domain files)

```
packages/database/prisma/schema/
├── schema.prisma        # Datasource & generator config
├── enums.prisma         # Shared enumerations (Role, Status, etc.)
├── user.prisma          # Core user model
├── auth.prisma          # BetterAuth tables (Session, Account, Verification)
├── profile.prisma       # User profiles
├── order.prisma         # Order management
├── offering.prisma      # Service offerings
├── content.prisma       # Posts and content
├── media.prisma         # File management
└── level.prisma         # Level/tier system
```

### Core Models

#### User Model

```prisma
model User {
  id            String  @id @default(cuid())
  email         String  @unique
  name          String?
  emailVerified Boolean @default(false)
  role          Role    @default(USER)

  // Avatar relation (one-to-one with File)
  avatarFileId String? @unique
  avatar       File?   @relation(fields: [avatarFileId], references: [id])

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  profiles      Profile[]
  orders        Order[]
  posts         Post[]
  uploadedFiles File[]    @relation("UploadedBy")

  // BetterAuth Relations
  sessions Session[]
  accounts Account[]
}
```

**Key Features**:
- CUID for globally unique IDs
- Role-based access control
- Soft relationships with cascading deletes
- Optimized indexes on `email`

#### Authentication Tables (BetterAuth)

```prisma
model Session {
  id        String   @id @default(cuid())
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                    String    @id @default(cuid())
  accountId             String
  providerId            String
  userId                String
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?   # Hashed password for email/password auth
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([providerId, accountId])
}

model Verification {
  id         String   @id @default(cuid())
  identifier String   # Email or phone
  value      String   # Verification code
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@unique([identifier, value])
}
```

### Database Generators

#### 1. Prisma Client (Type-safe ORM)

```prisma
generator client {
  provider = "prisma-client-js"
}
```

**Generates**: `@prisma/client` with full TypeScript types

#### 2. Zod Schemas (Runtime Validation)

```prisma
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

**Generates**: Zod schemas for all Prisma models

```typescript
// Auto-generated: packages/validators/src/generated/User.ts
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
});
```

### Database Pattern: Select Objects

**Strategy**: Reusable select patterns to avoid over-fetching

```typescript
// packages/trpc-router/src/services/user/user.selects.ts
export const userBasicSelect = {
  id: true,
  email: true,
  name: true,
  emailVerified: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export const userWithCountsSelect = {
  ...userBasicSelect,
  _count: {
    select: {
      posts: true,
      orders: true,
      profiles: true,
    },
  },
} satisfies Prisma.UserSelect;

export const userWithPostsSummarySelect = {
  ...userWithCountsSelect,
  posts: {
    select: { id: true, title: true, content: true, status: true },
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    take: 10,
  },
} satisfies Prisma.UserSelect;
```

**Usage**:
```typescript
const user = await ctx.db.user.create({
  data: { email, name },
  select: userWithCountsSelect, // Reusable pattern
});
```

**Benefits**:
- ✅ Prevents N+1 queries
- ✅ Consistent data shapes across endpoints
- ✅ Type-safe with `satisfies Prisma.UserSelect`
- ✅ Single source of truth for field selection

---

## Service Layer Organization

### Layered Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     TRPC PROCEDURES                          │
│  (Route handlers - thin, delegate to services)               │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                             │
│  (Business logic - reusable functions)                       │
│  - userService.create()                                      │
│  - userService.findByEmail()                                 │
│  - userService.calculateStats()                              │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                   DATA ACCESS LAYER                          │
│  (Prisma queries with select patterns)                       │
│  - userBasicSelect                                           │
│  - userWithCountsSelect                                      │
└──────────────────────────────────────────────────────────────┘
```

### Example: Create User Procedure

```typescript
// packages/trpc-router/src/routers/user/create-user.ts
import { CreateUserSchema } from '@nextstack/validators';
import { publicProcedure } from '../../procedures/public';
import { userWithCountsSelect } from '../../services';
import { BusinessError, ErrorCodes } from '../../errors/business.error';
import { handleServiceError } from '../../utils/error-handler';

export const createUser = publicProcedure
  .input(CreateUserSchema)  // Zod validation
  .mutation(async ({ ctx, input }) => {
    try {
      return await ctx.db.$transaction(async (tx) => {
        // 1. Check if user exists
        const existingUser = await tx.user.findUnique({
          where: { email: input.email },
          select: { id: true },
        });

        if (existingUser) {
          throw new BusinessError(
            ErrorCodes.USER_ALREADY_EXISTS,
            'User with this email already exists',
            409
          );
        }

        // 2. Create user with transaction safety
        return await tx.user.create({
          data: {
            email: input.email,
            name: input.name,
          },
          select: userWithCountsSelect, // Reusable select pattern
        });
      });
    } catch (error) {
      throw handleServiceError(error);
    }
  });
```

**Pattern Breakdown**:
1. **Input Validation**: Zod schema auto-generated from Prisma
2. **Transaction Wrapper**: Ensures atomicity
3. **Business Logic**: Check constraints before mutation
4. **Error Handling**: Structured error types
5. **Select Pattern**: Reusable field selection

---

## Authentication & Authorization

### BetterAuth Integration

**Configuration**: `packages/auth/src/server.ts`

```typescript
export function createAuth(config: AuthConfig) {
  validateAuthConfig(config); // Security checks

  return betterAuth({
    database: prismaAdapter(db, { provider: 'postgresql' }),
    secret: config.secret,
    baseURL: config.baseURL,

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false, // TODO: Enable in production
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },

    session: {
      expiresIn: 60 * 60 * 24 * 7,      // 7 days
      updateAge: 60 * 60 * 24,          // Update every 1 day
      freshAge: 60 * 60,                // Fresh within 1 hour
      cookieCache: {
        enabled: true,
        maxAge: isDev ? 5 * 60 : 15 * 60, // Dev: 5min, Prod: 15min
      },
    },

    advanced: {
      useSecureCookies: !isDev,         // Production: HTTPS only
      database: {
        generateId: false,               // Use Prisma's cuid()
      },
    },

    trustedOrigins: config.corsOrigins || ['http://localhost:3000'],
  });
}
```

### Context-Based Authentication

**Pattern**: Optional authentication in request context

```typescript
// packages/trpc-router/src/context.ts
export const createContext = async (opts: CreateContextOptions) => {
  let session: Session | null = null;
  let user: User | null = null;

  if (opts?.req) {
    try {
      // Extract session from request headers
      const headers = new Headers();
      // ... header extraction logic

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
    db,      // Prisma client
    session, // BetterAuth session or null
    user,    // User object or null
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
```

### Middleware-Based Protection

```typescript
// packages/trpc-router/src/middleware/auth.ts
export const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,      // Type refinement (not null)
      session: ctx.session,
    },
  });
});

export const isOptionalAuth = middleware(async ({ ctx, next }) => {
  // No error thrown - auth is optional
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      session: ctx.session,
    },
  });
});
```

### Procedure Types

```typescript
// packages/trpc-router/src/procedures/public.ts
export const publicProcedure = procedure;  // No auth required

// packages/trpc-router/src/procedures/protected.ts
export const protectedProcedure = publicProcedure.use(isAuthenticated);
export const optionalAuthProcedure = publicProcedure.use(isOptionalAuth);
```

**Usage**:
```typescript
// Public endpoint
export const getUsers = publicProcedure
  .query(async ({ ctx }) => {
    // ctx.user may be null
  });

// Protected endpoint
export const getMe = protectedProcedure
  .query(async ({ ctx }) => {
    // ctx.user is guaranteed to exist
    return ctx.user;
  });
```

### Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│ 1. USER LOGIN (BetterAuth)                                   │
│    POST /api/auth/sign-in/email                              │
│    { email, password }                                       │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 2. SESSION CREATION                                          │
│    ├─ Verify credentials (bcrypt password hash)              │
│    ├─ Create Session in database                             │
│    ├─ Generate session token                                 │
│    └─ Set HTTP-only cookie                                   │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 3. AUTHENTICATED REQUESTS                                    │
│    GET /trpc/main.auth.getMe                                 │
│    Cookie: better-auth.session_token=...                     │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 4. CONTEXT CREATION                                          │
│    ├─ Extract cookie from request                            │
│    ├─ Validate session token                                 │
│    ├─ Load user from database                                │
│    └─ Attach to context (ctx.user, ctx.session)              │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 5. MIDDLEWARE CHECK                                          │
│    ├─ protectedProcedure.use(isAuthenticated)                │
│    ├─ Verify ctx.user exists                                 │
│    └─ Throw UNAUTHORIZED if missing                          │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│ 6. PROCEDURE EXECUTION                                       │
│    ├─ Access ctx.user (guaranteed non-null)                  │
│    ├─ Execute business logic                                 │
│    └─ Return response                                        │
└──────────────────────────────────────────────────────────────┘
```

---

## Error Handling Strategy

### Three-Layer Error Hierarchy

```typescript
// Layer 1: Base Error
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
      // Security: only show stack in development
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}

// Layer 2: Business Error (Expected, operational errors)
export class BusinessError extends BaseError {
  constructor(code: ErrorCode, message: string, statusCode = 400) {
    super(message, code, statusCode, undefined, true);
  }
}

// Layer 3: Application Error (Unexpected, system errors)
export class ApplicationError extends BaseError {
  constructor(code: ErrorCode, message: string, statusCode = 500) {
    super(message, code, statusCode, undefined, false);
  }
}
```

### Error Codes Enum

```typescript
export enum ErrorCode {
  // Authentication & Authorization
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',

  // Resource
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CONFLICT = 'CONFLICT',

  // Business Logic
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

### Error Handler Utility

```typescript
// packages/trpc-router/src/utils/error-handler.ts
export function handleServiceError(error: unknown): TRPCError {
  // Known business errors
  if (error instanceof BusinessError) {
    return new TRPCError({
      code: mapErrorCodeToTRPC(error.code),
      message: error.message,
      cause: error,
    });
  }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return new TRPCError({
        code: 'CONFLICT',
        message: 'Resource already exists',
        cause: error,
      });
    }
    if (error.code === 'P2025') {
      return new TRPCError({
        code: 'NOT_FOUND',
        message: 'Resource not found',
        cause: error,
      });
    }
  }

  // Unknown errors - don't expose details in production
  console.error('Unexpected error:', error);
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'development'
      ? String(error)
      : 'An unexpected error occurred',
  });
}
```

---

## Middleware Stack

### Ordered Middleware Pipeline

**Critical**: Order matters for security and functionality

```typescript
// apps/nextstack-server/src/index.ts

// 1. Request ID (MUST BE FIRST)
app.use(requestIdMiddleware);
// Assigns unique ID to each request for tracking

// 2. Timeout (Early protection)
app.use(timeoutMiddleware);
// Prevents long-running requests from blocking server

// 3. Security Headers (Helmet)
app.use(createSecurityMiddleware());
// XSS protection, CSP, HSTS, etc.

// 4. CORS
app.use(createCorsMiddleware());
// Allow cross-origin requests from trusted origins

// 5. Request Logging
app.use(requestLogger);
// Log all requests with requestId

// 6. Body Parsing & Compression
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 7. Rate Limiting (Applied to /trpc only)
const rateLimiter = createRateLimitMiddleware();
app.use('/trpc', rateLimiter);
// 100 requests per 15 minutes per IP
```

### Middleware Details

#### 1. Request ID Middleware

```typescript
// apps/nextstack-server/src/middleware/requestId.ts
import { v4 as uuid } from 'uuid';

export const requestIdMiddleware = (req, res, next) => {
  req.requestId = uuid();
  res.setHeader('X-Request-ID', req.requestId);
  next();
};
```

**Benefits**:
- Track requests across logs
- Debug distributed systems
- Correlate errors with user actions

#### 2. Security Middleware (Helmet)

```typescript
// apps/nextstack-server/src/middleware/security.ts
export const createSecurityMiddleware = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,         // 1 year
      includeSubDomains: true,
      preload: true,
    },
    hidePoweredBy: true,        // Remove X-Powered-By
    noSniff: true,              // X-Content-Type-Options: nosniff
    frameguard: { action: 'sameorigin' },  // X-Frame-Options
  });
};
```

#### 3. Rate Limiting

```typescript
// apps/nextstack-server/src/middleware/rateLimit.ts
export const createRateLimitMiddleware = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 100,                    // 100 requests per IP
    standardHeaders: true,       // RateLimit-* headers
    legacyHeaders: false,        // Disable X-RateLimit-*

    handler: (req, res) => {
      console.warn(`Rate limit exceeded for ${req.ip} [${req.requestId}]`);
      res.status(429).json({
        error: 'Too many requests from this IP, please try again later.',
        requestId: req.requestId,
        retryAfter: 900, // seconds
      });
    },
  });
};
```

### Graceful Shutdown

```typescript
// apps/nextstack-server/src/utils/shutdown.ts
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

---

## Security Patterns

### 1. Environment-Aware Error Details

```typescript
// Show stack traces only in development
toJSON() {
  return {
    // ... other fields
    stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
  };
}
```

### 2. Input Sanitization

```typescript
// Zod schemas auto-validate and sanitize inputs
export const CreateUserSchema = z.object({
  email: z.string().email().max(255),  // Prevent overflow
  name: z.string().max(100).optional(),
});
```

### 3. SQL Injection Prevention

**Prisma ORM** provides automatic parameterization:

```typescript
// Safe - Prisma handles escaping
await db.user.findUnique({
  where: { email: userInput },
});

// Never use raw SQL unless absolutely necessary
await db.$executeRaw`SELECT * FROM users WHERE email = ${userInput}`; // ❌
```

### 4. Authentication Secret Validation

```typescript
// packages/auth/src/server.ts
function validateAuthConfig(config: AuthConfig): void {
  const isProduction = !config.isDevelopment;
  if (isProduction && (
    config.secret.includes('change-this') ||
    config.secret.length < 32
  )) {
    throw new Error(
      'Security Error: Please set a secure BETTER_AUTH_SECRET in production.\n' +
      'Generate one with: openssl rand -base64 32'
    );
  }
}
```

### 5. CORS Configuration

```typescript
// apps/nextstack-server/src/middleware/cors.ts
const corsOptions = {
  origin: env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,                    // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,                        // Cache preflight for 24h
};
```

### 6. Request Timeout Protection

```typescript
// apps/nextstack-server/src/middleware/timeout.ts
export const timeoutMiddleware = (req, res, next) => {
  req.setTimeout(30000); // 30 seconds
  res.setTimeout(30000);
  next();
};
```

---

## External Integrations

### 1. PostgreSQL Database

**Connection**: Via Prisma ORM

```typescript
// packages/database/index.ts
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
});
```

**Docker Compose Setup**:
```yaml
services:
  postgres:
    image: postgres:16-alpine
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: nextstack
      POSTGRES_PASSWORD: nextstack_dev
      POSTGRES_DB: nextstack_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### 2. MinIO Object Storage

**Integration**: S3-compatible storage for file uploads

```typescript
// packages/storage/src/providers/s3.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export class S3StorageProvider implements BaseStorageProvider {
  private client: S3Client;

  constructor(config: S3Config) {
    this.client = new S3Client({
      endpoint: config.endpoint,        // http://localhost:9000
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      forcePathStyle: true,             // Required for MinIO
    });
  }

  async upload(file: Buffer, key: string, metadata?: Record<string, string>): Promise<string> {
    await this.client.send(new PutObjectCommand({
      Bucket: this.config.bucket,
      Key: key,
      Body: file,
      Metadata: metadata,
    }));

    return `${this.config.endpoint}/${this.config.bucket}/${key}`;
  }
}
```

**Docker Compose Setup**:
```yaml
services:
  minio:
    image: minio/minio
    ports:
      - "9000:9000"      # API
      - "9001:9001"      # Console
    environment:
      MINIO_ROOT_USER: nextstack_minio
      MINIO_ROOT_PASSWORD: nextstack_password
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
```

### 3. BetterAuth

**Integration**: Session-based authentication

```typescript
// packages/auth/src/server.ts
export function createAuth(config: AuthConfig) {
  return betterAuth({
    database: prismaAdapter(db, { provider: 'postgresql' }),
    secret: config.secret,
    baseURL: config.baseURL,
    emailAndPassword: { enabled: true },
    trustedOrigins: config.corsOrigins,
  });
}
```

**Endpoints Provided**:
- `POST /api/auth/sign-up/email` - Register with email/password
- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/get-session` - Validate session

---

## Performance Optimization

### 1. Database Query Optimization

**Pattern**: Select only needed fields

```typescript
// ❌ Bad - fetches all fields
const user = await db.user.findUnique({ where: { id } });

// ✅ Good - selective fetching
const user = await db.user.findUnique({
  where: { id },
  select: userBasicSelect,
});
```

### 2. Transaction Usage

**Pattern**: Wrap related operations in transactions

```typescript
return await ctx.db.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { email, name } });
  await tx.profile.create({ data: { userId: user.id } });
  return user;
});
```

**Benefits**:
- Atomicity (all-or-nothing)
- Isolation (concurrent request safety)
- Rollback on error

### 3. Pagination

**Pattern**: Limit + offset for large datasets

```typescript
export const getUsers = publicProcedure
  .input(z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20),
  }))
  .query(async ({ ctx, input }) => {
    const skip = (input.page - 1) * input.limit;

    const [users, total] = await Promise.all([
      ctx.db.user.findMany({
        skip,
        take: input.limit,
        select: userBasicSelect,
        orderBy: { createdAt: 'desc' },
      }),
      ctx.db.user.count(),
    ]);

    return {
      data: users,
      pagination: {
        page: input.page,
        limit: input.limit,
        total,
        totalPages: Math.ceil(total / input.limit),
      },
    };
  });
```

### 4. Request Batching (tRPC)

**Automatic**: tRPC batches multiple queries into single HTTP request

```typescript
// Frontend
const [user, posts, stats] = await Promise.all([
  trpc.core.user.get.query({ id }),
  trpc.core.post.list.query(),
  trpc.main.user.stats.query({ id }),
]);

// Backend receives: Single HTTP request with 3 batched queries
```

### 5. Compression

```typescript
import compression from 'compression';

app.use(compression()); // Gzip response bodies
```

---

## Quick Reference

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/api/auth/*` | * | BetterAuth endpoints |
| `/trpc` | POST | tRPC API (batched) |

### Environment Variables

```bash
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:pass@localhost:5433/dbname"

# Auth
BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"

# Storage
STORAGE_TYPE="s3"
S3_ENDPOINT="http://localhost:9000"
S3_BUCKET="nextstack-dev"
S3_ACCESS_KEY="nextstack_minio"
S3_SECRET_KEY="nextstack_password"

# Security
CORS_ORIGINS="http://localhost:3000,http://localhost:8081"
RATE_LIMIT_WINDOW_MS=900000   # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100   # per IP
```

### Common Commands

```bash
# Development
pnpm --filter nextstack-server dev       # Start dev server

# Database
pnpm db:generate                         # Generate Prisma Client + Zod
pnpm db:push                             # Push schema changes
pnpm db:studio                           # Open Prisma Studio

# Testing
pnpm --filter nextstack-server test      # Run integration tests
```

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-01
**Next Review**: After production deployment
