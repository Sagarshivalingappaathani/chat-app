/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the static export since we need dynamic routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;