import {
  Slider as TamaguiSlider,
  styled,
  SliderProps as TamaguiSliderProps,
  YStack,
  Text,
  XStack,
} from 'tamagui';

// Slider Props Interface - Rule 4: Explicit TypeScript interfaces
export interface SliderProps extends Omit<TamaguiSliderProps,
  'size' | 'hoverStyle' | 'pressStyle' | 'focusStyle' | 'focusWithinStyle' | 'focusVisibleStyle' |
  'enterStyle' | 'exitStyle' | 'disabledStyle'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  label?: string;
  description?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

// Base Slider component - Rule 1: Token-based values only
const StyledSlider = styled(TamaguiSlider, {
  name: 'Slider',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',

  variants: {
    size: {
      sm: {
        height: '$4',
      },
      md: {
        height: '$5',
      },
      lg: {
        height: '$6',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

// Slider Track - Rule 1: Token-based styling
const SliderTrack = styled(TamaguiSlider.Track, {
  name: 'SliderTrack',
  backgroundColor: '$gray6',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '$6',

  variants: {
    size: {
      sm: {
        height: '$1',
      },
      md: {
        height: '$1.5',
      },
      lg: {
        height: '$2',
      },
    },
  } as const,
});

// Slider Track Active - Rule 1: Token-based styling
const SliderTrackActive = styled(TamaguiSlider.TrackActive, {
  name: 'SliderTrackActive',
  backgroundColor: '$primary',
  position: 'absolute',
  borderRadius: '$6',
  height: '100%',

  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',
      },
      error: {
        backgroundColor: '$destructive',
      },
      success: {
        backgroundColor: '$success',
      },
    },
  } as const,
});

// Slider Thumb - Rule 2: Use building blocks with animation
const SliderThumb = styled(TamaguiSlider.Thumb, {
  name: 'SliderThumb',
  backgroundColor: '$background',
  borderRadius: '$6',
  borderWidth: 2,
  borderColor: '$primary',
  shadowColor: '$shadowColor',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  cursor: 'pointer',

  // Focus styles
  focusStyle: {
    outlineStyle: 'none',
    shadowColor: '$ring',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    scale: 1.1,
  },

  // Hover styles
  hoverStyle: {
    scale: 1.05,
  },

  variants: {
    size: {
      sm: {
        width: '$4',
        height: '$4',
      },
      md: {
        width: '$5',
        height: '$5',
      },
      lg: {
        width: '$6',
        height: '$6',
      },
    },
    variant: {
      default: {
        borderColor: '$primary',
        focusStyle: {
          shadowColor: '$ring',
        },
      },
      error: {
        borderColor: '$destructive',
        focusStyle: {
          shadowColor: '$destructive',
        },
      },
      success: {
        borderColor: '$success',
        focusStyle: {
          shadowColor: '$success',
        },
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        hoverStyle: {
          scale: 1,
        },
      },
    },
  } as const,
});

// Label component - Rule 2: Use Text building block
const SliderLabel = styled(Text, {
  name: 'SliderLabel',
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
const SliderDescription = styled(Text, {
  name: 'SliderDescription',
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

// Value display component
const SliderValue = styled(Text, {
  name: 'SliderValue',
  fontSize: '$3',
  fontWeight: '600',
  color: '$primary',
  minWidth: '$8',
  textAlign: 'center',

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
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
});

// Main Slider Component - Rule 0: Pure presentation, no business logic
export const Slider = ({
  size = 'md',
  variant = 'default',
  label,
  description,
  showValue = false,
  formatValue = (value: number) => value.toString(),
  disabled,
  value,
  defaultValue,
  ...restProps
}: SliderProps) => {
  const currentValue = value ?? defaultValue ?? [0];
  const displayValue = Array.isArray(currentValue) ? currentValue[0] : currentValue;

  const sliderElement = (
    <XStack alignItems="center" space="$3" flexGrow={1}>
      {/* @ts-expect-error - Tamagui styling type conflict with size variants */}
      <StyledSlider
        {...restProps}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        flexGrow={1}
      >
        <SliderTrack size={size}>
          <SliderTrackActive variant={variant} />
        </SliderTrack>
        <SliderThumb
          size={size}
          variant={variant}
          disabled={disabled}
          circular
          index={0}
        />
      </StyledSlider>
      {showValue && (
        <SliderValue
          variant={variant}
          disabled={disabled}
        >
          {formatValue(displayValue)}
        </SliderValue>
      )}
    </XStack>
  );

  // If no label, return just the slider
  if (!label && !description) {
    return sliderElement;
  }

  // Return slider with label and optional description - Rule 2: Use building blocks
  return (
    <YStack space="$2">
      {label && (
        <SliderLabel disabled={disabled}>
          {label}
        </SliderLabel>
      )}
      {sliderElement}
      {description && (
        <SliderDescription disabled={disabled}>
          {description}
        </SliderDescription>
      )}
    </YStack>
  );
};