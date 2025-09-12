import nextConfig from '@nextstack/eslint-config/next.js';

export default [
  ...nextConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Add any project-specific overrides here
    },
  },
];