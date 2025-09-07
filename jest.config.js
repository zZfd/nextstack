/** @type {import('jest').Config} */
module.exports = {
  projects: [
    '<rootDir>/apps/nexstack-api',
    '<rootDir>/apps/nexstack-admin',
    '<rootDir>/apps/nexstack-web',
    '<rootDir>/packages/api',
    '<rootDir>/packages/ui',
    '<rootDir>/packages/database',
    '<rootDir>/packages/trpc',
  ],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/.next/**',
    '!**/coverage/**',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/apps/nexstack-mobile/', // Expo has its own test setup
  ],
};