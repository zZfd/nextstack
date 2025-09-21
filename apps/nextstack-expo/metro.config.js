const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

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
  '@nextstack/trpc': path.resolve(monorepoRoot, 'packages/trpc'),
  '@': path.resolve(projectRoot),
};

// Enable web platform extensions
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = withNativeWind(config, { input: './global.css' });