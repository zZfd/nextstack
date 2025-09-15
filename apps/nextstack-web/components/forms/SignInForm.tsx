'use client';

import { Stack, HStack, Text } from '@nextstack/ui';
import { Button, Input, FormField, FormLabel, FormError } from '@nextstack/ui';
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
    <Stack space='$4' width='100%' maxWidth='$24'>
      <Stack space='$3'>
        <FormField>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email', {
              required: 'Email is required',
              validate: {
                isValidEmail: (value) =>
                  isValidEmail(value) || 'Please enter a valid email address',
              },
            })}
            placeholder='Enter your email'
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete='email'
            autoFocus
            variant={errors.email ? 'error' : 'default'}
            disabled={disabled || isLoading}
            onSubmitEditing={() => setFocus('password')}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        <FormField>
          <FormLabel>Password</FormLabel>
          <Input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder='Enter your password'
            secureTextEntry
            autoComplete='current-password'
            variant={errors.password ? 'error' : 'default'}
            disabled={disabled || isLoading}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>
      </Stack>

      {/* Remember Me and Forgot Password */}
      {(showRememberMe || showForgotPassword) && (
        <HStack justifyContent='space-between' alignItems='center'>
          {showRememberMe ? (
            <Checkbox
              checked={rememberMe}
              onChange={setRememberMe}
              disabled={disabled || isLoading}
              label="Remember me"
            />
          ) : (
            <Stack />
          )}

          {showForgotPassword && (
            <Text
              fontSize='$3'
              color='$blue10'
              textDecorationLine='underline'
              cursor='pointer'
              onPress={() => {
                // Navigate to forgot password page
                window.location.href = '/auth/forgot-password';
              }}
            >
              Forgot password?
            </Text>
          )}
        </HStack>
      )}

      {/* Global error message */}
      {error && (
        <Stack
          backgroundColor='$red2'
          borderColor='$red7'
          borderWidth={1}
          padding='$3'
          borderRadius='$2'
        >
          <Text color='$red11'>{error.message}</Text>
        </Stack>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={disabled || isLoading}
        variant='default'
        size='md'
      >
        <Text color='$primaryForeground'>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Text>
      </Button>
    </Stack>
  );
}
