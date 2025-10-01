# Frontend Architecture Analysis

> **Last Updated**: 2025-10-01
> **Version**: 1.0.0
> **Scope**: React Native (Expo) Mobile Application

## Table of Contents

- [Overview](#overview)
- [Component Architecture](#component-architecture)
- [UI Framework Stack](#ui-framework-stack)
- [State Management](#state-management)
- [Styling System](#styling-system)
- [Routing & Navigation](#routing--navigation)
- [Design Patterns](#design-patterns)
- [Code Organization](#code-organization)
- [Best Practices](#best-practices)

---

## Overview

The NextStack frontend is currently implemented as a **React Native mobile application** using **Expo** as the development platform. The architecture follows modern React Native patterns with a strong emphasis on type safety, component reusability, and cross-platform compatibility.

### Key Characteristics

- **Platform**: React Native 0.79.5 with Expo ~53.0.22
- **UI Philosophy**: Headless component primitives + styled variants
- **Type Safety**: Full TypeScript with auto-generated tRPC types
- **Styling**: NativeWind (Tailwind for React Native) with design tokens
- **State**: React Query for server state, React hooks for local state
- **Navigation**: Expo Router (file-based routing)

---

## Component Architecture

### Hierarchical Structure

```
┌──────────────────────────────────────────────────────────────┐
│                        APP LAYER                             │
│  app/_layout.tsx - Provider hierarchy & navigation setup     │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                    PROVIDER LAYER                            │
│  ├─ tRPC Provider (Type-safe API client)                     │
│  ├─ React Query Provider (Server state caching)              │
│  ├─ ThemeProvider (Design tokens via NativeWind)             │
│  └─ NavigationThemeProvider (React Navigation theming)       │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                     SCREEN LAYER                             │
│  app/index.tsx, app/sign-in.tsx (Expo Router pages)          │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                  FEATURE COMPONENTS                          │
│  components/auth/SignInForm.tsx                              │
│  components/ThemeToggle.tsx                                  │
└──────────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                   UI PRIMITIVES (27+ components)             │
│  components/ui/button.tsx                                    │
│  components/ui/input.tsx                                     │
│  components/ui/card.tsx                                      │
│  components/ui/dialog.tsx                                    │
│  └─ Based on @rn-primitives + CVA variants                   │
└──────────────────────────────────────────────────────────────┘
```

### Component Categories

#### 1. Layout Components

**Location**: `app/`

- **`_layout.tsx`** - Root layout with provider setup
- File-based routing with Expo Router Stack navigation

**Example**:

```typescript
// app/_layout.tsx
export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: config.trpcEndpoint })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavigationThemeProvider value={theme}>
            <Stack>{/* Routes */}</Stack>
          </NavigationThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

#### 2. UI Primitive Components (27+ Components)

**Location**: `components/ui/`

**Complete Component Library**:

```
Form Controls:
├─ button.tsx           # Pressable with variants (default, outline, ghost, etc.)
├─ input.tsx            # TextInput with focus states
├─ textarea.tsx         # Multi-line input
├─ checkbox.tsx         # @rn-primitives/checkbox
├─ radio-group.tsx      # @rn-primitives/radio-group
├─ select.tsx           # @rn-primitives/select
├─ slider.tsx           # @rn-primitives/slider
├─ switch.tsx           # @rn-primitives/switch
└─ tabs.tsx             # @rn-primitives/tabs

Layout:
├─ card.tsx             # Container with header/content/footer
├─ separator.tsx        # Visual divider
├─ table.tsx            # @rn-primitives/table
└─ collapsible.tsx      # @rn-primitives/collapsible

Feedback:
├─ alert.tsx            # Status messages
├─ alert-dialog.tsx     # @rn-primitives/alert-dialog
├─ dialog.tsx           # @rn-primitives/dialog
├─ toast.tsx            # @rn-primitives/toast
├─ toaster.tsx          # Toast container
├─ popover.tsx          # @rn-primitives/popover
├─ tooltip.tsx          # @rn-primitives/tooltip
├─ progress.tsx         # @rn-primitives/progress
└─ skeleton.tsx         # Loading placeholder

Data Display:
├─ avatar.tsx           # @rn-primitives/avatar
├─ badge.tsx            # Status indicator
├─ label.tsx            # Form labels
├─ text.tsx             # Styled text primitive
└─ accordion.tsx        # @rn-primitives/accordion
```

#### 3. Feature Components

**Location**: `components/auth/`, `components/`

- **SignInForm.tsx** - Authentication form (uses react-hook-form)
- **ThemeToggle.tsx** - Dark/light mode switcher

#### 4. Provider Components

**Location**: `lib/`

- **ThemeProvider.tsx** - CSS variable injection for NativeWind
- **useColorScheme.tsx** - Theme state + React Navigation integration

---

## UI Framework Stack

### Core Libraries

| Library                      | Version | Purpose                   | Usage                   |
| ---------------------------- | ------- | ------------------------- | ----------------------- |
| **@rn-primitives**           | ~1.2.0  | Headless UI components    | 27 primitive components |
| **NativeWind**               | 4.1.23  | Tailwind for React Native | All styling             |
| **class-variance-authority** | 0.7.1   | Component variants        | Button, Card, etc.      |
| **tailwind-merge**           | 3.3.1   | Class merging utility     | `cn()` helper           |
| **lucide-react-native**      | 0.544.0 | Icon library              | UI icons                |
| **react-hook-form**          | 7.63.0  | Form management           | Forms validation        |

### Component Pattern: CVA + @rn-primitives

**Strategy**: Headless primitives + styled variants

```typescript
// 1. Define variants with CVA
// components/ui/button-variants.ts
export const buttonVariants = cva(
  'group flex items-center justify-center rounded-md web:transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary web:hover:opacity-90 active:opacity-90',
        outline: 'border border-input bg-background active:bg-accent',
        ghost: 'web:hover:bg-accent active:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2 native:h-12 native:px-5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 native:h-14',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

// 2. Apply to React Native Pressable
// components/ui/button.tsx
function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <Pressable
      className={cn(
        props.disabled && 'opacity-50',
        buttonVariants({ variant, size, className })
      )}
      role="button"
      {...props}
    />
  );
}
```

**Key Insight**: This pattern provides:

- **Type-safe variants** via TypeScript + CVA
- **Platform-specific styles** using `web:` and `native:` prefixes
- **Composable styling** through Tailwind utilities
- **Accessible by default** via @rn-primitives

---

## State Management

### 1. Server State (React Query + tRPC)

**Pattern**: Type-safe API calls with automatic caching

```typescript
// Setup in _layout.tsx
const [queryClient] = useState(() => new QueryClient());
const [trpcClient] = useState(() =>
  trpc.createClient({
    links: [httpBatchLink({ url: 'http://localhost:3001/trpc' })],
  })
);

// Usage in components
function UserProfile() {
  // Query - auto-typed from backend
  const { data, isLoading } = trpc.main.user.getByEmail.useQuery({
    email: 'user@example.com',
  });

  // Mutation - auto-typed from backend
  const createUser = trpc.core.user.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    },
  });

  return (/* ... */);
}
```

**Benefits**:

- ✅ **End-to-end type safety** - Changes to backend instantly reflected in frontend
- ✅ **Automatic caching** - React Query manages stale/fresh data
- ✅ **Optimistic updates** - Built-in mutation hooks
- ✅ **Request batching** - Multiple tRPC calls batched via `httpBatchLink`

### 2. Local UI State (React Hooks)

**Patterns Used**:

```typescript
// Simple state
const [isFocused, setIsFocused] = useState(false);

// Derived state
const isDarkMode = useMemo(() => colorScheme === 'dark', [colorScheme]);

// Side effects
useEffect(() => {
  if (fontsLoaded || fontError) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded, fontError]);

// Callbacks
const handlePress = useCallback(() => {
  setColorScheme(isDarkMode ? 'light' : 'dark');
}, [isDarkMode, setColorScheme]);
```

### 3. Global Theme State

**Pattern**: NativeWind + AsyncStorage for persistence

```typescript
// lib/useColorScheme.tsx
export function useColorScheme() {
  const { colorScheme, setColorScheme: setNativewindColorScheme } =
    useNativewindColorScheme();

  // Persist to AsyncStorage
  const setColorScheme = async (newTheme: 'light' | 'dark') => {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setNativewindColorScheme(newTheme);
  };

  // Load on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) setNativewindColorScheme(savedTheme);
    };
    loadThemePreference();
  }, []);

  return { colorScheme, setColorScheme, isDarkColorScheme };
}
```

**Flow**:

```
User toggles theme
    ↓
setColorScheme() called
    ↓
AsyncStorage.setItem() - Persist
    ↓
setNativewindColorScheme() - Update NativeWind
    ↓
ThemeProvider re-renders with new CSS variables
    ↓
All components re-style automatically
```

---

## Styling System

### NativeWind Architecture

**Pattern**: Design tokens → CSS variables → Tailwind utilities

#### 1. Design Tokens (HSL Color Space)

```css
/* global.css */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 142 76% 36%; /* Green theme */
  --primary-foreground: 0 0% 98%;
  --secondary: 142 20% 95%;
  --destructive: 0 84.2% 60.2%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 142 76% 36%; /* Same primary in dark mode */
  --border: 240 3.7% 15.9%;
  /* ... */
}
```

#### 2. Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind utilities
        border: 'hsl(var(--border) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
      },
    },
  },
};
```

#### 3. Theme Provider (Runtime Injection)

```typescript
// lib/ThemeProvider.tsx
export function ThemeProvider({ children }) {
  const { isDarkColorScheme, colorScheme } = useColorScheme();

  const themeVars = useMemo(() => {
    if (isDarkColorScheme) {
      return vars({
        '--background': '240 10% 3.9%',
        '--foreground': '0 0% 98%',
        // ... dark theme values
      });
    }
    return vars({
      '--background': '0 0% 100%',
      '--foreground': '240 10% 3.9%',
      // ... light theme values
    });
  }, [isDarkColorScheme]);

  // Force re-mount on theme change (iOS fix)
  return (
    <View key={colorScheme} style={themeVars} className="flex-1">
      {children}
    </View>
  );
}
```

**Why this approach?**

- ✅ **Single source of truth** - Design tokens defined once
- ✅ **Runtime theme switching** - No app restart needed
- ✅ **Cross-platform** - Works on iOS, Android, and web
- ✅ **Type-safe** - Tailwind IntelliSense in VS Code

#### 4. Platform-Specific Styling

```typescript
// Web-only styles
className="web:hover:bg-primary web:focus:ring-2"

// Native-only styles
className="native:h-12 native:px-5"

// Conditional styles
className={cn(
  'rounded-md bg-primary',
  isFocused && 'native:border-primary',
  disabled && 'opacity-50 web:pointer-events-none'
)}
```

### Utility Function: `cn()`

```typescript
// lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Purpose**: Merge Tailwind classes intelligently

- `clsx`: Conditional class names
- `twMerge`: Resolve conflicting Tailwind utilities (last wins)

**Example**:

```typescript
cn('px-4', 'px-6'); // → 'px-6' (last wins)
cn('bg-red-500', isActive && 'bg-blue-500'); // → conditional
```

---

## Routing & Navigation

### Expo Router (File-Based)

**Pattern**: Filesystem structure = Route hierarchy

```
app/
├─ _layout.tsx          → Root layout (providers)
├─ index.tsx            → / (Home screen)
└─ sign-in.tsx          → /sign-in
```

### Navigation Setup

```typescript
// app/_layout.tsx
import { Stack } from 'expo-router';

<Stack
  screenOptions={{
    headerStyle: { backgroundColor: theme.colors.card },
    headerTintColor: theme.colors.text,
  }}
>
  <Stack.Screen
    name="index"
    options={{ title: 'Mobile Expo App' }}
  />
  <Stack.Screen
    name="sign-in"
    options={{ title: 'Sign In' }}
  />
</Stack>
```

### Theme Integration (React Navigation)

```typescript
// lib/useColorScheme.tsx
const lightNavColors = {
  background: 'hsl(0 0% 100%)',
  border: 'hsl(240 5.9% 90%)',
  card: 'hsl(0 0% 100%)',
  primary: 'hsl(142 76% 36%)',
  text: 'hsl(240 10% 3.9%)',
};

const darkNavColors = {
  background: 'hsl(240 10% 3.9%)',
  border: 'hsl(240 3.7% 15.9%)',
  card: 'hsl(240 10% 3.9%)',
  primary: 'hsl(142 76% 36%)',
  text: 'hsl(0 0% 98%)',
};

export function useColorScheme() {
  const theme = isDarkColorScheme
    ? { ...DarkTheme, colors: darkNavColors }
    : { ...DefaultTheme, colors: lightNavColors };

  return { theme, colorScheme, setColorScheme };
}
```

---

## Design Patterns

### 1. Provider Composition Pattern

**Pattern**: Nested providers in hierarchical order

```typescript
<tRPC.Provider>           {/* API client */}
  <QueryClientProvider>   {/* Server state caching */}
    <ThemeProvider>       {/* Design tokens */}
      <NavigationThemeProvider>  {/* Navigation theming */}
        <App />
      </NavigationThemeProvider>
    </ThemeProvider>
  </QueryClientProvider>
</tRPC.Provider>
```

**Why this order?**

1. **tRPC first** - Required by QueryClientProvider
2. **QueryClient second** - Required by tRPC hooks
3. **ThemeProvider third** - Must wrap all styled components
4. **NavigationThemeProvider last** - Consumes theme from ThemeProvider

### 2. Variant Pattern (CVA)

**Pattern**: Component API with type-safe variants

```typescript
// Define variants
const buttonVariants = cva(baseStyles, {
  variants: {
    variant: { default, outline, ghost },
    size: { sm, default, lg },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

// TypeScript inference
type ButtonProps = VariantProps<typeof buttonVariants>;

// Usage
<Button variant="outline" size="lg">Click me</Button>
```

### 3. Controlled Input Pattern

**Pattern**: Focus state management for native inputs

```typescript
const Input = React.forwardRef<TextInput, InputProps>(
  ({ onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = useCallback((e) => {
      setIsFocused(true);
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e) => {
      setIsFocused(false);
      onBlur?.(e);
    }, [onBlur]);

    return (
      <TextInput
        ref={ref}
        className={cn(
          'border border-input',
          isFocused && 'native:border-primary'
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);
```

**Why?** React Native's `TextInput` doesn't support `:focus` pseudo-class, so we manage focus state manually.

### 4. Text Context Pattern

**Pattern**: Nested text styling for Pressable components

```typescript
// Create context for text styles
export const TextClassContext = createContext<string | undefined>(undefined);

// Button provides text class
<TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
  <Pressable className={buttonVariants({ variant, size })}>
    {children}
  </Pressable>
</TextClassContext.Provider>

// Text consumes context
export function Text({ className, ...props }) {
  const textClass = useContext(TextClassContext);
  return <RNText className={cn(textClass, className)} {...props} />;
}
```

**Why?** Ensures text inside buttons automatically inherits correct styling.

---

## Code Organization

### Directory Structure

```
apps/nextstack-expo/
├─ app/                          # Expo Router pages
│  ├─ _layout.tsx               # Root layout with providers
│  ├─ index.tsx                 # Home screen
│  └─ sign-in.tsx               # Authentication screen
│
├─ components/                   # Feature components
│  ├─ auth/
│  │  └─ SignInForm.tsx         # Sign-in form with validation
│  ├─ providers/                # (deprecated - moved to lib/)
│  ├─ ThemeToggle.tsx           # Theme switcher
│  └─ ui/                       # UI Primitives (27 components)
│     ├─ button.tsx
│     ├─ button-variants.ts    # CVA variant definitions
│     ├─ input.tsx
│     ├─ card.tsx
│     ├─ __tests__/            # Component demos
│     └─ __examples__/         # Usage examples
│
├─ lib/                         # Utilities & providers
│  ├─ ThemeProvider.tsx        # Theme context + CSS variables
│  ├─ useColorScheme.tsx       # Theme hook + persistence
│  └─ utils.ts                 # cn() helper
│
├─ hooks/                       # Custom hooks
│  └─ use-toast.ts             # Toast notifications
│
├─ config/                      # App configuration
│  └─ index.ts                 # API endpoints, constants
│
├─ global.css                   # Tailwind base + design tokens
├─ tailwind.config.js          # NativeWind configuration
├─ components.json             # shadcn/ui config
└─ package.json
```

### Naming Conventions

| Type           | Convention                  | Example                           |
| -------------- | --------------------------- | --------------------------------- |
| **Components** | PascalCase                  | `SignInForm.tsx`                  |
| **Hooks**      | camelCase with `use` prefix | `useColorScheme.tsx`              |
| **Utilities**  | camelCase                   | `utils.ts`                        |
| **Variants**   | kebab-case suffix           | `button-variants.ts`              |
| **Tests**      | `__tests__/` folder         | `__tests__/checkbox-demo.tsx`     |
| **Examples**   | `__examples__/` folder      | `__examples__/avatar-example.tsx` |

---

## Best Practices

### 1. Type Safety

✅ **Do**: Leverage auto-generated types from tRPC

```typescript
// Types are inferred from backend
const { data } = trpc.core.user.list.useQuery();
// data is User[] - no manual typing needed
```

❌ **Don't**: Use `any` or manual type definitions for API data

```typescript
// Bad - loses type safety
const { data }: any = trpc.core.user.list.useQuery();
```

### 2. Component Composition

✅ **Do**: Use the `cn()` utility for conditional classes

```typescript
<Button
  className={cn(
    'rounded-md',
    isLoading && 'opacity-50',
    variant === 'primary' && 'bg-blue-500'
  )}
/>
```

❌ **Don't**: Manually concatenate class strings

```typescript
// Bad - harder to read and maintain
<Button className={'rounded-md' + (isLoading ? ' opacity-50' : '')} />
```

### 3. Platform-Specific Code

✅ **Do**: Use NativeWind prefixes for platform-specific styles

```typescript
className = 'web:hover:bg-accent native:h-12';
```

✅ **Do**: Use `Platform` API for logic branching

```typescript
import { Platform } from 'react-native';

const config = {
  trpcEndpoint: Platform.select({
    ios: 'http://localhost:3001/trpc',
    android: 'http://10.0.2.2:3001/trpc',
    web: 'http://localhost:3001/trpc',
  }),
};
```

### 4. State Management

✅ **Do**: Use React Query for server state

```typescript
const { data, isLoading, error } = trpc.core.user.list.useQuery();
```

✅ **Do**: Use `useState` for local UI state

```typescript
const [isFocused, setIsFocused] = useState(false);
```

❌ **Don't**: Store server data in local state

```typescript
// Bad - duplicates server state
const [users, setUsers] = useState([]);
useEffect(() => {
  fetchUsers().then(setUsers);
}, []);
```

### 5. Theme Implementation

✅ **Do**: Use design tokens for all colors

```typescript
className = 'bg-primary text-primary-foreground';
```

❌ **Don't**: Hardcode color values

```typescript
// Bad - bypasses theme system
className = 'bg-[#22c55e] text-white';
```

### 6. Form Handling

✅ **Do**: Use React Hook Form for complex forms

```typescript
import { useForm } from 'react-hook-form';

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

✅ **Do**: Use controlled components for React Native

```typescript
const [value, setValue] = useState('');
<Input value={value} onChangeText={setValue} />
```

### 7. Performance Optimization

✅ **Do**: Memoize expensive computations

```typescript
const theme = useMemo(() => {
  return isDark ? darkTheme : lightTheme;
}, [isDark]);
```

✅ **Do**: Use `useCallback` for event handlers

```typescript
const handlePress = useCallback(() => {
  setColorScheme(isDark ? 'light' : 'dark');
}, [isDark, setColorScheme]);
```

❌ **Don't**: Create inline functions in render

```typescript
// Bad - creates new function on every render
<Button onPress={() => setColorScheme('dark')} />
```

---

## Future Considerations

### Planned Enhancements

1. **Web App** (`apps/web`)
   - Next.js 15 application sharing the same tRPC backend
   - Shared component library via workspace packages

2. **Shared UI Package** (`packages/ui`)
   - Extract common UI components to `@nextstack/ui`
   - Share between Expo and Next.js apps

3. **Advanced State Management**
   - Zustand for complex client state
   - Jotai for atomic state management

4. **Testing Infrastructure**
   - Vitest for component testing
   - React Native Testing Library
   - E2E tests with Detox

5. **Internationalization (i18n)**
   - `expo-localization` for locale detection
   - `i18next` for translations

6. **Offline Support**
   - React Query persistence
   - AsyncStorage for offline data

---

## Quick Reference

### Essential Imports

```typescript
// UI Components
import { Button, Card, Input, Text } from '@/components/ui';

// Utilities
import { cn } from '@/lib/utils';

// Hooks
import { useColorScheme } from '@/lib/useColorScheme';

// tRPC
import { trpc } from '@nextstack/trpc-client';

// Navigation
import { useRouter } from 'expo-router';
```

### Component Template

```typescript
import * as React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export function MyComponent({
  variant = 'default',
  className,
  children
}: MyComponentProps) {
  return (
    <View className={cn('rounded-md', className)}>
      {children}
    </View>
  );
}
```

### tRPC Usage Pattern

```typescript
function MyScreen() {
  // Query
  const { data, isLoading, error } = trpc.core.user.list.useQuery();

  // Mutation
  const createUser = trpc.core.user.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch
      trpc.useContext().core.user.list.invalidate();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (/* ... */);
}
```

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-01
**Next Review**: After web app implementation
