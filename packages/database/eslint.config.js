const baseConfig = require('@nextstack/eslint-config/base.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // Database package specific rules
      'no-console': 'off', // Console logging for database operations
    },
  },
];