# Role and Goal

You are an expert full-stack TypeScript developer specializing in modern, type-safe monorepo architectures. Your goal is to generate a complete project template based on a specific, sophisticated tech stack. You will create all the necessary files with their full content, following the provided structure and instructions precisely.

# Core Technology Stack

- **Monorepo:** Turborepo + pnpm
- **Language:** TypeScript
- **Backend Framework:** Express.js
- **API Layer:** tRPC
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Schema Validation:** Zod
- **Web Frontend (SEO/SSR):** Next.js
- **Web Frontend (SPA):** Vite + React
- **Mobile Frontend:** Expo (React Native)
- **Cross-Platform UI System:** Tamagui
- **Database Schema Management:** `prisma-import` (for modularizing the schema)
- **Development Tooling:** Docker, Storybook, ESLint, Prettier

# Architectural Principles

1.  **Monorepo Structure:** The project is organized into `apps` (deployable applications) and `packages` (shared code).
2.  **Decoupled Backend:** A single `api-server` acts as the backend for all clients.
3.  **End-to-End Type Safety:** Types will flow seamlessly from the Prisma schema in the `database` package, through the `api-router`, and into each frontend application.
4.  **Shared UI:** A central `ui` package using Tamagui provides components for all three frontends.
5.  **Optimized TypeScript:** Project References (`composite: true`) will be used to ensure fast, incremental builds and type-checking across the monorepo.

# Instructions: Generate the following files

Create a complete project structure with the following files and their exact content. Do not add any extra explanations outside of the code blocks themselves.

---

### **1. Root Level Configuration**

---

`// package.json`

```json
{
  "name": "demo",
  "private": true,
  "scripts": {
    "build": "turbo build",
    "dev": "turbo dev",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "typecheck": "turbo typecheck"
  },
  "devDependencies": {
    "prettier": "latest",
    "turbo": "latest",
    "typescript": "latest"
  },
  "packageManager": "pnpm@8.0.0",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

````

`// pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

`// turbo.json`

```json
{
  "$schema": "[https://turbo.build/schema.json](https://turbo.build/schema.json)",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**", "build/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

`// tsconfig.json`

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowJs": true
  },
  "exclude": ["node_modules"],
  "references": [
    { "path": "apps/api-server" },
    { "path": "apps/web-seo" },
    { "path": "apps/web-dashboard" },
    { "path": "apps/mobile-expo" },
    { "path": "packages/api-router" },
    { "path": "packages/database" },
    { "path": "packages/ui" },
    { "path": "packages/trpc-client" }
  ]
}
```

`// .gitignore`

```
# See [https://help.github.com/articles/ignoring-files/](https://help.github.com/articles/ignoring-files/) for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist
.next/
/out/

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# local env files
.env*.local
.env

# turbo
.turbo

# vercel
.vercel

# typescript
*.tsbuildinfo
```

---

### **2. Shared Packages (`packages/`)**

---

#### **2.1. `packages/config-typescript`**

`// packages/config-typescript/base.json`

```json
{
  "$schema": "[https://json.schemastore.org/tsconfig](https://json.schemastore.org/tsconfig)",
  "display": "Default",
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "strict": true,
    "skipLibCheck": true,
    "sourceMap": true
  },
  "exclude": ["node_modules"]
}
```

`// packages/config-typescript/package.json`

```json
{
  "name": "@lzt/config-typescript",
  "version": "0.0.0",
  "private": true,
  "files": ["base.json", "react-library.json"]
}
```

#### **2.2. `packages/database` (Prisma Setup)**

`// packages/database/package.json`

```json
{
  "name": "@lzt/database",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "build": "tsc --build",
    "db:schema-generate": "prisma-import",
    "db:generate": "pnpm db:schema-generate && prisma generate",
    "db:push": "pnpm db:schema-generate && prisma db push --skip-generate",
    "db:migrate": "pnpm db:schema-generate && prisma migrate dev"
  },
  "dependencies": {
    "@prisma/client": "latest"
  },
  "devDependencies": {
    "prisma": "latest",
    "prisma-import": "^1.0.1",
    "typescript": "latest",
    "@lzt/config-typescript": "workspace:*"
  }
}
```

