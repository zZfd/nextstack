# NexStack API

Backend API server built with Express.js and tRPC for type-safe APIs.

## 🚀 Features

- **Express.js** web framework
- **tRPC** for type-safe APIs
- **Prisma** ORM integration
- **CORS** configuration
- **Environment-based configuration**

## 🏗️ Project Structure

```
src/
├── index.ts          # Server entry point
├── middleware/       # Express middleware
├── routes/          # REST API routes (if needed)
└── __tests__/       # Test files
```

## 🚀 Getting Started

```bash
# Install dependencies (from root)
pnpm install

# Start development server
pnpm dev

# Or start just this app
pnpm --filter nexstack-api dev
```

The API will be available at [http://localhost:3001](http://localhost:3001).

## 🛠️ Development

### Adding new tRPC procedures

Procedures are defined in `@nexstack/api`. Import and use the router:

```typescript
// src/index.ts
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from '@nexstack/api';
import { createContext } from '@nexstack/api';

const app = express();

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
```

### Adding REST endpoints

For non-tRPC endpoints:

```typescript
// src/routes/health.ts
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
```

### Middleware setup

```typescript
// src/middleware/cors.ts
import cors from 'cors';

export const corsMiddleware = cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
});
```

## 🔒 Security

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### Helmet for security headers

```typescript
import helmet from 'helmet';

app.use(helmet());
```

## 🗄️ Database Integration

The API uses `@nexstack/database` for database operations:

```typescript
// Example in tRPC procedure
import { db } from '@nexstack/database';

export const postRouter = router({
  all: publicProcedure.query(async () => {
    return await db.post.findMany();
  }),
});
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Testing API endpoints

```typescript
// src/__tests__/api.test.ts
import request from 'supertest';
import { app } from '../index';

describe('API Endpoints', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('ok');
  });
});
```

## 🚀 Deployment

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm build

EXPOSE 3001

CMD ["pnpm", "start"]
```

### Environment Variables

```bash
# Server Configuration
PORT=3001
NODE_ENV=production
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# CORS
CORS_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

## 📊 Monitoring

### Health Check

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});
```

### Logging

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

## 🔧 Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build TypeScript
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Check TypeScript types