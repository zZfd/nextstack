import React from 'react';
import { YStack, XStack, Button, Text, Theme } from 'tamagui';
import { MyButton } from './MyButton';

export const ThemeTest = () => {
  return (
    <YStack space="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold">Theme System Test</Text>
      
      {/* Light Theme Section */}
      <Theme name="light">
        <YStack space="$3" padding="$4" backgroundColor="$background" borderRadius="$3">
          <Text fontSize="$4" color="$color">Light Theme</Text>
          <XStack space="$3">
            <MyButton variant="default">Primary</MyButton>
            <MyButton variant="secondary">Secondary</MyButton>
            <MyButton variant="destructive">Destructive</MyButton>
            <MyButton variant="outline">Outline</MyButton>
            <MyButton variant="ghost">Ghost</MyButton>
          </XStack>
        </YStack>
      </Theme>

      {/* Dark Theme Section */}
      <Theme name="dark">
        <YStack space="$3" padding="$4" backgroundColor="$background" borderRadius="$3">
          <Text fontSize="$4" color="$color">Dark Theme</Text>
          <XStack space="$3">
            <MyButton variant="default">Primary</MyButton>
            <MyButton variant="secondary">Secondary</MyButton>
            <MyButton variant="destructive">Destructive</MyButton>
            <MyButton variant="outline">Outline</MyButton>
            <MyButton variant="ghost">Ghost</MyButton>
          </XStack>
        </YStack>
      </Theme>
    </YStack>
  );
};