import { styled, Text, XStack, TextProps, XStackProps } from 'tamagui';

// Badge Props Interface - Rule 4: Explicit TypeScript interfaces
export interface BadgeProps extends TextProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

// Base Badge component following design guide
export const Badge = styled(Text, {
  name: 'Badge',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2', // rounded-md
  borderWidth: 1,
  borderColor: 'transparent',
  paddingHorizontal: '$2', // px-2
  paddingVertical: '$1',   // py-1
  fontSize: '$3',
  fontWeight: '500',
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$muted',
        color: '$mutedForeground',
        hoverStyle: {
          backgroundColor: '$mutedHover',
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$secondaryForeground',
        hoverStyle: {
          backgroundColor: '$secondaryHover',
        },
      },
      destructive: {
        backgroundColor: '$destructive',
        color: '$destructiveForeground',
        hoverStyle: {
          backgroundColor: '$destructiveHover',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$borderColor',
        color: '$color',
        hoverStyle: {
          backgroundColor: '$accent',
          borderColor: '$borderColorHover',
        },
      },
      success: {
        backgroundColor: '$success',
        color: '$successForeground',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      warning: {
        backgroundColor: '$warning',
        color: '$warningForeground',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      info: {
        backgroundColor: '$info',
        color: '$infoForeground',
        hoverStyle: {
          opacity: 0.9,
        },
      },
    },
    size: {
      sm: {
        paddingHorizontal: '$1',
        paddingVertical: 0,
        fontSize: '$2',
        minHeight: '$minHeight.sm',
      },
      md: {
        paddingHorizontal: '$2',
        paddingVertical: '$1',
        fontSize: '$3',
        minHeight: '$minHeight.md',
      },
      lg: {
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        fontSize: '$4',
        minHeight: '$minHeight.lg',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },

  // Smooth transitions
  animation: 'quick',
});

// DotBadge Props Interface
export interface DotBadgeProps extends XStackProps {
  status?: 'online' | 'offline' | 'busy' | 'away';
}

// Badge with dot indicator
export const DotBadge = styled(XStack, {
  name: 'DotBadge',
  alignItems: 'center',
  gap: '$2',
  
  variants: {
    status: {
      online: {
        // Green dot
      },
      offline: {
        // Gray dot  
      },
      busy: {
        // Red dot
      },
      away: {
        // Yellow dot
      },
    },
  } as const,
});

// NotificationBadge Props Interface
export interface NotificationBadgeProps extends XStackProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'destructive' | 'success' | 'warning';
}

// Notification Badge (small circular badge)
export const NotificationBadge = styled(XStack, {
  name: 'NotificationBadge',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$6', // fully rounded
  backgroundColor: '$destructive',
  minWidth: '$minHeight.sm',
  minHeight: '$minHeight.sm',
  paddingHorizontal: '$1',

  variants: {
    size: {
      sm: {
        minWidth: '$3',
        minHeight: '$3',
      },
      md: {
        minWidth: '$minHeight.sm',
        minHeight: '$minHeight.sm',
      },
      lg: {
        minWidth: '$minHeight.md',
        minHeight: '$minHeight.md',
      },
    },
    color: {
      primary: {
        backgroundColor: '$primary',
      },
      destructive: {
        backgroundColor: '$destructive',
      },
      success: {
        backgroundColor: '$success',
      },
      warning: {
        backgroundColor: '$warning',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
    color: 'destructive',
  },
});

// StatusBadge Props Interface
export interface StatusBadgeProps extends XStackProps {
  status?: 'online' | 'offline' | 'busy' | 'away';
}

// Status Badge for online/offline indicators
export const StatusBadge = styled(XStack, {
  name: 'StatusBadge',
  width: '$2',
  height: '$2',
  borderRadius: '$6', // fully rounded
  borderWidth: 2,
  borderColor: '$background',
  
  variants: {
    status: {
      online: {
        backgroundColor: '$success',
      },
      offline: {
        backgroundColor: '$mutedForeground',
      },
      busy: {
        backgroundColor: '$destructive',
      },
      away: {
        backgroundColor: '$warning',
      },
    },
  } as const,

  defaultVariants: {
    status: 'offline',
  },
});