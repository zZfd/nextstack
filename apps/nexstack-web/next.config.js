/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nexstack/ui", "@nexstack/trpc", "@nexstack/api", "tamagui", "@tamagui/core", "@tamagui/config"],
  experimental: {
    optimizePackageImports: ["@nexstack/ui", "tamagui"]
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;