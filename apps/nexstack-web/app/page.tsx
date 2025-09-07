'use client'

import { trpc } from '@nexstack/trpc'
import { MyButton } from '@nexstack/ui'
import { View, Text, H1, YStack } from 'tamagui'

export default function Home() {
  const postsQuery = trpc.post.all.useQuery()

  return (
    <View padding="$4">
      <YStack space="$4">
        <H1>Web SEO (Next.js)</H1>
        <Text>SEO-optimized application with server-side rendering</Text>
        
        <MyButton>Hello from Tamagui on Next.js</MyButton>
        
        <YStack space="$2">
          <Text fontSize="$6" fontWeight="bold">Posts:</Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map((post: any) => (
            <View key={post.id} padding="$2" backgroundColor="$background075">
              <Text fontSize="$4" fontWeight="bold">{post.title}</Text>
              {post.content && <Text>{post.content}</Text>}
            </View>
          ))}
        </YStack>
      </YStack>
    </View>
  )
}