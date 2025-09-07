const reactConfig = require('./react.js');
const globals = require('globals');

module.exports = [
  ...reactConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Next.js specific rules
      'no-console': 'off', // Console is ok in Next.js for server-side
      'react/react-in-jsx-scope': 'off', // Next.js handles React imports
      
      // Next.js Image component considerations
      'react/jsx-no-target-blank': ['error', {
        allowReferrer: true,
        enforceDynamicLinks: 'always',
        warnOnSpreadAttributes: true,
      }],
    },
  },
  // Next.js pages and app directory
  {
    files: ['pages/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
    rules: {
      // Allow default exports in Next.js pages and app directory
      'import/no-default-export': 'off',
    },
  },
  // Next.js config files
  {
    files: ['next.config.{js,ts}', 'tailwind.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-default-export': 'off',
    },
  },
];