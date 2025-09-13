import React, { useEffect, useState } from 'react';
import { YStack, Text, Spinner } from 'tamagui';

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
  signOut?: () => Promise<AuthResult<null>>;
  social?: SocialProvider[];
}

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
        const result = await authClient.getSession?.();
        if (mounted) {
          if (result?.data?.user) {
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
