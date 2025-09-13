import type { AuthClient, User } from '@nextstack/auth';
import React, { useEffect, useState } from 'react';
import { YStack, Text, Spinner } from 'tamagui';

interface AuthGuardProps {
  authClient: AuthClient;
  children: (user: User) => React.ReactNode;
  fallback?: React.ReactNode;
  onUnauthenticated?: () => void;
}

export function AuthGuard({
  authClient,
  children,
  fallback,
  onUnauthenticated,
}: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const result = await authClient.getSession();
        if (mounted) {
          if (result.data?.user) {
            setUser(result.data.user);
          } else {
            onUnauthenticated?.();
          }
          setLoading(false);
        }
      } catch {
        if (mounted) {
          setLoading(false);
          onUnauthenticated?.();
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [authClient, onUnauthenticated]);

  if (loading) {
    return (
      <YStack flex={1} justifyContent='center' alignItems='center'>
        <Spinner size='large' />
        <Text marginTop='$4'>Loading...</Text>
      </YStack>
    );
  }

  if (!user) {
    return (
      <>
        {fallback || (
          <YStack flex={1} justifyContent='center' alignItems='center'>
            <Text>Please sign in to continue</Text>
          </YStack>
        )}
      </>
    );
  }

  return <>{children(user)}</>;
}
