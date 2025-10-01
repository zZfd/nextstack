# Separator Component

A visual separator component for React Native that can be oriented horizontally or vertically.

## Installation

The separator component uses `@rn-primitives/separator` which is already installed in this project.

## Basic Usage

```tsx
import { Separator } from '@/components/ui/separator';
import { View, Text } from 'react-native';

export function MyComponent() {
  return (
    <View>
      <Text>Section 1</Text>
      <Separator />
      <Text>Section 2</Text>
    </View>
  );
}
```

## Horizontal Separator

The default orientation is horizontal:

```tsx
<View className='w-full'>
  <View className='p-4'>
    <Text className='text-sm font-medium'>Title</Text>
    <Text className='text-sm text-muted-foreground'>Description</Text>
  </View>
  <Separator />
  <View className='p-4'>
    <Text className='text-sm font-medium'>Another Title</Text>
    <Text className='text-sm text-muted-foreground'>Another Description</Text>
  </View>
</View>
```

## Vertical Separator

Use the `orientation` prop for vertical separators:

```tsx
<View className='flex-row items-center'>
  <Text className='text-sm'>Home</Text>
  <Separator orientation='vertical' className='mx-4 h-4' />
  <Text className='text-sm'>About</Text>
  <Separator orientation='vertical' className='mx-4 h-4' />
  <Text className='text-sm'>Contact</Text>
</View>
```

## Custom Styling

You can customize the separator appearance using className:

```tsx
<Separator className="bg-primary" />
<Separator className="h-0.5 bg-destructive" />
<Separator orientation="vertical" className="w-0.5 h-8 bg-secondary" />
```

## Props

The Separator component accepts all props from `@rn-primitives/separator` Root component:

- `orientation?: 'horizontal' | 'vertical'` - The orientation of the separator (default: 'horizontal')
- `decorative?: boolean` - Whether the separator is decorative (default: true)
- `className?: string` - Additional CSS classes for styling

## Examples

See the following files for complete examples:

- `components/ui/__tests__/separator-demo.tsx` - Basic usage demos
- `components/ui/__examples__/separator-example.tsx` - Comprehensive examples with different use cases

## Accessibility

When `decorative` is `true` (default), the separator is purely visual and ignored by screen readers. Set `decorative={false}` if the separator conveys important structural information.
