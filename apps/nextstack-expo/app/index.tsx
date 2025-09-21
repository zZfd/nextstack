import { ScrollView, View } from 'react-native';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Text } from '@/components/ui';
import '@/global.css';

export default function HomePage() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center p-6 gap-6">
        <Text className="text-3xl font-bold text-foreground">NextStack Mobile</Text>
        <Text className="text-lg text-muted-foreground text-center">
          Welcome to the mobile app with @solid/native patterns!
        </Text>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              <Text>UI Components</Text>
            </CardTitle>
            <CardDescription>
              <Text>Built with NativeWind + CVA + @rn-primitives</Text>
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4">
            <Button variant="default">
              <Text>Primary Button</Text>
            </Button>
            <Button variant="secondary">
              <Text>Secondary Button</Text>
            </Button>
            <Button variant="outline">
              <Text>Outline Button</Text>
            </Button>
            <Button variant="ghost">
              <Text>Ghost Button</Text>
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              <Text>Button Sizes</Text>
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Button size="sm" variant="outline">
              <Text>Small</Text>
            </Button>
            <Button size="default" variant="outline">
              <Text>Default</Text>
            </Button>
            <Button size="lg" variant="outline">
              <Text>Large</Text>
            </Button>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
