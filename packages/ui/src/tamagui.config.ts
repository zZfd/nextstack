import { createAnimations } from '@tamagui/animations-react-native';
import { createTamagui, createTokens } from 'tamagui';

// Visual Pixel Gallery Design System - Color Token System
const tokens = createTokens({
  // Systematic color palette - base colors only
  color: {
    // Grayscale palette (14 steps for precise control)
    gray1: 'hsl(0, 0%, 99%)',    // Almost white
    gray2: 'hsl(0, 0%, 97.5%)',  // Very light gray  
    gray3: 'hsl(0, 0%, 96%)',    // Light gray
    gray4: 'hsl(0, 0%, 94%)',    // Soft gray
    gray5: 'hsl(0, 0%, 92%)',    // Muted light
    gray6: 'hsl(0, 0%, 89%)',    // Border light
    gray7: 'hsl(0, 0%, 83%)',    // Subtle
    gray8: 'hsl(0, 0%, 71%)',    // Medium 
    gray9: 'hsl(0, 0%, 60%)',    // Text light
    gray10: 'hsl(0, 0%, 45%)',   // Text medium
    gray11: 'hsl(0, 0%, 25%)',   // Text dark
    gray12: 'hsl(0, 0%, 9%)',    // Almost black
    gray13: 'hsl(0, 0%, 6%)',    // Very dark
    gray14: 'hsl(0, 0%, 3%)',    // Darkest

    // Brand green palette (12 steps)
    green1: 'hsl(142, 76%, 95%)',  // Very light green
    green2: 'hsl(142, 76%, 90%)',  // Light green
    green3: 'hsl(142, 76%, 85%)',  // Soft green
    green4: 'hsl(142, 76%, 78%)',  // Muted green
    green5: 'hsl(142, 76%, 70%)',  // Medium light
    green6: 'hsl(142, 76%, 60%)',  // Brand base
    green7: 'hsl(142, 76%, 50%)',  // Brand medium
    green8: 'hsl(142, 76%, 42%)',  // Brand strong
    green9: 'hsl(142, 76%, 36%)',  // Primary brand
    green10: 'hsl(142, 76%, 30%)', // Brand dark
    green11: 'hsl(142, 76%, 24%)', // Very dark green
    green12: 'hsl(142, 76%, 18%)', // Darkest green

    // Red palette (12 steps)
    red1: 'hsl(0, 84%, 95%)',     // Very light red
    red2: 'hsl(0, 84%, 90%)',     // Light red
    red3: 'hsl(0, 84%, 85%)',     // Soft red
    red4: 'hsl(0, 84%, 78%)',     // Muted red
    red5: 'hsl(0, 84%, 70%)',     // Medium light
    red6: 'hsl(0, 84%, 65%)',     // Error base
    red7: 'hsl(0, 84%, 58%)',     // Error medium
    red8: 'hsl(0, 84%, 52%)',     // Error strong
    red9: 'hsl(0, 84%, 46%)',     // Error primary
    red10: 'hsl(0, 84%, 40%)',    // Error dark
    red11: 'hsl(0, 84%, 35%)',    // Very dark red
    red12: 'hsl(0, 84%, 30%)',    // Darkest red

    // Blue palette (12 steps)
    blue1: 'hsl(217, 91%, 95%)',  // Very light blue
    blue2: 'hsl(217, 91%, 90%)',  // Light blue  
    blue3: 'hsl(217, 91%, 85%)',  // Soft blue
    blue4: 'hsl(217, 91%, 78%)',  // Muted blue
    blue5: 'hsl(217, 91%, 75%)',  // Medium light
    blue6: 'hsl(217, 91%, 70%)',  // Info base
    blue7: 'hsl(217, 91%, 65%)',  // Info medium
    blue8: 'hsl(217, 91%, 58%)',  // Info strong
    blue9: 'hsl(217, 91%, 52%)',  // Info primary
    blue10: 'hsl(217, 91%, 46%)', // Info dark
    blue11: 'hsl(217, 91%, 40%)', // Very dark blue
    blue12: 'hsl(217, 91%, 35%)', // Darkest blue

    // Orange/Amber palette (12 steps)
    orange1: 'hsl(35, 91%, 95%)', // Very light orange
    orange2: 'hsl(35, 91%, 90%)', // Light orange
    orange3: 'hsl(35, 91%, 85%)', // Soft orange
    orange4: 'hsl(35, 91%, 78%)', // Muted orange
    orange5: 'hsl(35, 91%, 70%)', // Medium light
    orange6: 'hsl(35, 91%, 65%)', // Warning base
    orange7: 'hsl(35, 91%, 60%)', // Warning medium
    orange8: 'hsl(35, 91%, 55%)', // Warning strong
    orange9: 'hsl(35, 91%, 50%)', // Warning primary
    orange10: 'hsl(35, 91%, 45%)', // Warning dark
    orange11: 'hsl(35, 91%, 40%)', // Very dark orange
    orange12: 'hsl(35, 91%, 35%)', // Darkest orange

    // Transparency overlays
    blackA1: 'rgba(0, 0, 0, 0.02)',   // Very subtle
    blackA2: 'rgba(0, 0, 0, 0.04)',   // Subtle
    blackA3: 'rgba(0, 0, 0, 0.08)',   // Light
    blackA4: 'rgba(0, 0, 0, 0.12)',   // Medium light
    blackA5: 'rgba(0, 0, 0, 0.16)',   // Medium
    blackA6: 'rgba(0, 0, 0, 0.24)',   // Medium strong
    blackA7: 'rgba(0, 0, 0, 0.32)',   // Strong
    blackA8: 'rgba(0, 0, 0, 0.48)',   // Very strong
    blackA9: 'rgba(0, 0, 0, 0.60)',   // Heavy
    blackA10: 'rgba(0, 0, 0, 0.72)',  // Very heavy
    blackA11: 'rgba(0, 0, 0, 0.84)',  // Almost opaque
    blackA12: 'rgba(0, 0, 0, 0.96)',  // Nearly black

    whiteA1: 'rgba(255, 255, 255, 0.02)',   // Very subtle
    whiteA2: 'rgba(255, 255, 255, 0.04)',   // Subtle
    whiteA3: 'rgba(255, 255, 255, 0.08)',   // Light
    whiteA4: 'rgba(255, 255, 255, 0.12)',   // Medium light
    whiteA5: 'rgba(255, 255, 255, 0.16)',   // Medium
    whiteA6: 'rgba(255, 255, 255, 0.24)',   // Medium strong
    whiteA7: 'rgba(255, 255, 255, 0.32)',   // Strong
    whiteA8: 'rgba(255, 255, 255, 0.48)',   // Very strong
    whiteA9: 'rgba(255, 255, 255, 0.60)',   // Heavy
    whiteA10: 'rgba(255, 255, 255, 0.72)', // Very heavy
    whiteA11: 'rgba(255, 255, 255, 0.84)', // Almost opaque
    whiteA12: 'rgba(255, 255, 255, 0.96)', // Nearly white

    // Base colors for theme reference
    white: '#ffffff',
    black: '#000000',
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

  // Theme definitions using new token system
  themes: {
    // Light theme - optimized for readability on light backgrounds
    light: {
      // Tamagui standard background properties
      background: tokens.color.white,
      backgroundHover: tokens.color.gray3,
      backgroundPress: tokens.color.gray4,
      backgroundFocus: tokens.color.gray3,
      backgroundStrong: tokens.color.gray12,
      backgroundTransparent: tokens.color.whiteA1,

      // Tamagui standard text color properties  
      color: tokens.color.gray12,
      colorHover: tokens.color.gray11,
      colorPress: tokens.color.gray11,
      colorFocus: tokens.color.gray11,
      colorTransparent: tokens.color.blackA6,

      // Tamagui standard border properties
      borderColor: tokens.color.gray6,
      borderColorHover: tokens.color.green7,
      borderColorPress: tokens.color.green8,
      borderColorFocus: tokens.color.green7,

      // Tamagui standard shadow properties
      shadowColor: tokens.color.blackA2,
      shadowColorHover: tokens.color.blackA3,
      shadowColorPress: tokens.color.blackA4,
      shadowColorFocus: tokens.color.blackA3,

      // Custom semantic properties for component variants
      // Primary brand colors
      primary: tokens.color.green9,
      primaryHover: tokens.color.green8,
      primaryPress: tokens.color.green10,
      primaryForeground: tokens.color.white,

      // Secondary colors
      secondary: tokens.color.gray4,
      secondaryHover: tokens.color.gray5,
      secondaryPress: tokens.color.gray6,
      secondaryForeground: tokens.color.gray12,

      // Destructive/error colors
      destructive: tokens.color.red9,
      destructiveHover: tokens.color.red8,
      destructivePress: tokens.color.red10,
      destructiveForeground: tokens.color.white,

      // Muted/subtle colors
      muted: tokens.color.gray4,
      mutedHover: tokens.color.gray5,
      mutedPress: tokens.color.gray6,
      mutedForeground: tokens.color.gray10,

      // Accent colors
      accent: tokens.color.gray4,
      accentHover: tokens.color.gray5,
      accentPress: tokens.color.gray6,
      accentForeground: tokens.color.gray12,

      // UI element colors
      card: tokens.color.white,
      cardForeground: tokens.color.gray12,
      popover: tokens.color.white,
      popoverForeground: tokens.color.gray12,
      input: tokens.color.gray3,
      inputBorder: tokens.color.gray6,
      ring: tokens.color.green7,

      // Extended semantic colors
      success: tokens.color.green9,
      successForeground: tokens.color.white,
      warning: tokens.color.orange9,
      warningForeground: tokens.color.white,
      error: tokens.color.red9,
      errorForeground: tokens.color.white,
      info: tokens.color.blue9,
      infoForeground: tokens.color.white,

      // Additional utility colors
      placeholderColor: tokens.color.gray8,
    },

    // Dark theme - optimized for readability on dark backgrounds
    dark: {
      // Tamagui standard background properties
      background: tokens.color.gray14,
      backgroundHover: tokens.color.gray13,
      backgroundPress: tokens.color.gray12,
      backgroundFocus: tokens.color.gray13,
      backgroundStrong: tokens.color.gray1,
      backgroundTransparent: tokens.color.blackA1,

      // Tamagui standard text color properties
      color: tokens.color.gray1,
      colorHover: tokens.color.gray2,
      colorPress: tokens.color.gray2,
      colorFocus: tokens.color.gray2,
      colorTransparent: tokens.color.whiteA6,

      // Tamagui standard border properties
      borderColor: tokens.color.gray11,
      borderColorHover: tokens.color.green7,
      borderColorPress: tokens.color.green6,
      borderColorFocus: tokens.color.green7,

      // Tamagui standard shadow properties
      shadowColor: tokens.color.blackA8,
      shadowColorHover: tokens.color.blackA9,
      shadowColorPress: tokens.color.blackA10,
      shadowColorFocus: tokens.color.blackA9,

      // Custom semantic properties for component variants
      // Primary brand colors
      primary: tokens.color.green7,
      primaryHover: tokens.color.green8,
      primaryPress: tokens.color.green6,
      primaryForeground: tokens.color.white,

      // Secondary colors
      secondary: tokens.color.gray11,
      secondaryHover: tokens.color.gray10,
      secondaryPress: tokens.color.gray9,
      secondaryForeground: tokens.color.gray1,

      // Destructive/error colors
      destructive: tokens.color.red7,
      destructiveHover: tokens.color.red8,
      destructivePress: tokens.color.red6,
      destructiveForeground: tokens.color.white,

      // Muted/subtle colors
      muted: tokens.color.gray11,
      mutedHover: tokens.color.gray10,
      mutedPress: tokens.color.gray9,
      mutedForeground: tokens.color.gray8,

      // Accent colors
      accent: tokens.color.gray11,
      accentHover: tokens.color.gray10,
      accentPress: tokens.color.gray9,
      accentForeground: tokens.color.gray1,

      // UI element colors
      card: tokens.color.gray13,
      cardForeground: tokens.color.gray1,
      popover: tokens.color.gray13,
      popoverForeground: tokens.color.gray1,
      input: tokens.color.gray12,
      inputBorder: tokens.color.gray11,
      ring: tokens.color.green7,

      // Extended semantic colors
      success: tokens.color.green7,
      successForeground: tokens.color.white,
      warning: tokens.color.orange7,
      warningForeground: tokens.color.white,
      error: tokens.color.red7,
      errorForeground: tokens.color.white,
      info: tokens.color.blue7,
      infoForeground: tokens.color.white,

      // Additional utility colors
      placeholderColor: tokens.color.gray8,
    },
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
