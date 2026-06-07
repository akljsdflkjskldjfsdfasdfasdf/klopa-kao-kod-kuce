import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Više lockfile-ova na disku -> fiksiramo root na ovaj projekat.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Privremene slike sa Unsplash-a. Kad ubaciš svoje slike u public/images/
    // i prebaciš putanje u lib/config.ts, ovo više nije potrebno.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
