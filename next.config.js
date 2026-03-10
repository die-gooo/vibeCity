/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.cityvibe.space" }],
        destination: "https://cityvibe.space/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
