import type { NextConfig } from "next";

// Additional remote hosts images can be served from, beyond the S3/AWS
// pattern below (e.g. a custom CDN domain in front of the bucket). Comma
// separated, set in .env once the backend/bucket hosts are known.
const extraImageHosts = (process.env.NEXT_PUBLIC_EXTRA_IMAGE_HOSTS || "")
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      // Any AWS S3 bucket (media uploaded via the new admin panel).
      { protocol: "https", hostname: "*.amazonaws.com" },
      ...extraImageHosts.map((hostname) => ({ protocol: "https" as const, hostname })),
    ],
  },
};

export default nextConfig;
