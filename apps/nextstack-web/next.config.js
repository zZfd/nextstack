/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nextstack/trpc", "@nextstack/api", "@nextstack/auth"],
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
};

export default nextConfig;