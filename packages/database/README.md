# @nexstack/database

Database schema, migrations, and Prisma client for the NexStack monorepo.

## 📦 What's included

- Prisma schema definitions
- Database migrations
- Generated Prisma client
- Database utilities

## 🚀 Usage

```typescript
import { db } from '@nexstack/database';

// Query data
const posts = await db.post.findMany();

// Create data
const newPost = await db.post.create({
  data: {
    title: 'Hello World',
    content: 'This is my first post',
  },
});
```

## 🏗️ Structure

```
/
├── index.ts           # Main database export
├── schema/            # Modular schema files
├── migrations/        # Prisma migrations
└── seed.ts           # Database seeding
```

## 🗄️ Schema Management

The schema uses `prisma-import` for modular schema files:

```prisma
// schema/user.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔄 Database Operations

### Development

```bash
# Generate Prisma client
pnpm db:generate

# Push schema changes (development)
pnpm db:push

# Create and run migrations
pnpm db:migrate

# Reset database
pnpm db:reset

# View database in browser
pnpm db:studio
```

### Production

```bash
# Deploy migrations
pnpm db:deploy

# Generate client
pnpm db:generate
```

## 🌱 Seeding

Create seed data for development:

```typescript
// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      posts: {
        create: [
          {
            title: 'Welcome Post',
            content: 'Welcome to NexStack!',
          },
        ],
      },
    },
  });
}

main().catch(console.error);
```

Run with:
```bash
pnpm db:seed
```

## 🔧 Environment Variables

Required environment variables:

```bash
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

## 🧪 Testing

For testing, use a separate test database:

```bash
# .env.test
DATABASE_URL="postgresql://user:password@localhost:5432/mydb_test"
```

## 📝 Adding new models

1. Create schema file in `schema/`
2. Run `pnpm db:generate` to update types
3. Create migration with `pnpm db:migrate`
4. Update seed data if needed

## 🔧 Scripts

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Create and run migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed the database