import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/components/*": [
      "./src/components/ui/**/*.tsx",
      "./src/registry/components/**/*.tsx",
    ],
  },
};

export default nextConfig;
