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
      // Legacy order route
      {
        source: '/Order/Price',
        destination: '/order',
        permanent: true,
      },
      // Removed problematic About redirect that was causing redirect loops
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
