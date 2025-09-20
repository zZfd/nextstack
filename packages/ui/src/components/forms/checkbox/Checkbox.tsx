import { Check, Minus } from '@tamagui/lucide-icons';
import {
  Checkbox as TamaguiCheckbox,
  styled,
  CheckboxProps as TamaguiCheckboxProps,
  XStack,
  Text,
  YStack,
} from 'tamagui';

import { Icon } from '../../general';

// Checkbox Props Interface - Rule 4: Explicit TypeScript interfaces
export interface CheckboxProps extends Omit<TamaguiCheckboxProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

// Base Checkbox component - Rule 1: Token-based values only
const StyledCheckbox = styled(TamaguiCheckbox, {
  name: 'Checkbox',
  borderRadius: '$2',
  borderWidth: 2,
  borderColor: '$borderColor',
  backgroundColor: '$input',

  // Focus styles
  focusStyle: {
    borderColor: '$ring',
    outlineStyle: 'none',
    shadowColor: '$ring',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
  },

  // Hover styles
  hoverStyle: {
    borderColor: '$borderColorHover',
  },

  // Checked state styles - using pressStyle instead of checkedStyle
  pressStyle: {
    backgroundColor: '$primary',
    borderColor: '$primary',
  },

  // Rule 3: Use variants instead of conditional styling
  variants: {
    size: {
      sm: {
        size: '$4',
      },
      md: {
        size: '$5',
      },
      lg: {
        size: '$6',
      },
    },
    variant: {
      default: {
        borderColor: '$borderColor',
        focusStyle: {
          borderColor: '$ring',
          shadowColor: '$ring',
        },
        pressStyle: {
          backgroundColor: '$primary',
          borderColor: '$primary',
        },
      },
      error: {
        borderColor: '$destructive',
        focusStyle: {
          borderColor: '$destructive',
          shadowColor: '$destructive',
        },
        pressStyle: {
          backgroundColor: '$destructive',
          borderColor: '$destructive',
        },
      },
      success: {
        borderColor: '$success',
        focusStyle: {
          borderColor: '$success',
          shadowColor: '$success',
        },
        pressStyle: {
          backgroundColor: '$success',
          borderColor: '$success',
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        hoverStyle: {
          borderColor: '$borderColor',
        },
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// Checkbox Indicator - Rule 2: Use building blocks
const CheckboxIndicator = styled(TamaguiCheckbox.Indicator, {
  name: 'CheckboxIndicator',
  alignItems: 'center',
  justifyContent: 'center',
});

// Label component - Rule 2: Use Text building block
const CheckboxLabel = styled(Text, {
  name: 'CheckboxLabel',
  fontSize: '$4',
  fontWeight: '500',
  color: '$color',
  cursor: 'pointer',
  userSelect: 'none',

  variants: {
    size: {
      sm: {
        fontSize: '$3',
      },
      md: {
        fontSize: '$4',
      },
      lg: {
        fontSize: '$5',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,
});

// Description component - Rule 2: Use Text building block
const CheckboxDescription = styled(Text, {
  name: 'CheckboxDescription',
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

// Main Checkbox Component - Rule 0: Pure presentation, no business logic
export const Checkbox = ({
  size = 'md',
  variant = 'default',
  label,
  description,
  indeterminate = false,
  disabled,
  ...props
}: CheckboxProps) => {
  const checkboxId =
    props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const renderIcon = () => {
    // Rule 2: Use Icon wrapper for consistent theming and sizing
    const iconSize = size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md';

    if (indeterminate) {
      return (
        <Icon size={iconSize} color='$primaryForeground'>
          <Minus />
        </Icon>
      );
    }
    return (
      <Icon size={iconSize} color='$primaryForeground'>
        <Check />
      </Icon>
    );
  };

  const checkboxElement = (
    <StyledCheckbox
      {...props}
      id={checkboxId}
      size={size}
      variant={variant}
      disabled={disabled}
    >
      <CheckboxIndicator>{renderIcon()}</CheckboxIndicator>
    </StyledCheckbox>
  );

  // If no label, return just the checkbox
  if (!label && !description) {
    return checkboxElement;
  }

  // Return checkbox with label and optional description - Rule 2: Use building blocks
  return (
    <XStack alignItems='flex-start' space='$3'>
      {checkboxElement}
      <YStack flex={1} space='$1'>
        {label && (
          <CheckboxLabel
            size={size}
            disabled={disabled}
            htmlFor={checkboxId}
            tag='label'
          >
            {label}
          </CheckboxLabel>
        )}
        {description && (
          <CheckboxDescription disabled={disabled}>
            {description}
          </CheckboxDescription>
        )}
      </YStack>
    </XStack>
  );
};
