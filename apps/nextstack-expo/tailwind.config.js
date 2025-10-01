const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // CSS variables for dynamic theming
        // These reference variables defined in addBase plugin below
        border: 'hsl(var(--border) / <alpha-value>)',
        input: {
          DEFAULT: 'hsl(var(--input) / <alpha-value>)',
          text: 'hsl(var(--input-text) / <alpha-value>)',
          border: 'hsl(var(--input-border))',
          placeholder: 'hsl(var(--input-placeholder) / <alpha-value>)',
        },
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Define CSS variables for web
    ({ addBase }) =>
      addBase({
        ':root': {
          '--background': '0 0% 100%',
          '--foreground': '240 10% 3.9%',
          '--card': '0 0% 100%',
          '--card-foreground': '240 10% 3.9%',
          '--popover': '0 0% 100%',
          '--popover-foreground': '240 10% 3.9%',
          '--primary': '142 76% 36%',
          '--primary-foreground': '0 0% 98%',
          '--secondary': '142 20% 95%',
          '--secondary-foreground': '142 76% 25%',
          '--muted': '142 20% 95%',
          '--muted-foreground': '140 8% 46%',
          '--accent': '162 60% 40%',
          '--accent-foreground': '0 0% 98%',
          '--destructive': '0 84.2% 60.2%',
          '--destructive-foreground': '0 0% 98%',
          '--border': '240 5.9% 90%',
          '--input': '240 5.9% 90%',
          '--ring': '240 5.9% 10%',
          '--input-text': '0 0% 17.6%',
          '--input-border': '0 0% 0% / 0.1',
          '--input-placeholder': '0 0% 44.5%',
        },
        '.dark': {
          '--background': '240 10% 3.9%',
          '--foreground': '0 0% 98%',
          '--card': '240 10% 3.9%',
          '--card-foreground': '0 0% 98%',
          '--popover': '240 10% 3.9%',
          '--popover-foreground': '0 0% 98%',
          '--primary': '142 76% 36%',
          '--primary-foreground': '0 0% 98%',
          '--secondary': '142 15% 20%',
          '--secondary-foreground': '142 70% 65%',
          '--muted': '142 15% 20%',
          '--muted-foreground': '140 5% 64.9%',
          '--accent': '162 60% 45%',
          '--accent-foreground': '0 0% 98%',
          '--destructive': '0 72% 51%',
          '--destructive-foreground': '0 0% 98%',
          '--border': '240 3.7% 15.9%',
          '--input': '240 3.7% 15.9%',
          '--ring': '240 4.9% 83.9%',
          '--input-text': '0 0% 98%',
          '--input-border': '0 0% 100% / 0.1',
          '--input-placeholder': '0 0% 64.9%',
        },
      }),
  ],
};
