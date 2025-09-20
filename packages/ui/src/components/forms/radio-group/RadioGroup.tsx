import { Circle } from '@tamagui/lucide-icons';
import {
  RadioGroup as TamaguiRadioGroup,
  styled,
  RadioGroupProps as TamaguiRadioGroupProps,
  XStack,
  Text,
  YStack,
} from 'tamagui';

import { Icon } from '../../general';

// RadioGroup Props Interface - Rule 4: Explicit TypeScript interfaces
export interface RadioGroupProps extends Omit<TamaguiRadioGroupProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  orientation?: 'horizontal' | 'vertical';
  items: RadioGroupItem[];
  label?: string;
  description?: string;
}

export interface RadioGroupItem {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

// Base RadioGroup container - Rule 2: Use building blocks
const StyledRadioGroup = styled(TamaguiRadioGroup, {
  name: 'RadioGroup',

  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '$4',
      },
      vertical: {
        flexDirection: 'column',
        gap: '$3',
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'vertical',
  },
});

// RadioGroup Item - Rule 1: Token-based styling
const RadioGroupItemComponent = styled(TamaguiRadioGroup.Item, {
  name: 'RadioGroupItem',
  borderRadius: '$6',
  borderWidth: 2,
  borderColor: '$borderColor',
  backgroundColor: '$input',
  padding: 0,
  margin: 0,

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
      },
      error: {
        borderColor: '$destructive',
        focusStyle: {
          borderColor: '$destructive',
          shadowColor: '$destructive',
        },
      },
      success: {
        borderColor: '$success',
        focusStyle: {
          borderColor: '$success',
          shadowColor: '$success',
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

// RadioGroup Indicator - Rule 2: Use building blocks
const RadioGroupIndicator = styled(TamaguiRadioGroup.Indicator, {
  name: 'RadioGroupIndicator',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    variant: {
      default: {
        color: '$primary',
      },
      error: {
        color: '$destructive',
      },
      success: {
        color: '$success',
      },
    },
  } as const,
});

// Label component - Rule 2: Use Text building block
const RadioLabel = styled(Text, {
  name: 'RadioLabel',
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
const RadioDescription = styled(Text, {
  name: 'RadioDescription',
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

// Group Label component
const GroupLabel = styled(Text, {
  name: 'GroupLabel',
  fontSize: '$4',
  fontWeight: '600',
  color: '$color',
  marginBottom: '$2',
});

// Group Description component
const GroupDescription = styled(Text, {
  name: 'GroupDescription',
  fontSize: '$3',
  color: '$gray10',
  marginBottom: '$3',
});

// Main RadioGroup Component - Rule 0: Pure presentation, no business logic
export const RadioGroup = ({
  size = 'md',
  variant = 'default',
  orientation = 'vertical',
  items,
  label,
  description,
  disabled,
  ...props
}: RadioGroupProps) => {
  return (
    <YStack space="$2">
      {/* Group Label */}
      {label && <GroupLabel>{label}</GroupLabel>}

      {/* Group Description */}
      {description && <GroupDescription>{description}</GroupDescription>}

      {/* RadioGroup Container */}
      <StyledRadioGroup
        {...props}
        orientation={orientation}
        disabled={disabled}
      >
        {items.map((item) => {
          const itemId = `radio-${item.value}-${Math.random().toString(36).substr(2, 9)}`;

          return (
            <XStack key={item.value} alignItems="flex-start" space="$3">
              <RadioGroupItemComponent
                value={item.value}
                id={itemId}
                size={size}
                variant={variant}
                disabled={disabled || item.disabled}
              >
                <RadioGroupIndicator variant={variant}>
                  <Icon
                    size={size === 'sm' ? 'xs' : size === 'md' ? 'xs' : 'sm'}
                  >
                    <Circle fill="currentColor" />
                  </Icon>
                </RadioGroupIndicator>
              </RadioGroupItemComponent>

              <YStack flexGrow={1} space="$1">
                <RadioLabel
                  size={size}
                  disabled={disabled || item.disabled}
                  htmlFor={itemId}
                  tag="label"
                >
                  {item.label}
                </RadioLabel>
                {item.description && (
                  <RadioDescription disabled={disabled || item.disabled}>
                    {item.description}
                  </RadioDescription>
                )}
              </YStack>
            </XStack>
          );
        })}
      </StyledRadioGroup>
    </YStack>
  );
};