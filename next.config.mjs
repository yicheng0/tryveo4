import withBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages configuration with Functions support
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Static generation for better Cloudflare compatibility
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  
  redirects: async () => [
    {
      source: "/dashboard",
      destination: "/dashboard/settings",
      permanent: true,
    },
  ],
  
  images: {
    unoptimized: true, // Required for Cloudflare Pages
    remotePatterns: [
      ...(process.env.R2_PUBLIC_URL
        ? [
            {
              hostname: process.env.R2_PUBLIC_URL.replace("https://", ""),
            },
          ]
        : []),
    ],
  },
  
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error"],
          }
        : false,
  },
  
  // Experimental features for edge compatibility
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  
  // Webpack configuration for Cloudflare compatibility
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

const withBundleAnalyzerWrapper = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzerWrapper(withNextIntl(nextConfig));
