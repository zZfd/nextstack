import React from 'react';
import { styled, XStack, YStack, Image, Text } from 'tamagui';

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
        width: 32,
        height: 32,
      },
      md: {
        width: 40,
        height: 40,
      },
      lg: {
        width: 48,
        height: 48,
      },
      xl: {
        width: 64,
        height: 64,
      },
      '2xl': {
        width: 80,
        height: 80,
      },
    },
    gradient: {
      true: {
        // Gradient border effect using padding + background
        padding: 2,
        background: 'linear-gradient(135deg, $blue6, $purple6)',
      },
      brand: {
        padding: 2,
        background: 'linear-gradient(135deg, $green6, $teal6)',
      },
      sunset: {
        padding: 2,
        background: 'linear-gradient(135deg, $orange6, $red6)',
      },
      ocean: {
        padding: 2,
        background: 'linear-gradient(135deg, $blue6, $teal6)',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

// Avatar Image component
export const AvatarImage = styled(Image, {
  name: 'AvatarImage',
  width: '100%',
  height: '100%',
  borderRadius: '$6',
  objectFit: 'cover',
});

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

// Compound Avatar component
export interface CompoundAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gradient?: boolean | 'brand' | 'sunset' | 'ocean';
  fallbackColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'purple' | 'teal' | 'emerald';
}

export const CompoundAvatar: React.FC<CompoundAvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  gradient,
  fallbackColor = 'primary',
}) => {
  return (
    <Avatar size={size} gradient={gradient}>
      {src ? (
        <AvatarImage source={{ uri: src }} alt={alt} />
      ) : (
        <AvatarFallback color={fallbackColor}>
          <AvatarFallbackText size={size}>
            {fallback || '?'}
          </AvatarFallbackText>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

// Online Status Avatar (with status indicator)
export const StatusAvatar = styled(YStack, {
  name: 'StatusAvatar',
  position: 'relative',
});

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
        width: 8,
        height: 8,
      },
      md: {
        width: 10,
        height: 10,
      },
      lg: {
        width: 12,
        height: 12,
      },
      xl: {
        width: 16,
        height: 16,
      },
      '2xl': {
        width: 20,
        height: 20,
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