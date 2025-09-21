import { Moon, Sun } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { useColorScheme } from '@/lib/useColorScheme';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const toggleColorScheme = () => {
    const newTheme = isDarkColorScheme ? 'light' : 'dark';
    setColorScheme(newTheme);
  };

  return (
    <Pressable
      onPress={toggleColorScheme}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 active:opacity-70'
    >
      <View className='flex-1 aspect-square pt-0.5 justify-center items-center web:px-5'>
        {isDarkColorScheme ? (
          <Moon className='text-foreground' size={23} strokeWidth={1.25} />
        ) : (
          <Sun className='text-foreground' size={24} strokeWidth={1.25} />
        )}
      </View>
    </Pressable>
  );
}
