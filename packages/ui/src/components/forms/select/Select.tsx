import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import {
  Select as TamaguiSelect,
  Adapt,
  Sheet,
  styled,
  SelectProps as TamaguiSelectProps,
  XStack,
} from 'tamagui';

import { Icon } from '../../general';

// Select Props Interface - Rule 4: Explicit TypeScript interfaces
export interface SelectProps extends TamaguiSelectProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  placeholder?: string;
  items: SelectItem[];
  disabled?: boolean;
}

export interface SelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

// Select Trigger - Rule 1: Token-based styling, Rule 2: Use building blocks
const SelectTrigger = styled(TamaguiSelect.Trigger, {
  name: 'SelectTrigger',
  borderRadius: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
  backgroundColor: '$input',
  color: '$color',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  fontSize: '$4',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',

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

// Select Value component for placeholder display
const SelectValue = styled(TamaguiSelect.Value, {
  name: 'SelectValue',
  placeholder: '$placeholderColor',
  flex: 1,
  textAlign: 'left',
});

// Select Content - styled for consistent appearance
const SelectContent = styled(TamaguiSelect.Content, {
  name: 'SelectContent',
  backgroundColor: '$popover',
  borderRadius: '$3',
  borderWidth: 1,
  borderColor: '$borderColor',
  shadowColor: '$shadowColor',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 12,
  padding: '$1',
  maxHeight: 300,
  overflow: 'hidden',
});

// Select Viewport for scrollable content
const SelectViewport = styled(TamaguiSelect.Viewport, {
  name: 'SelectViewport',
  gap: '$1',
});

// Select Item - styled consistently with other form elements
const SelectItemComponent = styled(TamaguiSelect.Item, {
  name: 'SelectItem',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  borderRadius: '$2',
  cursor: 'pointer',

  // Hover and focus styles
  hoverStyle: {
    backgroundColor: '$accent',
  },

  focusStyle: {
    backgroundColor: '$accent',
    outlineStyle: 'none',
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        hoverStyle: {
          backgroundColor: 'transparent',
        },
      },
    },
  } as const,
});

// Select ItemText for text display
const SelectItemText = styled(TamaguiSelect.ItemText, {
  name: 'SelectItemText',
  fontSize: '$4',
  color: '$color',
});

// Scroll buttons for long lists
const SelectScrollButton = styled(TamaguiSelect.ScrollUpButton, {
  name: 'SelectScrollButton',
  alignItems: 'center',
  justifyContent: 'center',
  height: '$6',
  cursor: 'pointer',
  backgroundColor: '$popover',

  hoverStyle: {
    backgroundColor: '$accent',
  },
});

// Main Select Component - Rule 0: Pure presentation, no business logic
export const Select = ({
  size = 'md',
  variant = 'default',
  placeholder = 'Select an option...',
  items,
  disabled,
  ...props
}: SelectProps) => {
  return (
    <TamaguiSelect {...props}>
      <SelectTrigger size={size} variant={variant} disabled={disabled}>
        <SelectValue placeholder={placeholder} />
        <XStack alignItems='center' marginLeft='$2'>
          <Icon size='sm' color='$color'>
            <ChevronDown />
          </Icon>
        </XStack>
      </SelectTrigger>

      {/* Adapt to Sheet on mobile/touch devices - Rule 2: Use Tamagui building blocks */}
      <Adapt when='sm' platform='touch'>
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <SelectContent>
        <SelectScrollButton>
          <Icon size='sm' color='$color'>
            <ChevronUp />
          </Icon>
        </SelectScrollButton>

        <SelectViewport>
          {items.map(item => (
            <SelectItemComponent
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              index={0}
            >
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItemComponent>
          ))}
        </SelectViewport>

        <TamaguiSelect.ScrollDownButton asChild>
          <SelectScrollButton>
            <Icon size='sm' color='$color'>
              <ChevronDown />
            </Icon>
          </SelectScrollButton>
        </TamaguiSelect.ScrollDownButton>
      </SelectContent>
    </TamaguiSelect>
  );
};

// Export types for external use
export type { SelectItem };
