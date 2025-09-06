module.exports = {
  extends: [
    require.resolve('./react.js'),
  ],
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  rules: {
    // Next.js specific rules will be handled by next/core-web-vitals
    // This config is mainly for extending our base React config
    
    // Server-side rendering considerations
    'no-console': 'off', // Console is ok in Next.js for server-side
    
    // Next.js handles React imports
    'react/react-in-jsx-scope': 'off',
    
    // Next.js Image component considerations
    'react/jsx-no-target-blank': ['error', {
      allowReferrer: true,
      enforceDynamicLinks: 'always',
      warnOnSpreadAttributes: true,
    }],
  },
  overrides: [
    {
      files: ['pages/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
      rules: {
        // Allow default exports in Next.js pages and app directory
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['next.config.{js,ts}', 'tailwind.config.{js,ts}'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};