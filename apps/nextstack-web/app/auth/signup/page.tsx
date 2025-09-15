'use client';

import { Stack, HStack, Text } from '@nextstack/ui';
import { useRouter } from 'next/navigation';

import { SignUpForm } from '@/components/forms/SignUpForm';

export default function SignUpPage() {
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
            Create your NextStack account
          </Text>
          <HStack space="$1" alignItems="center">
            <Text fontSize="$4" color="$gray11">
              Or
            </Text>
            <Text
              fontSize="$4"
              color="$blue10"
              textDecorationLine="underline"
              onPress={() => router.push('/auth/signin')}
              cursor="pointer"
            >
              sign in to your existing account
            </Text>
          </HStack>
        </Stack>

        <SignUpForm
          redirectTo="/dashboard"
          showPasswordStrength={true}
          showTermsCheckbox={true}
          termsLink="/terms"
          privacyLink="/privacy"
        />
      </Stack>
    </Stack>
  );
}
