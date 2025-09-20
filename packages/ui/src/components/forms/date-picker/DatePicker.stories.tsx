import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { YStack, Text } from 'tamagui';

import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A date picker component with calendar popup. Features custom date formatting, range validation, and accessible keyboard navigation.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the date input',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'error', 'success'],
      description: 'The visual variant of the date input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the date picker is disabled',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the date picker',
    },
    description: {
      control: { type: 'text' },
      description: 'Description text shown below the input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input field',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Basic usage story
export const Default: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'Choose a date...',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <YStack space='$4' alignItems='flex-start' minWidth={250}>
      <YStack space='$2'>
        <Text fontWeight='500'>Small</Text>
        <DatePicker size='sm' placeholder='Small date picker' />
      </YStack>
      <YStack space='$2'>
        <Text fontWeight='500'>Medium (Default)</Text>
        <DatePicker size='md' placeholder='Medium date picker' />
      </YStack>
      <YStack space='$2'>
        <Text fontWeight='500'>Large</Text>
        <DatePicker size='lg' placeholder='Large date picker' />
      </YStack>
    </YStack>
  ),
};

// Visual variants
export const Variants: Story = {
  render: () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return (
      <YStack space='$4' alignItems='flex-start' minWidth={300}>
        <DatePicker variant='default' label='Default' defaultValue={today} />
        <DatePicker
          variant='error'
          label='Error (past date selected)'
          defaultValue={yesterday}
        />
        <DatePicker
          variant='success'
          label='Success (valid date)'
          defaultValue={tomorrow}
        />
      </YStack>
    );
  },
};

// With descriptions and labels
export const WithLabels: Story = {
  render: () => (
    <YStack space='$4' alignItems='flex-start' minWidth={350}>
      <DatePicker
        label='Birth Date'
        description='Enter your date of birth'
        placeholder='MM/DD/YYYY'
      />
      <DatePicker
        label='Appointment Date'
        description='Select your preferred appointment date'
        placeholder='Choose date...'
        variant='success'
      />
    </YStack>
  ),
};

// Date ranges and validation
export const DateRanges: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return (
      <YStack space='$4' alignItems='flex-start' minWidth={350}>
        <DatePicker
          label='Future Events Only'
          description='Cannot select past dates'
          placeholder='Select future date...'
          minDate={today}
        />

        <DatePicker
          label='Next 30 Days'
          description='Must be within the next month'
          placeholder='Select date...'
          minDate={today}
          maxDate={nextMonth}
        />

        <DatePicker
          label='This Week'
          description='Select a date this week'
          placeholder='This week only...'
          minDate={today}
          maxDate={nextWeek}
          variant='success'
        />
      </YStack>
    );
  },
};

// States
export const States: Story = {
  render: () => {
    const today = new Date();

    return (
      <YStack space='$4' alignItems='flex-start' minWidth={300}>
        <YStack space='$2'>
          <Text fontWeight='500'>Empty</Text>
          <DatePicker placeholder='No date selected' />
        </YStack>
        <YStack space='$2'>
          <Text fontWeight='500'>With Value</Text>
          <DatePicker defaultValue={today} placeholder='Date selected' />
        </YStack>
        <YStack space='$2'>
          <Text fontWeight='500' opacity={0.5}>
            Disabled
          </Text>
          <DatePicker disabled placeholder='Disabled picker' />
        </YStack>
      </YStack>
    );
  },
};

// Custom formatting
export const CustomFormatting: Story = {
  render: () => {
    const formatISO = (date: Date) => date.toISOString().split('T')[0];
    const formatLong = (date: Date) =>
      date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    const formatShort = (date: Date) =>
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
      });

    return (
      <YStack space='$4' alignItems='flex-start' minWidth={350}>
        <DatePicker
          label='ISO Format (YYYY-MM-DD)'
          placeholder='Select date...'
          formatDate={formatISO}
        />

        <DatePicker
          label='Long Format'
          placeholder='Select date...'
          formatDate={formatLong}
        />

        <DatePicker
          label='Short Format'
          placeholder='Select date...'
          formatDate={formatShort}
        />
      </YStack>
    );
  },
};

// Form integration example
export const BookingForm: Story = {
  render: () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
      <YStack space='$6' alignItems='flex-start' minWidth={400}>
        <Text fontSize='$6' fontWeight='600'>
          Hotel Booking
        </Text>

        <YStack space='$4'>
          <DatePicker
            label='Check-in Date'
            description='Select your arrival date'
            placeholder='MM/DD/YYYY'
            minDate={today}
            maxDate={maxDate}
            size='lg'
          />

          <DatePicker
            label='Check-out Date'
            description='Select your departure date'
            placeholder='MM/DD/YYYY'
            minDate={today}
            maxDate={maxDate}
            size='lg'
          />

          <DatePicker
            label='Special Event Date'
            description='Optional: Select if this booking is for a special event'
            placeholder='Select event date...'
            variant='success'
          />
        </YStack>
      </YStack>
    );
  },
};

// Event scheduling
export const EventScheduling: Story = {
  render: () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return (
      <YStack space='$6' alignItems='flex-start' minWidth={400}>
        <Text fontSize='$6' fontWeight='600'>
          Event Planning
        </Text>

        <YStack space='$4'>
          <DatePicker
            label='Event Date'
            description='When will your event take place?'
            placeholder='Select event date...'
            minDate={today}
            size='lg'
          />

          <DatePicker
            label='RSVP Deadline'
            description='Last date for guests to respond'
            placeholder='RSVP by...'
            minDate={today}
            maxDate={nextMonth}
            variant='error'
          />

          <DatePicker
            label='Setup Date'
            description='When will you start setting up?'
            placeholder='Setup date...'
            minDate={today}
          />
        </YStack>
      </YStack>
    );
  },
};

// Medical appointments
export const MedicalAppointments: Story = {
  render: () => {
    const today = new Date();
    const nextSixMonths = new Date(today);
    nextSixMonths.setMonth(nextSixMonths.getMonth() + 6);

    return (
      <YStack space='$6' alignItems='flex-start' minWidth={400}>
        <Text fontSize='$6' fontWeight='600'>
          Medical Appointment
        </Text>

        <YStack space='$4'>
          <DatePicker
            label='Preferred Appointment Date'
            description='Select your preferred date for the appointment'
            placeholder='Choose date...'
            minDate={today}
            maxDate={nextSixMonths}
            size='lg'
          />

          <DatePicker
            label='Last Symptom Date'
            description='When did you last experience symptoms?'
            placeholder='Select date...'
            variant='error'
          />

          <DatePicker
            label='Previous Visit'
            description='Date of your last visit (optional)'
            placeholder='Previous visit date...'
          />
        </YStack>
      </YStack>
    );
  },
};

// Project timeline
export const ProjectTimeline: Story = {
  render: () => {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    return (
      <YStack space='$6' alignItems='flex-start' minWidth={400}>
        <Text fontSize='$6' fontWeight='600'>
          Project Timeline
        </Text>

        <YStack space='$4'>
          <DatePicker
            label='Project Start Date'
            description='When will the project officially begin?'
            placeholder='Start date...'
            minDate={today}
            size='lg'
            variant='success'
          />

          <DatePicker
            label='Milestone 1 Target'
            description='First major milestone deadline'
            placeholder='Milestone date...'
            minDate={today}
            maxDate={nextYear}
          />

          <DatePicker
            label='Project Deadline'
            description='Final delivery date'
            placeholder='Deadline...'
            minDate={today}
            maxDate={nextYear}
            variant='error'
          />
        </YStack>
      </YStack>
    );
  },
};
