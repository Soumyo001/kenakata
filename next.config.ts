import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
      remotePatterns: [
          { protocol: "https", hostname: "i.imgur.com" },
          { protocol: "https", hostname: "placeimg.com" },
          { protocol: "https", hostname: "**.escuelajs.co" },
      ],
  },
};

export default nextConfig;
