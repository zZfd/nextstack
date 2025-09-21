import { Button, H1, Paragraph, YStack, XStack } from '@nextstack/ui';
import type { JSX } from 'react';

export function HomeScreenSimple(): JSX.Element {
  return (
    <YStack
      flex={1}
      justifyContent='center'
      alignItems='center'
      gap='$8'
      padding='$4'
      backgroundColor='$background'
    >
      <YStack gap='$4' alignItems='center'>
        <H1 color='$color12'>
          Welcome to NextStack
        </H1>
        <Paragraph color='$color10'>
          A full-stack TypeScript development scaffold built on Monorepo
          architecture
        </Paragraph>
      </YStack>

      <XStack gap='$4'>
        <Button
          variant='outlined'
          onPress={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin';
            }
          }}
        >
          Sign In
        </Button>
        <Button
          onPress={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signup';
            }
          }}
        >
          Sign Up
        </Button>
      </XStack>
    </YStack>
  );
}
