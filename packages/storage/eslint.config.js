const baseConfig = require('@nextstack/eslint-config/base.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Storage package specific rules
      'no-console': 'off', // Console logging is common in storage providers
    },
  },
];