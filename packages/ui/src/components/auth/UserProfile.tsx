import React, { useState } from 'react';
import { Button, YStack, XStack, Text, H3, Avatar } from 'tamagui';

interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthError {
  message: string;
  code?: string;
}

interface AuthResult<T = unknown> {
  data?: T;
  error?: AuthError;
}

interface SessionResult {
  user: User;
  session: {
    token: string;
    expiresAt: Date;
  };
}

interface SocialProvider {
  name: string;
  id: string;
  enabled: boolean;
}

interface AuthClient {
  signOut?: () => Promise<AuthResult<null>>;
  getSession?: () => Promise<AuthResult<SessionResult>>;
  signIn?: {
    email?: (params: { email: string; password: string }) => Promise<AuthResult<SessionResult>>;
  };
  signUp?: {
    email?: (params: {
      name: string;
      email: string;
      password: string;
    }) => Promise<AuthResult<SessionResult>>;
  };
  social?: SocialProvider[];
}

interface UserProfileProps {
  user: User;
  authClient: AuthClient;
  onSignOut?: () => void;
  onError?: (error: string) => void;
}

export function UserProfile({
  user,
  authClient,
  onSignOut,
  onError,
}: UserProfileProps) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const result = await authClient.signOut?.();
      if (result?.error) {
        onError?.('Failed to sign out');
      } else {
        onSignOut?.();
      }
    } catch {
      onError?.('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack space='$4' padding='$4' maxWidth={400} margin='auto'>
      <XStack space='$3' alignItems='center'>
        <Avatar circular size='$6'>
          <Avatar.Image src={user.image || undefined} />
          <Avatar.Fallback backgroundColor='$blue10'>
            <Text color='white' fontSize='$6' fontWeight='bold'>
              {user.name?.charAt(0) || user.email.charAt(0)}
            </Text>
          </Avatar.Fallback>
        </Avatar>

        <YStack flex={1}>
          <H3>{user.name || 'User'}</H3>
          <Text color='$gray10' fontSize='$3'>
            {user.email}
          </Text>
        </YStack>
      </XStack>

      <YStack space='$2'>
        <Text fontSize='$2' color='$gray10'>
          Account created: {new Date(user.createdAt).toLocaleDateString()}
        </Text>
        {user.emailVerified && (
          <Text fontSize='$2' color='$green10'>
            ✓ Email verified
          </Text>
        )}
      </YStack>

      <Button
        onPress={handleSignOut}
        disabled={loading}
        backgroundColor='$red10'
      >
        <Text color='white'>{loading ? 'Signing Out...' : 'Sign Out'}</Text>
      </Button>
    </YStack>
  );
}
