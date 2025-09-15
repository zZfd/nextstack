import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, View } from 'tamagui';

import { Text, H3, Paragraph } from '../../general';

import { Container } from '.';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Container Component

Scrollable container component based on ScrollView with theme integration and variant system.

## Features
- **Theme Integration**: Automatic background color from theme
- **Variant System**: Centered, padded variants for common layouts
- **Scrollable**: Built-in scroll capability for overflow content
- **Responsive**: Adapts to content and screen size

## Variants
- **centered**: Centers content both horizontally and vertically
- **padded**: Adds consistent padding (small, default, large)
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
      options: [false, true, 'small', 'large'],
      description: 'Add padding to container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Container height={200}>
      <Text>This is content inside a Container component with default styling</Text>
    </Container>
  ),
};

export const Centered: Story = {
  render: () => (
    <Container height={200} centered>
      <YStack gap="$2" alignItems="center">
        <H3>Centered Content</H3>
        <Text variant="muted">This content is centered both horizontally and vertically</Text>
      </YStack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container with centered variant that aligns content in the center.',
      },
    },
  },
};

export const Padded: Story = {
  render: () => (
    <YStack gap="$4">
      <Container height={120} padded="small">
        <Text>Small padding</Text>
      </Container>
      <Container height={120} padded>
        <Text>Default padding</Text>
      </Container>
      <Container height={120} padded="large">
        <Text>Large padding</Text>
      </Container>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding variants for various spacing needs.',
      },
    },
  },
};

export const ScrollableContent: Story = {
  render: () => (
    <Container height={300} padded>
      <YStack gap="$3">
        <H3>Scrollable Content</H3>
        <Text variant="muted">This container has more content than can fit, so it becomes scrollable.</Text>
        {Array.from({ length: 20 }, (_, i) => (
          <Paragraph key={i}>
            Content item {i + 1} - This is some example content that demonstrates scrollable behavior when the container height is exceeded.
          </Paragraph>
        ))}
      </YStack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container with scrollable overflow when content exceeds the container height.',
      },
    },
  },
};

export const CenteredAndPadded: Story = {
  render: () => (
    <Container height={250} centered padded>
      <YStack gap="$3" alignItems="center" maxWidth={400}>
        <H3>Welcome</H3>
        <Paragraph variant="muted" textAlign="center">
          This container combines both centered and padded variants for a common layout pattern.
        </Paragraph>
        <Text variant="success">✓ Ready to proceed</Text>
      </YStack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container combining centered and padded variants for welcome screens or modals.',
      },
    },
  },
};

export const ThemeShowcase: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      <YStack>
        <Text variant="muted" marginBottom="$2">Dark Theme:</Text>
        <View theme="dark" backgroundColor="$background" borderRadius="$3" overflow="hidden">
          <Container height={150} padded>
            <YStack gap="$2">
              <H3>Dark Theme Container</H3>
              <Text variant="muted">Container automatically adapts to the dark theme background</Text>
            </YStack>
          </Container>
        </View>
      </YStack>
      
      <YStack>
        <Text variant="muted" marginBottom="$2">Light Theme:</Text>
        <View theme="light" backgroundColor="$background" borderRadius="$3" overflow="hidden">
          <Container height={150} padded>
            <YStack gap="$2">
              <H3>Light Theme Container</H3>
              <Text variant="muted">Same container in light theme with appropriate background</Text>
            </YStack>
          </Container>
        </View>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Container appearance in different themes, showing automatic background color adaptation.',
      },
    },
  },
};
