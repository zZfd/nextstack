import * as React from 'react';
import { View } from 'react-native';

import { Checkbox } from '../checkbox';
import { Label } from '../label';
import { Text } from '../text';

/**
 * Demo component to showcase checkbox usage
 * This is not a real test, just a usage example
 */
export function CheckboxDemo() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View className='flex-row items-center gap-2'>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Label onPress={() => setChecked(!checked)}>
        <Text>Accept terms and conditions</Text>
      </Label>
    </View>
  );
}

/**
 * Demo with disabled state
 */
export function CheckboxDisabledDemo() {
  return (
    <View className='flex-row items-center gap-2'>
      <Checkbox checked={true} disabled onCheckedChange={() => {}} />
      <Label>
        <Text className='text-muted-foreground'>Disabled checkbox</Text>
      </Label>
    </View>
  );
}
