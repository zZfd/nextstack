'use client';

import { Stack, HStack, Text } from '@nextstack/ui';
import { Button, Input, FormField, FormLabel, FormError } from '@nextstack/ui';
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
  requireEmailVerification = false,
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
    <Stack space='$4' width='100%' maxWidth='$24'>
      <Stack space='$3'>
        <FormField>
          <FormLabel>Full Name</FormLabel>
          <Input
            {...register('name', {
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            placeholder='Enter your full name'
            autoCapitalize='words'
            autoComplete='name'
            autoFocus
            variant={errors.name ? 'error' : 'default'}
            disabled={disabled || isLoading}
            onSubmitEditing={() => setFocus('email')}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </FormField>

        <FormField>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('email', {
              required: 'Email is required',
              validate: {
                isValidEmail: value =>
                  isValidEmail(value) || 'Please enter a valid email address',
              },
            })}
            placeholder='Enter your email'
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete='email'
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
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  'Password must contain at least one lowercase letter, one uppercase letter, and one number',
              },
            })}
            placeholder='Create a password'
            secureTextEntry
            autoComplete='new-password'
            variant={errors.password ? 'error' : 'default'}
            disabled={disabled || isLoading}
            onSubmitEditing={() => setFocus('confirmPassword')}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}

          {/* Password Strength Indicator */}
          {showPasswordStrength && watchPassword && (
            <PasswordStrengthIndicator
              password={watchPassword}
              showLabel={true}
              showFeedback={true}
            />
          )}
        </FormField>

        <FormField>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value: string) =>
                value === watchPassword || 'Passwords do not match',
            })}
            placeholder='Confirm your password'
            secureTextEntry
            autoComplete='new-password'
            variant={errors.confirmPassword ? 'error' : 'default'}
            disabled={disabled || isLoading}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
          {errors.confirmPassword && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}
        </FormField>
      </Stack>

      {/* Terms and Conditions */}
      {showTermsCheckbox && (
        <Stack>
          <HStack space='$2' alignItems='flex-start'>
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
            <Text fontSize='$3' color='$gray11' lineHeight='$1' flex={1}>
              I agree to the{' '}
              <Text
                color='$blue10'
                textDecorationLine='underline'
                cursor='pointer'
                onPress={() => window.open(termsLink, '_blank')}
              >
                Terms and Conditions
              </Text>
              {' and '}
              <Text
                color='$blue10'
                textDecorationLine='underline'
                cursor='pointer'
                onPress={() => window.open(privacyLink, '_blank')}
              >
                Privacy Policy
              </Text>
            </Text>
          </HStack>
          {showTermsCheckbox && errors.agreeToTerms && (
            <FormError>{errors.agreeToTerms.message}</FormError>
          )}
        </Stack>
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

      {/* Email verification message */}
      {showVerificationMessage && (
        <Stack
          backgroundColor='$blue2'
          borderColor='$blue7'
          borderWidth={1}
          padding='$3'
          borderRadius='$2'
        >
          <Text color='$blue11'>
            Account created successfully! Please check your email to verify your
            account before signing in.
          </Text>
        </Stack>
      )}

      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={
          disabled || isLoading || (showTermsCheckbox && !watchAgreeToTerms)
        }
        variant='default'
        size='md'
      >
        <Text color='$primaryForeground'>
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Text>
      </Button>
    </Stack>
  );
}
