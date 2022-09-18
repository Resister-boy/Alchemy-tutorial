/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ETHEREUM_API_KEY: process.env.ETHEREUM_API_KEY
  }
}

module.exports = nextConfig
