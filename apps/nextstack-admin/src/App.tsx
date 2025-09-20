import { trpc } from '@nextstack/trpc';

export function App() {
  const postsQuery = trpc.post.all.useQuery({});
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>Web Dashboard (Vite)</h1>
        <button
          style={{
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Hello from React
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
            Posts:
          </h2>
          {postsQuery.isLoading && <p>Loading...</p>}
          {postsQuery.data?.map(post => (
            <div
              key={post.id}
              style={{
                padding: '8px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
                {post.title}
              </h3>
              {post.content && <p style={{ margin: '4px 0 0 0' }}>{post.content}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
