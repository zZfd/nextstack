import { Platform } from 'react-native';

// Email validation utility
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength calculation
export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 5;

  // Character variety checks
  if (/[a-z]/.test(password)) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/\d/.test(password)) strength += 20;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 10;

  return Math.min(strength, 100);
};

export const getPasswordStrengthColor = (strength: number): string => {
  if (strength < 30) return '$red10';
  if (strength < 60) return '$orange10';
  if (strength < 80) return '$yellow10';
  return '$green10';
};

export const getPasswordStrengthText = (strength: number): string => {
  if (strength < 30) return 'Weak';
  if (strength < 60) return 'Fair';
  if (strength < 80) return 'Good';
  return 'Strong';
};

// Auth error types
export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

export interface AuthResult<T = unknown> {
  data?: T;
  error?: AuthError;
}

// Extract and format auth errors
export const extractAuthError = (error: unknown): AuthError => {
  if (error && typeof error === 'object') {
    // Handle Better Auth errors
    if ('message' in error && typeof error.message === 'string') {
      return {
        message: error.message,
        code: 'code' in error ? String(error.code) : undefined,
        status: 'status' in error ? Number(error.status) : undefined,
      };
    }

    // Handle generic errors
    if ('error' in error && error.error && typeof error.error === 'object') {
      return extractAuthError(error.error);
    }
  }

  // Fallback for unknown errors
  if (typeof error === 'string') {
    return { message: error };
  }

  return { message: 'An unexpected error occurred' };
};

// Remember me functionality
interface RememberMeStorage {
  get: () => boolean;
  set: (value: boolean) => void;
  clear: () => void;
}

const createRememberMeUtils = (): RememberMeStorage => {
  const STORAGE_KEY = 'auth_remember_me';

  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    // Web implementation using localStorage
    return {
      get: (): boolean => {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          return stored === 'true';
        } catch {
          return false;
        }
      },
      set: (value: boolean): void => {
        try {
          localStorage.setItem(STORAGE_KEY, String(value));
        } catch {
          // Ignore storage errors
        }
      },
      clear: (): void => {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage errors
        }
      },
    };
  } else {
    // Native implementation - using in-memory storage for now
    // You can integrate with AsyncStorage or secure storage here
    let rememberMeValue = false;

    return {
      get: (): boolean => rememberMeValue,
      set: (value: boolean): void => {
        rememberMeValue = value;
      },
      clear: (): void => {
        rememberMeValue = false;
      },
    };
  }
};

export const rememberMeUtils = createRememberMeUtils();

// Validation helpers
export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address';
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password.length > 128) return 'Password must be less than 128 characters';
  return undefined;
};

export const validateName = (name: string): string | undefined => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 100) return 'Name must be less than 100 characters';
  return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return undefined;
};