# @nexstack/ui

Cross-platform UI component library built with Tamagui for React and React Native.

## 📦 What's included

- Cross-platform components (Web + Mobile)
- Tamagui styling system
- TypeScript definitions
- Theme support

## 🚀 Usage

```typescript
import { MyButton } from '@nexstack/ui';

function App() {
  return (
    <MyButton onPress={() => console.log('Pressed!')}>
      Click me
    </MyButton>
  );
}
```

## 🏗️ Structure

```
src/
├── index.ts           # Main exports
├── tamagui.config.ts  # Theme configuration
├── MyButton.tsx       # Button component
└── components/        # Additional components
```

## 🎨 Theming

Components use Tamagui's theming system:

```typescript
import { MyButton } from '@nexstack/ui';

// Use theme colors
<MyButton theme="blue">Blue Button</MyButton>
<MyButton theme="red">Red Button</MyButton>

// Custom styling
<MyButton backgroundColor="$color" pressStyle={{ opacity: 0.8 }}>
  Custom Button
</MyButton>
```

## 🆕 Adding new components

1. Create component file in `src/`
2. Use Tamagui's styling system
3. Export from `index.ts`
4. Add tests in `__tests__/`

Example:

```typescript
// src/MyCard.tsx
import { styled, Card } from 'tamagui';

export const MyCard = styled(Card, {
  name: 'MyCard',
  padding: '$4',
  borderRadius: '$4',
  backgroundColor: '$background',
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
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

## 📱 Platform Support

- ✅ React (Web)
- ✅ React Native (iOS/Android)
- ✅ Next.js
- ✅ Expo

## 🔧 Scripts

- `pnpm build` - Build TypeScript
- `pnpm typecheck` - Check types
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues