const reactNativeConfig = require('@nexstack/eslint-config/react-native.js');

module.exports = [
  ...reactNativeConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add any project-specific overrides here
    },
  },
  // Configuration files
  {
    files: ['metro.config.js', 'babel.config.js', '*.config.js'],
    rules: {
      'import/no-nodejs-modules': 'off', // Allow Node.js modules in config files
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];