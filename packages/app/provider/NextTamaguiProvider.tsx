'use client';

import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
import '@tamagui/polyfill-dev';

import { config } from '@nextstack/ui';
import {
  ColorScheme,
  NextThemeProvider,
  useRootTheme,
} from '@tamagui/next-theme';
import { useServerInsertedHTML } from 'next/navigation';
import type { ReactNode, JSX } from 'react';
import { StyleSheet } from 'react-native';

import { Provider } from './index';

export const NextTamaguiProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [theme, setTheme] = useRootTheme();

  useServerInsertedHTML(() => {
    // @ts-expect-error - StyleSheet.getSheet() is not typed properly
    const rnwStyle = StyleSheet.getSheet();
    return (
      <>
        <style
          dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }}
          id={rnwStyle.id}
        />
        <style
          dangerouslySetInnerHTML={{
            // the first time this runs you'll get the full CSS including all themes
            // after that, it will only return CSS generated since the last call
            __html: config.getNewCSS(),
          }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: config.getCSS({
              exclude:
                process.env.NODE_ENV === 'production' ? 'design-system' : null,
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            // avoid flash of animated things on enter:
            __html: `document.documentElement.classList.add('t_unmounted')`,
          }}
        />
      </>
    );
  });

  return (
    <NextThemeProvider
      skipNextHead
      defaultTheme='light'
      onChangeTheme={next => {
        setTheme(next as ColorScheme);
      }}
    >
      <Provider disableRootThemeClass defaultTheme={theme || 'light'}>
        {children}
      </Provider>
    </NextThemeProvider>
  );
};
