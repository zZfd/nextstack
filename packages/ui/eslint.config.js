const reactConfig = require('@nexstack/eslint-config/react.js');
const globals = require('globals');

module.exports = [
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // UI package specific rules
      'react/prop-types': 'off', // Using TypeScript for props
      '@typescript-eslint/no-empty-object-type': 'off', // Allow empty interfaces for extensibility
    },
  },
  // Test files configuration
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/test/**/*.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        vi: 'readonly', // Vitest global
      },
    },
    rules: {
      // Relax rules for test files
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];