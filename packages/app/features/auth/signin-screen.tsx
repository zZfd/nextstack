import {
  Button,
  Input,
  Label,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
} from '@nextstack/ui';
import type { JSX } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useAuth, useRememberMe } from '../../hooks/useAuth';
import { isValidEmail } from '../../utils/auth';

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
    <div className="flex flex-1 justify-center items-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <h2 className="text-3xl font-semibold">Sign In</h2>
          <p className="text-sm text-muted-foreground">
            Welcome back! Please sign in to your account.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                validate: {
                  isValidEmail: (value: string) =>
                    isValidEmail(value) || 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  autoComplete="email"
                  disabled={disabled || isLoading}
                  className={errors.email ? 'border-destructive' : ''}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setFocus('password');
                    }
                  }}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <span className="text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={disabled || isLoading}
                  className={errors.password ? 'border-destructive' : ''}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(onSubmit)();
                    }
                  }}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <span className="text-sm text-destructive">
                {errors.password.message}
              </span>
            )}
          </div>

          {(showRememberMe || showForgotPassword) && (
            <div className="flex justify-between items-center">
              {showRememberMe ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    disabled={disabled || isLoading}
                  />
                  <Label className="text-sm">Remember me</Label>
                </div>
              ) : (
                <div />
              )}

              {showForgotPassword && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    // Navigate to forgot password page
                    if (typeof window !== 'undefined') {
                      window.location.href = '/auth/forgot-password';
                    }
                  }}
                >
                  Forgot password?
                </Button>
              )}
            </div>
          )}

          {error && (
            <div className="p-3 rounded-md bg-destructive/15 border border-destructive/20">
              <span className="text-sm text-destructive">
                {error.message}
              </span>
            </div>
          )}

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={disabled || isLoading}
            className="w-full"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
