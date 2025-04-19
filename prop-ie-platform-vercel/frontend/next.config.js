/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.prop.ie'],
  },
}

module.exports = nextConfig
