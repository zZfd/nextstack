import React, { cloneElement, isValidElement } from 'react';
import { styled, StackProps, View } from 'tamagui';

// Rule 4: Explicit TypeScript interfaces
export interface IconProps extends StackProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

// Rule 1 & 3: Token-based styling with proper variants
export const IconFrame = styled(View, {
  name: 'Icon',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,

  variants: {
    size: {
      xs: {
        width: '$3',
        height: '$3',
      },
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
      xl: {
        width: '$7',
        height: '$7',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

// Rule 0: Pure presentation component
export const Icon = ({ children, size = 'md', color, ...props }: IconProps) => {
  // Map size variant to actual pixel values for Lucide icons
  const getIconPixelSize = (sizeVariant: typeof size): number => {
    switch (sizeVariant) {
      case 'xs':
        return 12;
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      case 'xl':
        return 28;
      default:
        return 20;
    }
  };

  // Clone icon and apply proper props
  const clonedIcon = isValidElement(children)
    ? cloneElement(
        children as React.ReactElement<{ size?: number; color?: string }>,
        {
          size: getIconPixelSize(size),
          color: color,
          ...(children.props || {}),
        }
      )
    : children;

  return (
    <IconFrame size={size} {...props}>
      {clonedIcon}
    </IconFrame>
  );
};
