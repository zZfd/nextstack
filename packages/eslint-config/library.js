module.exports = {
  extends: [
    require.resolve('./base.js'),
  ],
  env: {
    es2022: true,
    node: true,
  },
  rules: {
    // Library-specific rules
    '@typescript-eslint/explicit-function-return-type': 'warn', // More important for libraries
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'error', // Stricter for libraries
    
    // Import/Export validation for public APIs
    'import/no-default-export': 'error', // Prefer named exports for libraries
    'import/prefer-default-export': 'off',
    
    // Documentation
    'no-console': 'error', // Libraries shouldn't have console logs
    
    // Performance considerations for libraries
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    
    // Prevent common library issues
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
  },
  overrides: [
    {
      // Allow default exports for specific files
      files: ['index.ts', 'index.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      // Test files can be more relaxed
      files: ['*.test.ts', '*.spec.ts', '**/__tests__/**'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        'no-console': 'off',
      },
    },
  ],
};