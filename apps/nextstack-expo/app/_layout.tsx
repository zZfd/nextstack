import '@/global.css';

import { trpc } from '@nextstack/trpc-client';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { config } from '../config';

import { ThemeProvider } from '@/lib/ThemeProvider';
import { ToastProvider } from '@/lib/toast-context';
import { useColorScheme } from '@/lib/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: config.trpcEndpoint,
        }),
      ],
    })
  );

  const [fontsLoaded, fontError] = useFonts({
    // Using system fonts - no need to load Inter specifically
  });

  const { theme, isDarkColorScheme } = useColorScheme();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ToastProvider>
              <NavigationThemeProvider value={theme}>
                <Stack
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: theme.colors.card,
                    },
                    headerTintColor: theme.colors.text,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                >
                  <Stack.Screen
                    name='index'
                    options={{
                      title: 'Mobile Expo App',
                    }}
                  />
                </Stack>
                <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
              </NavigationThemeProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </trpc.Provider>
      <PortalHost />
    </GestureHandlerRootView>
  );
}
