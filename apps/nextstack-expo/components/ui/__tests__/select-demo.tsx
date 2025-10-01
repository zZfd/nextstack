import * as React from 'react';
import { View } from 'react-native';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SelectDemo() {
  const [value, setValue] = React.useState<{ value: string; label: string }>();

  return (
    <View className="w-full max-w-sm p-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple" label="Apple" />
            <SelectItem value="banana" label="Banana" />
            <SelectItem value="orange" label="Orange" />
            <SelectItem value="grape" label="Grape" />
            <SelectItem value="mango" label="Mango" />
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>
  );
}
