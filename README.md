# NexStack - 下一代全栈 TypeScript 开发框架

🚀 **企业级 Monorepo 架构** | 📦 **开箱即用的全栈模板** | ⚡ **极速开发体验** | 🛡️ **生产就绪**

NexStack 是一个现代化的全栈 TypeScript 开发脚手架，采用 Monorepo 架构，为开发者提供完整的企业级前后端解决方案。从开发到部署，一应俱全。

## ✨ 特性

### 🏗️ 核心架构
- **Monorepo 架构设计** - 使用 Turborepo 和 pnpm 工作区管理
- **TypeScript 全栈支持** - 端到端的类型安全
- **Turborepo 构建优化** - 增量构建和智能缓存
- **多端支持** - Web、移动端、管理后台、API 服务器

### 🎨 开发体验
- **共享组件库** - 跨平台 UI 组件复用 (Tamagui)
- **统一配置管理** - ESLint、TypeScript、Prettier 配置共享
- **VSCode 集成** - 完整的开发环境配置和调试支持
- **Git 工作流** - Husky 预提交钩子和代码质量检查

### 🔒 安全与性能
- **企业级安全** - Helmet、CORS、CSP、速率限制
- **性能监控** - 内存压力检测、响应时间追踪
- **日志系统** - 结构化日志和错误处理
- **健康检查** - 容器和服务健康监控

### 🧪 测试与质量
- **完整测试套件** - Vitest、React Testing Library
- **代码覆盖率** - 自动化覆盖率报告
- **E2E 测试准备** - Playwright 集成配置
- **类型安全** - 基于 tRPC 的端到端类型安全

### 🚀 部署与运维
- **容器化部署** - Docker 多阶段构建优化
- **CI/CD 流水线** - GitHub Actions 自动化
- **负载均衡** - Nginx 反向代理配置
- **生产环境优化** - Redis 缓存、数据库连接池

### 📊 数据与 API
- **数据库集成** - Prisma ORM 支持
- **API 层** - tRPC 类型安全 API
- **数据验证** - Zod 模式验证
- **缓存策略** - Redis 分布式缓存

## 📦 项目结构

### 应用模板 (Apps)

```
apps/
├── nexstack-api/          # 后端 API 服务器
│   ├── Express + tRPC 后端服务
│   └── RESTful 和类型安全的 API
├── nexstack-admin/        # 管理后台
│   ├── React + Vite 管理界面
│   └── 数据管理和监控面板
├── nexstack-web/          # SEO 友好的官网
│   ├── Next.js 服务端渲染
│   └── 营销页面和文档站点
└── nexstack-mobile/       # React Native 移动应用
    ├── Expo 跨平台开发
    └── iOS/Android 原生体验
```

### 共享包 (Packages)

```
packages/
├── @nexstack/ui/              # 跨平台 UI 组件库
│   ├── React/React Native 组件
│   └── Tamagui 样式系统
├── @nexstack/database/        # 数据库模型与迁移
│   ├── Prisma Schema 定义
│   └── 数据库迁移脚本
├── @nexstack/api/            # API 路由定义
│   ├── tRPC 路由和解析器
│   └── Zod 数据验证模式
├── @nexstack/trpc/           # tRPC 客户端
│   ├── React Query 集成
│   └── 类型安全的 API 调用
├── @nexstack/tsconfig/       # TypeScript 配置
│   ├── 基础 tsconfig.json
│   └── 不同环境的配置预设
└── @nexstack/eslint-config/  # ESLint 配置
    ├── 统一的代码规范
    └── 针对不同项目类型的配置
```

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### 安装依赖

```bash
# 安装所有依赖
pnpm install
```

### 环境配置

```bash
# 复制环境变量模板
cp .env.example .env

# 配置数据库连接和其他环境变量
# 编辑 .env 文件
```

### 开发模式

```bash
# 启动所有应用的开发服务器
pnpm dev

# 或者启动特定应用
pnpm --filter nexstack-api dev     # 启动后端 API (端口: 3001)
pnpm --filter nexstack-admin dev   # 启动管理后台 (端口: 5173)
pnpm --filter nexstack-web dev     # 启动官网 (端口: 3000)
pnpm --filter nexstack-mobile dev  # 启动移动应用 (Expo)
```

### 构建项目

```bash
# 构建所有项目
pnpm build

# 构建特定项目
pnpm --filter nexstack-api build
pnpm --filter nexstack-web build
pnpm --filter nexstack-admin build
```

## 🛠️ 开发命令

