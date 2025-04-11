/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer"
const analyze = process.env.ANALYZE === "true";


const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default analyze
  ? withBundleAnalyzer({ enabled: analyze })(nextConfig)
  : nextConfig;


