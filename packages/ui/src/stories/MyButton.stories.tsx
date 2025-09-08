import type { Meta, StoryObj } from '@storybook/react';

import { MyButton } from '../MyButton';

const meta: Meta<typeof MyButton> = {
  title: 'Components/MyButton',
  component: MyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button text content',
    },
    theme: {
      control: 'select',
      options: ['blue', 'red', 'green', 'purple', 'orange'],
      description: 'Button theme color',
    },
    size: {
      control: 'select',
      options: ['$1', '$2', '$3', '$4', '$5'],
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

export const Blue: Story = {
  args: {
    children: 'Blue Button',
    theme: 'blue',
  },
};

export const Red: Story = {
  args: {
    children: 'Red Button',
    theme: 'red',
  },
};

export const Green: Story = {
  args: {
    children: 'Green Button',
    theme: 'green',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: '$5',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: '$2',
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