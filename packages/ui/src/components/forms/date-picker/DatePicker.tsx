import { Calendar, ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { styled, XStack, YStack, Text, Button, Input, Popover } from 'tamagui';

import { Icon } from '../../general';

// DatePicker Props Interface - Rule 4: Explicit TypeScript interfaces
export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  disabled?: boolean;
  label?: string;
  description?: string;
  placeholder?: string;
  formatDate?: (date: Date) => string;
  parseDate?: (dateString: string) => Date | null;
  minDate?: Date;
  maxDate?: Date;
}

// Date format helper
const defaultFormatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// Date parse helper
const defaultParseDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// Calendar Container - Rule 1: Token-based styling
const CalendarContainer = styled(YStack, {
  name: 'CalendarContainer',
  backgroundColor: '$popover',
  borderRadius: '$3',
  borderWidth: 1,
  borderColor: '$borderColor',
  shadowColor: '$shadowColor',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 12,
  padding: '$3',
  minWidth: 280,
});

// Calendar Header - Rule 2: Use building blocks
const CalendarHeader = styled(XStack, {
  name: 'CalendarHeader',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '$3',
});

// Month/Year Title
const MonthYearTitle = styled(Text, {
  name: 'MonthYearTitle',
  fontSize: '$4',
  fontWeight: '600',
  color: '$color',
});

// Navigation Button
const NavButton = styled(Button, {
  name: 'NavButton',
  size: '$3',
  circular: true,
  chromeless: true,
  color: '$gray9',

  hoverStyle: {
    backgroundColor: '$gray4',
    color: '$gray11',
  },
});

// Days Grid Container
const DaysGrid = styled(YStack, {
  name: 'DaysGrid',
  gap: '$1',
});

// Days Row
const DaysRow = styled(XStack, {
  name: 'DaysRow',
  gap: '$1',
});

// Day Cell
const DayCell = styled(Button, {
  name: 'DayCell',
  size: '$4',
  circular: true,
  chromeless: true,
  color: '$color',
  minWidth: '$4',
  fontSize: '$3',

  hoverStyle: {
    backgroundColor: '$gray4',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$primary',
        color: '$primaryForeground',
        hoverStyle: {
          backgroundColor: '$primaryHover',
        },
      },
    },
    today: {
      true: {
        borderWidth: 1,
        borderColor: '$primary',
      },
    },
    disabled: {
      true: {
        opacity: 0.3,
        cursor: 'not-allowed',
        hoverStyle: {
          backgroundColor: 'transparent',
        },
      },
    },
    otherMonth: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});

// Week Day Header
const WeekDayHeader = styled(Text, {
  name: 'WeekDayHeader',
  fontSize: '$2',
  fontWeight: '500',
  color: '$gray9',
  textAlign: 'center',
  minWidth: '$4',
  paddingVertical: '$1',
});

// DatePicker Input - Rule 2: Use building blocks
const DatePickerInput = styled(Input, {
  name: 'DatePickerInput',
  cursor: 'pointer',
});

// Input Icon Container
const InputIconContainer = styled(XStack, {
  name: 'InputIconContainer',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: '$2',
  zIndex: 1,
  color: '$gray9',

  variants: {
    size: {
      sm: {
        height: '$height.sm',
      },
      md: {
        height: '$height.md',
      },
      lg: {
        height: '$height.lg',
      },
    },
  } as const,
});

// Label component - Rule 2: Use Text building block
const DateLabel = styled(Text, {
  name: 'DateLabel',
  fontSize: '$4',
  fontWeight: '500',
  color: '$color',
  marginBottom: '$2',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});

// Description component - Rule 2: Use Text building block
const DateDescription = styled(Text, {
  name: 'DateDescription',
  fontSize: '$3',
  color: '$gray10',
  marginTop: '$1',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});

// Helper functions for calendar
const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date
): boolean => {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  return false;
};

