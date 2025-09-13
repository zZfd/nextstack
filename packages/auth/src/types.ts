// Better Auth type definitions
export interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
}

export interface AuthSession {
  user: User;
  session: Session;
}

// Auth client response types
export interface AuthResponse<T = unknown> {
  data: T | null;
  error: {
    message: string;
    status?: number;
  } | null;
}

export interface SignInResponse {
  user: User;
  session: Session;
}

export interface SignUpResponse {
  user: User;
  session: Session;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}

// Re-export common types
export type { User as BetterAuthUser, Session as BetterAuthSession } from './client';