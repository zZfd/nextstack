# 🎯 Prisma & tRPC 最佳实践实施计划

> 基于 NextStack Monorepo 项目的现有架构制定的优化方案

## 📋 项目现状分析

### 当前技术栈
- **Prisma**: v6.15.0 (最新版本)
- **tRPC**: v11.5.1 (最新版本)
- **TypeScript**: v5.9.2
- **Monorepo 工具**: pnpm workspaces + Turbo

### 现有架构优势
- ✅ 清晰的包结构分离（database, api, trpc, validators）
- ✅ 使用 zod-prisma-types 生成器实现类型安全
- ✅ 独立的验证器包，实现验证逻辑复用
- ✅ Turbo 缓存配置完善

### 待优化领域
- ⚠️ 缺少 Prisma Client 单例模式和连接池管理
- ⚠️ 仅有 publicProcedure，缺少认证和授权机制
- ⚠️ 缺少错误处理和日志系统
- ⚠️ 未实现缓存和性能优化
- ⚠️ 缺少数据库种子数据和测试基础设施

---

## 📦 1. Prisma 数据库层优化 (`packages/database`)

### 1.1 Prisma Client 单例模式优化

**文件**: `packages/database/src/client.ts`
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// 优雅关闭
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

### 1.2 数据库工具函数

**文件结构**:
```
packages/database/src/
├── client.ts         # Prisma 单例
├── utils/
│   ├── pagination.ts # 分页工具
│   ├── transactions.ts # 事务辅助
│   └── soft-delete.ts # 软删除
└── middleware/
    ├── logging.ts    # 查询日志
    ├── audit.ts      # 审计字段
    └── performance.ts # 性能监控
```

**分页工具示例** (`utils/pagination.ts`):
```typescript
export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export function getPaginationParams(params: PaginationParams) {
  const limit = Math.min(params.limit ?? 10, 100);
  const skip = params.cursor ? undefined : ((params.page ?? 1) - 1) * limit;
  
  return {
    take: limit + 1, // 多取一条判断是否有下一页
    skip,
    cursor: params.cursor ? { id: params.cursor } : undefined,
  };
}
```

### 1.3 Prisma 中间件配置

**性能监控中间件**:
```typescript
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  if (after - before > 1000) {
    console.warn(`Slow query: ${params.model}.${params.action} took ${after - before}ms`);
  }
  
  return result;
});
```

### 1.4 Schema 增强

**通用字段模板**:
```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String?
  posts     Post[]
  
  // 审计字段
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime? // 软删除
  version   Int       @default(0) // 乐观锁
  
  @@index([email])
  @@index([createdAt])
}
```

---

## 🚀 2. tRPC API 层增强 (`packages/api`)

### 2.1 认证与授权系统

**文件**: `packages/api/src/middleware/auth.ts`
```typescript
import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { t } from '../trpc';

export const isAuth = t.middleware(async ({ ctx, next }) => {
  const token = ctx.req?.headers.authorization?.split(' ')[1];
  
  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return next({
      ctx: {
        ...ctx,
        user: decoded,
      },
    });
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
});

export const protectedProcedure = t.procedure.use(isAuth);
```

### 2.2 错误处理系统

**文件结构**:
```
packages/api/src/errors/
├── base.error.ts      # 基础错误类
├── business.error.ts  # 业务错误
├── validation.error.ts # 验证错误
└── handler.ts         # 全局处理器
```

**基础错误类**:
```typescript
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
```

### 2.3 性能优化

**响应缓存中间件**:
```typescript
const cache = new Map();

export const cached = t.middleware(async ({ path, next }) => {
  const key = JSON.stringify({ path, input });
  
  if (cache.has(key)) {
    return { result: cache.get(key) };
  }
  
  const result = await next();
  cache.set(key, result, { ttl: 60000 }); // 1分钟缓存
  
  return result;
});
```

### 2.4 实时功能支持

**WebSocket 配置**:
```typescript
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';

const wss = new ws.Server({ port: 3002 });

applyWSSHandler({
  wss,
  router: appRouter,
  createContext,
});
```

