import { trpc } from '@nextstack/trpc';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen() {
  const postsQuery = trpc.post.all.useQuery({});

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Mobile Expo App</Text>
        <Text style={{ fontSize: 16, color: '#666' }}>React Native with tRPC</Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Hello from React Native
          </Text>
        </TouchableOpacity>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Posts:
          </Text>
          {postsQuery.isLoading && <Text>Loading...</Text>}
          {postsQuery.data?.map((post) => (
            <View
              key={post.id}
              style={{
                padding: 12,
                backgroundColor: '#f5f5f5',
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {post.title || 'Untitled'}
              </Text>
              {post.content && <Text style={{ color: '#666' }}>{post.content}</Text>}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
