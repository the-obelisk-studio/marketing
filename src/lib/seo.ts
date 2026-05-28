// SEO constants + JSON-LD builders. Centralized so every page reads
// the same site URL / brand strings. If the site moves domains, this
// is the only file outside next.config.ts that needs touching.

import type { Metadata } from "next"

export const SITE_URL = "https://www.theobeliskstudio.com"
export const SITE_NAME = "Obelisk Studios"
export const SITE_TAGLINE =
  "An independent studio of working filmmakers, building tools and finishing pictures."
export const OG_IMAGE = `${SITE_URL}/og.png`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

// Square variant — iMessage, WhatsApp, Slack and some LinkedIn surfaces
// crop the standard 1.91:1 OG to a square tile; providing a real square
// lets them pick a better-composed image instead of cropping ours.
export const OG_IMAGE_SQUARE = `${SITE_URL}/og-square.png`
export const OG_IMAGE_SQUARE_SIZE = 1200

// Twitter/X's summary_large_image is 1.91:1 too, but we render it at
// 16:9 (1200×675) because that's what X actually serves in-timeline.
export const TWITTER_IMAGE = `${SITE_URL}/twitter-card.png`
export const TWITTER_IMAGE_WIDTH = 1200
export const TWITTER_IMAGE_HEIGHT = 675

// Per-page metadata helper. Next merges Metadata at the top level but
// REPLACES nested objects (openGraph, twitter), so any page that wants
// to set og:title etc. must also re-specify images/type/siteName. This
// helper does that consistently.
export function pageMetadata(opts: {
  title: string
  ogTitle?: string  // defaults to `${title} · ${SITE_NAME}` (or just SITE_NAME on home)
  description: string
  path: string      // canonical path, e.g. "/grace/"
}): Metadata {
  const ogTitle = opts.ogTitle ?? (opts.path === "/" ? SITE_NAME : `${opts.title} · ${SITE_NAME}`)
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: opts.path,
      title: ogTitle,
      description: opts.description,
      locale: "en_US",
      images: [
        {
          url: OG_IMAGE,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.description,
      images: [TWITTER_IMAGE],
    },
  }
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: OG_IMAGE_SQUARE,
    description: SITE_TAGLINE,
    foundingDate: "2026",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Burbank",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: [],
  }
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  }
}

export function softwareApplicationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Grace Production OS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Grace is a production operating system for film and television. Call sheets, scheduling, budgeting, scripts, dailies, and Vault screeners in one connected place.",
    url: `${SITE_URL}/grace/`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "149.00",
      url: "https://app.theobeliskstudio.com/pricing",
    },
  }
}
