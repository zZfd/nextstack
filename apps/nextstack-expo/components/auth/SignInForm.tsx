import { validateEmail, validatePassword } from '@nextstack/auth/validation';
import { Eye, EyeOff } from 'lucide-react-native';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  isLoading?: boolean;
}

type AuthMethod = 'email' | 'phone';

export function SignInForm({
  onSubmit,
  onForgotPassword,
  onSignUp,
  isLoading = false,
}: SignInFormProps) {
  const [authMethod, setAuthMethod] = React.useState<AuthMethod>('email');
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: SignInFormData) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'An error occurred'
      );
    }
  };

  return (
    <ScrollView className='flex-1' contentContainerClassName='gap-6'>
      {/* Auth Method Tabs */}
      <View className='bg-[#f8f8f8] rounded-lg p-1 flex-row'>
        <Pressable
          className={cn(
            'flex-1 h-10 rounded-md items-center justify-center',
            authMethod === 'email' && 'bg-white shadow-sm'
          )}
          onPress={() => setAuthMethod('email')}
        >
          <Text
            className={cn(
              'text-sm font-medium tracking-[-0.15px]',
              authMethod === 'email' ? 'text-[#2d2d2d]' : 'text-[#717171]'
            )}
          >
            Email
          </Text>
        </Pressable>
        <Pressable
          className={cn(
            'flex-1 h-10 rounded-md items-center justify-center',
            authMethod === 'phone' && 'bg-white shadow-sm'
          )}
          onPress={() => setAuthMethod('phone')}
        >
          <Text
            className={cn(
              'text-sm font-medium tracking-[-0.15px]',
              authMethod === 'phone' ? 'text-[#2d2d2d]' : 'text-[#717171]'
            )}
          >
            Phone
          </Text>
        </Pressable>
      </View>

      {/* Form Fields */}
      <View className='gap-6'>
        {/* Email Field */}
        <View className='gap-2'>
          <Label>Email address</Label>
          <Controller
            control={control}
            name='email'
            rules={{
              validate: value => {
                const error = validateEmail(value);
                return error ? error.message : true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='Enter your email address'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
                editable={!isLoading}
              />
            )}
          />
          {errors.email && (
            <Text className='text-xs text-destructive'>
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Password Field */}
        <View className='gap-2'>
          <Label>Password</Label>
          <View className='relative'>
            <Controller
              control={control}
              name='password'
              rules={{
                validate: value => {
                  const error = validatePassword(value);
                  return error ? error.message : true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder='Enter your password'
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  autoCapitalize='none'
                  autoComplete='password'
                  editable={!isLoading}
                  className='pr-12'
                />
              )}
            />
            <Pressable
              className='absolute right-3 top-0 h-12 w-9 items-center justify-center'
              onPress={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff size={16} color='#717171' />
              ) : (
                <Eye size={16} color='#717171' />
              )}
            </Pressable>
          </View>
          {errors.password && (
            <Text className='text-xs text-destructive'>
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Forgot Password Link */}
        <View className='items-end'>
          <Pressable
            onPress={onForgotPassword}
            disabled={isLoading}
            className='rounded-md px-2 py-1'
          >
            <Text className='text-sm font-medium text-[#05a081] tracking-[-0.15px]'>
              Forgot password?
            </Text>
          </Pressable>
        </View>

        {/* Submit Error */}
        {submitError && (
          <View className='bg-destructive/10 border border-destructive/20 rounded-lg p-3'>
            <Text className='text-sm text-destructive'>{submitError}</Text>
          </View>
        )}

        {/* Sign In Button */}
        <Button
          onPress={handleSubmit(handleFormSubmit)}
          disabled={!isValid || isLoading}
          className={cn(
            'h-12 rounded-lg',
            !isValid || isLoading ? 'bg-[#05a081]/50' : 'bg-[#05a081]'
          )}
        >
          {isLoading ? (
            <ActivityIndicator color='white' />
          ) : (
            <Text className='text-sm font-medium text-white tracking-[-0.15px]'>
              Sign in
            </Text>
          )}
        </Button>
      </View>

      {/* Divider */}
      <View className='border-t border-[rgba(0,0,0,0.1)]' />

      {/* Sign Up Section */}
      <View className='items-center gap-4'>
        <Text className='text-sm text-[#717171] tracking-[-0.15px]'>
          {"Don't have an account?"}
        </Text>
        <Pressable
          onPress={onSignUp}
          disabled={isLoading}
          className='rounded-md px-4 py-2'
        >
          <Text className='text-sm font-medium text-[#05a081] tracking-[-0.15px]'>
            Join free today
          </Text>
        </Pressable>
      </View>

      {/* Terms and Privacy */}
      <View className='items-center pt-2'>
        <Text className='text-xs text-center text-[#717171] leading-5'>
          By signing in, you agree to our{' '}
          <Text className='text-base font-medium text-[#05a081]'>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text className='text-base font-medium text-[#05a081]'>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
