module.exports = {
  extends: [
    require.resolve('./react.js'),
    'plugin:react-native/all',
  ],
  env: {
    browser: false,
    node: false,
    'react-native/react-native': true,
  },
  plugins: ['react-native'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React Native specific rules
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'off', // Too restrictive for many use cases
    'react-native/sort-styles': 'warn',
    
    // React hooks work in React Native
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Console is fine in React Native (Metro handles it)
    'no-console': 'warn',
    
    // Platform-specific considerations
    'import/no-nodejs-modules': 'error',
  },
  globals: {
    __DEV__: 'readonly',
    FormData: 'readonly',
    navigator: 'readonly',
    requestAnimationFrame: 'readonly',
    cancelAnimationFrame: 'readonly',
    requestIdleCallback: 'readonly',
    cancelIdleCallback: 'readonly',
  },
};