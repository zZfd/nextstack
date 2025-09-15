import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack } from 'tamagui';

import { Text, H3, Paragraph } from '../../general';

import { Layout } from '.';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Layout Component

Flexible container component for creating structured layouts with consistent theming.

## Features
- **Theme Integration**: Automatic background color adaptation
- **Variant System**: Centered, padded, rounded, and bordered options
- **Flexible Container**: Based on View with full styling support
- **Consistent Spacing**: Uses design tokens for padding and margins

## Variants
- **centered**: Centers content both horizontally and vertically
- **padded**: Adds consistent padding (small, default, large)
- **rounded**: Applies border radius (small, default, large) 
- **bordered**: Adds theme-consistent border
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    centered: {
      control: 'boolean',
      description: 'Center content horizontally and vertically',
    },
    padded: {
      control: 'select',
      options: [false, 'small', true, 'large'],
      description: 'Add padding to layout',
    },
    rounded: {
      control: 'select',
      options: [false, 'small', true, 'large'],
      description: 'Apply border radius',
    },
    bordered: {
      control: 'boolean',
      description: 'Add border with theme color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Layout height={100}>
      <Text>Basic Layout component with theme background</Text>
    </Layout>
  ),
};

export const VariantShowcase: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      <YStack gap="$2">
        <Text variant="muted">Default Layout:</Text>
        <Layout height={80}>
          <Text>Default layout with theme background</Text>
        </Layout>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Padded Layout:</Text>
        <Layout padded height={80}>
          <Text>Layout with default padding</Text>
        </Layout>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Rounded + Bordered Layout:</Text>
        <Layout rounded bordered padded height={80}>
          <Text>Layout with rounded corners and border</Text>
        </Layout>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Centered Layout:</Text>
        <Layout centered height={100}>
          <Text>Centered content in layout</Text>
        </Layout>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Large Padding + Large Rounded:</Text>
        <Layout padded="large" rounded="large" height={100}>
          <Text>Layout with large padding and radius</Text>
        </Layout>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different Layout variants showing padding, rounding, borders, and centering options.',
      },
    },
  },
};

export const CardLayout: Story = {
  render: () => (
    <YStack gap="$4" padding="$4">
      <Layout padded rounded bordered>
        <YStack gap="$3">
          <H3>Card-like Layout</H3>
          <Paragraph>
            This layout uses the bordered and rounded variants to create a card-like appearance 
            with consistent theme colors and spacing.
          </Paragraph>
          <Text variant="muted" fontSize="$3">
            Perfect for content containers, forms, or feature highlights.
          </Text>
        </YStack>
      </Layout>
      
      <Layout padded="large" rounded="large" centered height={140}>
        <YStack gap="$2" alignItems="center">
          <H3>Welcome Card</H3>
          <Text variant="muted" textAlign="center">
            Centered layout perfect for welcome screens or call-to-action cards.
          </Text>
        </YStack>
      </Layout>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card-style layouts using Layout variants for common UI patterns.',
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  render: () => (
    <YStack gap="$4" padding="$4">
      <Layout padded rounded width="100%" maxWidth={600}>
        <YStack gap="$3">
          <H3>Responsive Layout</H3>
          <Paragraph>
            This layout has a maximum width constraint while remaining fully responsive. 
            It will shrink on smaller screens but never exceed 600px width.
          </Paragraph>
          <Text variant="success">✓ Mobile-friendly design</Text>
        </YStack>
      </Layout>
      
      <Layout padded bordered minHeight={120} width="100%">
        <YStack gap="$2">
          <Text fontWeight="$2">Full Width Layout</Text>
          <Text variant="muted">
            This layout expands to fill the available space with a minimum height constraint.
          </Text>
        </YStack>
      </Layout>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Responsive layout examples with width and height constraints.',
      },
    },
  },
};

export const ThemeShowcase: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      <YStack gap="$2">
        <Text variant="muted">Dark Theme Layout:</Text>
        <Layout theme="dark" padded rounded bordered>
          <YStack gap="$2">
            <H3>Dark Theme</H3>
            <Text>Layout automatically adapts to dark theme colors</Text>
            <Text variant="muted">Including borders and background</Text>
          </YStack>
        </Layout>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Light Theme Layout:</Text>
        <Layout theme="light" padded rounded bordered>
          <YStack gap="$2">
            <H3>Light Theme</H3>
            <Text>Same layout in light theme with appropriate colors</Text>
            <Text variant="muted">Consistent styling across themes</Text>
          </YStack>
        </Layout>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Layout appearance in different themes showing automatic color adaptation.',
      },
    },
  },
};
