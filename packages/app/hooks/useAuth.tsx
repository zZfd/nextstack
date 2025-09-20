import { authClient } from '@nextstack/auth';
import { useState, useCallback } from 'react';
import { Platform } from 'react-native';

import {
  extractAuthError,
  rememberMeUtils,
  type AuthError,
  type AuthResult
} from '../utils/auth';

// Platform-specific navigation
interface NavigationHandler {
  push: (path: string) => void;
}

const createNavigationHandler = (): NavigationHandler => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    // Web navigation using window.location
    return {
      push: (path: string): void => {
        window.location.href = path;
      },
    };
  } else {
    // Native navigation - you can integrate with React Navigation here
    return {
      push: (path: string): void => {
        // TODO: Integrate with your navigation library
        // Example: navigation.navigate(path);
        // For now, we'll silently ignore navigation on native
        void path;
      },
    };
  }
};

// Hook options
interface UseAuthOptions {
  redirectTo?: string;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: AuthError) => void;
}

// Sign in data interface
interface SignInData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Sign up data interface
interface SignUpData {
  name: string;
  email: string;
  password: string;
}

// Hook return interface
interface UseAuthReturn {
  isLoading: boolean;
  error: AuthError | null;
  signIn: (data: SignInData) => Promise<AuthResult>;
  signUp: (data: SignUpData) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

/**
 * Custom hook for handling authentication operations
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { redirectTo = '/', onSuccess, onError } = options;
  const navigation = createNavigationHandler();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signIn = useCallback(async (data: SignInData): Promise<AuthResult> => {
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
      navigation.push(redirectTo);

      return { data: result.data };
    } catch (err) {
      const authError = extractAuthError(err);
      setError(authError);
      onError?.(authError);
      return { error: authError };
    } finally {
      setIsLoading(false);
    }
  }, [redirectTo, onSuccess, onError, navigation]);

  const signUp = useCallback(async (data: SignUpData): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        const authError = extractAuthError(result.error);
        setError(authError);
        onError?.(authError);
        return { error: authError };
      }

      // Success callback
      await onSuccess?.();

      // For successful signup, auto-login and redirect
      if (result.data) {
        // Auto-login after successful signup
        const loginResult = await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

        if (loginResult.data) {
          navigation.push(redirectTo);
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
  }, [redirectTo, onSuccess, onError, navigation]);

  const signOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signOut();

      // Clear remember me preference
      rememberMeUtils.clear();

      // Redirect to login page
      navigation.push('/auth/signin');
    } catch (err) {
      const authError = extractAuthError(err);
      setError(authError);
      // TODO: Implement proper error logging
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

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
export function useRememberMe(): [boolean, (value: boolean) => void] {
  const [rememberMe, setRememberMe] = useState(() => {
    // Initialize from storage on mount
    return rememberMeUtils.get();
  });

  const handleRememberMeChange = useCallback((remember: boolean) => {
    setRememberMe(remember);
    rememberMeUtils.set(remember);
  }, []);

  return [rememberMe, handleRememberMeChange];
}