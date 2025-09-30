import { createAuthClientWithConfig } from '@nextstack/auth';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Alert, View } from 'react-native';

import { SignInForm } from '@/components/auth/SignInForm';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { config } from '@/config';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Initialize auth client with config
  const authClient = React.useMemo(
    () => createAuthClientWithConfig(config.authEndpoint),
    []
  );

  const handleSignIn = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const result = await authClient!.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Authentication failed');
      }

      // Navigate to home page on success
      router.replace('/');
    } catch (error) {
      // Show error alert
      Alert.alert(
        'Sign In Failed',
        error instanceof Error ? error.message : 'An unexpected error occurred',
        [{ text: 'OK' }]
      );
      throw error; // Re-throw so form can handle it
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password page when implemented
    Alert.alert('Forgot Password', 'This feature will be available soon', [
      { text: 'OK' },
    ]);
  };

  const handleSignUp = () => {
    // TODO: Navigate to sign-up page when implemented
    Alert.alert('Sign Up', 'This feature will be available soon', [
      { text: 'OK' },
    ]);
  };

  return (
    <View className='flex-1 bg-background p-4 justify-center'>
      <Card className='w-full max-w-md mx-auto rounded-2xl shadow-lg'>
        <CardContent className='p-8 gap-6'>
          {/* Logo and Brand */}
          <View className='items-center gap-3'>
            <View className='flex-row items-center gap-3'>
              <View className='bg-[#05a081] rounded-xl w-10 h-10 items-center justify-center'>
                <View className='bg-white rounded-sm w-5 h-5' />
              </View>
              <View>
                <Text className='text-xl font-medium text-[#2d2d2d] tracking-[-0.45px]'>
                  Pexels
                </Text>
                <Text className='text-sm text-[#717171] tracking-[-0.15px]'>
                  Make every shutter click count
                </Text>
              </View>
            </View>
          </View>

          {/* Heading */}
          <View className='items-center gap-2'>
            <Text className='text-2xl font-medium text-[#2d2d2d]'>
              Welcome back
            </Text>
            <Text className='text-base text-[#717171] tracking-[-0.31px]'>
              Continue discovering amazing photos
            </Text>
          </View>

          {/* Form */}
          <SignInForm
            onSubmit={handleSignIn}
            onForgotPassword={handleForgotPassword}
            onSignUp={handleSignUp}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </View>
  );
}
