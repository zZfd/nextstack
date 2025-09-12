'use client';

import { trpc } from '@nexstack/trpc';
import { H1, Layout, Button, Stack, Text } from '@nexstack/ui';

export default function Home() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <Layout padding='$4'>
      <Stack space='$4'>
        <H1>Web SEO (Next.js)</H1>
        <Text>SEO-optimized application with server-side rendering</Text>

        <Button>Hello from Tamagui on Next.js</Button>

        <Stack space='$2'>
          <Text fontSize='$6' fontWeight='bold'>
            Posts:
          </Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map((post: { id: string; title: string; content: string | null }) => (
            <Layout key={post.id} padding='$2' backgroundColor='$background075'>
              <Text fontSize='$4' fontWeight='bold'>
                {post.title}
              </Text>
              {post.content && <Text>{post.content}</Text>}
            </Layout>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
}
