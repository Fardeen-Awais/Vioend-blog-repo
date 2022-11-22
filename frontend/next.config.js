/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
<<<<<<< HEAD
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'cdn.sanity.io',
      },
    ],
  },
=======
>>>>>>> 2cdfc3b136f8739df7f3771c37adcc8b1c8ddaaa
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
