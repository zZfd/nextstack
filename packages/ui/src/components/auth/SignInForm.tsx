import type { AuthClient } from '@nextstack/auth';
import React, { useState } from 'react';
import { Button, Input, YStack, Text, H2 } from 'tamagui';

interface SignInFormProps {
  authClient: AuthClient;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  validateEmail?: (email: string) => string | null;
  validatePassword?: (password: string) => string | null;
}

export function SignInForm({
  authClient,
  onSuccess,
  onError,
  validateEmail,
  validatePassword,
}: SignInFormProps) {
  const [email, setEmail] = useState('feida.yes@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (validateEmail) {
      const emailError = validateEmail(email);
      if (emailError) errors.email = emailError;
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
    } else if (validatePassword) {
      const passwordError = validatePassword(password);
      if (passwordError) errors.password = passwordError;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFieldErrors({});

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        onError?.(result.error.message || 'Sign in failed');
      } else {
        onSuccess?.();
      }
    } catch {
      onError?.('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack space='$4' padding='$4' maxWidth={400} margin='auto'>
      <H2 textAlign='center'>Sign In</H2>

      <YStack space='$2'>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          disabled={loading}
          borderColor={fieldErrors.email ? '$red8' : undefined}
        />
        {fieldErrors.email && (
          <Text color='$red10' fontSize='$2'>
            {fieldErrors.email}
          </Text>
        )}
      </YStack>

      <YStack space='$2'>
        <Input
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          disabled={loading}
          borderColor={fieldErrors.password ? '$red8' : undefined}
        />
        {fieldErrors.password && (
          <Text color='$red10' fontSize='$2'>
            {fieldErrors.password}
          </Text>
        )}
      </YStack>

      <Button
        onPress={handleSubmit}
        disabled={loading}
        backgroundColor='$blue10'
      >
        <Text color='white'>{loading ? 'Signing In...' : 'Sign In'}</Text>
      </Button>
    </YStack>
  );
}
