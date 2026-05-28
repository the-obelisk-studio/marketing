import type { NextConfig } from "next"

// Static export for Cloudflare Pages.
// trailingSlash: true so URLs match the way CF Pages serves directories.
// images.unoptimized: true because Next's image optimizer needs a server.

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Dev-only: allow the Caddy-proxied hostname so Next 16 doesn't block
  // cross-origin dev/HMR requests. Ignored by `next build` (static export).
  allowedDevOrigins: ["obelisk.thydarkhour.com"],
}

export default nextConfig
