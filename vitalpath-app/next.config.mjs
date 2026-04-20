/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages deployment via @cloudflare/next-on-pages
  // handles runtime — no output: 'export' needed.
  images: {
    // Use unoptimized images for simplest Cloudflare Pages compatibility.
    // Swap to a Cloudflare Images loader later if needed.
    unoptimized: true,
  },
  experimental: {
    // Enables server actions + route handlers on the edge runtime
    // (next-on-pages compiles them into Cloudflare Workers).
  },
};

export default nextConfig;
