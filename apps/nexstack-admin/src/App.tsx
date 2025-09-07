import { trpc } from "@nexstack/trpc";
import { MyButton } from "@nexstack/ui";
import { Layout, Text, H1, Stack } from "@nexstack/ui";

export function App() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <Layout padding="$4">
      <Stack space="$4">
        <H1>Web Dashboard (Vite)</H1>
        <MyButton>Hello from Tamagui</MyButton>
        
        <Stack space="$2">
          <Text fontSize="$6" fontWeight="bold">Posts:</Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map((post: any) => (
            <Layout key={post.id} padding="$2" backgroundColor="$background075">
              <Text fontSize="$4" fontWeight="bold">{post.title}</Text>
              {post.content && <Text>{post.content}</Text>}
            </Layout>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
}