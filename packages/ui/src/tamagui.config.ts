import { createAnimations } from '@tamagui/animations-react-native';
import { createTamagui, createTokens } from 'tamagui';

// Visual Pixel Gallery Design System - Dark Theme
const tokens = createTokens({
  // Color system based on HSL values from style guide
  color: {
    // Background colors
    background: 'hsl(0, 0%, 3%)',
    foreground: 'hsl(0, 0%, 98%)',

    // Card and container colors
    card: 'hsl(0, 0%, 6%)',
    cardForeground: 'hsl(0, 0%, 98%)',

    // Popover colors
    popover: 'hsl(0, 0%, 6%)',
    popoverForeground: 'hsl(0, 0%, 98%)',

    // Primary brand color - Green
    primary: 'hsl(142, 76%, 36%)', // #22c55e
    primaryForeground: 'hsl(0, 0%, 98%)',

    // Secondary colors
    secondary: 'hsl(0, 0%, 25%)', // Lighter gray for better visibility
    secondaryForeground: 'hsl(0, 0%, 98%)',

    // Muted colors
    muted: 'hsl(0, 0%, 20%)', // Slightly lighter for better visibility
    mutedForeground: 'hsl(0, 0%, 71%)',

    // Accent colors
    accent: 'hsl(0, 0%, 18%)', // Slightly lighter for better visibility
    accentForeground: 'hsl(0, 0%, 98%)',

    // Destructive/Error colors
    destructive: 'hsl(0, 84%, 50%)', // Brighter red for better visibility
    destructiveForeground: 'hsl(0, 0%, 98%)',

    // Border and input colors
    border: 'hsl(0, 0%, 15%)',
    input: 'hsl(0, 0%, 15%)',
    ring: 'hsl(142, 76%, 36%)', // Focus ring uses primary

    // Extended semantic colors from style guide
    success: 'hsl(142, 76%, 55%)', // Brighter green for better visibility on dark
    warning: 'hsl(35, 91%, 60%)', // Brighter orange for better visibility
    info: 'hsl(217, 91%, 70%)', // Brighter blue for better visibility
    error: 'hsl(0, 84%, 65%)', // Brighter red for better visibility

    // Status colors
    green500: 'hsl(142, 76%, 55%)',
    blue500: 'hsl(217, 91%, 70%)',
    red500: 'hsl(0, 84%, 65%)',
    amber600: 'hsl(35, 91%, 60%)',
    yellow800: 'hsl(35, 92%, 50%)',

    // Transparent variants for overlays
    blackAlpha: 'rgba(0, 0, 0, 0.6)',
    whiteAlpha: 'rgba(255, 255, 255, 0.1)',
  },

  // Typography system - Inter font with size hierarchy
  size: {
    // Font sizes matching style guide (text-xs to text-4xl)
    0: 0,
    1: 4,
    2: 8,
    3: 12, // text-xs
    4: 14, // text-sm
    5: 16, // text-base
    6: 18, // text-lg
    7: 20, // text-xl
    8: 24, // text-2xl
    9: 30, // text-3xl
    10: 36, // text-4xl
    true: 16, // Default size
  },

  // Spacing system - 8px based (gap-1 to gap-8)
  space: {
    0: 0,
    1: 4, // 4px
    2: 8, // 8px
    3: 12,
    4: 16, // 16px
    5: 20,
    6: 24, // 24px
    7: 28,
    8: 32, // 32px
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    true: 16, // Default space
  },

  // Border radius system
  radius: {
    0: 0,
    1: 3,
    2: 6, // rounded
    3: 8, // rounded-lg
    4: 12,
    5: 16,
    6: 20,
    true: 6, // Default radius
  },

  // Z-index system
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
});

// Font configuration
const fonts = {
  heading: {
    family: 'Inter, system-ui, sans-serif',
    size: tokens.size,
    lineHeight: {
      1: 16,
      2: 20,
      3: 24,
      4: 28,
      5: 32,
      6: 36,
      7: 40,
    },
    weight: {
      1: '400', // normal
      2: '500', // medium
      3: '600', // semibold
      4: '700', // bold
    },
  },
  body: {
    family: 'Inter, system-ui, sans-serif',
    size: tokens.size,
    lineHeight: {
      1: 16,
      2: 20,
      3: 24,
      4: 28,
      5: 32,
      6: 36,
      7: 40,
    },
    weight: {
      1: '400', // normal
      2: '500', // medium
      3: '600', // semibold
      4: '700', // bold
    },
  },
};

