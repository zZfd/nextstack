'use client';

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Checkbox } from './Checkbox';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

import { useAuth } from '@/hooks/useAuth';
import { isValidEmail } from '@/utils/auth';

export interface SignUpApiData {
  name: string;
  email: string;
  password: string;
}

export interface SignUpFormData extends SignUpApiData {
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface SignUpFormProps {
  /** Redirect path after successful registration (default: '/') */
  redirectTo?: string;
  /** Optional success callback for custom handling */
  onSuccessCallback?: () => void | Promise<void>;
  /** Require email verification before auto-login (default: false) */
  requireEmailVerification?: boolean;
  /** Show password strength indicator (default: true) */
  showPasswordStrength?: boolean;
  /** Show terms and conditions checkbox (default: true) */
  showTermsCheckbox?: boolean;
  /** Terms and conditions link */
  termsLink?: string;
  /** Privacy policy link */
  privacyLink?: string;
  /** Disable the entire form */
  disabled?: boolean;
}

export function SignUpForm({
  redirectTo = '/',
  onSuccessCallback,
  requireEmailVerification: _requireEmailVerification = false,
  showPasswordStrength = true,
  showTermsCheckbox = true,
  termsLink = '/terms',
  privacyLink = '/privacy',
  disabled = false,
}: SignUpFormProps) {
  const [showVerificationMessage] = useState(false);

  const { isLoading, error, signUp, clearError } = useAuth({
    redirectTo,
    onSuccess: onSuccessCallback,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const watchPassword = watch('password');
  const watchAgreeToTerms = watch('agreeToTerms');

  const onSubmit = async (data: SignUpFormData) => {
    if (disabled) return;

    // Clear any previous errors
    clearError();

    // Check terms agreement if required
    if (showTermsCheckbox && !data.agreeToTerms) {
      return;
    }

    // Remove confirmPassword and agreeToTerms from the API data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, agreeToTerms, ...signUpData } = data;

    await signUp(signUpData);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register('name', {
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            placeholder="Enter your full name"
            autoCapitalize="words"
            autoComplete="name"
            autoFocus
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={disabled || isLoading}
            onKeyDown={(e) => e.key === 'Enter' && setFocus('email')}
          />
          {errors.name && <div className="text-sm text-red-600">{errors.name.message}</div>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              validate: {
                isValidEmail: value =>
                  isValidEmail(value) || 'Please enter a valid email address',
              },
            })}
            placeholder="Enter your email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={disabled || isLoading}
            onKeyDown={(e) => e.key === 'Enter' && setFocus('password')}
          />
          {errors.email && <div className="text-sm text-red-600">{errors.email.message}</div>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, and one number',
              },
            })}
            placeholder="Create a password"
            type="password"
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={disabled || isLoading}
            onKeyDown={(e) => e.key === 'Enter' && setFocus('confirmPassword')}
          />
          {errors.password && <div className="text-sm text-red-600">{errors.password.message}</div>}

          {/* Password Strength Indicator */}
          {showPasswordStrength && watchPassword && (
            <PasswordStrengthIndicator
              password={watchPassword}
              showLabel={true}
              showFeedback={true}
            />
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value: string) =>
                value === watchPassword || 'Passwords do not match',
            })}
            placeholder="Confirm your password"
            type="password"
            autoComplete="new-password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={disabled || isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onSubmit)()}
          />
          {errors.confirmPassword && (
            <div className="text-sm text-red-600">{errors.confirmPassword.message}</div>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      {showTermsCheckbox && (
        <div>
          <div className="flex items-start gap-2">
            <Checkbox
              checked={watchAgreeToTerms}
              onChange={checked => {
                // Manually update the form value using setValue
                const { onChange } = register('agreeToTerms', {
                  required: 'You must agree to the terms and conditions',
                });
                onChange({
                  target: { value: checked, name: 'agreeToTerms' },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }}
              disabled={disabled || isLoading}
            />
            <p className="text-sm text-gray-600 flex-1 leading-tight">
              I agree to the{' '}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => window.open(termsLink, '_blank')}
              >
                Terms and Conditions
              </span>
              {' and '}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => window.open(privacyLink, '_blank')}
              >
                Privacy Policy
              </span>
            </p>
          </div>
          {showTermsCheckbox && errors.agreeToTerms && (
            <div className="text-sm text-red-600">{errors.agreeToTerms.message}</div>
          )}
        </div>
      )}

      {/* Global error message */}
      {error && (
        <div className="bg-red-50 border border-red-300 rounded-md p-3">
          <p className="text-red-700">{error.message}</p>
        </div>
      )}

      {/* Email verification message */}
      {showVerificationMessage && (
        <div className="bg-blue-50 border border-blue-300 rounded-md p-3">
          <p className="text-blue-700">
            Account created successfully! Please check your email to verify your
            account before signing in.
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        disabled={
          disabled || isLoading || (showTermsCheckbox && !watchAgreeToTerms)
        }
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </div>
  );
}
