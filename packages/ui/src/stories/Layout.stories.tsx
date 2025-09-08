import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from '../Layout';
import { Text } from '../Typography';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'Layout padding',
    },
    margin: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5', '$6'],
      description: 'Layout margin',
    },
    backgroundColor: {
      control: 'text',
      description: 'Background color',
    },
    height: {
      control: 'text',
      description: 'Layout height',
    },
    width: {
      control: 'text',
      description: 'Layout width',
    },
    borderRadius: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5'],
      description: 'Border radius',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Text>Basic Layout component</Text>
    ),
  },
};

export const WithPadding: Story = {
  args: {
    padding: '$4',
    backgroundColor: '$gray2',
    children: (
      <Text>Layout with padding</Text>
    ),
  },
};

export const ColoredBackground: Story = {
  args: {
    backgroundColor: '$blue3',
    padding: '$3',
    borderRadius: '$3',
    children: (
      <Text color="$blue11">Layout with blue background and border radius</Text>
    ),
  },
};

export const CenteredContent: Story = {
  args: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    backgroundColor: '$purple2',
    borderRadius: '$4',
    children: (
      <Text color="$purple11" fontSize="$5">Centered Content</Text>
    ),
  },
};

export const FlexLayout: Story = {
  args: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '$4',
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

export const CardLike: Story = {
  args: {
    backgroundColor: 'white',
    padding: '$4',
    borderRadius: '$4',
    shadowColor: '$shadowColor',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Text fontSize="$6" fontWeight="bold">Card Title</Text>
        <Text color="$gray11">This layout looks like a card with shadow effects</Text>
      </div>
    ),
  },
};

export const ResponsiveLayout: Story = {
  args: {
    width: '100%',
    maxWidth: 600,
    padding: '$3',
    backgroundColor: '$orange2',
    borderRadius: '$2',
    children: (
      <Text color="$orange11">Responsive layout with max-width constraint</Text>
    ),
  },
};