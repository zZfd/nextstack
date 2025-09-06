import React from 'react';
import { trpc } from '@lzt/trpc-client';
import { MyButton } from '@lzt/ui';
import { ScrollView, View, Text, H1, YStack } from 'tamagui';

export default function HomeScreen() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <ScrollView flex={1} padding="$4">
      <YStack space="$4">
        <H1>Mobile Expo App</H1>
        <Text>React Native with Tamagui and tRPC</Text>
        
        <MyButton>Hello from Tamagui on React Native</MyButton>
        
        <YStack space="$2">
          <Text fontSize="$6" fontWeight="bold">Posts:</Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map((post) => (
            <View key={post.id} padding="$3" backgroundColor="$background075" borderRadius="$2">
              <Text fontSize="$5" fontWeight="bold">{post.title}</Text>
              {post.content && <Text color="$color11">{post.content}</Text>}
            </View>
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  );
}