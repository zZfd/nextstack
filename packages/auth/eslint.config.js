const baseConfig = require('@nextstack/eslint-config/base.js');
const globals = require('globals');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser, // Add browser globals for client-side code
      },
    },
    rules: {
      // Auth package specific rules
      'no-console': 'off', // Allow console in auth for development debugging
    },
  },
];