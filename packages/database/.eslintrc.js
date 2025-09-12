module.exports = {
  extends: [require.resolve('@nextstack/eslint-config/base')],
  rules: {
    // Prisma client code can be verbose
    '@typescript-eslint/no-explicit-any': 'off',
  },
};