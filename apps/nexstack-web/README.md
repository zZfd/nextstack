# NexStack Web

SEO-friendly web application built with Next.js 14 and App Router.

## 🚀 Features

- **Next.js 14** with App Router
- **Server-side rendering** for SEO
- **tRPC** integration for type-safe APIs
- **Tamagui** for styling
- **TypeScript** for type safety

## 🏗️ Project Structure

```
app/
├── layout.tsx         # Root layout
├── page.tsx          # Homepage
├── providers.tsx     # Client providers (tRPC, theme)
└── api/
    └── trpc/
        └── [trpc]/
            └── route.ts   # tRPC API route handler
```

## 🚀 Getting Started

```bash
# Install dependencies (from root)
pnpm install

# Start development server
pnpm dev

# Or start just this app
pnpm --filter nexstack-web dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Development

### Adding new pages

Create new files in the `app/` directory:

```typescript
// app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about our company.</p>
    </div>
  );
}
```

### Using tRPC

```typescript
'use client';
import { trpc } from '@nexstack/trpc';

export default function PostList() {
  const { data: posts, isLoading } = trpc.post.all.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using shared UI components

```typescript
import { MyButton } from '@nexstack/ui';
import { View, Text } from 'tamagui';

export default function HomePage() {
  return (
    <View padding="$4">
      <Text fontSize="$6">Welcome to NexStack</Text>
      <MyButton onPress={() => alert('Hello!')}>
        Click me
      </MyButton>
    </View>
  );
}
```

## 🎨 Styling

Uses Tamagui for cross-platform styling:

```typescript
import { styled, View } from 'tamagui';

const Container = styled(View, {
  padding: '$4',
  backgroundColor: '$background',
  borderRadius: '$4',
});

export default function MyComponent() {
  return (
    <Container>
      <Text color="$color">Styled with Tamagui</Text>
    </Container>
  );
}
```

## 📱 Responsive Design

```typescript
import { View, Text } from 'tamagui';

export default function ResponsiveComponent() {
  return (
    <View
      width="100%"
      $sm={{ width: '50%' }}
      $md={{ width: '33%' }}
      $lg={{ width: '25%' }}
    >
      <Text>Responsive content</Text>
    </View>
  );
}
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

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Docker

```bash
# Build production image
docker build -t nexstack-web .

# Run container
docker run -p 3000:3000 nexstack-web
```

### Self-hosted

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🔧 Environment Variables

Create `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_TRPC_URL=http://localhost:3001/trpc

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX

# Database (if using API routes)
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

## 🔧 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Check TypeScript types