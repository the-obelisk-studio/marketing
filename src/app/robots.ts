// robots.txt. Allow everything except the Decap admin surface and
// the OAuth bridge (those are operational, not content).

import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const SITE = "https://www.theobeliskstudio.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/oauth/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
