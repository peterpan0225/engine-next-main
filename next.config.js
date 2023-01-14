/** @type {import('next').NextConfig} */
const getRedirects = require("./src/lib/wordpress/redirects/getRedirects");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 604800,
  },
  staticPageGenerationTimeout: 300, // times out getStaticPaths method after 5 mins
  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: "/(.*).jpg",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            // Instead of this value:
            value:
              "public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800",
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
    ];
  },
  async redirects() {
    const redirects = await getRedirects();
    return [
      ...redirects,
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-json/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-includes/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/dbsecurelogin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/feed.xml",
        permanent: true,
      },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/feeds",
        destination: "/feed.xml",
        permanent: true,
      },
      {
        source: "/rss",
        destination: "/feed.xml",
        permanent: true,
      },
      {
        source: "/page/subscribe",
        destination: "/page/about",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "lh3.googleusercontent.com",
      "dtmp.dynamicbusiness.com",
      "dynamicbusiness.com",
      "dynamicbusiness.com.au",
      "secure.gravatar.com",
      "gravatar.com",
      "1.gravatar.com",
      "0.gravatar.com",
      "2.gravatar.com",
      "3.gravatar.com",
      "dynamicbusiness.test",
      "backend.dynamicbusiness.com",
      "scontent-frt3-1.cdninstagram.com",
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};
