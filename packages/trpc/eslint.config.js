const baseConfig = require('@nexstack/eslint-config/base.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // tRPC package specific rules
    },
  },
];