`// packages/database/tsconfig.json`

```json
{
  "extends": "@lzt/config-typescript/base.json",
  "include": ["./index.ts"],
  "exclude": ["node_modules"]
}
```

`// packages/database/index.ts`

```typescript
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

export * from "@prisma/client";
```

`// packages/database/prisma/schema.prisma`

```prisma
import "./schemas/*.prisma"
```

`// packages/database/prisma/schemas/base.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

`// packages/database/prisma/schemas/user.prisma`

```prisma
model User {
  id    String @id @default(cuid())
  email String @unique
  name  String?
  posts Post[]
}
```

`// packages/database/prisma/schemas/post.prisma`

```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  String?
}
```

#### **2.3. `packages/api-router` (tRPC Router)**

`// packages/api-router/package.json`

```json
{
  "name": "@lzt/api-router",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "build": "tsc --build"
  },
  "dependencies": {
    "@trpc/server": "^10.45.2",
    "zod": "^3.22.4",
    "@lzt/database": "workspace:*"
  },
  "devDependencies": {
    "typescript": "latest",
    "@lzt/config-typescript": "workspace:*"
  }
}
```

`// packages/api-router/tsconfig.json`

```json
{
  "extends": "@lzt/config-typescript/base.json",
  "include": ["src/**/*.ts", "index.ts"],
  "exclude": ["node_modules"],
  "references": [{ "path": "../database" }]
}
```

`// packages/api-router/index.ts`

```typescript
export * from "./src/router";
export type { AppRouter } from "./src/router";
export * from "./src/context";
```

`// packages/api-router/src/trpc.ts`

```typescript
import { initTRPC } from "@trpc/server";
import { type Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
```

`// packages/api-router/src/context.ts`

```typescript
import { db } from "@lzt/database";
import type * as trpc from "@trpc/server";
import type * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // For now, we'll just pass the db instance
  return {
    db,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
```

`// packages/api-router/src/router.ts`

```typescript
import { router } from "./trpc";
import { postRouter } from "./routers/post";

export const appRouter = router({
  post: postRouter,
});

export type AppRouter = typeof appRouter;
```

`// packages/api-router/src/routers/post.ts`

```typescript
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const postRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany();
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.post.findFirst({ where: { id: input } });
  }),
  create: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({ data: input });
    }),
});
```

#### **2.4. `packages/ui` (Tamagui)**

This will be a minimal setup. A full Tamagui setup is complex.

`// packages/ui/package.json`

```json
{
  "name": "@lzt/ui",
  "version": "0.0.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "build": "tsc --build"
  },
  "dependencies": {
    "tamagui": "^1.94.3",
    "react": "^18.2.0",
    "react-native": "0.72.12"
  },
  "devDependencies": {
    "@types/react": "^18.2.38",
    "typescript": "latest",
    "@lzt/config-typescript": "workspace:*"
  }
}
```

`// packages/ui/tsconfig.json`

```json
{
  "extends": "@lzt/config-typescript/base.json",
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

`// packages/ui/src/index.ts`

```typescript
export * from "./MyButton";
```

`// packages/ui/src/MyButton.tsx`

```tsx
import { Button, styled } from "tamagui";

export const MyButton = styled(Button, {
  name: "MyButton",
  backgroundColor: "$blue10",
  color: "$color",
  pressStyle: {
    backgroundColor: "$blue8",
  },
});
```

#### **2.5. `packages/trpc-client`**

`// packages/trpc-client/package.json`

```json
{
  "name": "@lzt/trpc-client",
  "version": "0.0.0",
  "private": true,
  "main": "./index.ts",
  "types": "./index.ts",
  "scripts": {
    "build": "tsc --build"
  },
  "dependencies": {
    "@trpc/client": "^10.45.2",
    "@trpc/react-query": "^10.45.2",
    "@tanstack/react-query": "^5.29.2",
    "@lzt/api-router": "workspace:*"
  },
  "devDependencies": {
    "typescript": "latest",
    "@lzt/config-typescript": "workspace:*"
  }
}
```

