/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        timers: false,
        events: false,
      }
    }
    return config
  },
}

module.exports = nextConfig 