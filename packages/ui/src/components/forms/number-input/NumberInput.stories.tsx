import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, Text } from 'tamagui';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Forms/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A numeric input component with increment/decrement steppers. Built on top of the Input component with enhanced number handling and validation.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the number input',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the number input',
    },
    showSteppers: {
      control: { type: 'boolean' },
      description: 'Whether to show the increment/decrement buttons',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the number input is disabled',
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value',
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment for buttons',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the number input',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text shown below the input',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

// Basic usage story
export const Default: Story = {
  args: {
    defaultValue: 10,
    label: 'Quantity',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={200}>
      <YStack space="$2">
        <Text fontWeight="500">Small</Text>
        <NumberInput size="sm" defaultValue={5} />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Medium (Default)</Text>
        <NumberInput size="md" defaultValue={10} />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Large</Text>
        <NumberInput size="lg" defaultValue={15} />
      </YStack>
    </YStack>
  ),
};

// With and without steppers
export const StepperVariants: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={250}>
      <YStack space="$2">
        <Text fontWeight="500">With Steppers (Default)</Text>
        <NumberInput
          defaultValue={100}
          showSteppers
          label="Price"
          formatValue={(val) => `$${val}`}
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Without Steppers</Text>
        <NumberInput
          defaultValue={50}
          showSteppers={false}
          label="Amount"
        />
      </YStack>
    </YStack>
  ),
};

// Different ranges and steps
export const RangesAndSteps: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={300}>
      <NumberInput
        label="Age"
        description="Must be between 18 and 100"
        defaultValue={25}
        min={18}
        max={100}
        step={1}
      />
      
      <NumberInput
        label="Price"
        description="Increments of $5.00"
        defaultValue={25}
        min={0}
        max={1000}
        step={5}
        formatValue={(val) => `$${val.toFixed(2)}`}
      />
      
      <NumberInput
        label="Rating"
        description="0.0 to 5.0 stars"
        defaultValue={3.5}
        min={0}
        max={5}
        step={0.1}
        precision={1}
        formatValue={(val) => `★ ${val.toFixed(1)}`}
      />
    </YStack>
  ),
};

// States
export const States: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={250}>
      <YStack space="$2">
        <Text fontWeight="500">Enabled</Text>
        <NumberInput defaultValue={42} label="Normal" />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" opacity={0.5}>Disabled</Text>
        <NumberInput defaultValue={42} label="Disabled" disabled />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">At Minimum</Text>
        <NumberInput
          defaultValue={0}
          min={0}
          max={100}
          label="Can't go lower"
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">At Maximum</Text>
        <NumberInput
          defaultValue={100}
          min={0}
          max={100}
          label="Can't go higher"
        />
      </YStack>
    </YStack>
  ),
};

// Visual variants
export const Variants: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={250}>
      <NumberInput
        variant="default"
        defaultValue={50}
        label="Default"
      />
      <NumberInput
        variant="error"
        defaultValue={-5}
        label="Error (negative value)"
      />
      <NumberInput
        variant="success"
        defaultValue={100}
        label="Success (target reached)"
      />
    </YStack>
  ),
};

// Shopping cart example
export const ShoppingCart: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" minWidth={350}>
      <Text fontSize="$6" fontWeight="600">Shopping Cart</Text>

      <YStack space="$4">
        <NumberInput
          label="T-Shirt Quantity"
          description="Premium cotton t-shirt - $24.99 each"
          defaultValue={2}
          min={0}
          max={10}
          step={1}
          size="lg"
        />
        
        <NumberInput
          label="Jeans Quantity"
          description="Designer jeans - $89.99 each"
          defaultValue={1}
          min={0}
          max={5}
          step={1}
          size="lg"
        />
        
        <NumberInput
          label="Discount Code"
          description="Enter percentage discount (0-50%)"
          defaultValue={10}
          min={0}
          max={50}
          step={5}
          formatValue={(val) => `${val}%`}
          variant="success"
        />
      </YStack>
    </YStack>
  ),
};

// Recipe ingredients
export const RecipeIngredients: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" minWidth={350}>
      <Text fontSize="$6" fontWeight="600">Recipe Ingredients</Text>

      <YStack space="$4">
        <NumberInput
          label="Servings"
          description="Number of people to serve"
          defaultValue={4}
          min={1}
          max={20}
          step={1}
          size="lg"
        />
        
        <NumberInput
          label="Flour"
          description="Cups of all-purpose flour"
          defaultValue={2.5}
          min={0}
          max={10}
          step={0.25}
          precision={2}
          formatValue={(val) => `${val} cups`}
        />
        
        <NumberInput
          label="Sugar"
          description="Tablespoons of sugar"
          defaultValue={3}
          min={0}
          max={20}
          step={0.5}
          precision={1}
          formatValue={(val) => `${val} tbsp`}
        />
        
        <NumberInput
          label="Baking Time"
          description="Minutes in the oven"
          defaultValue={25}
          min={5}
          max={120}
          step={5}
          formatValue={(val) => `${val} min`}
        />
      </YStack>
    </YStack>
  ),
};

// Settings configuration
export const ConfigurationSettings: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" minWidth={350}>
      <Text fontSize="$6" fontWeight="600">App Configuration</Text>

      <YStack space="$4">
        <NumberInput
          label="Session Timeout"
          description="Minutes before auto-logout"
          defaultValue={30}
          min={5}
          max={480}
          step={5}
          formatValue={(val) => `${val} minutes`}
        />
        
        <NumberInput
          label="Max File Size"
          description="Maximum upload size in MB"
          defaultValue={50}
          min={1}
          max={1000}
          step={10}
          formatValue={(val) => `${val} MB`}
        />
        
        <NumberInput
          label="Retry Attempts"
          description="Number of retry attempts for failed requests"
          defaultValue={3}
          min={0}
          max={10}
          step={1}
        />
        
        <NumberInput
          label="Refresh Rate"
          description="Data refresh interval in seconds"
          defaultValue={30}
          min={5}
          max={300}
          step={5}
          formatValue={(val) => `${val}s`}
          variant="success"
        />
      </YStack>
    </YStack>
  ),
};