import type { AuthClient } from '@nextstack/auth';
import React, { useState } from 'react';
import { Button, Input, YStack, Text, H2 } from 'tamagui';

interface SignUpFormProps {
  authClient: AuthClient;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  validateName?: (name: string) => string | null;
  validateEmail?: (email: string) => string | null;
  validatePassword?: (password: string) => string | null;
}

export function SignUpForm({
  authClient,
  onSuccess,
  onError,
  validateName,
  validateEmail,
  validatePassword,
}: SignUpFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Name validation
    if (!name || name.trim().length === 0) {
      errors.name = 'Name is required';
    } else if (validateName) {
      const nameError = validateName(name);
      if (nameError) errors.name = nameError;
    }

    // Email validation
    if (!email) {
      errors.email = 'Email is required';
    } else if (validateEmail) {
      const emailError = validateEmail(email);
      if (emailError) errors.email = emailError;
    } else {
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
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        onError?.(result.error.message || 'Sign up failed');
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
      <H2 textAlign='center'>Sign Up</H2>

      <YStack space='$2'>
        <Input
          placeholder='Full Name'
          value={name}
          onChangeText={setName}
          disabled={loading}
          borderColor={fieldErrors.name ? '$red8' : undefined}
        />
        {fieldErrors.name && (
          <Text color='$red10' fontSize='$2'>
            {fieldErrors.name}
          </Text>
        )}
      </YStack>

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

      <YStack space='$2'>
        <Input
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          disabled={loading}
          borderColor={fieldErrors.confirmPassword ? '$red8' : undefined}
        />
        {fieldErrors.confirmPassword && (
          <Text color='$red10' fontSize='$2'>
            {fieldErrors.confirmPassword}
          </Text>
        )}
      </YStack>

      <Button
        onPress={handleSubmit}
        disabled={loading}
        backgroundColor='$green10'
      >
        <Text color='white'>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
      </Button>
    </YStack>
  );
}
