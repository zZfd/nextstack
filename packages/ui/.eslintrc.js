module.exports = {
  extends: [require.resolve('@nexstack/eslint-config/library')],
  rules: {
    // UI components can export default
    'import/no-default-export': 'off',
  },
};