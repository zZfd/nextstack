'use client';

import { Stack, HStack, Text } from '@nextstack/ui';
import { useRouter } from 'next/navigation';

import { SignInForm } from '@/components/forms/SignInForm';

export default function SignInPage() {
  const router = useRouter();

  return (
    <Stack
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="$background"
      padding="$4"
    >
      <Stack maxWidth="$24" width="100%" space="$6">
        <Stack space="$2" alignItems="center">
          <Text fontSize="$8" fontWeight="bold" textAlign="center">
            Sign in to NextStack
          </Text>
          <HStack space="$1" alignItems="center">
            <Text fontSize="$4" color="$gray11">
              Or
            </Text>
            <Text
              fontSize="$4"
              color="$blue10"
              textDecorationLine="underline"
              onPress={() => router.push('/auth/signup')}
              cursor="pointer"
            >
              create a new account
            </Text>
          </HStack>
        </Stack>

        <SignInForm
          redirectTo="/dashboard"
        />
      </Stack>
    </Stack>
  );
}
