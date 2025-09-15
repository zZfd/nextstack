'use client';

import { trpc } from '@nextstack/trpc';
import { H1, Button, Stack, HStack, Text } from '@nextstack/ui';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const postsQuery = trpc.post.all.useQuery({});

  return (
    <Stack padding='$4'>
      <Stack space='$4'>
        <H1>Web SEO (Next.js)</H1>
        <Text>SEO-optimized application with server-side rendering</Text>

        <HStack space='$2'>
          <Button onPress={() => router.push('/auth/signin')}>Sign In</Button>
          <Button onPress={() => router.push('/auth/signup')}>Sign Up</Button>
        </HStack>

        <Stack space='$2'>
          <Text fontSize='$6' fontWeight='bold'>
            Posts:
          </Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map(
            (post) => (
              <Stack
                key={post.id}
                padding='$2'
                backgroundColor='$background075'
              >
                <Text fontSize='$4' fontWeight='bold'>
                  {post.title}
                </Text>
                {post.content && <Text>{post.content}</Text>}
              </Stack>
            )
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
