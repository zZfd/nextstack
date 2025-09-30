// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export type { Session, User } from 'better-auth';

export interface FormValidation {
  isValid: boolean;
  errors: ValidationError[];
}
