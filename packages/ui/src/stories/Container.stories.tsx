import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../Container';
import { Text } from '../Typography';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'Container padding',
    },
    margin: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'Container margin',
    },
    backgroundColor: {
      control: 'text',
      description: 'Background color',
    },
    height: {
      control: 'text',
      description: 'Container height',
    },
    width: {
      control: 'text',
      description: 'Container width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Text>This is content inside a Container component</Text>
    ),
  },
};

export const WithPadding: Story = {
  args: {
    padding: '$4',
    backgroundColor: '$gray2',
    children: (
      <Text>Container with padding</Text>
    ),
  },
};

export const WithBackgroundColor: Story = {
  args: {
    backgroundColor: '$blue2',
    padding: '$3',
    children: (
      <Text color="$blue11">Container with blue background</Text>
    ),
  },
};

export const ScrollableContent: Story = {
  args: {
    height: 300,
    backgroundColor: '$gray1',
    padding: '$3',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <Text key={i}>Scrollable content item {i + 1}</Text>
        ))}
      </div>
    ),
  },
};

export const FixedDimensions: Story = {
  args: {
    width: 400,
    height: 200,
    backgroundColor: '$purple2',
    padding: '$3',
    children: (
      <Text color="$purple11">Fixed size container (400x200)</Text>
    ),
  },
};

export const MultipleChildren: Story = {
  args: {
    padding: '$4',
    backgroundColor: '$green1',
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Text fontSize="$6" fontWeight="bold" color="$green11">
          Multiple Children
        </Text>
        <Text color="$green10">
          This container holds multiple text elements
        </Text>
        <Text color="$green9" fontSize="$3">
          With different styles and colors
        </Text>
      </div>
    ),
  },
};