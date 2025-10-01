import * as React from 'react';
import { View } from 'react-native';

import { Progress } from '../progress';
import { Text } from '../text';

/**
 * Demo component to showcase progress usage
 * This is not a real test, just a usage example
 */
export function ProgressDemo() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <View className="gap-2">
      <Text>Progress: {progress}%</Text>
      <Progress value={progress} max={100} />
    </View>
  );
}

/**
 * Demo with different values
 */
export function ProgressVariantsDemo() {
  return (
    <View className="gap-4">
      <View className="gap-2">
        <Text>25%</Text>
        <Progress value={25} max={100} />
      </View>
      <View className="gap-2">
        <Text>50%</Text>
        <Progress value={50} max={100} />
      </View>
      <View className="gap-2">
        <Text>75%</Text>
        <Progress value={75} max={100} />
      </View>
      <View className="gap-2">
        <Text>100%</Text>
        <Progress value={100} max={100} />
      </View>
    </View>
  );
}
