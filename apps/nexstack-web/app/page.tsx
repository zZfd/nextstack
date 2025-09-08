'use client';

import { trpc } from '@nexstack/trpc';
import { H1, Layout, MyButton, Stack, Text } from '@nexstack/ui';

export default function Home() {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <Layout padding='$4'>
      <Stack space='$4'>
        <H1>Web SEO (Next.js)</H1>
        <Text>SEO-optimized application with server-side rendering</Text>

        <MyButton>Hello from Tamagui on Next.js</MyButton>

        <Stack space='$2'>
          <Text fontSize='$6' fontWeight='bold'>
            Posts:
          </Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map(post => (
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
