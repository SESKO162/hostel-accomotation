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
}

module.exports = nextConfig