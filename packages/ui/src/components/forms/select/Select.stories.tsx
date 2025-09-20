import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, Text } from 'tamagui';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown selection component built with Tamagui Select. Supports different sizes, variants, and responsive behavior with Sheet on mobile devices.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the select input',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the select input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when no option is selected',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample data for stories
const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
];

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
  { label: 'Archived', value: 'archived', disabled: true },
];

// Basic usage story
export const Default: Story = {
  args: {
    items: fruits,
    placeholder: 'Choose a fruit...',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" minWidth={300}>
      <YStack space="$2">
        <Text fontWeight="500">Small</Text>
        <Select size="sm" items={fruits} placeholder="Small select..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Medium (Default)</Text>
        <Select size="md" items={fruits} placeholder="Medium select..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Large</Text>
        <Select size="lg" items={fruits} placeholder="Large select..." />
      </YStack>
    </YStack>
  ),
};

// Visual variants
export const Variants: Story = {
  render: () => (
    <YStack space="$4" minWidth={300}>
      <YStack space="$2">
        <Text fontWeight="500">Default</Text>
        <Select variant="default" items={fruits} placeholder="Default select..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" color="$destructive">Error</Text>
        <Select variant="error" items={fruits} placeholder="Error select..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" color="$success">Success</Text>
        <Select variant="success" items={fruits} placeholder="Success select..." />
      </YStack>
    </YStack>
  ),
};

// States
export const States: Story = {
  render: () => (
    <YStack space="$4" minWidth={300}>
      <YStack space="$2">
        <Text fontWeight="500">Enabled</Text>
        <Select items={countries} placeholder="Select a country..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" opacity={0.5}>Disabled</Text>
        <Select
          items={countries}
          placeholder="Select a country..."
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">With disabled options</Text>
        <Select
          items={statusOptions}
          placeholder="Select status..."
        />
      </YStack>
    </YStack>
  ),
};

// Long list example
export const LongList: Story = {
  render: () => (
    <YStack space="$2" minWidth={300}>
      <Text fontWeight="500">Long list with scroll</Text>
      <Select
        items={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
          { label: 'Option 4', value: '4' },
          { label: 'Option 5', value: '5' },
          { label: 'Option 6', value: '6' },
          { label: 'Option 7', value: '7' },
          { label: 'Option 8', value: '8' },
          { label: 'Option 9', value: '9' },
          { label: 'Option 10', value: '10' },
          { label: 'Option 11', value: '11' },
          { label: 'Option 12', value: '12' },
          { label: 'Option 13', value: '13' },
          { label: 'Option 14', value: '14' },
          { label: 'Option 15', value: '15' },
        ]}
        placeholder="Select from many options..."
      />
    </YStack>
  ),
};

// Pre-selected value
export const WithDefaultValue: Story = {
  render: () => (
    <YStack space="$2" minWidth={300}>
      <Text fontWeight="500">With default selection</Text>
      <Select
        items={fruits}
        placeholder="Choose a fruit..."
        defaultValue="banana"
      />
    </YStack>
  ),
};

// Form integration example
export const FormIntegration: Story = {
  render: () => (
    <YStack space="$4" minWidth={300}>
      <Text fontSize="$6" fontWeight="600">User Profile Form</Text>

      <YStack space="$2">
        <Text fontWeight="500">Country</Text>
        <Select
          items={countries}
          placeholder="Select your country..."
        />
      </YStack>

      <YStack space="$2">
        <Text fontWeight="500">Status</Text>
        <Select
          items={statusOptions}
          placeholder="Select status..."
          variant="default"
        />
      </YStack>

      <YStack space="$2">
        <Text fontWeight="500">Favorite Fruit</Text>
        <Select
          size="lg"
          items={fruits}
          placeholder="What's your favorite fruit?"
        />
      </YStack>
    </YStack>
  ),
};