import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, XStack, Text } from 'tamagui';

import { Button } from '../../General/Button/Button';

import { Input, FormField, FormLabel, FormError, FormSuccess, Textarea } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Input Component

Form input components with consistent styling and state management.

## Features
- **Focus States**: Ring effects matching design system
- **Error/Success States**: Visual feedback for form validation
- **Size Variants**: Small, medium, and large sizes
- **Accessibility**: Proper label associations and ARIA attributes
- **Theme Integration**: Follows design system colors

## Components
- \`Input\`: Base input component with size and variant options
- \`FormField\`: Container for grouping form elements
- \`FormLabel\`: Styled label for form inputs
- \`FormError\`: Error message display
- \`FormSuccess\`: Success message display
- \`Textarea\`: Multi-line text input with size variants

## Usage
Use inputs for all text-based user input in forms and interfaces.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Input variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Input',
  render: (args) => (
    <Input {...args} placeholder="Enter text..." width={300} />
  ),
};

export const States: Story = {
  name: 'Input States',
  render: () => (
    <YStack space="$4" width={300}>
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Normal</Text>
        <Input placeholder="Normal input" />
      </YStack>

      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Focused</Text>
        <Input placeholder="Click to see focus state" />
      </YStack>

      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Error</Text>
        <Input placeholder="Error state" variant="error" />
      </YStack>

      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Success</Text>
        <Input placeholder="Success state" variant="success" />
      </YStack>

      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Disabled</Text>
        <Input placeholder="Disabled input" disabled />
      </YStack>
    </YStack>
  ),
};

export const Sizes: Story = {
  name: 'Input Sizes',
  render: () => (
    <YStack space="$4" width={300}>
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Small</Text>
        <Input placeholder="Small input" size="sm" />
      </YStack>

      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Medium (Default)</Text>
        <Input placeholder="Medium input" size="md" />
      </YStack>

      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Large</Text>
        <Input placeholder="Large input" size="lg" />
      </YStack>
    </YStack>
  ),
};

export const WithLabels: Story = {
  name: 'Input with Labels',
  render: () => (
    <YStack space="$4" width={400}>
      <FormField>
        <FormLabel>Email *</FormLabel>
        <Input placeholder="Enter your email address" />
      </FormField>

      <FormField>
        <FormLabel>Password *</FormLabel>
        <Input placeholder="Enter your password" secureTextEntry />
      </FormField>

      <FormField>
        <FormLabel>Username</FormLabel>
        <Input placeholder="Choose a username" variant="error" />
        <FormError>Username is already taken</FormError>
      </FormField>

      <FormField>
        <FormLabel>Full Name</FormLabel>
        <Input placeholder="Enter your full name" variant="success" />
        <FormSuccess>Looks good!</FormSuccess>
      </FormField>
    </YStack>
  ),
};

export const TextareaExample: Story = {
  name: 'Textarea',
  render: () => (
    <YStack space="$4" width={400}>
      <FormField>
        <FormLabel>Message *</FormLabel>
        <Textarea placeholder="Enter your message here..." />
      </FormField>

      <FormField>
        <FormLabel>Bio</FormLabel>
        <Textarea placeholder="Tell us about yourself..." />
        <FormError>Bio must be at least 10 characters</FormError>
      </FormField>

      <FormField>
        <FormLabel>Large Textarea</FormLabel>
        <Textarea size="lg" placeholder="Large textarea for longer content..." />
      </FormField>
    </YStack>
  ),
};

export const FormExample: Story = {
  name: 'Complete Form',
  render: () => (
    <YStack space="$4" width={400} padding="$4">
      <Text fontSize="$6" fontWeight="bold">Create Account</Text>

      <FormField>
        <FormLabel>First Name *</FormLabel>
        <Input placeholder="John" />
      </FormField>

      <FormField>
        <FormLabel>Last Name *</FormLabel>
        <Input placeholder="Doe" />
      </FormField>

      <FormField>
        <FormLabel>Email *</FormLabel>
        <Input placeholder="john.doe@example.com" />
      </FormField>

      <FormField>
        <FormLabel>Password *</FormLabel>
        <Input placeholder="••••••••" secureTextEntry />
      </FormField>

      <FormField>
        <FormLabel>Confirm Password *</FormLabel>
        <Input placeholder="••••••••" secureTextEntry />
      </FormField>

      <FormField>
        <FormLabel>Bio (Optional)</FormLabel>
        <Textarea placeholder="Tell us about yourself..." />
      </FormField>

      <XStack space="$3" marginTop="$2">
        <Button flex={1} variant="outline">Cancel</Button>
        <Button flex={1}>Create Account</Button>
      </XStack>
    </YStack>
  ),
};