### 通用命令

```bash
# 代码检查和修复
pnpm lint                    # 检查所有项目
pnpm lint:fix               # 自动修复代码风格问题

# 类型检查
pnpm typecheck              # TypeScript 类型检查

# 代码格式化
pnpm format                 # Prettier 格式化

# 测试
pnpm test                   # 运行所有测试
pnpm test:watch            # 监听模式运行测试
pnpm test:coverage         # 生成测试覆盖率报告
```

### 数据库操作

```bash
# 数据库相关操作
pnpm --filter @nexstack/database db:generate    # 生成 Prisma 客户端
pnpm --filter @nexstack/database db:migrate     # 运行数据库迁移
pnpm --filter @nexstack/database db:push        # 推送 Schema 到数据库
pnpm --filter @nexstack/database db:studio      # 打开 Prisma Studio
```

### Docker 操作

```bash
# 开发环境
docker-compose up -d                # 启动开发环境
docker-compose down                 # 停止开发环境

# 生产环境
docker-compose -f docker-compose.prod.yml up -d    # 启动生产环境
docker-compose -f docker-compose.prod.yml down     # 停止生产环境
```

## 📖 技术栈

### 前端技术
- **React 18** - 现代化的前端框架
- **Next.js 14** - 全栈 React 框架 (App Router)
- **Vite** - 快速的构建工具
- **Tamagui** - 跨平台 UI 组件库
- **React Query** - 数据获取和状态管理

### 后端技术
- **tRPC** - 端到端类型安全的 API
- **Express** - Node.js Web 框架
- **Prisma** - 现代化的 ORM
- **Zod** - TypeScript 数据验证
- **Helmet** - 安全中间件
- **Redis** - 缓存和会话存储

### 移动端技术
- **Expo** - React Native 开发平台
- **React Navigation** - 移动端路由
- **React Native Screens** - 原生屏幕组件

### 开发工具
- **Turborepo** - Monorepo 构建系统
- **pnpm** - 高效的包管理器
- **TypeScript** - 静态类型检查
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Husky** - Git hooks 管理
- **lint-staged** - 暂存文件检查

### 测试工具
- **Vitest** - Vite 原生测试工具
- **React Testing Library** - React 组件测试

### 部署工具
- **Docker** - 容器化部署
- **Nginx** - 反向代理和负载均衡
- **GitHub Actions** - CI/CD 自动化
- **PostgreSQL** - 生产数据库

### 开发环境
- **VSCode** - 推荐编辑器配置
- **Docker Compose** - 本地开发环境
- **Prisma Studio** - 数据库管理界面

## 📁 目录说明

### 应用目录详情

| 应用 | 描述 | 技术栈 | 端口 | 状态 |
|------|------|--------|------|------|
| `nexstack-api` | 后端 API 服务 | Express + tRPC | 3001 | ✅ 生产就绪 |
| `nexstack-admin` | 管理后台 | React + Vite | 5173 | ✅ 开发完成 |
| `nexstack-web` | SEO 官网 | Next.js 14 | 3000 | ✅ 生产就绪 |
| `nexstack-mobile` | 移动应用 | Expo + RN | Expo Dev | ✅ 开发完成 |

### 包目录详情

| 包 | 描述 | 功能 | 测试覆盖 |
|----|------|------|---------|
| `@nexstack/ui` | UI 组件库 | 跨平台组件复用 | ❌ |
| `@nexstack/database` | 数据库层 | Prisma Schema + 迁移 | ✅ 集成测试 |
| `@nexstack/api` | API 路由 | tRPC 路由和验证 | ❌ |
| `@nexstack/trpc` | 客户端 | 类型安全 API 调用 | ✅ React Testing Library |
| `@nexstack/tsconfig` | TS 配置 | 统一 TypeScript 配置 | - |
| `@nexstack/eslint-config` | 代码规范 | 统一 ESLint 规则 | - |

## 🏗️ 架构特色

### 安全性 🛡️
- **Helmet 安全头** - XSS、CSRF、CSP 防护
- **CORS 配置** - 跨域请求控制
- **速率限制** - API 请求频率控制
- **输入验证** - Zod 模式严格验证
- **错误处理** - 生产环境敏感信息隐藏

### 性能优化 ⚡
- **Redis 缓存** - 分布式缓存层
- **Nginx 负载均衡** - 反向代理和静态资源优化
- **Docker 多阶段构建** - 镜像大小优化
- **内存监控** - 自动内存压力检测
- **响应时间追踪** - 性能瓶颈识别

