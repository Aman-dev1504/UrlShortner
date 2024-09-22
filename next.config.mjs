/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allow importing images from external locations
  },
  webpack: (config) => {
    // Add alias for the assets folder
    config.resolve.alias["@assets"] = path.join(process.cwd(), "assets");
    return config;
  },
};

export default nextConfig;
