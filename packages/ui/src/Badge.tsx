import { styled, XStack } from 'tamagui';

// Base Badge component following design guide
export const Badge = styled(XStack, {
  name: 'Badge',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$2', // rounded-md
  borderWidth: 1,
  borderColor: 'transparent',
  paddingHorizontal: '$2', // px-2
  paddingVertical: '$1',   // py-1
  
  // Default variant - gray
  backgroundColor: '$muted',
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$muted',
        hoverStyle: {
          backgroundColor: '$mutedHover',
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        hoverStyle: {
          backgroundColor: '$secondaryHover',
        },
      },
      destructive: {
        backgroundColor: '$destructive',
        hoverStyle: {
          backgroundColor: '$destructiveHover',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$borderColor',
        hoverStyle: {
          backgroundColor: '$accent',
          borderColor: '$borderColorHover',
        },
      },
      success: {
        backgroundColor: '$success',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      warning: {
        backgroundColor: '$warning',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      info: {
        backgroundColor: '$info',
        hoverStyle: {
          opacity: 0.9,
        },
      },
    },
    size: {
      sm: {
        paddingHorizontal: '$1',
        paddingVertical: 0,
        minHeight: 16,
      },
      md: {
        paddingHorizontal: '$2',
        paddingVertical: '$1',
        minHeight: 20,
      },
      lg: {
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        minHeight: 24,
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

// Notification Badge (small circular badge)
export const NotificationBadge = styled(XStack, {
  name: 'NotificationBadge',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$6', // fully rounded
  backgroundColor: '$destructive',
  minWidth: 16,
  minHeight: 16,
  paddingHorizontal: '$1',
  
  variants: {
    size: {
      sm: {
        minWidth: 12,
        minHeight: 12,
      },
      md: {
        minWidth: 16,
        minHeight: 16,
      },
      lg: {
        minWidth: 20,
        minHeight: 20,
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

// Status Badge for online/offline indicators
export const StatusBadge = styled(XStack, {
  name: 'StatusBadge',
  width: 8,
  height: 8,
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