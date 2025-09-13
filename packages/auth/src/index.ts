export { auth } from "./server";
export { authClient } from "./client";
export type { Session, User, AuthClient } from "./client";
export type {
  AuthSession,
  AuthResponse,
  SignInResponse,
  SignUpResponse,
  ValidationError,
  FormValidation,
} from "./types";
export {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validateSignInForm,
  validateSignUpForm,
} from "./validation";