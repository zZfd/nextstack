const baseConfig = require('@nextstack/eslint-config/base.js');

module.exports = [
  ...baseConfig,
  // Global ignores for monorepo
  {
    ignores: [
      // Lock files and large generated files
      '**/pnpm-lock.yaml',
      '**/yarn.lock',
      '**/package-lock.json',

      // Build and cache directories
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/.cache/**',

      // Generated files
      '**/prisma/generated/**',
      '**/src/generated/**',
      '**/*.min.js',
      '**/*.min.css',

      // Environment and config
      '**/.env*',
      '**/coverage/**',

      // Expo specific
      '**/expo-env.d.ts',
      '**/.expo/**',
    ],
  },
  // Monorepo specific rules
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      // Relax some rules for monorepo development
      'no-console': 'warn', // Allow console in development
    },
  },
];