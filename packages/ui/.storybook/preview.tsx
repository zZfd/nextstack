import type { Preview } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { TamaguiProvider, View } from 'tamagui';

import config from '../src/tamagui.config';

// Theme decorator with proper context and force re-render
const ThemeDecorator = (Story: any, context: any) => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [key, setKey] = useState(0); // Force re-render key
  
  // Listen for theme changes from Storybook
  useEffect(() => {
    const theme = context.globals?.theme || 'dark';
    if (theme !== currentTheme) {
      setCurrentTheme(theme);
      setKey(prev => prev + 1); // Force complete re-render
    }
  }, [context.globals?.theme, currentTheme]);

  return (
    <TamaguiProvider key={key} config={config} defaultTheme={currentTheme}>
      <View 
        theme={currentTheme}
        backgroundColor="$background" 
        minHeight="100vh" 
        padding="$4"
        flex={1}
        key={`${key}-${currentTheme}`} // Ensure complete re-render
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