// Media queries - Tailwind breakpoints
const media = {
  sm: { maxWidth: 640 },
  md: { maxWidth: 768 },
  lg: { maxWidth: 1024 },
  xl: { maxWidth: 1280 },
  xxl: { maxWidth: 1536 },
  short: { maxHeight: 820 },
  tall: { minHeight: 820 },
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
};

// Animation configuration - based on Visual Pixel Gallery style guide
// Base transitions with 300ms duration and spring animations
const animations = createAnimations({
  // Base transitions - 300ms duration from style guide
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  bouncy: {
    type: 'spring',
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    type: 'spring',
    damping: 18,
    stiffness: 50,
  },
  // Additional animations for micro-interactions
  fast: {
    type: 'spring',
    damping: 20,
    mass: 0.8,
    stiffness: 300,
  },
  medium: {
    type: 'spring',
    damping: 15,
    mass: 1.0,
    stiffness: 200,
  },
  slow: {
    type: 'spring',
    damping: 25,
    stiffness: 60,
  },
});

// Tamagui configuration
export const tamaguiConfig = createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  defaultTheme: 'dark',
  shorthands: {
    // Layout shorthands
    f: 'flex',
    fd: 'flexDirection',
    fw: 'flexWrap',
    ai: 'alignItems',
    ac: 'alignContent',
    jc: 'justifyContent',
    ta: 'textAlign',

    // Spacing shorthands
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    px: 'paddingHorizontal',
    py: 'paddingVertical',

    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mx: 'marginHorizontal',
    my: 'marginVertical',

    // Border
    br: 'borderRadius',
    bw: 'borderWidth',
    bc: 'borderColor',

    // Size
    w: 'width',
    h: 'height',
    mw: 'maxWidth',
    mh: 'maxHeight',

    // Colors
    bg: 'backgroundColor',
    col: 'color',

    // Positioning
    pos: 'position',
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    zi: 'zIndex',
  },
  fonts,
  tokens,
  media,

  // Theme definitions
  themes: {
    // Light theme - bright background with dark text
    light: {
      // Basic background and foreground
      background: 'hsl(0, 0%, 100%)', // Pure white background
      foreground: 'hsl(0, 0%, 9%)', // Dark text
      
      // Card colors
      card: 'hsl(0, 0%, 100%)', // White card background
      cardForeground: 'hsl(0, 0%, 9%)', // Dark card text
      
      // Popover colors
      popover: 'hsl(0, 0%, 100%)', // White popover
      popoverForeground: 'hsl(0, 0%, 9%)', // Dark popover text
      
      // Primary colors (keep green brand color)
      primary: tokens.color.primary, // Brand green
      primaryForeground: 'hsl(0, 0%, 98%)', // White text on green
      
      // Secondary colors
      secondary: 'hsl(0, 0%, 96%)', // Light gray
      secondaryForeground: 'hsl(0, 0%, 9%)', // Dark text
      
      // Muted colors
      muted: 'hsl(0, 0%, 96%)', // Light gray
      mutedForeground: 'hsl(0, 0%, 40%)', // Darker gray text for better contrast
      
      // Accent colors
      accent: 'hsl(0, 0%, 96%)', // Light gray
      accentForeground: 'hsl(0, 0%, 9%)', // Dark text
      
      // Destructive colors
      destructive: tokens.color.destructive, // Keep red
      destructiveForeground: 'hsl(0, 0%, 98%)', // White text on red
      
      // Border and input
      border: 'hsl(0, 0%, 89%)', // Light border
      input: 'hsl(0, 0%, 96%)', // Light input background
      ring: tokens.color.primary, // Green focus ring
      
      // Extended semantic colors - adjusted for light theme
      success: 'hsl(142, 76%, 36%)', // Darker green for light background
      warning: 'hsl(35, 91%, 45%)', // Darker orange for light background
      info: 'hsl(217, 91%, 50%)', // Darker blue for light background
      error: 'hsl(0, 84%, 50%)', // Darker red for light background
      
      // Legacy theme properties for compatibility
      backgroundHover: 'hsl(0, 0%, 96%)',
      backgroundPress: 'hsl(0, 0%, 94%)',
      backgroundFocus: 'hsl(0, 0%, 96%)',
      backgroundStrong: 'hsl(0, 0%, 9%)',
      backgroundTransparent: 'rgba(255,255,255,0)',
      color: 'hsl(0, 0%, 9%)',
      colorHover: 'hsl(0, 0%, 9%)',
      colorPress: 'hsl(0, 0%, 9%)',
      colorFocus: 'hsl(0, 0%, 9%)',
      colorTransparent: 'rgba(0,0,0,0)',
      borderColor: 'hsl(0, 0%, 89%)',
      borderColorHover: tokens.color.primary,
      borderColorFocus: tokens.color.ring,
      borderColorPress: tokens.color.primary,
      placeholderColor: 'hsl(0, 0%, 45%)',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowColorHover: 'rgba(0, 0, 0, 0.15)',
      shadowColorPress: 'rgba(0, 0, 0, 0.2)',
      shadowColorFocus: 'rgba(0, 0, 0, 0.15)',
    },

    // Dark theme - dark background with light text
    dark: {
      // Basic background and foreground
      background: tokens.color.background, // Very dark background
      foreground: tokens.color.foreground, // Light text
      
      // Card colors
      card: tokens.color.card, // Dark card
      cardForeground: tokens.color.cardForeground, // Light card text
      
      // Popover colors
      popover: tokens.color.popover, // Dark popover
      popoverForeground: tokens.color.popoverForeground, // Light popover text
      
      // Primary colors
      primary: tokens.color.primary, // Brand green
      primaryForeground: tokens.color.primaryForeground, // White text on green
      
      // Secondary colors
      secondary: tokens.color.secondary, // Dark gray
      secondaryForeground: tokens.color.secondaryForeground, // Light text
      
      // Muted colors
      muted: tokens.color.muted, // Dark gray
      mutedForeground: tokens.color.mutedForeground, // Medium gray text
      
      // Accent colors
      accent: tokens.color.accent, // Dark gray
      accentForeground: tokens.color.accentForeground, // Light text
      
      // Destructive colors
      destructive: tokens.color.destructive, // Red
      destructiveForeground: tokens.color.destructiveForeground, // White text on red
      
      // Border and input
      border: tokens.color.border, // Dark border
      input: tokens.color.input, // Dark input background
      ring: tokens.color.ring, // Green focus ring
      
      // Extended semantic colors - bright colors for dark background
      success: 'hsl(142, 76%, 55%)', // Bright green for dark background
      warning: 'hsl(35, 91%, 60%)', // Bright orange for dark background
      info: 'hsl(217, 91%, 70%)', // Bright blue for dark background
      error: 'hsl(0, 84%, 65%)', // Bright red for dark background
      
      // Legacy theme properties for compatibility
      backgroundHover: tokens.color.muted,
      backgroundPress: tokens.color.muted,
      backgroundFocus: tokens.color.muted,
      backgroundStrong: tokens.color.foreground,
      backgroundTransparent: 'rgba(0,0,0,0)',
      color: tokens.color.foreground,
      colorHover: tokens.color.foreground,
      colorPress: tokens.color.foreground,
      colorFocus: tokens.color.foreground,
      colorTransparent: 'rgba(255,255,255,0)',
      borderColor: tokens.color.border,
      borderColorHover: tokens.color.primary,
      borderColorFocus: tokens.color.ring,
      borderColorPress: tokens.color.primary,
      placeholderColor: tokens.color.mutedForeground,
      shadowColor: tokens.color.blackAlpha,
      shadowColorHover: tokens.color.blackAlpha,
      shadowColorPress: tokens.color.blackAlpha,
      shadowColorFocus: tokens.color.blackAlpha,
    },
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
