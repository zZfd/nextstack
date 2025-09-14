import nextConfig from '@nextstack/eslint-config/next.js';

export default [
  ...nextConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add any project-specific overrides here
    },
  },
  // Test files configuration
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/test/**/*.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        vi: 'readonly', // Vitest global
        React: 'readonly', // React global for test files
      },
    },
    rules: {
      // Relax rules for test files
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off', // TypeScript handles this
    },
  },
  // Layout and root files
  {
    files: ['app/layout.tsx', 'app/root.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off', // Layout files can export metadata
    },
  },
  // Next.js generated files
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off', // Next.js auto-generated file
    },
  },
];