/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@portfolio/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

module.exports = nextConfig
