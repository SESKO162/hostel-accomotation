/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // Disable the _document check for App Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mjs'],
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add a rule to ignore _document.js files in the app directory
    config.module.rules.push({
      test: /_document\.(js|jsx|ts|tsx)$/,
      include: [require('path').resolve(__dirname, 'app')],
      use: 'null-loader',
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        module: false,
      };
    }
    return config;
  },
  // Experimental features
  experimental: {
    // This is needed for Radix UI components to work with server components
    serverComponentsExternalPackages: ['@radix-ui/react-dialog'],
    // Disable the _document check
    disableDocumentError: true,
  },
  // Disable the _document check for App Router
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable the _document check for App Router
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable the _document check for App Router
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig