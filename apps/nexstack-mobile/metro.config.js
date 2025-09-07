const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Find the project root directory
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

// Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// Map workspace packages to their source directories
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Add workspace packages as extra node modules
config.resolver.alias = {
  '@lzt/trpc-client': path.resolve(monorepoRoot, 'packages/trpc-client'),
  '@lzt/ui': path.resolve(monorepoRoot, 'packages/ui'),
};

module.exports = config;