# Progress Component

A React Native progress indicator component built with `@rn-primitives/progress`.

## Installation

The component is already installed and configured in this project:

```bash
# Already installed
@rn-primitives/progress: ~1.2.0
```

## Basic Usage

```tsx
import { Progress } from '@/components/ui/progress';

export function MyComponent() {
  return <Progress value={60} max={100} />;
}
```

## Props

The Progress component accepts all props from `@rn-primitives/progress` Root component, including:

- `value`: number - The current progress value
- `max`: number - The maximum value (default: 100)
- `getValueLabel`: (value: number, max: number) => string - Custom label formatter
- `className`: string - Additional CSS classes for styling

## Examples

See the following files for comprehensive examples:

- `progress-demo.tsx` - Basic demos showing animated and static progress bars
- `progress-usage-example.tsx` - Advanced usage examples including:
  - Basic progress bar
  - Animated progress with timer
  - File upload progress simulator
  - Multiple progress bars
  - Custom max values
  - Custom styling

## Styling

The component supports Tailwind CSS classes via the `className` prop:

```tsx
{/* Taller progress bar */}
<Progress value={60} max={100} className="h-6" />

{/* Thinner progress bar */}
<Progress value={60} max={100} className="h-2" />

{/* Square edges */}
<Progress value={60} max={100} className="rounded-none" />
```

## Accessibility

The component is built on `@rn-primitives/progress` which provides proper accessibility support including:

- Proper ARIA attributes
- Screen reader support
- Keyboard navigation support (on web)

## Notes

- The component automatically uses the project's theme colors (primary and secondary)
- Progress animations are handled via Tailwind's `transition-all` utility
- The component is fully compatible with React Native and Expo
- Works seamlessly with the "new-york" shadcn/ui style
