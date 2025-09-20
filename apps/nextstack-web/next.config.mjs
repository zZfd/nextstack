/** @type {import('next').NextConfig} */
// Temporarily disable Tamagui plugin to test basic functionality
// import { withTamagui } from '@tamagui/next-plugin'

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: [
    "@nextstack/trpc",
    "@nextstack/api",
    "@nextstack/auth",
    "@nextstack/ui",
    "@nextstack/app",
    "solito",
    "react-native-web"
  ],
  webpack: (config, { isServer }) => {
    // Alias react-native to react-native-web for Web environments
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }

    // Exclude react-native from server-side rendering
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    return config
  },
  experimental: {
    optimizePackageImports: []
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default config;