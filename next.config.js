/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' for App Router with server components
  // output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Enable the App Router
    appDir: true,
    // Remove the fontLoaders as it's not needed in newer versions
  },
  // Add this to handle the _document.js error
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig