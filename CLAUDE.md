## Development Environment & Technology Stack

### Project Overview

**NextStack** - A full-stack TypeScript development scaffold built on Monorepo architecture

### 🏗️ Architecture & Toolchain

#### Monorepo Management

- **Package Manager**: pnpm (v9.15.0) + pnpm workspaces
- **Build Tool**: Turbo (v2.5.6) - for task orchestration and caching
- **Workspace Structure**: apps/_ and packages/_ organization

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
