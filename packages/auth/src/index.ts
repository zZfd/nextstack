// Server-side exports
export { createAuth, createAuthConfig } from './server';
export type { Auth, AuthConfig } from './server';

// Client-side exports
export { createAuthClientWithConfig } from './client';

// Validation utilities
export {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from './validation';

export type { Session, User } from './types';
