import { trpc } from '@nexstack/trpc';
import { MyButton } from '@nexstack/ui';
import { Container, Layout, Text, H1, Stack } from '@nexstack/ui';

export default function HomeScreen() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <Container flex={1} padding="$4">
      <Stack space="$4">
        <H1>Mobile Expo App</H1>
        <Text>React Native with Tamagui and tRPC</Text>
        
        <MyButton>Hello from Tamagui on React Native</MyButton>
        
        <Stack space="$2">
          <Text fontSize="$6" fontWeight="bold">Posts:</Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map((post: any) => (
            <Layout key={post.id} padding="$3" backgroundColor="$background075" borderRadius="$2">
              <Text fontSize="$5" fontWeight="bold">{post.title}</Text>
              {post.content && <Text color="$color11">{post.content}</Text>}
            </Layout>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}