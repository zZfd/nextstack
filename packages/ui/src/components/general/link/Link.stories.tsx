import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'General/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'underline', 'button'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    external: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
    variant: 'default',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Link href="#" variant="default">
        Default Link
      </Link>
      <Link href="#" variant="muted">
        Muted Link
      </Link>
      <Link href="#" variant="underline">
        Underlined Link
      </Link>
      <Link href="#" variant="button">
        Button Link
      </Link>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Link href="#" size="sm">
        Small Link
      </Link>
      <Link href="#" size="md">
        Medium Link
      </Link>
      <Link href="#" size="lg">
        Large Link
      </Link>
    </div>
  ),
};

export const External: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer" external>
        External Link (opens in new tab)
      </Link>
      <Link href="https://tamagui.dev" target="_blank" rel="noopener noreferrer" variant="button" external>
        Visit Tamagui
      </Link>
    </div>
  ),
};

export const InParagraph: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', lineHeight: '1.6' }}>
      <p style={{ margin: 0 }}>
        This is a paragraph with an{' '}
        <Link href="#" variant="default">
          inline link
        </Link>{' '}
        that flows naturally with the text. You can also have{' '}
        <Link href="#" variant="underline">
          underlined links
        </Link>{' '}
        or even{' '}
        <Link href="#" variant="muted">
          muted links
        </Link>{' '}
        depending on the context.
      </p>
    </div>
  ),
};

export const Navigation: Story = {
  render: () => (
    <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Link href="#" variant="default">
        Home
      </Link>
      <Link href="#" variant="default">
        About
      </Link>
      <Link href="#" variant="default">
        Services
      </Link>
      <Link href="#" variant="default">
        Contact
      </Link>
      <Link href="#" variant="button">
        Get Started
      </Link>
    </nav>
  ),
};

export const ButtonVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Link href="#" variant="button" size="sm">
        Small Button
      </Link>
      <Link href="#" variant="button" size="md">
        Medium Button
      </Link>
      <Link href="#" variant="button" size="lg">
        Large Button
      </Link>
    </div>
  ),
};