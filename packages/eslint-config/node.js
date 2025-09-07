const baseConfig = require('./base.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...baseConfig[0].languageOptions.globals,
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        exports: 'writable',
        global: 'writable',
        module: 'writable',
        process: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      // Server-side console is usually intentional
      'no-console': 'off',
      
      // Performance considerations
      'no-sync': 'warn',
      
      // Node.js specific patterns
      'prefer-arrow-callback': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
    },
  },
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    rules: {
      'no-console': 'off',
    },
  },
];