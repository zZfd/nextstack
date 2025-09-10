# Example Component

A comprehensive showcase component demonstrating the Visual Pixel Gallery design system implementation in Tamagui.

## Features

### ✨ Complete Design System Demo
- **Theme System**: Light and dark theme variants
- **Animation System**: All 7 animation presets (quick, bouncy, lazy, fast, medium, slow, tooltip)
- **Color Palette**: Semantic colors with proper contrast ratios
- **Typography Scale**: Inter font hierarchy from 12px to 24px
- **Interactive Elements**: Buttons with hover/press states
- **Animated Cards**: Clickable cards with selection states

### 🎯 Use Cases
- **Design System Documentation**: Showcase all design tokens
- **Theme Testing**: Validate colors and contrast in different themes
- **Animation Testing**: Compare animation presets side-by-side
- **Component Development**: Reference for implementing design system
- **Accessibility Testing**: Test color contrast and interactions

## Props

```typescript
interface ExampleProps {
  /** Animation preset for interactive elements */
  animationPreset?: 'quick' | 'bouncy' | 'lazy' | 'fast' | 'medium' | 'slow'
  
  /** Theme variant */
  theme?: 'light' | 'dark'
  
  /** Show animation examples */
  showAnimations?: boolean
  
  /** Show color palette */
  showColors?: boolean
  
  /** Show typography examples */
  showTypography?: boolean
}
```

## Storybook Stories

### Available Stories

1. **Default** - Complete showcase with all features
2. **DarkTheme** - Dark theme variant (primary)
3. **LightTheme** - Light theme variant
4. **QuickAnimations** - Focus on quick animation preset
5. **BouncyAnimations** - Focus on bouncy animation preset
6. **LazyAnimations** - Focus on lazy animation preset
7. **ColorsOnly** - Color palette showcase
8. **TypographyOnly** - Typography scale showcase
9. **InteractiveOnly** - Interactive elements focus
10. **AnimationComparison** - Side-by-side animation comparison
11. **ThemeComparison** - Light vs dark theme comparison

### Controls

All stories include interactive controls for:
- Animation preset selection
- Theme switching (light/dark)
- Section visibility toggles
- Real-time preview updates

## Design Tokens Demonstrated

### Colors
- **Primary**: `hsl(142, 76%, 36%)` - Brand green
- **Secondary**: `hsl(0, 0%, 9%)` - Dark gray
- **Destructive**: `hsl(0, 63%, 31%)` - Error red
- **Success**: Green (matches primary)
- **Warning**: `hsl(35, 91%, 45%)` - Amber
- **Info**: `hsl(217, 91%, 60%)` - Blue

### Typography
- **H2**: 24px/32px line height, font-weight 700
- **H3**: 20px/28px line height, font-weight 600
- **H4**: 18px/28px line height, font-weight 500
- **Body Large**: 16px/24px line height (default)
- **Body Medium**: 14px/20px line height
- **Body Small**: 12px/16px line height

### Animations
- **quick**: `damping: 20, stiffness: 250` - Fast response
- **bouncy**: `damping: 9, stiffness: 150` - Playful spring
- **lazy**: `damping: 18, stiffness: 50` - Relaxed motion
- **fast**: `damping: 20, stiffness: 300` - Micro-interactions
- **medium**: `damping: 15, stiffness: 200` - Standard feedback
- **slow**: `damping: 25, stiffness: 60` - Gentle transitions

### Spacing
Uses 8px-based spacing system:
- **Gap 2**: 8px
- **Gap 3**: 12px
- **Gap 4**: 16px
- **Gap 6**: 24px
- **Padding 4**: 16px
- **Padding 6**: 24px

## Usage Examples

### Basic Usage
```tsx
import { Example } from '@nexstack/ui'

// Complete showcase
<Example />

// Dark theme with bouncy animations
<Example theme="dark" animationPreset="bouncy" />

// Colors and typography only
<Example 
  showAnimations={false}
  showColors={true}
  showTypography={true}
/>
```

### Theme Testing
```tsx
// Test both themes
<div style={{ display: 'flex', gap: '2rem' }}>
  <Example theme="dark" />
  <Example theme="light" />
</div>
```

### Animation Comparison
```tsx
// Compare animation presets
{['quick', 'bouncy', 'lazy'].map(preset => (
  <Example
    key={preset}
    animationPreset={preset}
    showAnimations={true}
    showColors={false}
    showTypography={false}
  />
))}
```

## Accessibility

### Color Contrast
- **Dark theme**: White text on dark backgrounds (21:1 contrast ratio)
- **Light theme**: Dark text on light backgrounds (16:1 contrast ratio)
- **Interactive states**: Clear visual feedback for hover/focus/press

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators use theme ring color
- Logical tab order throughout component

### Screen Readers
- Proper semantic HTML structure
- Descriptive labels and text content
- Color information not solely relied upon

## Performance

### Optimizations
- Uses Tamagui's compiled styles for optimal performance
- Spring animations run at 60fps on both web and native
- Minimal re-renders with proper React patterns
- Efficient theme switching without layout thrashing

### Bundle Impact
- Tree-shakable component exports
- No runtime CSS-in-JS overhead
- Shared design tokens reduce bundle size
- Lazy loading compatible

## Development

### Running Storybook
```bash
pnpm storybook
```

Visit `http://localhost:6006` to see all Example component stories.

### Testing
```bash
pnpm typecheck
pnpm lint
```

### Building
```bash
pnpm build
```

## Related Components

- **Provider**: Tamagui theme provider setup
- **MyButton**: Basic button implementation
- **Typography**: Text component variations
- **Layout**: Layout and spacing components

## Design System Reference

This component implements the complete Visual Pixel Gallery design system as documented in:
- `claudedocs/theme-style-guide.md` - Original design specifications
- `claudedocs/tamagui-theme-implementation.md` - Technical implementation details