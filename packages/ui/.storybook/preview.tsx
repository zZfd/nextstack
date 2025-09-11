import type { Preview } from '@storybook/react-native-web-vite';
import { useEffect, useState } from 'react';
import { View } from 'tamagui';

import { TamaguiProvider } from '../src/Provider';
import config from '../src/tamagui.config';

// Theme decorator with proper context and force re-render
const ThemeDecorator = (Story, context) => {
  const [currentTheme, setCurrentTheme] = useState('dark');

  // Listen for theme changes from Storybook
  useEffect(() => {
    const theme = context.globals?.theme || 'dark';
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
    }
  }, [context.globals?.theme, currentTheme]);

  return (
    <TamaguiProvider config={config} defaultTheme={currentTheme}>
      <View
        backgroundColor='$background'
        minHeight='100vh'
        padding='$4'
        flex={1}
      >
        <Story />
      </View>
    </TamaguiProvider>
  );
};

const preview: Preview = {
  decorators: [ThemeDecorator],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    // Remove hardcoded backgrounds - let theme handle it
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
    // Add viewport for better theme visualization
    viewport: {
      viewports: {
        responsive: {
          name: 'Responsive',
          styles: { width: '100%', height: '100%' },
        },
      },
    },
  },
};

export default preview;
