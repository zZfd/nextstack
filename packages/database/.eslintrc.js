module.exports = {
  extends: [require.resolve('@lzt/eslint-config/base')],
  rules: {
    // Prisma client code can be verbose
    '@typescript-eslint/no-explicit-any': 'off',
  },
};