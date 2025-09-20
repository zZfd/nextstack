import {
  Button,
  Card,
  Text,
  YStack,
  XStack,
  Avatar,
  Popover,
  Separator,
} from '@nextstack/ui';
import { LogOut, User, Settings } from '@tamagui/lucide-icons';
import type { JSX } from 'react';
import { useState } from 'react';

import { useAuth } from '../hooks/useAuth';

export interface UserMenuProps {
  user?: {
    id: string;
    name?: string;
    email: string;
    image?: string;
  };
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  showAvatar?: boolean;
  placement?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';
}

export function UserMenu({
  user,
  onProfileClick,
  onSettingsClick,
  showAvatar = true,
  placement = 'bottom-end',
}: UserMenuProps): JSX.Element {
  const { signOut, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async (): Promise<void> => {
    setIsOpen(false);
    await signOut();
  };

  const handleProfileClick = (): void => {
    setIsOpen(false);
    onProfileClick?.();
  };

  const handleSettingsClick = (): void => {
    setIsOpen(false);
    onSettingsClick?.();
  };

  if (!user) {
    return <></>;
  }

  const displayName = user.name || user.email.split('@')[0];
  const avatarFallback = displayName.slice(0, 2).toUpperCase();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} placement={placement}>
      <Popover.Trigger asChild>
        <Button
          variant="outlined"
          size="$3"
          circular={showAvatar}
          chromeless
          pressStyle={{ scale: 0.95 }}
        >
          {showAvatar ? (
            <XStack space="$2" alignItems="center">
              <Avatar circular size="$2">
                <Avatar.Image source={{ uri: user.image || undefined }} />
                <Avatar.Fallback backgroundColor="$blue10">
                  <Text color="white" fontSize="$2" fontWeight="600">
                    {avatarFallback}
                  </Text>
                </Avatar.Fallback>
              </Avatar>
              <Text fontWeight="500">{displayName}</Text>
            </XStack>
          ) : (
            <XStack space="$2" alignItems="center">
              <User size="$1" />
              <Text fontWeight="500">{displayName}</Text>
            </XStack>
          )}
        </Button>
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$background"
        padding="$0"
        elevation="$4"
        animateOnly={['transform', 'opacity']}
        animation="quick"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
      >
        <Card padding="$0" bordered={false}>
          <YStack minWidth={200}>
            {/* User Info Header */}
            <YStack padding="$3" space="$1">
              <Text fontWeight="600" fontSize="$3">
                {user.name || 'User'}
              </Text>
              <Text color="$color10" fontSize="$2">
                {user.email}
              </Text>
            </YStack>

            <Separator />

            {/* Menu Items */}
            <YStack padding="$1">
              {onProfileClick && (
                <Button
                  chromeless
                  size="$3"
                  justifyContent="flex-start"
                  onPress={handleProfileClick}
                  disabled={isLoading}
                  padding="$2"
                  pressStyle={{ backgroundColor: '$color3' }}
                >
                  <XStack space="$2" alignItems="center">
                    <User size="$1" color="$color11" />
                    <Text>Profile</Text>
                  </XStack>
                </Button>
              )}

              {onSettingsClick && (
                <Button
                  chromeless
                  size="$3"
                  justifyContent="flex-start"
                  onPress={handleSettingsClick}
                  disabled={isLoading}
                  padding="$2"
                  pressStyle={{ backgroundColor: '$color3' }}
                >
                  <XStack space="$2" alignItems="center">
                    <Settings size="$1" color="$color11" />
                    <Text>Settings</Text>
                  </XStack>
                </Button>
              )}

              {(onProfileClick || onSettingsClick) && <Separator marginVertical="$1" />}

              <Button
                chromeless
                size="$3"
                justifyContent="flex-start"
                onPress={handleSignOut}
                disabled={isLoading}
                padding="$2"
                pressStyle={{ backgroundColor: '$red2' }}
              >
                <XStack space="$2" alignItems="center">
                  <LogOut size="$1" color="$red10" />
                  <Text color="$red10">
                    {isLoading ? 'Signing out...' : 'Sign out'}
                  </Text>
                </XStack>
              </Button>
            </YStack>
          </YStack>
        </Card>
      </Popover.Content>
    </Popover>
  );
}

// Simple user button component for when you just need a sign-out button
export interface UserButtonProps {
  user?: {
    id: string;
    name?: string;
    email: string;
    image?: string;
  };
  variant?: 'menu' | 'button';
  size?: '$2' | '$3' | '$4';
}

export function UserButton({
  user,
  variant = 'menu',
  size = '$3',
}: UserButtonProps): JSX.Element {
  const { signOut, isLoading } = useAuth();

  if (!user) {
    return <></>;
  }

  if (variant === 'button') {
    return (
      <Button
        variant="outlined"
        size={size}
        onPress={signOut}
        disabled={isLoading}
      >
        <XStack space="$2" alignItems="center">
          <LogOut size="$1" />
          <Text>{isLoading ? 'Signing out...' : 'Sign out'}</Text>
        </XStack>
      </Button>
    );
  }

  return <UserMenu user={user} />;
}