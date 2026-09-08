import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray lockfile higher up
  // (~/package-lock.json) otherwise makes Turbopack infer the wrong root.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
