const baseConfig = require('@nextstack/eslint-config/base.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // UI package specific rules
      'react/react-in-jsx-scope': 'off', // Not needed with modern React
    },
  },
];