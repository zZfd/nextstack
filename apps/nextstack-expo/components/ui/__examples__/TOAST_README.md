# Toast Component

A toast notification component for React Native Expo apps, built with `@rn-primitives/toast`.

## Features

- Multiple variants (default, destructive)
- Customizable title and description
- Auto-dismiss with configurable timeout
- Support for action buttons
- Update toast content dynamically
- Manual dismiss functionality
- Maximum 3 toasts visible at once

## Installation

The toast component is already installed with the following dependencies:

- `@rn-primitives/toast`
- `@rn-primitives/portal`
- `lucide-react-native` (for the close icon)

## Setup

### 1. Add Toaster to Your Root Layout

Add the `Toaster` component to your root layout file (e.g., `app/_layout.tsx`):

```tsx
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout() {
  return (
    <>
      <Stack />
      <Toaster />
    </>
  );
}
```

### 2. Use the Toast Hook

Import and use the `useToast` hook in any component:

```tsx
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onPress={() => {
        toast({
          title: 'Success',
          description: 'Your action was completed.',
        });
      }}
    >
      <Text>Show Toast</Text>
    </Button>
  );
}
```

## Usage Examples

### Basic Toast

```tsx
toast({
  title: 'Success',
  description: 'Your changes have been saved.',
});
```

### Error Toast

```tsx
toast({
  variant: 'destructive',
  title: 'Error',
  description: 'Something went wrong. Please try again.',
});
```

### Toast with Title Only

```tsx
toast({
  title: 'Email sent successfully',
});
```

### Updating Toast Content

```tsx
const { update } = toast({
  title: 'Loading...',
  description: 'Processing your request...',
});

// Later, update the toast
setTimeout(() => {
  update({
    title: 'Success!',
    description: 'Your request has been completed.',
  });
}, 2000);
```

### Manual Dismiss

```tsx
const { dismiss } = toast({
  title: 'Uploading file...',
  description: 'This may take a while.',
});

// Dismiss the toast manually
setTimeout(() => {
  dismiss();
}, 1000);
```

### Dismiss All Toasts

```tsx
const { dismiss } = useToast();

// Dismiss all active toasts
dismiss();
```

## API Reference

### `useToast()`

Returns an object with:

- `toast(options)`: Function to show a new toast
- `dismiss(toastId?)`: Function to dismiss a toast or all toasts
- `toasts`: Array of currently active toasts

### Toast Options

```typescript
{
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive';
  action?: ToastActionElement;
}
```

### Toast Return Value

```typescript
{
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
}
```

## Configuration

### Toast Limit

Maximum number of toasts shown simultaneously (default: 3)

```typescript
// In hooks/use-toast.ts
const TOAST_LIMIT = 3;
```

### Auto-Dismiss Timeout

Duration before a toast is automatically dismissed (default: 5000ms)

```typescript
// In hooks/use-toast.ts
const TOAST_REMOVE_DELAY = 5000;
```

## Styling

The toast component uses the following variants defined in `toast-variants.ts`:

- `toastVariants`: Main toast container styles
- `toastTitleVariants`: Toast title styles
- `toastDescriptionVariants`: Toast description styles
- `toastActionVariants`: Toast action button styles
- `toastCloseVariants`: Toast close button styles
- `toastViewportVariants`: Toast viewport (container) styles

All variants support the project's theme colors and can be customized using Tailwind classes.

## Components

### Toast Components

- `ToastProvider`: Context provider for toast functionality
- `ToastViewport`: Container for all toasts
- `Toast`: Individual toast component
- `ToastTitle`: Toast title text
- `ToastDescription`: Toast description text
- `ToastClose`: Close button with X icon
- `ToastAction`: Action button for toasts
- `Toaster`: Pre-configured toaster component (recommended)

## Notes

- Toasts are automatically dismissed after 5 seconds by default
- A maximum of 3 toasts can be displayed at once
- Newer toasts appear at the top
- The component is fully compatible with React Native's styling system
- Uses NativeWind for styling (Tailwind CSS for React Native)