// Main DatePicker Component - Rule 0: Pure presentation, no business logic
export const DatePicker = ({
  value,
  defaultValue,
  onChange,
  size = 'md',
  variant = 'default',
  disabled = false,
  label,
  description,
  placeholder = 'Select date...',
  formatDate = defaultFormatDate,
  parseDate = defaultParseDate,
  minDate,
  maxDate,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(
    () => value || defaultValue || new Date()
  );
  const [inputValue, setInputValue] = useState(() =>
    value ? formatDate(value) : ''
  );

  const selectedDate = value;
  const displayValue = selectedDate ? formatDate(selectedDate) : inputValue;

  const handleDateSelect = (date: Date) => {
    if (disabled || isDateDisabled(date, minDate, maxDate)) return;
    onChange?.(date);
    setInputValue(formatDate(date));
    setIsOpen(false);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    const parsedDate = parseDate(text);
    if (parsedDate && !isDateDisabled(parsedDate, minDate, maxDate)) {
      onChange?.(parsedDate);
      setViewDate(parsedDate);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const today = new Date();

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const days: JSX.Element[] = [];

    // Previous month's trailing days
    const prevMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() - 1,
      0
    );
    const prevDaysCount = prevMonth.getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevDaysCount - i;
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day);
      days.push(
        <DayCell
          key={`prev-${day}`}
          onPress={() => handleDateSelect(date)}
          disabled={isDateDisabled(date, minDate, maxDate)}
          otherMonth
        >
          {day}
        </DayCell>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isTodayDate = isToday(date);
      const isDisabled = isDateDisabled(date, minDate, maxDate);

      days.push(
        <DayCell
          key={day}
          onPress={() => handleDateSelect(date)}
          selected={isSelected}
          today={isTodayDate}
          disabled={isDisabled}
        >
          {day}
        </DayCell>
      );
    }

    // Next month's leading days
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1,
        day
      );
      days.push(
        <DayCell
          key={`next-${day}`}
          onPress={() => handleDateSelect(date)}
          disabled={isDateDisabled(date, minDate, maxDate)}
          otherMonth
        >
          {day}
        </DayCell>
      );
    }

    // Group days into weeks
    const weeks: JSX.Element[] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(<DaysRow key={i}>{days.slice(i, i + 7)}</DaysRow>);
    }

    return (
      <CalendarContainer>
        <CalendarHeader>
          <NavButton onPress={() => navigateMonth('prev')}>
            <Icon size='sm' color='$gray9'>
              <ChevronLeft />
            </Icon>
          </NavButton>
          <MonthYearTitle>
            {viewDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </MonthYearTitle>
          <NavButton onPress={() => navigateMonth('next')}>
            <Icon size='sm' color='$gray9'>
              <ChevronRight />
            </Icon>
          </NavButton>
        </CalendarHeader>

        <DaysGrid>
          <DaysRow>
            {weekDays.map(day => (
              <WeekDayHeader key={day}>{day}</WeekDayHeader>
            ))}
          </DaysRow>
          {weeks}
        </DaysGrid>
      </CalendarContainer>
    );
  };

  const datePickerElement = (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <XStack position='relative' alignItems='center'>
          <DatePickerInput
            size={size}
            variant={variant}
            disabled={disabled}
            value={displayValue}
            placeholder={placeholder}
            onChangeText={handleInputChange}
            editable={!disabled}
            paddingRight='$10'
          />
          <InputIconContainer size={size}>
            <Icon
              size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
              color='$gray9'
            >
              <Calendar />
            </Icon>
          </InputIconContainer>
        </XStack>
      </Popover.Trigger>

      <Popover.Content>{renderCalendar()}</Popover.Content>
    </Popover>
  );

  // If no label, return just the date picker
  if (!label && !description) {
    return datePickerElement;
  }

  // Return date picker with label and optional description - Rule 2: Use building blocks
  return (
    <YStack space='$2'>
      {label && <DateLabel disabled={disabled}>{label}</DateLabel>}
      {datePickerElement}
      {description && (
        <DateDescription disabled={disabled}>{description}</DateDescription>
      )}
    </YStack>
  );
};
