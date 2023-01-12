/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['media.istockphoto.com', 'lh3.googleusercontent.com', 'www.freepik.com', 'www.gravatar.com', 'i.pravatar.cc']
  }
}

module.exports = nextConfig
