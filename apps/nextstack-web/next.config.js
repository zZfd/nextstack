/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nextstack/ui", "@nextstack/trpc", "@nextstack/api", "tamagui", "@tamagui/core", "@tamagui/config"],
  experimental: {
    optimizePackageImports: ["@nextstack/ui", "tamagui"]
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