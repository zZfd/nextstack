import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, XStack } from 'tamagui';

import { Button } from '../Button';
import { Text } from '../Typography';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Button Component

Enhanced button component with theme variants, sizes, and hover/press animations.

## Features
- **Theme Integration**: Uses design system colors from the theme configuration
- **Variants**: Default, secondary, destructive, outline, and ghost styles
- **Sizes**: Small, medium, and large variants
- **Animations**: Smooth hover and press animations with scale transforms
- **Accessibility**: Proper focus and interaction states

## Variants
- **default**: Primary button with brand green background
- **secondary**: Subtle secondary button
- **destructive**: Red button for dangerous actions
- **outline**: Bordered button with transparent background
- **ghost**: Minimal button with no background
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button text content',
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete Account',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click Me!',
    onPress: () => alert('Button clicked!'),
  },
};

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <YStack gap="$4" padding="$4">
      <Text variant="muted" marginBottom="$2">Button Variants:</Text>
      <XStack gap="$3" flexWrap="wrap" alignItems="center">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </XStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together with distinct colors.',
      },
    },
  },
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <YStack gap="$4" padding="$4">
      <XStack gap="$3" alignItems="center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </XStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together.',
      },
    },
  },
};

// Theme showcase
export const ThemeShowcase: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      <YStack>
        <Text variant="muted" marginBottom="$3">Dark Theme Buttons:</Text>
        <YStack theme="dark" backgroundColor="$background" padding="$4" borderRadius="$3" borderWidth={1} borderColor="$border">
          <XStack gap="$3" flexWrap="wrap">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </XStack>
        </YStack>
      </YStack>
      
      <YStack>
        <Text variant="muted" marginBottom="$3">Light Theme Buttons:</Text>
        <YStack theme="light" backgroundColor="$background" padding="$4" borderRadius="$3" borderWidth={1} borderColor="$border">
          <XStack gap="$3" flexWrap="wrap">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button appearance in both dark and light themes, showing proper color adaptation.',
      },
    },
  },
};
