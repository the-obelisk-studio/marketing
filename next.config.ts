import type { NextConfig } from "next"

// Static export for Cloudflare Pages.
// trailingSlash: true so URLs match the way CF Pages serves directories.
// images.unoptimized: true because Next's image optimizer needs a server.

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
