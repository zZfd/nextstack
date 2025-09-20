'use client';

import { trpc } from '@nextstack/trpc';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const postsQuery = trpc.post.all.useQuery({});

  return (
    <div className="p-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Web SEO (Next.js)</h1>
        <p className="text-gray-600">SEO-optimized application with server-side rendering</p>

        <div className="flex gap-2">
          <button
            onClick={() => router.push('/auth/signin')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">
            Posts:
          </h2>
          {postsQuery.isLoading && <p>Loading...</p>}
          {postsQuery.data?.map(
            (post) => (
              <div
                key={post.id}
                className="p-2 bg-gray-100 rounded"
              >
                <h3 className="text-lg font-bold">
                  {post.title}
                </h3>
                {post.content && <p>{post.content}</p>}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
