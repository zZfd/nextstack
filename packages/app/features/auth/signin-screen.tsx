import {
  Button,
  Input,
  YStack,
  XStack,
  Label,
  Text,
  Checkbox,
  Card,
  H2,
  Paragraph,
} from '@nextstack/ui';
import type { JSX } from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

// These imports need to be adapted to your specific auth implementation
// For now, we'll create placeholder types
export interface SignInFormProps {
  redirectTo?: string;
  onSuccessCallback?: () => void | Promise<void>;
  showForgotPassword?: boolean;
  showRememberMe?: boolean;
  disabled?: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
}

// Placeholder hook - you'll need to adapt this to your existing useAuth hook
interface AuthOptions {
  redirectTo?: string;
  onSuccess?: () => void | Promise<void>;
}

interface AuthReturn {
  isLoading: boolean;
  error: unknown;
  signIn: (data: Record<string, unknown>) => Promise<void>;
  clearError: () => void;
}

const useAuth = (_options: AuthOptions): AuthReturn => ({
  isLoading: false,
  error: null,
  signIn: async (data: Record<string, unknown>): Promise<void> => {
    // Your existing sign in logic here
    void data;
  },
  clearError: (): void => {},
});

const useRememberMe = (): [boolean, (value: boolean) => void] => {
  const [rememberMe, setRememberMe] = useState(false);
  return [rememberMe, setRememberMe];
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export function SignInScreen({
  redirectTo = '/',
  onSuccessCallback,
  showForgotPassword = true,
  showRememberMe = true,
  disabled = false,
}: SignInFormProps): JSX.Element {
  const { isLoading, error, signIn, clearError } = useAuth({
    redirectTo,
    onSuccess: onSuccessCallback,
  });

  const [rememberMe, setRememberMe] = useRememberMe();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData): Promise<void> => {
    if (disabled) return;

    clearError();

    await signIn({
      ...data,
      rememberMe: showRememberMe ? rememberMe : undefined,
    });
  };

  return (
    <YStack
      flex={1}
      justifyContent='center'
      alignItems='center'
      padding='$4'
      backgroundColor='$background'
    >
      <Card maxWidth={400} width='100%' padding='$6' space='$4'>
        <YStack space='$2' alignItems='center'>
          <H2>Sign In</H2>
          <Paragraph color='$color10' style={{ textAlign: 'center' }}>
            Welcome back! Please sign in to your account.
          </Paragraph>
        </YStack>

        <YStack space='$4'>
          <YStack space='$2'>
            <Label htmlFor='email'>Email</Label>
            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email is required',
                validate: {
                  isValidEmail: (value: string) =>
                    isValidEmail(value) || 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  id='email'
                  placeholder='Enter your email'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoComplete='email'
                  disabled={disabled || isLoading}
                  borderColor={errors.email ? '$red10' : '$borderColor'}
                  onSubmitEditing={() => setFocus('password')}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <Text color='$red10' fontSize='$2'>
                {errors.email.message}
              </Text>
            )}
          </YStack>

          <YStack space='$2'>
            <Label htmlFor='password'>Password</Label>
            <Controller
              control={control}
              name='password'
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  id='password'
                  placeholder='Enter your password'
                  secureTextEntry
                  autoComplete='current-password'
                  disabled={disabled || isLoading}
                  borderColor={errors.password ? '$red10' : '$borderColor'}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <Text color='$red10' fontSize='$2'>
                {errors.password.message}
              </Text>
            )}
          </YStack>

          {(showRememberMe || showForgotPassword) && (
            <XStack justifyContent='space-between' alignItems='center'>
              {showRememberMe ? (
                <XStack space='$2' alignItems='center'>
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    disabled={disabled || isLoading}
                  />
                  <Label fontSize='$2'>Remember me</Label>
                </XStack>
              ) : (
                <YStack />
              )}

              {showForgotPassword && (
                <Button
                  variant='outlined'
                  size='$2'
                  chromeless
                  onPress={() => {
                    // Navigate to forgot password page
                    if (typeof window !== 'undefined') {
                      window.location.href = '/auth/forgot-password';
                    }
                  }}
                >
                  <Text color='$blue10' textDecorationLine='underline'>
                    Forgot password?
                  </Text>
                </Button>
              )}
            </XStack>
          )}

          {error && (
            <Card backgroundColor='$red1' borderColor='$red7' padding='$3'>
              <Text color='$red11'>
                {(error as Error)?.message || 'An error occurred'}
              </Text>
            </Card>
          )}

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={disabled || isLoading}
            opacity={disabled || isLoading ? 0.5 : 1}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </YStack>
      </Card>
    </YStack>
  );
}
