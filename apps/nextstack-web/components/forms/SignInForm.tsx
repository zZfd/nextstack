'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Checkbox } from './Checkbox';

import { useAuth, useRememberMe } from '@/hooks/useAuth';
import { isValidEmail } from '@/utils/auth';

export interface SignInFormProps {
  /** Redirect path after successful login (default: '/') */
  redirectTo?: string;
  /** Optional success callback for custom handling */
  onSuccessCallback?: () => void | Promise<void>;
  /** Show forgot password link (default: true) */
  showForgotPassword?: boolean;
  /** Show remember me checkbox (default: true) */
  showRememberMe?: boolean;
  /** Disable the entire form */
  disabled?: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm({
  redirectTo = '/',
  onSuccessCallback,
  showForgotPassword = true,
  showRememberMe = true,
  disabled = false,
}: SignInFormProps) {
  const { isLoading, error, signIn, clearError } = useAuth({
    redirectTo,
    onSuccess: onSuccessCallback,
  });

  const [rememberMe, setRememberMe] = useRememberMe();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    if (disabled) return;

    // Clear any previous errors
    clearError();

    // Perform sign in with remember me preference
    await signIn({
      ...data,
      rememberMe: showRememberMe ? rememberMe : undefined,
    });
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              validate: {
                isValidEmail: (value) =>
                  isValidEmail(value) || 'Please enter a valid email address',
              },
            })}
            placeholder="Enter your email"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoFocus
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
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={disabled || isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onSubmit)()}
          />
          {errors.password && <div className="text-sm text-red-600">{errors.password.message}</div>}
        </div>
      </div>

      {/* Remember Me and Forgot Password */}
      {(showRememberMe || showForgotPassword) && (
        <div className="flex justify-between items-center">
          {showRememberMe ? (
            <Checkbox
              checked={rememberMe}
              onChange={setRememberMe}
              disabled={disabled || isLoading}
              label="Remember me"
            />
          ) : (
            <div />
          )}

          {showForgotPassword && (
            <span
              className="text-sm text-blue-600 underline cursor-pointer"
              onClick={() => {
                // Navigate to forgot password page
                window.location.href = '/auth/forgot-password';
              }}
            >
              Forgot password?
            </span>
          )}
        </div>
      )}

      {/* Global error message */}
      {error && (
        <div className="bg-red-50 border border-red-300 rounded-md p-3">
          <p className="text-red-700">{error.message}</p>
        </div>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        disabled={disabled || isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </div>
  );
}
