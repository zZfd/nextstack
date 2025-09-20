import { Search, X } from '@tamagui/lucide-icons';
import { styled, XStack, YStack, Text } from 'tamagui';

import { Icon } from '../../general';
import { Input, InputProps } from '../input';

// SearchBar Props Interface - Rule 4: Explicit TypeScript interfaces
export interface SearchBarProps extends InputProps {
  onClear?: () => void;
  showClearButton?: boolean;
  iconPosition?: 'left' | 'right';
  label?: string;
  description?: string;
}

// Search Icon Container - Rule 2: Use building blocks
const SearchIconContainer = styled(XStack, {
  name: 'SearchIconContainer',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2',

  variants: {
    position: {
      left: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      right: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
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

// Clear Button - Rule 2: Use building blocks
const ClearButton = styled(XStack, {
  name: 'ClearButton',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$2',
  cursor: 'pointer',
  borderRadius: '$2',

  hoverStyle: {
    backgroundColor: '$gray4',
  },

  pressStyle: {
    backgroundColor: '$gray5',
    scale: 0.95,
  },

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

// SearchBar Input - extends base Input with icon spacing
const SearchInput = styled(Input, {
  name: 'SearchInput',

  variants: {
    iconPosition: {
      left: {
        paddingLeft: '$10',
      },
      right: {
        paddingRight: '$10',
      },
    },
    withClear: {
      true: {
        paddingRight: '$10',
      },
    },
  } as const,
});

// Label component - Rule 2: Use Text building block
const SearchLabel = styled(Text, {
  name: 'SearchLabel',
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
const SearchDescription = styled(Text, {
  name: 'SearchDescription',
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

// Main SearchBar Component - Rule 0: Pure presentation, no business logic
export const SearchBar = ({
  size = 'md',
  variant = 'default',
  iconPosition = 'left',
  showClearButton = true,
  onClear,
  label,
  description,
  disabled,
  value,
  placeholder = 'Search...',
  ...props
}: SearchBarProps) => {
  const hasValue = value && value.toString().length > 0;
  const showClear = showClearButton && hasValue && !disabled;

  const searchElement = (
    <XStack position='relative' alignItems='center'>
      {/* Search Icon */}
      <SearchIconContainer
        // @ts-expect-error - Tamagui typing limitation with position variant
        position={iconPosition}
        size={size}
        left={iconPosition === 'left' ? 0 : undefined}
        right={iconPosition === 'right' ? 0 : undefined}
        zIndex={1}
      >
        <Icon
          size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
          color='$gray9'
        >
          <Search />
        </Icon>
      </SearchIconContainer>

      {/* Input Field */}
      <SearchInput
        {...props}
        size={size}
        variant={variant}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        iconPosition={iconPosition}
        withClear={showClear ? true : undefined}
        flex={1}
      />

      {/* Clear Button */}
      {showClear && (
        <ClearButton
          size={size}
          position='absolute'
          right='$1'
          zIndex={1}
          onPress={onClear}
          tag='button'
        >
          <Icon
            size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'md'}
          >
            <X />
          </Icon>
        </ClearButton>
      )}
    </XStack>
  );

  // If no label, return just the search bar
  if (!label && !description) {
    return searchElement;
  }

  // Return search bar with label and optional description - Rule 2: Use building blocks
  return (
    <YStack space='$2'>
      {label && <SearchLabel disabled={disabled}>{label}</SearchLabel>}
      {searchElement}
      {description && (
        <SearchDescription disabled={disabled}>{description}</SearchDescription>
      )}
    </YStack>
  );
};
