import { Input as TamaguiInput, styled, InputProps as TamaguiInputProps, YStack, YStackProps, Text } from 'tamagui';

// Input Props Interface - Rule 4: Explicit TypeScript interfaces
export interface InputProps extends TamaguiInputProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
}

// Base Input component - Rule 1: Token-based values only
export const Input = styled(TamaguiInput, {
  name: 'Input',
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: '$input',
  color: '$color',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  fontSize: '$4',
  height: '$height.md', // Rule 1: Use token instead of hardcoded 40

  // Focus styles
  focusStyle: {
    borderColor: '$ring',
    outlineStyle: 'none',
    shadowColor: '$ring',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
  },

  // Placeholder styles
  placeholderTextColor: '$placeholderColor',

  // Rule 3: Use variants instead of separate components
  variants: {
    size: {
      sm: {
        height: '$height.sm',
        fontSize: '$3',
        paddingHorizontal: '$2',
      },
      md: {
        height: '$height.md',
        fontSize: '$4',
        paddingHorizontal: '$3',
      },
      lg: {
        height: '$height.lg',
        fontSize: '$5',
        paddingHorizontal: '$4',
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
        backgroundColor: '$muted',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

// FormLabel component - Rule 2: Use Tamagui building blocks
export const FormLabel = styled(Text, {
  name: 'FormLabel',
  fontSize: '$4',
  fontWeight: '500',
  color: '$color',
  marginBottom: '$2',
});

// FormError component - Pure presentation
export const FormError = styled(Text, {
  name: 'FormError',
  fontSize: '$3',
  color: '$destructive',
  marginTop: '$1',
});

// FormSuccess component - Pure presentation
export const FormSuccess = styled(Text, {
  name: 'FormSuccess',
  fontSize: '$3',
  color: '$success',
  marginTop: '$1',
});

// FormField container - Rule 2: Use YStack building block
export interface FormFieldProps extends YStackProps {
  // Pure presentation props only - Rule 0: No business logic
}

export const FormField = styled(YStack, {
  name: 'FormField',
  space: '$2',
});

// Textarea component - Rule 1: Token-based styling
export interface TextareaProps extends TamaguiInputProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Textarea = styled(TamaguiInput, {
  name: 'Textarea',
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: '$input',
  color: '$color',
  paddingHorizontal: '$3',
  paddingVertical: '$3',
  fontSize: '$4',
  minHeight: '$20', // Rule 1: Use token instead of hardcoded 80
  multiline: true,
  numberOfLines: 4,

  focusStyle: {
    borderColor: '$ring',
    outlineStyle: 'none',
    shadowColor: '$ring',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
  },

  placeholderTextColor: '$placeholderColor',

  variants: {
    size: {
      sm: {
        fontSize: '$3',
        paddingHorizontal: '$2',
        paddingVertical: '$2',
        minHeight: '$16',
      },
      md: {
        fontSize: '$4',
        paddingHorizontal: '$3',
        paddingVertical: '$3',
        minHeight: '$20',
      },
      lg: {
        fontSize: '$5',
        paddingHorizontal: '$4',
        paddingVertical: '$4',
        minHeight: '$24',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});