import type { Meta, StoryObj } from '@storybook/react-native-web-vite'

import { Example } from '../Example'

const meta = {
  title: 'Design System/Example',
  component: Example,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Visual Pixel Gallery Design System Example

This component showcases the complete implementation of the Visual Pixel Gallery design system in Tamagui, including:

- **Theme System**: Dark and light themes with proper color contrast
- **Animation System**: Seven animation presets with spring physics
- **Typography**: Complete Inter font hierarchy (12px to 36px)
- **Color Palette**: Semantic colors with HSL values
- **Spacing**: 8px-based grid system
- **Interactive Elements**: Buttons, cards with hover and press states

## Animation Presets

- **quick**: Fast, responsive interactions (buttons, toggles)
- **bouncy**: Playful animations (cards, modals)
- **lazy**: Smooth, relaxed transitions (page transitions)  
- **fast**: Micro-interactions (hover states)
- **medium**: Standard UI feedback
- **slow**: Large content transitions

## Theme Variants

- **dark**: Primary theme with dark background (#0a0a0a) and light text
- **light**: Alternative theme with white background and dark text
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    animationPreset: {
      control: 'select',
      options: ['quick', 'bouncy', 'lazy', 'fast', 'medium', 'slow'],
      description: 'Animation preset to apply to interactive elements',
    },
    theme: {
      control: 'select', 
      options: ['light', 'dark'],
      description: 'Theme variant (light or dark)',
    },
    showAnimations: {
      control: 'boolean',
      description: 'Show interactive animation examples',
    },
    showColors: {
      control: 'boolean',
      description: 'Show color palette swatches',
    },
    showTypography: {
      control: 'boolean',
      description: 'Show typography scale examples',
    },
  },
} satisfies Meta<typeof Example>

export default meta
type Story = StoryObj<typeof meta>

// Default story - Complete showcase
export const Default: Story = {
  args: {
    animationPreset: 'quick',
    theme: 'dark',
    showAnimations: true,
    showColors: true,
    showTypography: true,
  },
}

// Dark Theme variations
export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dark theme variant matching the Visual Pixel Gallery aesthetic with deep backgrounds and light text.',
      },
    },
  },
}

export const LightTheme: Story = {
  args: {
    ...Default.args,
    theme: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Light theme variant with white background and dark text for accessibility.',
      },
    },
  },
}

// Animation preset variations
export const QuickAnimations: Story = {
  args: {
    ...Default.args,
    animationPreset: 'quick',
    showAnimations: true,
    showColors: false,
    showTypography: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick animation preset - fast and responsive for buttons and toggles.',
      },
    },
  },
}

export const BouncyAnimations: Story = {
  args: {
    ...Default.args,
    animationPreset: 'bouncy',
    showAnimations: true,
    showColors: false,
    showTypography: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Bouncy animation preset - playful spring animations for cards and modals.',
      },
    },
  },
}

export const LazyAnimations: Story = {
  args: {
    ...Default.args,
    animationPreset: 'lazy',
    showAnimations: true,
    showColors: false,
    showTypography: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Lazy animation preset - smooth and relaxed for page transitions.',
      },
    },
  },
}

// Component variations
export const ColorsOnly: Story = {
  args: {
    ...Default.args,
    showAnimations: false,
    showColors: true,
    showTypography: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Color palette showcase displaying all semantic colors from the design system.',
      },
    },
  },
}

export const TypographyOnly: Story = {
  args: {
    ...Default.args,
    showAnimations: false,
    showColors: false,
    showTypography: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Typography scale showcase with Inter font hierarchy from 12px to 24px.',
      },
    },
  },
}

export const InteractiveOnly: Story = {
  args: {
    ...Default.args,
    animationPreset: 'bouncy',
    showAnimations: true,
    showColors: false,
    showTypography: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive elements showcase with buttons and animated cards.',
      },
    },
  },
}

// Animation comparison
export const AnimationComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {(['quick', 'bouncy', 'lazy', 'fast', 'medium', 'slow'] as const).map((preset) => (
        <div key={preset}>
          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>
            Animation: {preset}
          </h3>
          <Example
            animationPreset={preset}
            theme="dark"
            showAnimations={true}
            showColors={false}
            showTypography={false}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all animation presets to see the differences in spring physics.',
      },
    },
  },
}

// Theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '400px' }}>
        <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Dark Theme</h3>
        <Example
          theme="dark"
          animationPreset="quick"
          showAnimations={true}
          showColors={true}
          showTypography={true}
        />
      </div>
      <div style={{ flex: 1, minWidth: '400px' }}>
        <h3 style={{ marginBottom: '1rem', color: '#000' }}>Light Theme</h3>
        <Example
          theme="light"
          animationPreset="quick"
          showAnimations={true}
          showColors={true}
          showTypography={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark themes showing proper color contrast and consistency.',
      },
    },
  },
}