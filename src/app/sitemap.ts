// Sitemap. Next.js's app/sitemap convention emits /sitemap.xml at
// build (works with output: 'export'). URLs use trailing slashes to
// match next.config.ts → CF Pages directory serving.

import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const SITE = "https://www.theobeliskstudio.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/grace/", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/post/", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/partnership/", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact/", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" as const },
  ]

  return pages.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
