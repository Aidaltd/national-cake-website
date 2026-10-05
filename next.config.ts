/** @type {import('next').NextConfig} */
const nextConfig = {
  // Full-stack mode by default for Admin Panel & dynamic features. Set NEXT_EXPORT=true only for pure static export.
  ...(process.env.NEXT_EXPORT === 'true' ? { output: 'export' } : {}),
  // trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
