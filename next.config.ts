import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.100.117", "127.0.0.1"],
};

export default nextConfig;
