'use client';

import { authClient } from '@nextstack/auth';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import { extractAuthError, rememberMeUtils, type AuthError, type AuthResult } from '@/utils/auth';

interface UseAuthOptions {
  redirectTo?: string;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: AuthError) => void;
}

interface UseAuthReturn {
  isLoading: boolean;
  error: AuthError | null;
  signIn: (data: { email: string; password: string; rememberMe?: boolean }) => Promise<AuthResult>;
  signUp: (data: { name: string; email: string; password: string }) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for handling authentication operations
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { redirectTo = '/', onSuccess, onError } = options;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signIn = useCallback(async (data: {
    email: string;
    password: string;
    rememberMe?: boolean
  }): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        const authError = extractAuthError(result.error);
        setError(authError);
        onError?.(authError);
        return { error: authError };
      }

      // Handle remember me preference
      if (data.rememberMe !== undefined) {
        rememberMeUtils.set(data.rememberMe);
      }

      // Success callback
      await onSuccess?.();

      // Navigate to redirect URL
      router.push(redirectTo);

      return { data: result.data };
    } catch (err) {
      const authError = extractAuthError(err);
      setError(authError);
      onError?.(authError);
      return { error: authError };
    } finally {
      setIsLoading(false);
    }
  }, [redirectTo, onSuccess, onError, router]);

  const signUp = useCallback(async (data: {
    name: string;
    email: string;
    password: string
  }): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signUp.email(data);

      if (result.error) {
        const authError = extractAuthError(result.error);
        setError(authError);
        onError?.(authError);
        return { error: authError };
      }

      // Success callback
      await onSuccess?.();

      // For successful signup, we might want to auto-login
      // or handle email verification flow
      if (result.data) {
        // Auto-login after successful signup
        const loginResult = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (loginResult.data) {
          router.push(redirectTo);
        }
      }

      return { data: result.data };
    } catch (err) {
      const authError = extractAuthError(err);
      setError(authError);
      onError?.(authError);
      return { error: authError };
    } finally {
      setIsLoading(false);
    }
  }, [redirectTo, onSuccess, onError, router]);

  const signOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signOut();

      // Clear remember me preference
      rememberMeUtils.clear();

      // Redirect to login or home
      router.push('/auth/signin');
    } catch (err) {
      const authError = extractAuthError(err);
      setError(authError);
      console.error('Sign out error:', authError);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    clearError,
  };
}

/**
 * Hook specifically for remember me functionality
 */
export function useRememberMe() {
  const [rememberMe, setRememberMe] = useState(() => {
    // Initialize from localStorage on mount
    return rememberMeUtils.get();
  });

  const handleRememberMeChange = useCallback((remember: boolean) => {
    setRememberMe(remember);
    rememberMeUtils.set(remember);
  }, []);

  return [rememberMe, handleRememberMeChange] as const;
}