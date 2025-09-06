module.exports = {
  extends: [
    require.resolve('./base.js'),
    'plugin:node/recommended',
  ],
  env: {
    node: true,
    es2022: true,
  },
  plugins: ['node'],
  rules: {
    // Node.js specific rules
    'node/no-unsupported-features/es-syntax': 'off', // Using TypeScript
    'node/no-missing-import': 'off', // TypeScript handles this
    'node/no-unpublished-import': 'off', // Allow dev dependencies
    'node/shebang': 'off',
    'node/prefer-global/buffer': 'error',
    'node/prefer-global/console': 'error',
    'node/prefer-global/process': 'error',
    'node/prefer-global/url-search-params': 'error',
    'node/prefer-global/url': 'error',
    'node/no-callback-literal': 'error',
    
    // Server-side console is usually intentional
    'no-console': 'off',
    
    // Performance considerations
    'no-sync': 'warn',
  },
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts'],
      rules: {
        'no-console': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};