### 开发体验 🛠️
- **热重载** - 所有应用支持热重载
- **TypeScript 严格模式** - 完整类型安全
- **自动化测试** - Git 提交前自动测试
- **VSCode 集成** - 调试、任务、扩展推荐
- **统一代码风格** - Prettier + ESLint 自动格式化

### 部署与运维 🚀
- **CI/CD 流水线** - GitHub Actions 自动化
- **多环境支持** - 开发/测试/生产环境分离
- **健康检查** - 容器和服务监控
- **日志聚合** - 结构化日志输出
- **一键部署** - Docker Compose 编排

## 🔧 配置说明

### 工作区配置

项目使用 `pnpm-workspace.yaml` 配置 Monorepo：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Turborepo 配置

`turbo.json` 配置了构建管道、缓存策略和任务依赖：

```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"] },
    "test": { "dependsOn": ["build"] },
    "lint": { "cache": true }
  }
}
```

### 环境变量管理

- `.env.example` - 环境变量模板
- `.env` - 本地开发环境变量
- `.env.production` - 生产环境配置模板

## 🚀 部署指南

### 开发环境部署

```bash
# 1. 克隆项目
git clone <repository-url>
cd nexstack

# 2. 安装依赖
pnpm install

# 3. 环境配置
cp .env.example .env
# 编辑 .env 配置数据库等信息

# 4. 启动数据库
docker-compose up -d db

# 5. 数据库迁移
pnpm --filter @nexstack/database db:migrate

# 6. 启动开发服务器
pnpm dev
```

### 生产环境部署

```bash
# 使用 Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# 或者手动构建
pnpm build
pnpm --filter nexstack-api start
```

### Vercel 部署 (推荐 Web 应用)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署 Web 应用
cd apps/nexstack-web
vercel --prod
```

## 🧪 测试指南

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定包的测试
pnpm --filter @nexstack/api test

# 生成覆盖率报告
pnpm test:coverage

# 监听模式
pnpm test:watch
```

### 测试结构

```
src/
├── __tests__/          # 单元测试
├── components/
│   └── __tests__/      # 组件测试
└── integration/
    └── __tests__/      # 集成测试
```

## 🔍 故障排除

### 常见问题

**问题**: `Port 3000 already in use`
```bash
# 解决: 查找并杀死占用端口的进程
lsof -ti:3000 | xargs kill -9
```

**问题**: `DATABASE_URL is not defined`
```bash
# 解决: 检查环境变量配置
cp .env.example .env
# 编辑 .env 文件配置正确的数据库连接
```

**问题**: Docker 构建失败
```bash
# 解决: 清理 Docker 缓存
docker system prune -a
docker-compose build --no-cache
```

### 性能优化

- 启用 Turbo 缓存: `export TURBO_TOKEN=your-token`
- 使用 pnpm store 缓存: `pnpm config set store-dir ~/.pnpm-store`
- Docker 层缓存: 确保 Dockerfile 层按变化频率排序

## 🤝 贡献指南

### 开发流程

1. **Fork 项目**: 点击右上角 Fork 按钮
2. **克隆到本地**: `git clone <your-fork-url>`
3. **创建分支**: `git checkout -b feature/amazing-feature`
4. **开发**: 遵循代码规范进行开发
5. **测试**: `pnpm test` 确保所有测试通过
6. **提交**: `git commit -m 'feat: add amazing feature'`
7. **推送**: `git push origin feature/amazing-feature`
8. **Pull Request**: 在 GitHub 上创建 PR

### 代码规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 编写测试覆盖新功能
- 更新相关文档

### 提交信息规范

使用 [Conventional Commits](https://conventionalcommits.org/) 规范:

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 添加测试
- `chore:` 构建工具或依赖更新

## 📚 学习资源

- [Turborepo 文档](https://turbo.build/repo/docs)
- [tRPC 指南](https://trpc.io/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 教程](https://www.prisma.io/docs)
- [Tamagui 组件](https://tamagui.dev)

## 📄 许可证

本项目采用 MIT 许可证。查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目:

- [Turborepo](https://turbo.build) - Monorepo 工具
- [tRPC](https://trpc.io) - 类型安全 API
- [Next.js](https://nextjs.org) - React 框架
- [Prisma](https://prisma.io) - 数据库工具
- [Tamagui](https://tamagui.dev) - UI 组件库

---

**NexStack** - 让全栈 TypeScript 开发变得简单而高效 🚀

**⭐ 如果这个项目对你有帮助，请给个 Star！**