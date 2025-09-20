import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, Text } from 'tamagui';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Forms/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A search input component with integrated search icon and optional clear button. Built on top of the Input component with enhanced search functionality.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the search input',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the search input',
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      description: 'Position of the search icon',
    },
    showClearButton: {
      control: { type: 'boolean' },
      description: 'Whether to show the clear button when there is text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the search input is disabled',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the search input',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text shown below the input',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Basic usage story
export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={300}>
      <YStack space="$2">
        <Text fontWeight="500">Small</Text>
        <SearchBar size="sm" placeholder="Search products..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Medium (Default)</Text>
        <SearchBar size="md" placeholder="Search products..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Large</Text>
        <SearchBar size="lg" placeholder="Search products..." />
      </YStack>
    </YStack>
  ),
};

// Icon positions
export const IconPositions: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={300}>
      <YStack space="$2">
        <Text fontWeight="500">Icon Left (Default)</Text>
        <SearchBar iconPosition="left" placeholder="Search..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Icon Right</Text>
        <SearchBar iconPosition="right" placeholder="Search..." />
      </YStack>
    </YStack>
  ),
};

// With labels and descriptions
export const WithLabels: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={350}>
      <SearchBar
        label="Product Search"
        description="Find products by name, category, or description"
        placeholder="Search our catalog..."
      />
      <SearchBar
        label="User Search"
        description="Search for users by name or email"
        placeholder="Enter name or email..."
        variant="success"
      />
    </YStack>
  ),
};

// States
export const States: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={300}>
      <YStack space="$2">
        <Text fontWeight="500">Empty</Text>
        <SearchBar placeholder="Start typing..." />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">With Value</Text>
        <SearchBar
          value="javascript"
          placeholder="Search..."
          showClearButton
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500" opacity={0.5}>Disabled</Text>
        <SearchBar
          disabled
          placeholder="Search disabled..."
        />
      </YStack>
    </YStack>
  ),
};

// Clear button variants
export const ClearButton: Story = {
  render: () => (
    <YStack space="$4" alignItems="flex-start" minWidth={300}>
      <YStack space="$2">
        <Text fontWeight="500">With Clear Button</Text>
        <SearchBar
          value="search term"
          placeholder="Search..."
          showClearButton
          onClear={() => console.log('Cleared!')}
        />
      </YStack>
      <YStack space="$2">
        <Text fontWeight="500">Without Clear Button</Text>
        <SearchBar
          value="search term"
          placeholder="Search..."
          showClearButton={false}
        />
      </YStack>
    </YStack>
  ),
};

// Real-world examples
export const EcommerceSearch: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" minWidth={400}>
      <Text fontSize="$6" fontWeight="600">E-commerce Search</Text>

      <SearchBar
        size="lg"
        label="Product Search"
        description="Search our entire catalog of products"
        placeholder="Search for products, brands, or categories..."
        showClearButton
      />

      <SearchBar
        label="Location Search"
        description="Find stores near you"
        placeholder="Enter city, state, or ZIP code"
        iconPosition="right"
      />

      <SearchBar
        size="sm"
        placeholder="Filter current results..."
        variant="success"
      />
    </YStack>
  ),
};

export const DocumentSearch: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" minWidth={400}>
      <Text fontSize="$6" fontWeight="600">Document Management</Text>

      <SearchBar
        label="Global Search"
        description="Search across all documents and folders"
        placeholder="Search files, content, tags..."
        size="lg"
      />

      <SearchBar
        label="Quick Filter"
        placeholder="Filter current folder"
        iconPosition="right"
        size="sm"
      />

      <SearchBar
        label="Advanced Search"
        description="Use keywords, file types, or date ranges"
        placeholder="title:report type:pdf modified:today"
        variant="default"
      />
    </YStack>
  ),
};

export const SocialSearch: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" minWidth={400}>
      <Text fontSize="$6" fontWeight="600">Social Platform</Text>

      <SearchBar
        placeholder="Search posts, people, hashtags..."
        size="lg"
        showClearButton
      />

      <SearchBar
        label="Find Friends"
        description="Search by name, username, or email"
        placeholder="Enter name or @username"
        iconPosition="left"
      />

      <SearchBar
        label="Hashtag Search"
        placeholder="#trending"
        size="sm"
        variant="success"
      />
    </YStack>
  ),
};

export const CodeSearch: Story = {
  render: () => (
    <YStack space="$6" alignItems="flex-start" minWidth={450}>
      <Text fontSize="$6" fontWeight="600">Code Repository</Text>

      <SearchBar
        label="Global Code Search"
        description="Search across all repositories and branches"
        placeholder="function getUserData"
        size="lg"
        showClearButton
      />

      <SearchBar
        label="File Search"
        description="Find files by name or path"
        placeholder="components/Button.tsx"
        iconPosition="right"
      />

      <SearchBar
        label="Commit Search"
        placeholder="Search commit messages..."
        size="sm"
      />
    </YStack>
  ),
};