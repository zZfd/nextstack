/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@lzt/ui", "@lzt/trpc-client", "@lzt/api-router", "tamagui", "@tamagui/core", "@tamagui/config"],
  experimental: {
    optimizePackageImports: ["@lzt/ui", "tamagui"]
  }
};

export default nextConfig;