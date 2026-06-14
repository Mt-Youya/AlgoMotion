import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@algomotion/algorithms", "@algomotion/shared", "@algomotion/ui", "@algomotion/visualizer"],
}

export default nextConfig
