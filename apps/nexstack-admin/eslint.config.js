const nextConfig = require('@nexstack/eslint-config/next.js');

module.exports = [
  ...nextConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add any project-specific overrides here
    },
  },
];