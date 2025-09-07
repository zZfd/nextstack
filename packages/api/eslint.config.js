const baseConfig = require('@nexstack/eslint-config/base.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // API package specific rules
      'no-console': 'off', // Console logging is common in APIs
    },
  },
];