import type { NextConfig } from "next";

/** Where the NestJS API listens. The browser never calls it directly. */
const API_URL = process.env.API_URL ?? "http://localhost:3001";

/**
 * Pages of the previous upstateeq.com site (static .html files) and where each
 * now lives. Search results and old bookmarks keep working, and permanent
 * redirects carry their search ranking over to the new pages.
 */
const LEGACY_PAGES: Record<string, string> = {
  index: "/",
  aboutus: "/about",
  contactus: "/contact",
  services: "/services",
  photos: "/projects",
  links: "/brands",
  castersandwheels: "/shop/casters-and-wheels",
  conveyors: "/shop/conveyors",
  dockequipment: "/shop/dock-equipment",
  drumequipment: "/shop/drum-equipment",
  handequipment: "/shop/hand-equipment",
  industrialfurniture: "/shop/industrial-furniture",
  ladders: "/shop/ladders",
  liftingequipment: "/shop/lifting-equipment",
  matting: "/shop/matting",
  polycontainers: "/shop/poly-containers",
  racks: "/shop/racks",
  shelving: "/shop/shelving",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return Object.entries(LEGACY_PAGES).flatMap(([page, destination]) =>
      [`/${page}.html`, `/${page}.htm`].map((source) => ({ source, destination, permanent: true })),
    );
  },
  // Proxy the API and uploaded images through the storefront's own origin so
  // the session and cart cookies stay first-party.
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API_URL}/api/:path*` },
      { source: "/uploads/:path*", destination: `${API_URL}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
