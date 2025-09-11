import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ThemeTest } from '../ThemeTest';

const meta: Meta<typeof ThemeTest> = {
  title: 'Theme/Theme Test',
  component: ThemeTest,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Theme System Test

Test component to verify that the new theme system works correctly.

## Features
- **Light Theme**: Clean, light background with dark text
- **Dark Theme**: Dark background with light text  
- **Component Variants**: All button variants in both themes
- **Token System**: Uses the new systematic color tokens
- **Theme Properties**: Both standard Tamagui and custom semantic properties

## What to Test
1. **Theme Isolation**: Light and dark sections should look distinctly different
2. **Button Variants**: All 5 button variants should render correctly in both themes
3. **Hover/Press States**: Interactive states should use theme-appropriate colors
4. **Color Contrast**: Text should be readable in both themes
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeComparison: Story = {
  name: 'Light vs Dark Comparison',
  render: () => <ThemeTest />,
};