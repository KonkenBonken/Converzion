/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.csv$/,
        use: 'raw-loader'
      }
    )
    return config
  },
  async redirects() {
    return [
      {
        source: '/units/:type',
        destination: '/units/:type/-/-',
        permanent: true
      }, {
        source: '/units/:type/-',
        destination: '/units/:type/-/-',
        permanent: true
      }, {
        source: '/base/:from',
        destination: '/base/:from/-',
        permanent: true
      },
    ]
  }
};

export default nextConfig;