`// packages/trpc-client/tsconfig.json`

```json
{
  "extends": "@lzt/config-typescript/base.json",
  "include": ["index.ts"],
  "exclude": ["node_modules"],
  "references": [{ "path": "../api-router" }]
}
```

`// packages/trpc-client/index.ts`

```typescript
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@lzt/api-router";

export const trpc = createTRPCReact<AppRouter>();
```

---

### **3. Runnable Apps (`apps/`)**

---

#### **3.1. `apps/api-server`**

`// apps/api-server/package.json`

```json
{
  "name": "api-server",
  "version": "0.0.0",
  "private": true,
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc --build",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@trpc/server": "^10.45.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "@lzt/api-router": "workspace:*"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.9.4",
    "ts-node-dev": "^2.0.0",
    "typescript": "latest",
    "@lzt/config-typescript": "workspace:*"
  }
}
```

`// apps/api-server/tsconfig.json`

```json
{
  "extends": "@lzt/config-typescript/base.json",
  "include": ["src"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "outDir": "dist"
  },
  "references": [{ "path": "../../packages/api-router" }]
}
```

`// apps/api-server/src/index.ts`

```typescript
import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, createContext } from "@lzt/api-router";

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Allow Vite dev server

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("api-server listening on http://localhost:4000");
});
```

#### **3.2. `apps/web-dashboard` (Vite + React)**

_This is a minimal setup. A full Tamagui+Vite setup requires more config._

`// apps/web-dashboard/package.json`

```json
{
  "name": "web-dashboard",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.29.2",
    "tamagui": "^1.94.3",
    "@lzt/trpc-client": "workspace:*",
    "@lzt/ui": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.2.0",
    "typescript": "latest",
    "@lzt/config-typescript": "workspace:*"
  }
}
```

`// apps/web-dashboard/tsconfig.json`

```json
{
  "extends": "@lzt/config-typescript/base.json",
  "include": ["src"],
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx"
  },
  "references": [
    { "path": "../../packages/trpc-client" },
    { "path": "../../packages/ui" }
  ]
}
```

`// apps/web-dashboard/src/main.tsx`

```tsx
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { trpc } from "@lzt/trpc-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { App } from "./App";
import { TamaguiProvider } from "tamagui";
// You need to generate this file with `npx tamagui generate`
// import config from '../tamagui.config';

// Dummy config for now
const config = {} as any;

function Root() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <App />
        </TamaguiProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
```

`// apps/web-dashboard/src/App.tsx`

```tsx
import { trpc } from "@lzt/trpc-client";
import { MyButton } from "@lzt/ui";

export function App() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <div>
      <h1>Web Dashboard (Vite)</h1>
      <MyButton>Hello from Tamagui</MyButton>
      <h2>Posts:</h2>
      {postsQuery.isLoading && <p>Loading...</p>}
      <ul>
        {postsQuery.data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### **4. Docker Setup**

---

`// Dockerfile` (in root)

```dockerfile
# Base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy root package.json and lockfile
COPY package.json pnpm-lock.yaml ./

# Copy turbo.json
COPY turbo.json turbo.json

# Install all dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code for all packages and apps
COPY . .

# Build the api-server
RUN pnpm turbo build --filter=api-server

# Set the command to run the api-server
CMD ["pnpm", "--filter=api-server", "start"]
```

`// docker-compose.yml` (in root)

```yaml
version: "3.8"
services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    depends_on:
      - db
    environment:
      DATABASE_URL: "postgresql://user:password@db:5432/mydb"

volumes:
  postgres_data:
```

`// .env` (in root)

```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

Please generate all these files as a complete, structured project template. Ensure all dependencies and workspace dependencies (`workspace:*`) are correctly specified.

```

```
````
