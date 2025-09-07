# NexStack - 下一代全栈 TypeScript 开发框架

🚀 **企业级 Monorepo 架构** | 📦 **开箱即用的全栈模板** | ⚡ **极速开发体验**

NexStack 是一个现代化的全栈 TypeScript 开发脚手架，采用 Monorepo 架构，为开发者提供完整的前后端解决方案。

## ✨ 特性

- 🏗️ **Monorepo 架构设计** - 使用 Turborepo 和 pnpm 工作区管理
- 🔥 **TypeScript 全栈支持** - 端到端的类型安全
- ⚡ **Turborepo 构建优化** - 增量构建和智能缓存
- 📱 **多端支持** - Web、移动端、API 服务器
- 🎨 **共享组件库** - 跨平台 UI 组件复用
- 🔧 **统一配置管理** - ESLint、TypeScript 配置共享
- 🔒 **类型安全的 API** - 基于 tRPC 的端到端类型安全
- 📊 **数据库集成** - Prisma ORM 支持

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

### 开发模式

```bash
# 启动所有应用的开发服务器
pnpm dev

# 或者启动特定应用
pnpm --filter nexstack-api dev     # 启动后端 API
pnpm --filter nexstack-admin dev   # 启动管理后台
pnpm --filter nexstack-web dev     # 启动官网
pnpm --filter nexstack-mobile dev  # 启动移动应用
```

### 构建项目

```bash
# 构建所有项目
pnpm build

# 构建特定项目
pnpm --filter nexstack-api build
pnpm --filter nexstack-admin build
```

## 🛠️ 开发命令

### 通用命令

```bash
# 代码检查
pnpm lint            # 检查所有项目
pnpm lint:fix        # 自动修复代码风格问题

# 类型检查
pnpm typecheck       # TypeScript 类型检查

# 代码格式化
pnpm format          # Prettier 格式化
```

### 数据库操作

```bash
# 进入数据库包目录
cd packages/database

# 生成 Prisma 客户端
pnpm db:generate

# 数据库迁移
pnpm db:migrate

# 推送 Schema 到数据库
pnpm db:push
```

## 📖 技术栈

### 前端技术
- **React 18** - 现代化的前端框架
- **Next.js 14** - 全栈 React 框架
- **Vite** - 快速的构建工具
- **Tamagui** - 跨平台 UI 组件库
- **React Query** - 数据获取和状态管理

### 后端技术
- **tRPC** - 端到端类型安全的 API
- **Express** - Node.js Web 框架
- **Prisma** - 现代化的 ORM
- **Zod** - TypeScript 数据验证

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

## 📁 目录说明

### 应用目录详情

| 应用 | 描述 | 技术栈 | 端口 |
|------|------|--------|------|
| `nexstack-api` | 后端 API 服务 | Express + tRPC | 3001 |
| `nexstack-admin` | 管理后台 | React + Vite | 5173 |
| `nexstack-web` | 官方网站 | Next.js | 3000 |
| `nexstack-mobile` | 移动应用 | Expo + RN | Expo Dev |

### 包目录详情

| 包 | 描述 | 用途 |
|----|------|------|
| `@nexstack/ui` | UI 组件库 | 跨平台组件复用 |
| `@nexstack/database` | 数据库层 | Schema 和迁移 |
| `@nexstack/api` | API 定义 | tRPC 路由和类型 |
| `@nexstack/trpc` | 客户端 | API 调用封装 |
| `@nexstack/tsconfig` | 配置 | TypeScript 配置 |
| `@nexstack/eslint-config` | 配置 | 代码规范配置 |

## 🔧 配置说明

### 工作区配置

项目使用 `pnpm-workspace.yaml` 配置工作区：

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Turborepo 配置

`turbo.json` 配置了构建管道和缓存策略，优化构建性能。

### TypeScript 配置

各项目继承 `@nexstack/tsconfig` 的基础配置，确保类型系统的一致性。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/new-feature`
3. 提交更改: `git commit -am 'Add new feature'`
4. 推送分支: `git push origin feature/new-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。查看 [LICENSE](LICENSE) 文件了解详情。

---

**NexStack** - 让全栈 TypeScript 开发变得简单而高效 🚀