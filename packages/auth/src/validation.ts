import type { FormValidation, ValidationError } from './types';

export const validateEmail = (email: string): ValidationError | null => {
  if (!email) {
    return { field: 'email', message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }

  return null;
};

export const validatePassword = (password: string, minLength = 8): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }

  if (password.length < minLength) {
    return { field: 'password', message: `Password must be at least ${minLength} characters long` };
  }

  if (password.length > 128) {
    return { field: 'password', message: 'Password must be no more than 128 characters long' };
  }

  return null;
};

export const validateName = (name: string): ValidationError | null => {
  if (!name || name.trim().length === 0) {
    return { field: 'name', message: 'Name is required' };
  }

  if (name.length > 100) {
    return { field: 'name', message: 'Name must be no more than 100 characters long' };
  }

  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationError | null => {
  if (!confirmPassword) {
    return { field: 'confirmPassword', message: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { field: 'confirmPassword', message: 'Passwords do not match' };
  }

  return null;
};

export const validateSignInForm = (email: string, password: string): FormValidation => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateSignUpForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FormValidation => {
  const errors: ValidationError[] = [];

  const nameError = validateName(name);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) errors.push(confirmPasswordError);

  return {
    isValid: errors.length === 0,
    errors,
  };
};