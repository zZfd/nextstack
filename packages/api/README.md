# @nexstack/api

API definitions and tRPC procedures for the NexStack monorepo.

## 📦 What's included

- tRPC router definitions
- Input validation schemas (Zod)
- Database context setup
- Type-safe API procedures

## 🚀 Usage

```typescript
import { appRouter } from '@nexstack/api';
import { createCallerFactory } from '@trpc/server';

// Create server-side caller
const createCaller = createCallerFactory(appRouter);
const caller = createCaller(context);

// Use procedures
const posts = await caller.post.all();
```

## 🏗️ Structure

```
src/
├── context.ts          # tRPC context setup
├── trpc.ts            # tRPC instance configuration
├── router.ts          # Main router export
└── routers/           # Feature-specific routers
    └── post.ts        # Post-related procedures
```

## 📝 Adding new procedures

1. Create or update a router in `src/routers/`
2. Define input schemas with Zod
3. Implement the procedure logic
4. Export from main router

Example:

```typescript
// src/routers/user.ts
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const userRouter = router({
  getById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({ where: { id: input } });
    }),
});
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage
pnpm test:coverage
```

## 🔧 Scripts

- `pnpm build` - Build TypeScript
- `pnpm typecheck` - Check types
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues