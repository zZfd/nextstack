import type { Meta, StoryObj } from '@storybook/react';

import { Stack, HStack } from '../Stack';
import { Text } from '../Typography';

// Vertical Stack Stories
const stackMeta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    space: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'Space between children',
    },
    padding: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'Stack padding',
    },
    backgroundColor: {
      control: 'text',
      description: 'Background color',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch'],
      description: 'Align items',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content',
    },
  },
};

export default stackMeta;
type StackStory = StoryObj<typeof stackMeta>;

export const DefaultStack: StackStory = {
  args: {
    space: '$2',
    children: (
      <>
        <Text>First item</Text>
        <Text>Second item</Text>
        <Text>Third item</Text>
      </>
    ),
  },
};

export const WithSpacing: StackStory = {
  args: {
    space: '$4',
    padding: '$3',
    backgroundColor: '$gray2',
    children: (
      <>
        <Text>Item with large spacing</Text>
        <Text>Another item</Text>
        <Text>Third item</Text>
        <Text>Fourth item</Text>
      </>
    ),
  },
};

export const CenteredStack: StackStory = {
  args: {
    space: '$3',
    alignItems: 'center',
    padding: '$4',
    backgroundColor: '$blue2',
    children: (
      <>
        <Text color="$blue11">Centered item 1</Text>
        <Text color="$blue11">Centered item 2</Text>
        <Text color="$blue11">Centered item 3</Text>
      </>
    ),
  },
};

export const StackWithMixedContent: StackStory = {
  args: {
    space: '$3',
    padding: '$4',
    backgroundColor: '$purple1',
    children: (
      <>
        <Text fontSize="$6" fontWeight="bold" color="$purple11">Title</Text>
        <Text color="$purple10">Subtitle</Text>
        <Text fontSize="$3" color="$purple9">Small description text</Text>
      </>
    ),
  },
};

// Horizontal Stack Stories
const hstackMeta: Meta<typeof HStack> = {
  title: 'Layout/HStack',
  component: HStack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    space: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'Space between children',
    },
    padding: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'HStack padding',
    },
    backgroundColor: {
      control: 'text',
      description: 'Background color',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch'],
      description: 'Align items',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content',
    },
  },
};

export const DefaultHStack: StoryObj<typeof HStack> = {
  args: {
    space: '$2',
    children: (
      <>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </>
    ),
  },
};

export const HStackSpaceBetween: StoryObj<typeof HStack> = {
  args: {
    justifyContent: 'space-between',
    width: 300,
    padding: '$3',
    backgroundColor: '$green2',
    children: (
      <>
        <Text color="$green11">Left</Text>
        <Text color="$green11">Center</Text>
        <Text color="$green11">Right</Text>
      </>
    ),
  },
};

export const HStackCentered: StoryObj<typeof HStack> = {
  args: {
    space: '$3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '$4',
    backgroundColor: '$orange2',
    children: (
      <>
        <Text color="$orange11">Centered</Text>
        <Text color="$orange11">Items</Text>
      </>
    ),
  },
};

export const NestedStacks: StoryObj = {
  render: () => (
    <Stack space="$4" padding="$4" backgroundColor="$gray1">
      <Text fontSize="$6" fontWeight="bold">Nested Stacks Example</Text>
      
      <Stack space="$2" padding="$3" backgroundColor="$blue2">
        <Text color="$blue11" fontWeight="bold">Vertical Stack</Text>
        <Text color="$blue10">Item 1</Text>
        <Text color="$blue10">Item 2</Text>
      </Stack>
      
      <HStack space="$3" padding="$3" backgroundColor="$green2" justifyContent="center">
        <Text color="$green11" fontWeight="bold">Horizontal:</Text>
        <Text color="$green10">A</Text>
        <Text color="$green10">B</Text>
        <Text color="$green10">C</Text>
      </HStack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing how Stack and HStack can be nested together.',
      },
    },
  },
};

// Export HStack meta
export const HStackMeta = hstackMeta;