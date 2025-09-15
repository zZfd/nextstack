export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

export interface AuthResult<T = unknown> {
  data?: T;
  error?: AuthError;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

/**
 * Calculate password strength
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  const result: PasswordStrength = {
    score: 0,
    feedback: [],
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Calculate score
  let score = 0;
  if (result.hasMinLength) score++;
  if (result.hasUppercase) score++;
  if (result.hasLowercase) score++;
  if (result.hasNumber) score++;
  if (result.hasSpecialChar) score++;

  // Bonus for length
  if (password.length >= 12) score += 0.5;
  if (password.length >= 16) score += 0.5;

  result.score = Math.min(4, Math.floor(score));

  // Generate feedback
  if (!result.hasMinLength) {
    result.feedback.push('Password should be at least 8 characters long');
  }
  if (!result.hasUppercase) {
    result.feedback.push('Include at least one uppercase letter');
  }
  if (!result.hasLowercase) {
    result.feedback.push('Include at least one lowercase letter');
  }
  if (!result.hasNumber) {
    result.feedback.push('Include at least one number');
  }
  if (!result.hasSpecialChar) {
    result.feedback.push('Include at least one special character');
  }

  if (result.score === 4 && password.length < 12) {
    result.feedback.push('Consider using a longer password for better security');
  }

  return result;
}

/**
 * Password strength labels
 */
export const PASSWORD_STRENGTH_LABELS: Record<number, string> = {
  0: 'Very Weak',
  1: 'Weak',
  2: 'Fair',
  3: 'Good',
  4: 'Strong',
};

/**
 * Password strength colors (design token names)
 */
export const PASSWORD_STRENGTH_COLORS: Record<number, string> = {
  0: '$red9',
  1: '$red7',
  2: '$orange9',
  3: '$yellow9',
  4: '$green9',
};

/**
 * Remember me preference management
 */
export const rememberMeUtils = {
  set: (remember: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nextstack_remember_me', remember.toString());
    }
  },

  get: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nextstack_remember_me') === 'true';
    }
    return false;
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nextstack_remember_me');
    }
  },
};

/**
 * Email validation utility
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

/**
 * Extract meaningful error message from auth response
 */
export function extractAuthError(error: unknown): AuthError {
  if (typeof error === 'string') {
    return { message: error };
  }

  if (error && typeof error === 'object') {
    // Check for direct error properties
    if ('message' in error && typeof error.message === 'string') {
      return {
        message: error.message,
        code: 'code' in error && typeof error.code === 'string' ? error.code : undefined,
        field: 'field' in error && typeof error.field === 'string' ? error.field : undefined,
      };
    }

    // Check for nested error object
    if ('error' in error && error.error && typeof error.error === 'object') {
      const nestedError = error.error;
      if ('message' in nestedError && typeof nestedError.message === 'string') {
        return {
          message: nestedError.message,
          code: 'code' in nestedError && typeof nestedError.code === 'string' ? nestedError.code : undefined,
          field: 'field' in nestedError && typeof nestedError.field === 'string' ? nestedError.field : undefined,
        };
      }
    }
  }

  return { message: 'An unexpected error occurred' };
}