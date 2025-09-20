const baseConfig = require('@nextstack/eslint-config/base.js');
const globals = require('globals');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser, // Add browser globals for React components
        ...globals.es2022,
      },
    },
    rules: {
      // Library package specific rules (similar to library.js but adapted for ESLint v9)
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'import/no-default-export': 'error', // Prefer named exports for libraries
      'import/prefer-default-export': 'off',
      'no-console': 'error', // Libraries shouldn't have console logs
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
    },
  },
  {
    // Allow default exports for specific files
    files: ['index.ts', 'index.tsx'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    // Test files can be more relaxed
    files: ['*.test.ts', '*.spec.ts', '**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
    },
  },
];