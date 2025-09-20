import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, Text } from 'tamagui';

import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button group component built with Tamagui RadioGroup. Allows single selection from multiple options with support for different sizes, variants, and orientations.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the radio buttons',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the radio buttons',
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'The layout orientation of the radio group',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the entire radio group is disabled',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the radio group',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text shown below the label',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Sample data for stories
const paymentMethods = [
  { label: 'Credit Card', value: 'credit', description: 'Pay with Visa, Mastercard, or Amex' },
  { label: 'PayPal', value: 'paypal', description: 'Secure payment through PayPal' },
  { label: 'Bank Transfer', value: 'bank', description: 'Direct bank account transfer' },
  { label: 'Cryptocurrency', value: 'crypto', description: 'Pay with Bitcoin or Ethereum', disabled: true },
];

const themes = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'System', value: 'system' },
];

const priorities = [
  { label: 'Low', value: 'low', description: 'Minor issues, low impact' },
  { label: 'Medium', value: 'medium', description: 'Standard priority issues' },
  { label: 'High', value: 'high', description: 'Important issues requiring attention' },
  { label: 'Critical', value: 'critical', description: 'Urgent issues affecting operations' },
];

const plans = [
  { label: 'Free', value: 'free', description: 'Basic features for individuals' },
  { label: 'Pro', value: 'pro', description: 'Advanced features for professionals' },
  { label: 'Team', value: 'team', description: 'Collaboration tools for teams' },
  { label: 'Enterprise', value: 'enterprise', description: 'Full-featured plan for organizations' },
];

// Basic usage story
export const Default: Story = {
  args: {
    items: themes,
    label: 'Choose theme',
    defaultValue: 'system',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start">
      <YStack space="$2">
        <Text fontWeight="500">Small</Text>
        <RadioGroup
          size="sm"
          items={themes}
          defaultValue="dark"
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Medium (Default)</Text>
        <RadioGroup
          size="md"
          items={themes}
          defaultValue="dark"
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Large</Text>
        <RadioGroup
          size="lg"
          items={themes}
          defaultValue="dark"
        />
      </YStack>
    </YStack>
  ),
};

// Visual variants
export const Variants: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start">
      <YStack space="$2">
        <Text fontWeight="500">Default</Text>
        <RadioGroup
          variant="default"
          items={themes}
          defaultValue="system"
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" color="$destructive">Error</Text>
        <RadioGroup
          variant="error"
          items={themes}
          defaultValue="system"
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" color="$success">Success</Text>
        <RadioGroup
          variant="success"
          items={themes}
          defaultValue="system"
        />
      </YStack>
    </YStack>
  ),
};

// Orientation variants
export const Orientations: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start">
      <YStack space="$2">
        <Text fontWeight="500">Vertical (Default)</Text>
        <RadioGroup
          orientation="vertical"
          items={themes}
          defaultValue="dark"
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Horizontal</Text>
        <RadioGroup
          orientation="horizontal"
          items={themes}
          defaultValue="dark"
        />
      </YStack>
    </YStack>
  ),
};

// With descriptions
export const WithDescriptions: Story = {
  render: () => (
    <YStack space="$2" alignItems="flex-start" maxWidth={400}>
      <RadioGroup
        items={paymentMethods}
        label="Payment Method"
        description="Choose how you'd like to pay for your order"
        defaultValue="credit"
      />
    </YStack>
  ),
};

// States
export const States: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start">
      <YStack space="$2">
        <Text fontWeight="500">Enabled</Text>
        <RadioGroup
          items={themes}
          label="Theme preference"
          defaultValue="system"
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" opacity={0.5}>Disabled</Text>
        <RadioGroup
          items={themes}
          label="Theme preference"
          defaultValue="system"
          disabled
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">With disabled options</Text>
        <RadioGroup
          items={paymentMethods}
          label="Payment method"
          defaultValue="credit"
        />
      </YStack>
    </YStack>
  ),
};

// Priority selector example
export const PrioritySelector: Story = {
  render: () => (
    <YStack space="$2" alignItems="flex-start" maxWidth={450}>
      <RadioGroup
        items={priorities}
        label="Issue Priority"
        description="Select the priority level for this support ticket"
        defaultValue="medium"
        variant="default"
      />
    </YStack>
  ),
};

// Pricing plans example
export const PricingPlans: Story = {
  render: () => (
    <YStack space="$2" alignItems="flex-start" maxWidth={500}>
      <RadioGroup
        items={plans}
        label="Choose your plan"
        description="Select the plan that best fits your needs"
        defaultValue="pro"
        size="lg"
      />
    </YStack>
  ),
};

// Horizontal compact layout
export const HorizontalCompact: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start">
      <YStack space="$2">
        <Text fontWeight="500">Theme Selection</Text>
        <RadioGroup
          orientation="horizontal"
          items={themes}
          defaultValue="system"
          size="sm"
        />
      </YStack>

      <YStack space="$2">
        <Text fontWeight="500">Quick Priority</Text>
        <RadioGroup
          orientation="horizontal"
          items={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
          defaultValue="medium"
          size="sm"
        />
      </YStack>
    </YStack>
  ),
};

// Form integration example
export const FormIntegration: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" maxWidth={500}>
      <Text fontSize="$6" fontWeight="600">Account Settings</Text>

      <RadioGroup
        items={themes}
        label="Interface Theme"
        description="Choose your preferred color scheme"
        defaultValue="system"
      />

      <RadioGroup
        items={[
          { label: 'Public', value: 'public', description: 'Anyone can view your profile' },
          { label: 'Friends', value: 'friends', description: 'Only friends can view your profile' },
          { label: 'Private', value: 'private', description: 'Only you can view your profile' },
        ]}
        label="Profile Visibility"
        description="Control who can see your profile information"
        defaultValue="friends"
      />

      <RadioGroup
        items={[
          { label: 'Immediately', value: 'immediate' },
          { label: 'Daily digest', value: 'daily' },
          { label: 'Weekly summary', value: 'weekly' },
          { label: 'Never', value: 'never' },
        ]}
        label="Email Notifications"
        description="How often would you like to receive email updates?"
        defaultValue="daily"
        orientation="horizontal"
        size="sm"
      />
    </YStack>
  ),
};