---

## 🛡️ 3. 验证器层强化 (`packages/validators`)

### 3.1 高级验证模式

**分页验证器**:
```typescript
export const PaginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(10),
  orderBy: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});
```

**过滤条件验证器**:
```typescript
export const FilterSchema = z.object({
  search: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
  status: z.enum(['active', 'inactive', 'archived']).optional(),
});
```

### 3.2 验证工具函数

**条件验证**:
```typescript
export const conditionalSchema = <T extends z.ZodTypeAny>(
  condition: boolean,
  schema: T
) => {
  return condition ? schema : z.any();
};
```

---

## 🏗️ 4. 基础设施改进

### 4.1 数据库种子数据

**文件**: `packages/database/prisma/seed.ts`
```typescript
import { prisma } from '../src/client';

async function main() {
  // 清理数据
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  
  // 创建测试用户
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        posts: {
          create: [
            { title: 'First Post', content: 'Content here' },
            { title: 'Second Post', content: 'More content' },
          ],
        },
      },
    }),
  ]);
  
  console.log('Seed data created:', users);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 4.2 测试基础设施

**API 测试配置**:
```typescript
import { createCallerFactory } from '@nextstack/api';

const createCaller = createCallerFactory(appRouter);
const caller = createCaller({ db: mockDb });

describe('User API', () => {
  test('creates user', async () => {
    const user = await caller.user.create({
      email: 'test@example.com',
      name: 'Test User',
    });
    
    expect(user.email).toBe('test@example.com');
  });
});
```

---

## 📊 5. 监控与可观测性

### 5.1 结构化日志

**日志配置**:
```typescript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
```

### 5.2 健康检查端点

**文件**: `packages/api/src/routers/health.ts`
```typescript
export const healthRouter = router({
  check: publicProcedure.query(async ({ ctx }) => {
    try {
      await ctx.db.$queryRaw`SELECT 1`;
      return {
        status: 'healthy',
        database: 'connected',
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        database: 'disconnected',
        error: error.message,
      };
    }
  }),
});
```

---

## 🔄 6. 迁移与部署

### 6.1 数据库迁移策略

**package.json 脚本**:
```json
{
  "scripts": {
    "db:migrate:dev": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:migrate:reset": "prisma migrate reset",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

### 6.2 环境变量验证

**文件**: `packages/api/src/config/env.ts`
```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number).default('3001'),
});

export const env = envSchema.parse(process.env);
```

---

## 📝 实施路线图

### 阶段 1：核心功能（第1-2周）
- [ ] 实现 Prisma Client 单例模式
- [ ] 添加基础认证中间件
- [ ] 建立错误处理系统
- [ ] 创建数据库种子数据

### 阶段 2：性能优化（第3-4周）
- [ ] 实现查询缓存
- [ ] 添加请求批处理
- [ ] 配置连接池优化
- [ ] 添加性能监控

### 阶段 3：高级功能（第5-6周）
- [ ] WebSocket 实时支持
- [ ] 完整的 RBAC 系统
- [ ] API 文档生成
- [ ] 完整测试覆盖

---

## 🎯 成功指标

1. **性能提升**
   - API 响应时间 < 100ms (P95)
   - 数据库查询时间 < 50ms (P95)

2. **可靠性**
   - 错误率 < 0.1%
   - 可用性 > 99.9%

3. **开发效率**
   - 类型安全覆盖率 100%
   - 测试覆盖率 > 80%

4. **可维护性**
   - 代码复用率提升 40%
   - 文档完整性 100%

---

## 📚 参考资源

- [Prisma v6 官方文档](https://www.prisma.io/docs)
- [tRPC v11 官方文档](https://trpc.io/docs)
- [TypeScript Monorepo 最佳实践](https://turbo.build/repo/docs)
- [pnpm Workspaces 指南](https://pnpm.io/workspaces)

---

*生成时间: 2025-09-13*
*项目: NextStack Monorepo*
*版本: 1.0.0*