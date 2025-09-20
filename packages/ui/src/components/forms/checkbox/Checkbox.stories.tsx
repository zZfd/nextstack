import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, XStack, Text } from 'tamagui';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox input component built with Tamagui Checkbox. Supports labels, descriptions, different sizes, variants, and indeterminate state.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the checkbox',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in an indeterminate state',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the checkbox',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text shown below the label',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic usage story
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Without label (just checkbox)
export const WithoutLabel: Story = {
  args: {
    checked: true,
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </YStack>
  ),
};

// Visual variants
export const Variants: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <Checkbox
        variant="default"
        label="Default variant"
        checked
      />
      <Checkbox
        variant="error"
        label="Error variant"
        checked
      />
      <Checkbox
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
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled checked />
      <Checkbox label="Disabled indeterminate" disabled indeterminate />
    </YStack>
  ),
};

// With descriptions
export const WithDescriptions: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" maxWidth={400}>
      <Checkbox
        label="Marketing emails"
        description="Receive promotional emails about new features and updates"
      />
      <Checkbox
        label="Security notifications"
        description="Get notified about important security updates and login activities"
        checked
      />
      <Checkbox
        label="Product updates"
        description="Be the first to know about new product releases and improvements"
        indeterminate
      />
    </YStack>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" maxWidth={450}>
      <Text fontSize="$6" fontWeight="600">Privacy Settings</Text>

      <YStack space="$3">
        <Checkbox
          label="Essential cookies"
          description="Required for the website to function properly"
          checked
          disabled
        />
        <Checkbox
          label="Analytics cookies"
          description="Help us understand how you use our website"
          checked
        />
        <Checkbox
          label="Marketing cookies"
          description="Used to personalize ads and track marketing performance"
        />
        <Checkbox
          label="Third-party cookies"
          description="Allow embedded content from external services"
          variant="error"
        />
      </YStack>
    </YStack>
  ),
};

// Grouped checkboxes
export const GroupedCheckboxes: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" maxWidth={400}>
      <Text fontSize="$5" fontWeight="600">Select your interests</Text>

      <YStack space="$3">
        <Checkbox label="Technology" checked />
        <Checkbox label="Design" checked />
        <Checkbox label="Business" />
        <Checkbox label="Science" indeterminate />
        <Checkbox label="Sports" />
        <Checkbox label="Entertainment" />
      </YStack>
    </YStack>
  ),
};

// Different sizes with labels
export const SizesWithLabels: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <YStack space="$2">
        <Text fontWeight="500">Small</Text>
        <Checkbox
          size="sm"
          label="Small checkbox with label"
          description="Compact size for dense layouts"
        />
      </YStack>

      <YStack space="$2">
        <Text fontWeight="500">Medium (Default)</Text>
        <Checkbox
          size="md"
          label="Medium checkbox with label"
          description="Standard size for most use cases"
        />
      </YStack>

      <YStack space="$2">
        <Text fontWeight="500">Large</Text>
        <Checkbox
          size="lg"
          label="Large checkbox with label"
          description="Larger size for better accessibility"
        />
      </YStack>
    </YStack>
  ),
};

// Grid layout example
export const GridLayout: Story = {
  render: () => (
    <YStack space="$4" maxWidth={600}>
      <Text fontSize="$5" fontWeight="600">Select all that apply</Text>

      <YStack space="$3">
        <XStack space="$6" flexWrap="wrap">
          <Checkbox label="JavaScript" checked />
          <Checkbox label="TypeScript" checked />
          <Checkbox label="React" checked />
        </XStack>
        <XStack space="$6" flexWrap="wrap">
          <Checkbox label="Vue" />
          <Checkbox label="Angular" />
          <Checkbox label="Svelte" />
        </XStack>
        <XStack space="$6" flexWrap="wrap">
          <Checkbox label="Node.js" checked />
          <Checkbox label="Python" />
          <Checkbox label="Go" />
        </XStack>
      </YStack>
    </YStack>
  ),
};