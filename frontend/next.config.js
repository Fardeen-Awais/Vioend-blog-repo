/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'cdn.sanity.io',
      }
    ],
  },


  async rewrites() {
    return [
        {
            source: '/robots.txt',
            destination: '/api/robots'
        }
    ];
}
}

module.exports = nextConfig
