// Server-side exports
export { createAuth, createAuthConfig } from "./server";
export type { AuthConfig, Auth } from "./server";

// Client-side exports
export { authClient } from "./client";
export type { Session, User, AuthClient } from "./client";

// Type exports
export type {
  AuthSession,
  AuthResponse,
  SignInResponse,
  SignUpResponse,
  ValidationError,
  FormValidation,
} from "./types";

// Validation utilities
export {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validateSignInForm,
  validateSignUpForm,
} from "./validation";