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
};

export default analyze
  ? withBundleAnalyzer({ enabled: analyze })(nextConfig)
  : nextConfig;


