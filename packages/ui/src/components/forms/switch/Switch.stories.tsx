import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, XStack, Text } from 'tamagui';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component built with Tamagui Switch. Features smooth thumb animation and supports labels, descriptions, different sizes, and variants.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the switch',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the switch',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the switch is disabled',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the switch is checked',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the switch',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text shown below the label',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic usage story
export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

// Without label (just switch)
export const WithoutLabel: Story = {
  args: {
    checked: true,
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch (default)" />
      <Switch size="lg" label="Large switch" />
    </YStack>
  ),
};

// Visual variants
export const Variants: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <Switch
        variant="default"
        label="Default variant"
        checked
      />
      <Switch
        variant="error"
        label="Error variant"
        checked
      />
      <Switch
        variant="success"
        label="Success variant"
        checked
      />
    </YStack>
  ),
};

// States
export const States: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <Switch label="Unchecked" />
      <Switch label="Checked" checked />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled checked />
    </YStack>
  ),
};

// With descriptions
export const WithDescriptions: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" maxWidth={400}>
      <Switch
        label="Email notifications"
        description="Receive email updates about your account activity"
      />
      <Switch
        label="Push notifications"
        description="Get instant notifications on your device"
        checked
      />
      <Switch
        label="Marketing emails"
        description="Promotional emails about new features and offers"
        variant="error"
      />
    </YStack>
  ),
};

// Settings form example
export const SettingsForm: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" maxWidth={450}>
      <Text fontSize="$6" fontWeight="600">Account Settings</Text>

      <YStack space="$3">
        <Switch
          label="Two-factor authentication"
          description="Add an extra layer of security to your account"
          checked
          variant="success"
        />
        <Switch
          label="Email notifications"
          description="Receive important updates via email"
          checked
        />
        <Switch
          label="SMS notifications"
          description="Get text messages for critical alerts"
        />
        <Switch
          label="Marketing communications"
          description="Receive promotional emails and updates"
        />
        <Switch
          label="Data analytics"
          description="Help improve our service by sharing usage data"
          variant="error"
        />
      </YStack>
    </YStack>
  ),
};

// Privacy settings example
export const PrivacySettings: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" maxWidth={500}>
      <Text fontSize="$5" fontWeight="600">Privacy & Security</Text>

      <YStack space="$3">
        <Switch
          label="Profile visibility"
          description="Make your profile visible to other users"
          checked
          size="lg"
        />
        <Switch
          label="Activity status"
          description="Show when you're online or active"
          checked
          size="lg"
        />
        <Switch
          label="Read receipts"
          description="Let others know when you've read their messages"
          size="lg"
        />
        <Switch
          label="Location sharing"
          description="Share your location with trusted contacts"
          disabled
          size="lg"
        />
      </YStack>
    </YStack>
  ),
};

// Compact layout
export const CompactLayout: Story = {
  render: () => (
    <YStack space="$3" alignItems="flex-start">
      <Text fontSize="$4" fontWeight="600">Quick Settings</Text>

      <XStack space="$6" flexWrap="wrap">
        <Switch size="sm" label="WiFi" checked />
        <Switch size="sm" label="Bluetooth" checked />
        <Switch size="sm" label="Location" />
        <Switch size="sm" label="Airplane" disabled />
      </XStack>
    </YStack>
  ),
};

// Feature toggles
export const FeatureToggles: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" maxWidth={450}>
      <Text fontSize="$5" fontWeight="600">Feature Flags</Text>

      <YStack space="$3">
        <Switch
          label="Beta features"
          description="Enable experimental features and early access"
          variant="success"
          checked
        />
        <Switch
          label="Advanced mode"
          description="Show additional options and settings"
          checked
        />
        <Switch
          label="Debug mode"
          description="Display debug information and logs"
          variant="error"
        />
        <Switch
          label="Performance monitoring"
          description="Track app performance and usage metrics"
        />
      </YStack>
    </YStack>
  ),
};