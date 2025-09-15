import { styled, XStack, YStack, Image, Text, XStackProps, ImageProps, TextProps } from 'tamagui';

// Avatar Props Interface - Rule 4: Explicit TypeScript interfaces
export interface AvatarProps extends XStackProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gradient?: boolean | 'brand' | 'sunset' | 'ocean';
}

// Base Avatar container
export const Avatar = styled(XStack, {
  name: 'Avatar',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$6', // fully rounded
  backgroundColor: '$muted',
  overflow: 'hidden',
  position: 'relative',
  
  variants: {
    size: {
      sm: {
        width: '$height.sm',
        height: '$height.sm',
      },
      md: {
        width: '$height.md',
        height: '$height.md',
      },
      lg: {
        width: '$height.lg',
        height: '$height.lg',
      },
      xl: {
        width: '$height.xl',
        height: '$height.xl',
      },
      '2xl': {
        width: '$height.2xl',
        height: '$height.2xl',
      },
    },
    gradient: {
      true: {
        // Gradient border effect using padding + background
        padding: '$1',
        background: 'linear-gradient(135deg, $blue6, $purple6)',
      },
      brand: {
        padding: '$1',
        background: 'linear-gradient(135deg, $green6, $teal6)',
      },
      sunset: {
        padding: '$1',
        background: 'linear-gradient(135deg, $orange6, $red6)',
      },
      ocean: {
        padding: '$1',
        background: 'linear-gradient(135deg, $blue6, $teal6)',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

// AvatarImage Props Interface
export interface AvatarImageProps extends ImageProps {}

// Avatar Image component
export const AvatarImage = styled(Image, {
  name: 'AvatarImage',
  width: '100%',
  height: '100%',
  borderRadius: '$6',
  objectFit: 'cover',
});

// AvatarFallback Props Interface
export interface AvatarFallbackProps extends XStackProps {
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'purple' | 'teal' | 'emerald';
}

// Avatar Fallback component for initials or icon
export const AvatarFallback = styled(XStack, {
  name: 'AvatarFallback',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '$primary',
  borderRadius: '$6',
  
  variants: {
    color: {
      primary: {
        backgroundColor: '$primary',
      },
      secondary: {
        backgroundColor: '$secondary',
      },
      success: {
        backgroundColor: '$success',
      },
      warning: {
        backgroundColor: '$warning',
      },
      destructive: {
        backgroundColor: '$destructive',
      },
      purple: {
        backgroundColor: '$purple9',
      },
      teal: {
        backgroundColor: '$teal9',
      },
      emerald: {
        backgroundColor: '$emerald9',
      },
    },
  } as const,

  defaultVariants: {
    color: 'primary',
  },
});

// AvatarFallbackText Props Interface
export interface AvatarFallbackTextProps extends TextProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

// Avatar Fallback Text (initials)
export const AvatarFallbackText = styled(Text, {
  name: 'AvatarFallbackText',
  color: '$white',
  fontWeight: '600',
  textAlign: 'center',
  
  variants: {
    size: {
      sm: {
        fontSize: '$3', // 12px
      },
      md: {
        fontSize: '$4', // 14px
      },
      lg: {
        fontSize: '$5', // 16px
      },
      xl: {
        fontSize: '$6', // 18px
      },
      '2xl': {
        fontSize: '$7', // 20px
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

// AvatarGroup Props Interface
export interface AvatarGroupProps extends XStackProps {
  spacing?: 'tight' | 'normal' | 'loose';
}

// Avatar Group for multiple avatars
export const AvatarGroup = styled(XStack, {
  name: 'AvatarGroup',
  alignItems: 'center',
  
  variants: {
    spacing: {
      tight: {
        gap: -8, // Overlapping avatars
      },
      normal: {
        gap: '$2',
      },
      loose: {
        gap: '$4',
      },
    },
  } as const,

  defaultVariants: {
    spacing: 'tight',
  },
});

// Rule 0: No business logic in UI components - CompoundAvatar removed
// Use individual Avatar, AvatarImage, AvatarFallback components for composition

// Online Status Avatar (with status indicator)
export const StatusAvatar = styled(YStack, {
  name: 'StatusAvatar',
  position: 'relative',
});

// StatusIndicator Props Interface
export interface StatusIndicatorProps extends XStackProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const StatusIndicator = styled(XStack, {
  name: 'StatusIndicator',
  position: 'absolute',
  bottom: 0,
  right: 0,
  borderRadius: '$6',
  borderWidth: 2,
  borderColor: '$background',

  variants: {
    size: {
      sm: {
        width: '$2',
        height: '$2',
      },
      md: {
        width: '$3',
        height: '$3',
      },
      lg: {
        width: '$4',
        height: '$4',
      },
      xl: {
        width: '$5',
        height: '$5',
      },
      '2xl': {
        width: '$6',
        height: '$6',
      },
    },
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
    size: 'md',
    status: 'offline',
  },
});