import { AlertCircle, Check, ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';

import { Alert, AlertTitle, AlertDescription } from './alert';
import { Text } from './text';

export function AlertExamples() {
  return (
    <View className='gap-4 p-4'>
      {/* Success Alert with Icon */}
      <Alert variant='success' icon={Check}>
        <AlertTitle>
          <Text>Success! Your changes have been saved</Text>
        </AlertTitle>
        <AlertDescription>
          <Text>This is an alert with icon, title and description.</Text>
        </AlertDescription>
      </Alert>

      {/* Default Alert without Description */}
      <Alert variant='default' icon={ChevronRight}>
        <AlertTitle>
          <Text>This Alert has no description.</Text>
        </AlertTitle>
      </Alert>

      {/* Destructive Alert with List */}
      <Alert variant='destructive' icon={AlertCircle}>
        <AlertTitle>
          <Text>Unable to process your payment.</Text>
        </AlertTitle>
        <AlertDescription>
          <Text>Please verify your billing information and try again.</Text>
          <View className='mt-2 ml-4'>
            <Text>• Check your card details</Text>
            <Text>• Ensure sufficient funds</Text>
            <Text>• Verify billing address</Text>
          </View>
        </AlertDescription>
      </Alert>
    </View>
  );
}
