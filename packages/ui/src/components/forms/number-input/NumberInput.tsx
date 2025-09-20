import {
  styled,
  XStack,
  YStack,
  Text,
} from 'tamagui';
import { Plus, Minus } from '@tamagui/lucide-icons';
import { Input, InputProps } from '../input';
import { Icon } from '../../general';

// NumberInput Props Interface - Rule 4: Explicit TypeScript interfaces
export interface NumberInputProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChangeText'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  onChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  showSteppers?: boolean;
  label?: string;
  description?: string;
  formatValue?: (value: number) => string;
  parseValue?: (value: string) => number;
}

// Stepper Button - Rule 2: Use building blocks
const StepperButton = styled(XStack, {
  name: 'StepperButton',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderColor: '$borderColor',
  backgroundColor: '$background',
  borderWidth: 1,
  color: '$gray9',

  hoverStyle: {
    backgroundColor: '$gray3',
    color: '$gray11',
  },

  pressStyle: {
    backgroundColor: '$gray4',
    scale: 0.95,
  },

  variants: {
    size: {
      sm: {
        height: '$height.sm',
        width: '$6',
      },
      md: {
        height: '$height.md',
        width: '$7',
      },
      lg: {
        height: '$height.lg',
        width: '$8',
      },
    },
    position: {
      left: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
      },
      right: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        hoverStyle: {
          backgroundColor: '$background',
          color: '$gray9',
        },
        pressStyle: {
          scale: 1,
        },
      },
    },
  } as const,
});

// NumberInput Input - extends base Input with stepper spacing
const NumberInputField = styled(Input, {
  name: 'NumberInputField',
  textAlign: 'center',

  variants: {
    withSteppers: {
      true: {
        borderRadius: 0,
      },
    },
  } as const,
});

// Label component - Rule 2: Use Text building block
const NumberLabel = styled(Text, {
  name: 'NumberLabel',
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
const NumberDescription = styled(Text, {
  name: 'NumberDescription',
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

// Helper function to clamp value within bounds
const clampValue = (value: number, min?: number, max?: number): number => {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
};

// Helper function to round to precision
const roundToPrecision = (value: number, precision?: number): number => {
  if (precision === undefined) return value;
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

// Main NumberInput Component - Rule 0: Pure presentation, no business logic
export const NumberInput = ({
  size = 'md',
  variant = 'default',
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  precision,
  onChange,
  onIncrement,
  onDecrement,
  showSteppers = true,
  label,
  description,
  disabled,
  formatValue = (val: number) => val.toString(),
  parseValue = (val: string) => parseFloat(val) || 0,
  placeholder,
  ...props
}: NumberInputProps) => {
  const currentValue = value ?? defaultValue;
  const displayValue = formatValue(currentValue);

  const handleIncrement = () => {
    if (disabled) return;
    const newValue = roundToPrecision(
      clampValue(currentValue + step, min, max),
      precision
    );
    onIncrement?.(newValue);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    if (disabled) return;
    const newValue = roundToPrecision(
      clampValue(currentValue - step, min, max),
      precision
    );
    onDecrement?.(newValue);
    onChange?.(newValue);
  };

  const handleInputChange = (text: string) => {
    if (disabled) return;
    const numValue = parseValue(text);
    const clampedValue = clampValue(numValue, min, max);
    const finalValue = roundToPrecision(clampedValue, precision);
    onChange?.(finalValue);
  };

  const canDecrement = min === undefined || currentValue > min;
  const canIncrement = max === undefined || currentValue < max;

  const numberInputElement = showSteppers ? (
    <XStack alignItems="center">
      {/* Decrement Button */}
      <StepperButton
        size={size}
        position="left"
        disabled={disabled || !canDecrement}
        onPress={handleDecrement}
        tag="button"
      >
        <Icon
          size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
          color="$gray9"
        >
          <Minus />
        </Icon>
      </StepperButton>

      {/* Input Field */}
      <NumberInputField
        {...props}
        size={size}
        variant={variant}
        disabled={disabled}
        value={displayValue}
        placeholder={placeholder}
        onChangeText={handleInputChange}
        withSteppers
        keyboardType="numeric"
        flex={1}
      />

      {/* Increment Button */}
      <StepperButton
        size={size}
        position="right"
        disabled={disabled || !canIncrement}
        onPress={handleIncrement}
        tag="button"
      >
        <Icon
          size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
          color="$gray9"
        >
          <Plus />
        </Icon>
      </StepperButton>
    </XStack>
  ) : (
    <NumberInputField
      {...props}
      size={size}
      variant={variant}
      disabled={disabled}
      value={displayValue}
      placeholder={placeholder}
      onChangeText={handleInputChange}
      keyboardType="numeric"
    />
  );

  // If no label, return just the number input
  if (!label && !description) {
    return numberInputElement;
  }

  // Return number input with label and optional description - Rule 2: Use building blocks
  return (
    <YStack space="$2">
      {label && (
        <NumberLabel disabled={disabled}>
          {label}
        </NumberLabel>
      )}
      {numberInputElement}
      {description && (
        <NumberDescription disabled={disabled}>
          {description}
        </NumberDescription>
      )}
    </YStack>
  );
};