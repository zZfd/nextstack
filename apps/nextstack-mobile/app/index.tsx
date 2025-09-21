import { Text, View } from 'react-native';

export default function HomePage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>NextStack Mobile</Text>
      <Text style={{ fontSize: 16, marginTop: 8 }}>Welcome to the mobile app!</Text>
    </View>
  );
}
