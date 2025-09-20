import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'General/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'primary',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size='sm' />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size='md' />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size='lg' />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Large</div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant='primary' />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Primary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant='secondary' />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Secondary</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant='muted' />
        <div style={{ marginTop: '8px', fontSize: '12px' }}>Muted</div>
      </div>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <Spinner size='lg' variant='primary' />
      <div style={{ fontSize: '14px', color: '#666' }}>Loading...</div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      >
        <Spinner size='sm' variant='primary' />
        Loading...
      </button>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      >
        <Spinner size='sm' variant='secondary' />
        Processing...
      </button>
    </div>
  ),
};
