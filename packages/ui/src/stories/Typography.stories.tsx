import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, XStack } from 'tamagui';
import { H1, H2, H3, H4, H5, H6, Text, Paragraph } from '../Typography';

const meta: Meta<typeof Text> = {
  title: 'Design System/Typography',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Typography System

Complete typography system based on Inter font with consistent theming and semantic color variants.

## Features
- **Inter Font Family**: Modern, readable typeface optimized for interfaces
- **Size Scale**: Consistent sizing from 12px to 36px following design system tokens
- **Theme Integration**: Automatic color adaptation for light and dark themes
- **Semantic Variants**: Muted, destructive, success, warning, and info color options
- **Line Height**: Proportional line heights for optimal readability

## Components
- **Headings (H1-H6)**: Hierarchical heading styles with appropriate weights
- **Text**: Base text component with variant support
- **Paragraph**: Enhanced paragraph component with lead, large, and small variants
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'destructive', 'success', 'warning', 'info'],
      description: 'Text color variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is the default text style.',
  },
};

export const TextVariants: Story = {
  render: () => (
    <YStack gap="$3" padding="$4">
      <Text>Default text color</Text>
      <Text variant="muted">Muted text color</Text>
      <Text variant="destructive">Destructive text color</Text>
      <Text variant="success">Success text color</Text>
      <Text variant="warning">Warning text color</Text>
      <Text variant="info">Info text color</Text>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available text color variants using semantic theme colors.',
      },
    },
  },
};

export const ParagraphVariants: Story = {
  render: () => (
    <YStack gap="$4" padding="$4" maxWidth={600}>
      <Paragraph>
        This is the default paragraph style. It provides good readability with proper line height and font size for body text content.
      </Paragraph>
      <Paragraph variant="muted">
        This is a muted paragraph variant, useful for secondary content or descriptions that should have less visual prominence.
      </Paragraph>
      <Paragraph variant="lead">
        This is a lead paragraph variant with larger text size, perfect for introductory text or highlighting important content.
      </Paragraph>
      <Paragraph variant="large">
        This is a large paragraph variant with medium font weight for emphasized body text.
      </Paragraph>
      <Paragraph variant="small">
        This is a small paragraph variant for captions, labels, or fine print text.
      </Paragraph>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different paragraph variants for various content hierarchy needs.',
      },
    },
  },
};

export const HeadingHierarchy: Story = {
  render: () => (
    <YStack gap="$4" padding="$4">
      <H1>Heading 1 (36px)</H1>
      <H2>Heading 2 (30px)</H2>
      <H3>Heading 3 (24px)</H3>
      <H4>Heading 4 (20px)</H4>
      <H5>Heading 5 (18px)</H5>
      <H6>Heading 6 (16px)</H6>
      <Paragraph>
        Regular paragraph text (16px) for comparison with the heading hierarchy above.
      </Paragraph>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete heading hierarchy showing size relationships and proper typographic scale.',
      },
    },
  },
};

export const ContentExample: Story = {
  render: () => (
    <YStack gap="$4" padding="$4" maxWidth={700}>
      <H2>Typography in Practice</H2>
      <Paragraph variant="lead">
        This example demonstrates how different typography elements work together to create clear content hierarchy and excellent readability.
      </Paragraph>
      
      <H3>Design Principles</H3>
      <Paragraph>
        Good typography is invisible. When readers can focus on content without being distracted by poor formatting, font choices, or unclear hierarchy, the typography has succeeded.
      </Paragraph>
      
      <H4>Key Features</H4>
      <YStack gap="$2" marginLeft="$4">
        <Text>• Consistent spacing and rhythm</Text>
        <Text>• Proper contrast for accessibility</Text>
        <Text>• Semantic color variants</Text>
        <Text>• Responsive and scalable</Text>
      </YStack>
      
      <H4>Status Messages</H4>
      <YStack gap="$2">
        <Text variant="success">✓ Operation completed successfully</Text>
        <Text variant="warning">⚠ Please review these settings</Text>
        <Text variant="destructive">✗ An error occurred during processing</Text>
        <Text variant="info">ℹ Additional information is available</Text>
      </YStack>
      
      <Paragraph variant="small">
        Last updated: September 2025
      </Paragraph>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing typography components used together in typical content layouts.',
      },
    },
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      <YStack>
        <Text variant="muted" marginBottom="$2">Dark Theme Typography:</Text>
        <YStack theme="dark" backgroundColor="$background" padding="$4" borderRadius="$3" borderWidth={1} borderColor="$border">
          <H3>Dark Theme Typography</H3>
          <YStack gap="$3">
            <H4>Heading Example</H4>
            <Paragraph>This paragraph demonstrates how typography appears in the dark theme with proper contrast ratios.</Paragraph>
            <Text variant="muted">Muted text maintains readability while providing hierarchy.</Text>
            <XStack gap="$4" flexWrap="wrap">
              <Text variant="success">Success</Text>
              <Text variant="warning">Warning</Text>
              <Text variant="destructive">Error</Text>
              <Text variant="info">Info</Text>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
      
      <YStack>
        <Text variant="muted" marginBottom="$2">Light Theme Typography:</Text>
        <YStack theme="light" backgroundColor="$background" padding="$4" borderRadius="$3" borderWidth={1} borderColor="$border">
          <H3>Light Theme Typography</H3>
          <YStack gap="$3">
            <H4>Heading Example</H4>
            <Paragraph>This paragraph shows the same typography in light theme, maintaining consistency while adapting colors.</Paragraph>
            <Text variant="muted">Muted text adjusts appropriately for the lighter background.</Text>
            <XStack gap="$4" flexWrap="wrap">
              <Text variant="success">Success</Text>
              <Text variant="warning">Warning</Text>
              <Text variant="destructive">Error</Text>
              <Text variant="info">Info</Text>
            </XStack>
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography appearance comparison between dark and light themes, showing proper contrast and color adaptation.',
      },
    },
  },
};
