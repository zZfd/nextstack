const reactConfig = require('./react.js');

module.exports = [
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        // React Native globals
        __DEV__: 'readonly',
        FormData: 'readonly',
        navigator: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        requestIdleCallback: 'readonly',
        cancelIdleCallback: 'readonly',
        // Remove browser globals, this is React Native
        window: 'off',
        document: 'off',
      },
    },
    rules: {
      // Allow console.error and console.warn for legitimate logging, warn on console.log
      'no-console': ['warn', { allow: ['error', 'warn'] }],

      // Platform-specific considerations
      'import/no-nodejs-modules': 'error',

      // Note: eslint-plugin-react-native is not compatible with ESLint v9 yet
      // Will re-enable specific rules when plugin is updated
    },
  },
];