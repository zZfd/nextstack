import { trpc } from "@lzt/trpc-client";
import { MyButton } from "@lzt/ui";
import { View, Text, H1, YStack } from "tamagui";

export function App() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <View padding="$4">
      <YStack space="$4">
        <H1>Web Dashboard (Vite)</H1>
        <MyButton>Hello from Tamagui</MyButton>
        
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
  );
}