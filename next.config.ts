import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/order",
        permanent: true,
      },
    ];
  },
};
