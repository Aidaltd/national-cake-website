/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Legacy pre-order route
      {
        source: '/Pre-Order/Price',
        destination: '/pre-order',
        permanent: true,
      },
      // Section pages (if accessed directly)
      {
        source: '/About/:path*',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/Agent/:path*',
        destination: '/become-an-agent',
        permanent: true,
      },
      {
        source: '/Home/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
