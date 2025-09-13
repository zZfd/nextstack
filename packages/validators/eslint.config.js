const baseConfig = require("@nextstack/eslint-config");

module.exports = [
  ...baseConfig,
  // Ignore generated files
  {
    ignores: ["src/generated/**"],
  },
];