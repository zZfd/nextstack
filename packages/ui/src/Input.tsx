import React from 'react';
import { Input as TamaguiInput, styled, YStack, Text } from 'tamagui';

// Base Input component following design guide
export const Input = styled(TamaguiInput, {
  name: 'Input',
  borderRadius: '$2', // rounded-md
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: '$input',
  color: '$color',
  paddingHorizontal: '$3', // px-3
  paddingVertical: '$2',   // py-2
  fontSize: '$4',          // text-sm
  height: 40,              // h-10
  
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

  // Disabled styles
  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        backgroundColor: '$muted',
      },
    },
    error: {
      true: {
        borderColor: '$destructive',
        focusStyle: {
          borderColor: '$destructive',
          shadowColor: '$destructive',
        },
      },
    },
    success: {
      true: {
        borderColor: '$success',
        focusStyle: {
          borderColor: '$success',
          shadowColor: '$success',
        },
      },
    },
  } as const,
});

// Input with Label wrapper
export interface InputWithLabelProps {
  label?: string;
  error?: string;
  success?: string;
  required?: boolean;
  children: React.ReactElement;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  error,
  success,
  required,
  children,
}) => {
  return (
    <YStack space="$2">
      {label && (
        <Text 
          fontSize="$4" 
          fontWeight="500" 
          color="$color"
        >
          {label}
          {required && (
            <Text color="$destructive" marginLeft="$1">*</Text>
          )}
        </Text>
      )}
      
      {children}
      
      {/* Error message */}
      {error && (
        <Text 
          fontSize="$3" 
          color="$destructive"
          marginTop="$1"
        >
          {error}
        </Text>
      )}
      
      {/* Success message */}
      {success && (
        <Text 
          fontSize="$3" 
          color="$success"
          marginTop="$1"
        >
          {success}
        </Text>
      )}
    </YStack>
  );
};

// Input variants for different sizes
export const SmallInput = styled(Input, {
  height: 36,
  fontSize: '$3',
  paddingHorizontal: '$2',
});

export const LargeInput = styled(Input, {
  height: 44,
  fontSize: '$5',
  paddingHorizontal: '$4',
});

// Textarea variant
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
  minHeight: 80,
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
});

// Search Input with icon (conceptual - would need icon implementation)
export const SearchInput = styled(Input, {
  paddingLeft: '$10', // Leave space for search icon
  
  variants: {
    size: {
      sm: {
        paddingLeft: '$8',
        maxWidth: '$maxWidth.sm', // 448px from design guide
      },
      md: {
        paddingLeft: '$10',
        maxWidth: '$maxWidth.md', // 896px from design guide
      },
    },
  } as const,
});