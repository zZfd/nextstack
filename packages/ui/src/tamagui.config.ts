import { createTamagui, createTokens } from 'tamagui'

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
    secondary: 'hsl(0, 0%, 9%)',
    secondaryForeground: 'hsl(0, 0%, 98%)',
    
    // Muted colors
    muted: 'hsl(0, 0%, 9%)',
    mutedForeground: 'hsl(0, 0%, 63%)',
    
    // Accent colors
    accent: 'hsl(0, 0%, 9%)',
    accentForeground: 'hsl(0, 0%, 98%)',
    
    // Destructive/Error colors
    destructive: 'hsl(0, 63%, 31%)', // #dc2626
    destructiveForeground: 'hsl(0, 0%, 98%)',
    
    // Border and input colors
    border: 'hsl(0, 0%, 15%)',
    input: 'hsl(0, 0%, 15%)',
    ring: 'hsl(142, 76%, 36%)', // Focus ring uses primary
    
    // Extended semantic colors from style guide
    success: 'hsl(142, 76%, 36%)', // Green for success
    warning: 'hsl(35, 91%, 45%)', // #d97706
    info: 'hsl(217, 91%, 60%)', // #3b82f6
    error: 'hsl(0, 84%, 60%)', // #ef4444
    
    // Status colors
    green500: 'hsl(142, 76%, 36%)',
    blue500: 'hsl(217, 91%, 60%)',
    red500: 'hsl(0, 84%, 60%)',
    amber600: 'hsl(35, 91%, 45%)',
    yellow800: 'hsl(35, 92%, 33%)',
    
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
    2: 6,  // rounded
    3: 8,  // rounded-lg
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
})

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
}

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
}

// Animation configuration will be added later when animation driver is properly configured
// const animations = createAnimations({ ... })

// Tamagui configuration
export const tamaguiConfig = createTamagui({
  // animations, // Temporarily disabled until proper animation driver is configured
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
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
    // Light theme (fallback)
    light: {
      background: tokens.color.background,
      backgroundHover: tokens.color.muted,
      backgroundPress: tokens.color.muted,
      backgroundFocus: tokens.color.muted,
      backgroundStrong: tokens.color.foreground,
      backgroundTransparent: 'rgba(255,255,255,0)',
      color: tokens.color.foreground,
      colorHover: tokens.color.foreground,
      colorPress: tokens.color.foreground,
      colorFocus: tokens.color.foreground,
      colorTransparent: 'rgba(0,0,0,0)',
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
    
    // Dark theme (primary)
    dark: {
      background: tokens.color.background,
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
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}