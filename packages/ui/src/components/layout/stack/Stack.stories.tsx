import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, View } from 'tamagui';

import { Text, H3 } from '../../general';

import { HStack, Stack } from '.';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Stack Components

Flexible layout components for organizing content vertically (Stack) and horizontally (HStack).

## Features
- **Variant System**: Spacing, padding, centering, and distribution options
- **Theme Integration**: Consistent spacing using design tokens
- **Flexible Layout**: Support for various alignment and distribution patterns
- **Nested Support**: Easy composition for complex layouts

## Variants
- **spacing**: none, sm, md, lg, xl
- **padded**: sm, true, lg
- **centered**: Centers content
- **distribution** (HStack): spaceBetween, spaceAround, spaceEvenly
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing between children',
    },
    padded: {
      control: 'select',
      options: [false, 'sm', true, 'lg'],
      description: 'Padding around content',
    },
    centered: {
      control: 'boolean',
      description: 'Center align content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack>
      <Text>First item</Text>
      <Text>Second item</Text>
      <Text>Third item</Text>
    </Stack>
  ),
};

export const SpacingVariants: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      <YStack gap="$2">
        <Text variant="muted">Spacing: none</Text>
        <View backgroundColor="$muted" padding="$3" borderRadius="$2">
          <Stack spacing="none">
            <Text>No spacing</Text>
            <Text>Between items</Text>
            <Text>At all</Text>
          </Stack>
        </View>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Spacing: small</Text>
        <View backgroundColor="$muted" padding="$3" borderRadius="$2">
          <Stack spacing="sm">
            <Text>Small spacing</Text>
            <Text>Between items</Text>
            <Text>Looks tight</Text>
          </Stack>
        </View>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Spacing: medium (default)</Text>
        <View backgroundColor="$muted" padding="$3" borderRadius="$2">
          <Stack spacing="md">
            <Text>Medium spacing</Text>
            <Text>Between items</Text>
            <Text>Good default</Text>
          </Stack>
        </View>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Spacing: large</Text>
        <View backgroundColor="$muted" padding="$3" borderRadius="$2">
          <Stack spacing="lg">
            <Text>Large spacing</Text>
            <Text>Between items</Text>
            <Text>More breathing room</Text>
          </Stack>
        </View>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different spacing variants showing the gap between stack items.',
      },
    },
  },
};

export const PaddingAndCentering: Story = {
  render: () => (
    <YStack gap="$4">
      <YStack gap="$2">
        <Text variant="muted">Centered with padding:</Text>
        <Stack centered padded backgroundColor="$accent" borderRadius="$3" height={120}>
          <H3>Centered Title</H3>
          <Text variant="muted">This content is centered</Text>
        </Stack>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Large padding:</Text>
        <Stack padded="lg" backgroundColor="$secondary" borderRadius="$3">
          <Text>Content with</Text>
          <Text>large padding</Text>
        </Stack>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack with different padding options and centering.',
      },
    },
  },
};

export const NestedStacks: Story = {
  render: () => (
    <Stack spacing="lg" padded backgroundColor="$card" borderRadius="$3">
      <H3>Nested Stack Layout</H3>
      
      <Stack spacing="sm" padded backgroundColor="$muted" borderRadius="$2">
        <Text variant="success">✓ Completed tasks</Text>
        <Text>Review design mockups</Text>
        <Text>Update documentation</Text>
        <Text>Test component library</Text>
      </Stack>
      
      <HStack spacing="md" padded backgroundColor="$accent" borderRadius="$2">
        <Text variant="warning">⚠</Text>
        <Stack spacing="none">
          <Text fontWeight="$2">Pending Review</Text>
          <Text variant="muted" fontSize="$3">Awaiting approval</Text>
        </Stack>
      </HStack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of nested Stack and HStack components for complex layouts.',
      },
    },
  },
};

// HStack Stories
export const HStackDefault: Story = {
  render: () => (
    <HStack>
      <Text>Item 1</Text>
      <Text>Item 2</Text>
      <Text>Item 3</Text>
    </HStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal stack with default medium spacing.',
      },
    },
  },
};

export const HStackDistribution: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      <YStack gap="$2">
        <Text variant="muted">Distribution: Space Between</Text>
        <HStack distribution="spaceBetween" fullWidth padded backgroundColor="$muted" borderRadius="$2">
          <Text>Left</Text>
          <Text>Center</Text>
          <Text>Right</Text>
        </HStack>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Distribution: Space Around</Text>
        <HStack distribution="spaceAround" fullWidth padded backgroundColor="$muted" borderRadius="$2">
          <Text>A</Text>
          <Text>B</Text>
          <Text>C</Text>
        </HStack>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Distribution: Space Evenly</Text>
        <HStack distribution="spaceEvenly" fullWidth padded backgroundColor="$muted" borderRadius="$2">
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </HStack>
      </YStack>
      
      <YStack gap="$2">
        <Text variant="muted">Centered</Text>
        <HStack centered fullWidth padded backgroundColor="$muted" borderRadius="$2">
          <Text>Centered</Text>
          <Text>Content</Text>
        </HStack>
      </YStack>
    </YStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different distribution options for horizontal stacks.',
      },
    },
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <Stack spacing="lg" padded backgroundColor="$card" borderRadius="$3">
      <H3>Dashboard Layout</H3>
      
      {/* Header row */}
      <HStack distribution="spaceBetween" fullWidth>
        <Text fontWeight="$2">Project Status</Text>
        <Text variant="muted" fontSize="$3">Last updated 2 min ago</Text>
      </HStack>
      
      {/* Stats row */}
      <HStack spacing="md" fullWidth>
        <Stack centered padded="sm" backgroundColor="$primary" borderRadius="$2" flex={1}>
          <Text color="$primaryForeground" fontWeight="$3">24</Text>
          <Text color="$primaryForeground" fontSize="$3">Active</Text>
        </Stack>
        <Stack centered padded="sm" backgroundColor="$secondary" borderRadius="$2" flex={1}>
          <Text color="$secondaryForeground" fontWeight="$3">8</Text>
          <Text color="$secondaryForeground" fontSize="$3">Pending</Text>
        </Stack>
        <Stack centered padded="sm" backgroundColor="$accent" borderRadius="$2" flex={1}>
          <Text fontWeight="$3">156</Text>
          <Text fontSize="$3">Total</Text>
        </Stack>
      </HStack>
      
      {/* Actions row */}
      <HStack spacing="sm">
        <View backgroundColor="$success" paddingHorizontal="$3" paddingVertical="$2" borderRadius="$2">
          <Text color="$background" fontSize="$3" fontWeight="$2">✓ Approve</Text>
        </View>
        <View backgroundColor="$destructive" paddingHorizontal="$3" paddingVertical="$2" borderRadius="$2">
          <Text color="$destructiveForeground" fontSize="$3" fontWeight="$2">✗ Reject</Text>
        </View>
      </HStack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex dashboard layout using nested Stack and HStack components.',
      },
    },
  },
};
