import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, Text } from 'tamagui';

import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A range slider component built with Tamagui Slider. Supports different sizes, variants, and value display with custom formatting.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the slider',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the slider',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the slider is disabled',
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Whether to show the current value',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the slider',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text shown below the slider',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Basic usage story
export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    label: 'Volume',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space='$6' alignItems='flex-start' minWidth={300}>
      <YStack space='$2'>
        <Text fontWeight='500'>Small</Text>
        <Slider size='sm' defaultValue={[25]} max={100} showValue />
      </YStack>
      <YStack space='$2'>
        <Text fontWeight='500'>Medium (Default)</Text>
        <Slider size='md' defaultValue={[50]} max={100} showValue />
      </YStack>
      <YStack space='$2'>
        <Text fontWeight='500'>Large</Text>
        <Slider size='lg' defaultValue={[75]} max={100} showValue />
      </YStack>
    </YStack>
  ),
};

// Visual variants
export const Variants: Story = {
  render: () => (
    <YStack space='$6' alignItems='flex-start' minWidth={300}>
      <YStack space='$2'>
        <Text fontWeight='500'>Default</Text>
        <Slider variant='default' defaultValue={[60]} max={100} showValue />
      </YStack>
      <YStack space='$2'>
        <Text fontWeight='500' color='$destructive'>
          Error
        </Text>
        <Slider variant='error' defaultValue={[30]} max={100} showValue />
      </YStack>
      <YStack space='$2'>
        <Text fontWeight='500' color='$success'>
          Success
        </Text>
        <Slider variant='success' defaultValue={[80]} max={100} showValue />
      </YStack>
    </YStack>
  ),
};

// With value display
export const WithValue: Story = {
  render: () => (
    <YStack space='$4' alignItems='flex-start' minWidth={300}>
      <Slider
        label='Progress'
        description='Drag to adjust progress percentage'
        defaultValue={[65]}
        max={100}
        step={5}
        showValue
        formatValue={value => `${value}%`}
      />
    </YStack>
  ),
};

// Different ranges
export const DifferentRanges: Story = {
  render: () => (
    <YStack space='$6' alignItems='flex-start' minWidth={300}>
      <YStack space='$2'>
        <Text fontWeight='500'>Price Range ($0 - $1000)</Text>
        <Slider
          defaultValue={[250]}
          min={0}
          max={1000}
          step={50}
          showValue
          formatValue={value => `$${value}`}
        />
      </YStack>

      <YStack space='$2'>
        <Text fontWeight='500'>Temperature (-10°C to 40°C)</Text>
        <Slider
          defaultValue={[22]}
          min={-10}
          max={40}
          step={1}
          showValue
          formatValue={value => `${value}°C`}
        />
      </YStack>

      <YStack space='$2'>
        <Text fontWeight='500'>Rating (0.0 - 5.0)</Text>
        <Slider
          defaultValue={[3.5]}
          min={0}
          max={5}
          step={0.1}
          showValue
          formatValue={value => `★ ${value.toFixed(1)}`}
        />
      </YStack>
    </YStack>
  ),
};

// States
export const States: Story = {
  render: () => (
    <YStack space='$4' alignItems='flex-start' minWidth={300}>
      <YStack space='$2'>
        <Text fontWeight='500'>Enabled</Text>
        <Slider defaultValue={[40]} max={100} showValue />
      </YStack>
      <YStack space='$2'>
        <Text fontWeight='500' opacity={0.5}>
          Disabled
        </Text>
        <Slider defaultValue={[40]} max={100} showValue disabled />
      </YStack>
    </YStack>
  ),
};

// Settings example
export const SettingsExample: Story = {
  render: () => (
    <YStack space='$6' alignItems='flex-start' minWidth={350}>
      <Text fontSize='$6' fontWeight='600'>
        Audio Settings
      </Text>

      <Slider
        label='Master Volume'
        description='Adjust the overall system volume'
        defaultValue={[75]}
        max={100}
        step={5}
        showValue
        formatValue={value => `${value}%`}
      />

      <Slider
        label='Bass'
        description='Low frequency audio adjustment'
        defaultValue={[0]}
        min={-10}
        max={10}
        step={1}
        showValue
        formatValue={value => (value > 0 ? `+${value}dB` : `${value}dB`)}
      />

      <Slider
        label='Treble'
        description='High frequency audio adjustment'
        defaultValue={[2]}
        min={-10}
        max={10}
        step={1}
        showValue
        formatValue={value => (value > 0 ? `+${value}dB` : `${value}dB`)}
      />

      <Slider
        label='Balance'
        description='Left/right speaker balance'
        defaultValue={[0]}
        min={-100}
        max={100}
        step={10}
        showValue
        formatValue={value => {
          if (value === 0) return 'Center';
          return value > 0 ? `Right ${value}%` : `Left ${Math.abs(value)}%`;
        }}
      />
    </YStack>
  ),
};

// Performance example
export const PerformanceExample: Story = {
  render: () => (
    <YStack space='$6' alignItems='flex-start' minWidth={350}>
      <Text fontSize='$6' fontWeight='600'>
        Performance Metrics
      </Text>

      <Slider
        label='CPU Usage'
        description='Current processor utilization'
        defaultValue={[45]}
        max={100}
        step={1}
        showValue
        formatValue={value => `${value}%`}
        variant={45 > 80 ? 'error' : 45 > 60 ? 'default' : 'success'}
      />

      <Slider
        label='Memory Usage'
        description='RAM consumption'
        defaultValue={[68]}
        max={100}
        step={1}
        showValue
        formatValue={value => `${value}%`}
        variant={68 > 80 ? 'error' : 68 > 60 ? 'default' : 'success'}
      />

      <Slider
        label='Disk I/O'
        description='Storage read/write activity'
        defaultValue={[23]}
        max={100}
        step={1}
        showValue
        formatValue={value => `${value}%`}
        variant='success'
      />

      <Slider
        label='Network Usage'
        description='Bandwidth utilization'
        defaultValue={[12]}
        max={100}
        step={1}
        showValue
        formatValue={value => `${value}%`}
        variant='success'
      />
    </YStack>
  ),
};

// Gaming example
export const GamingExample: Story = {
  render: () => (
    <YStack space='$6' alignItems='flex-start' minWidth={350}>
      <Text fontSize='$6' fontWeight='600'>
        Game Settings
      </Text>

      <Slider
        label='Graphics Quality'
        description='Visual fidelity level'
        defaultValue={[7]}
        min={1}
        max={10}
        step={1}
        showValue
        formatValue={value => {
          const levels = [
            '',
            'Low',
            'Low+',
            'Medium-',
            'Medium',
            'Medium+',
            'High-',
            'High',
            'High+',
            'Ultra',
            'Ultra+',
          ];
          return levels[value] || value.toString();
        }}
      />

      <Slider
        label='Field of View'
        description='Camera view angle'
        defaultValue={[90]}
        min={60}
        max={120}
        step={5}
        showValue
        formatValue={value => `${value}°`}
      />

      <Slider
        label='Mouse Sensitivity'
        description='Cursor movement speed'
        defaultValue={[2.5]}
        min={0.1}
        max={5.0}
        step={0.1}
        showValue
        formatValue={value => value.toFixed(1)}
      />
    </YStack>
  ),
};
