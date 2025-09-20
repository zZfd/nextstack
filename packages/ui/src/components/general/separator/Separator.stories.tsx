import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Separator, SeparatorProps } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'General/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    thickness: {
      control: { type: 'select' },
      options: ['thin', 'medium', 'thick'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'strong'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    thickness: 'thin',
    variant: 'default',
  },
  render: (args: SeparatorProps) => (
    <div style={{ width: '200px', padding: '20px' }}>
      <div style={{ marginBottom: '10px' }}>Content above</div>
      <Separator {...args} />
      <div style={{ marginTop: '10px' }}>Content below</div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Thin</h3>
        <Separator orientation='horizontal' thickness='thin' />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Medium</h3>
        <Separator orientation='horizontal' thickness='medium' />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Thick</h3>
        <Separator orientation='horizontal' thickness='thick' />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        height: '100px',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px' }}>Thin</div>
        <Separator orientation='vertical' thickness='thin' />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px' }}>Medium</div>
        <Separator orientation='vertical' thickness='medium' />
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px' }}>Thick</div>
        <Separator orientation='vertical' thickness='thick' />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Default</h3>
        <Separator variant='default' />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Muted</h3>
        <Separator variant='muted' />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Strong</h3>
        <Separator variant='strong' />
      </div>
    </div>
  ),
};

export const InNavigation: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
      }}
    >
      <span style={{ fontSize: '14px' }}>Home</span>
      <Separator orientation='vertical' thickness='thin' />
      <span style={{ fontSize: '14px' }}>About</span>
      <Separator orientation='vertical' thickness='thin' />
      <span style={{ fontSize: '14px' }}>Contact</span>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', padding: '20px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>Article Title</h2>
      <p style={{ margin: '0 0 16px 0', lineHeight: '1.5' }}>
        This is the first paragraph of the article. It contains some
        introductory content.
      </p>

      <Separator
        variant='muted'
        thickness='medium'
        style={{ margin: '24px 0' }}
      />

      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>
        Section Heading
      </h3>
      <p style={{ margin: '0', lineHeight: '1.5' }}>
        This is the second section of the article with more detailed content.
      </p>
    </div>
  ),
};
