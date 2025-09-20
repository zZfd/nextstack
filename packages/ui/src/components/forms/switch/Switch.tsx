import {
  Switch as TamaguiSwitch,
  styled,
  SwitchProps as TamaguiSwitchProps,
  XStack,
  Text,
  YStack,
} from 'tamagui';

// Switch Props Interface - Rule 4: Explicit TypeScript interfaces
export interface SwitchProps extends Omit<TamaguiSwitchProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  label?: string;
  description?: string;
}

// Base Switch component - Rule 1: Token-based values only
const StyledSwitch = styled(TamaguiSwitch, {
  name: 'Switch',
  backgroundColor: '$gray6',
  borderRadius: '$6',
  borderWidth: 0,

  // Focus styles
  focusStyle: {
    outlineStyle: 'none',
    shadowColor: '$ring',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
  },

  // Checked state styles
  pressStyle: {
    backgroundColor: '$primary',
  },

  // Rule 3: Use variants instead of conditional styling
  variants: {
    size: {
      sm: {
        size: '$5',
      },
      md: {
        size: '$6',
      },
      lg: {
        size: '$7',
      },
    },
    variant: {
      default: {
        backgroundColor: '$gray6',
        pressStyle: {
          backgroundColor: '$primary',
        },
        focusStyle: {
          shadowColor: '$ring',
        },
      },
      error: {
        backgroundColor: '$gray6',
        pressStyle: {
          backgroundColor: '$destructive',
        },
        focusStyle: {
          shadowColor: '$destructive',
        },
      },
      success: {
        backgroundColor: '$gray6',
        pressStyle: {
          backgroundColor: '$success',
        },
        focusStyle: {
          shadowColor: '$success',
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// Switch Thumb - Rule 2: Use building blocks with animation
const SwitchThumb = styled(TamaguiSwitch.Thumb, {
  name: 'SwitchThumb',
  backgroundColor: '$background',
  borderRadius: '$6',
  shadowColor: '$shadowColor',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,

  variants: {
    size: {
      sm: {
        size: '$3',
      },
      md: {
        size: '$4',
      },
      lg: {
        size: '$5',
      },
    },
  } as const,
});

// Label component - Rule 2: Use Text building block
const SwitchLabel = styled(Text, {
  name: 'SwitchLabel',
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
const SwitchDescription = styled(Text, {
  name: 'SwitchDescription',
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

// Main Switch Component - Rule 0: Pure presentation, no business logic
export const Switch = ({
  size = 'md',
  variant = 'default',
  label,
  description,
  disabled,
  ...props
}: SwitchProps) => {
  const switchId = props.id || `switch-${Math.random().toString(36).substr(2, 9)}`;

  const switchElement = (
    <StyledSwitch
      {...props}
      id={switchId}
      size={size}
      variant={variant}
      disabled={disabled}
    >
      <SwitchThumb
        size={size}
        animation="bouncy"
      />
    </StyledSwitch>
  );

  // If no label, return just the switch
  if (!label && !description) {
    return switchElement;
  }

  // Return switch with label and optional description - Rule 2: Use building blocks
  return (
    <XStack alignItems="flex-start" space="$3">
      {switchElement}
      <YStack flexGrow={1} space="$1">
        {label && (
          <SwitchLabel
            size={size}
            disabled={disabled}
            htmlFor={switchId}
            tag="label"
          >
            {label}
          </SwitchLabel>
        )}
        {description && (
          <SwitchDescription disabled={disabled}>
            {description}
          </SwitchDescription>
        )}
      </YStack>
    </XStack>
  );
};