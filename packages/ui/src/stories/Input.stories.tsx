import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, XStack, Text } from 'tamagui';

import { Button } from '../Button';
import { Input, InputWithLabel, SmallInput, LargeInput, Textarea, SearchInput } from '../Input';

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
- \`Input\`: Base input component
- \`InputWithLabel\`: Input with label and validation messages
- \`SmallInput\`: Compact input for tight spaces
- \`LargeInput\`: Larger input for emphasis
- \`Textarea\`: Multi-line text input
- \`SearchInput\`: Input optimized for search with container width limits

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
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    success: {
      control: 'boolean',
      description: 'Show success state',
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
        <Input placeholder="Error state" error />
      </YStack>
      
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Success</Text>
        <Input placeholder="Success state" success />
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
        <SmallInput placeholder="Small input" />
      </YStack>
      
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Medium (Default)</Text>
        <Input placeholder="Medium input" />
      </YStack>
      
      <YStack space="$2">
        <Text fontSize="$4" fontWeight="500">Large</Text>
        <LargeInput placeholder="Large input" />
      </YStack>
    </YStack>
  ),
};

export const WithLabels: Story = {
  name: 'Input with Labels',
  render: () => (
    <YStack space="$4" width={400}>
      <InputWithLabel label="Email" required>
        <Input placeholder="Enter your email address" />
      </InputWithLabel>
      
      <InputWithLabel label="Password" required>
        <Input placeholder="Enter your password" secureTextEntry />
      </InputWithLabel>
      
      <InputWithLabel 
        label="Username" 
        error="Username is already taken"
      >
        <Input placeholder="Choose a username" error />
      </InputWithLabel>
      
      <InputWithLabel 
        label="Full Name" 
        success="Looks good!"
      >
        <Input placeholder="Enter your full name" success />
      </InputWithLabel>
    </YStack>
  ),
};

export const TextareaExample: Story = {
  name: 'Textarea',
  render: () => (
    <YStack space="$4" width={400}>
      <InputWithLabel label="Message" required>
        <Textarea placeholder="Enter your message here..." />
      </InputWithLabel>
      
      <InputWithLabel 
        label="Bio" 
        error="Bio must be at least 10 characters"
      >
        <Textarea 
          placeholder="Tell us about yourself..." 
          borderColor="$destructive"
        />
      </InputWithLabel>
    </YStack>
  ),
};

export const SearchInputs: Story = {
  name: 'Search Inputs',
  render: () => (
    <YStack space="$4" alignItems="center">
      <YStack space="$2" alignItems="center">
        <Text fontSize="$4" fontWeight="500">Small Search (Mobile)</Text>
        <SearchInput 
          size="sm"
          placeholder="Search products..." 
        />
      </YStack>
      
      <YStack space="$2" alignItems="center">
        <Text fontSize="$4" fontWeight="500">Medium Search (Desktop)</Text>
        <SearchInput 
          size="md"
          placeholder="Search anything..." 
        />
      </YStack>
    </YStack>
  ),
};

export const FormExample: Story = {
  name: 'Complete Form',
  render: () => (
    <YStack space="$4" width={400} padding="$4">
      <Text fontSize="$6" fontWeight="bold">Create Account</Text>
      
      <InputWithLabel label="First Name" required>
        <Input placeholder="John" />
      </InputWithLabel>
      
      <InputWithLabel label="Last Name" required>
        <Input placeholder="Doe" />
      </InputWithLabel>
      
      <InputWithLabel label="Email" required>
        <Input placeholder="john.doe@example.com" />
      </InputWithLabel>
      
      <InputWithLabel label="Password" required>
        <Input placeholder="••••••••" secureTextEntry />
      </InputWithLabel>
      
      <InputWithLabel label="Confirm Password" required>
        <Input placeholder="••••••••" secureTextEntry />
      </InputWithLabel>
      
      <InputWithLabel label="Bio (Optional)">
        <Textarea placeholder="Tell us about yourself..." />
      </InputWithLabel>
      
      <XStack space="$3" marginTop="$2">
        <Button flex={1} variant="outline">Cancel</Button>
        <Button flex={1}>Create Account</Button>
      </XStack>
    </YStack>
  ),
};