// Zod schemas — source of truth for the shape of content/*.yml.
//
// Decap CMS's collection config in public/admin/config.yml mirrors
// these (hand-mirrored at the field level). The prebuild hook
// (scripts/validate-content.ts) parses every content file against
// the matching schema and fails the build on mismatch — so a broken
// Decap edit can't ship.

import { z } from "zod"

// ── Shared primitives ──────────────────────────────────────────

export const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

export const SectionLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

// ── Founder bio (used on index + partnership) ──────────────────

export const FounderSchema = z.object({
  name: z.string(),
  initials: z.string().optional(),
  roles: z.array(z.string()).default([]),
  bio: z.string(),                        // markdown allowed
  portfolioLinks: z.array(LinkSchema).default([]),
  photo: z.string().optional(),           // /uploads/foo.jpg
  company: z.string().optional(),         // "Obelisk Studios" / "TDH Systems"
})

// ── Film credit (used on partnership) ──────────────────────────

export const FilmSchema = z.object({
  title: z.string(),
  year: z.union([z.string(), z.number()]).optional(),
  crew: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
  synopsis: z.string().optional(),
  festivals: z.array(z.string()).default([]),
  poster: z.string().optional(),
})

// ── Service item (used on post) ────────────────────────────────

export const ServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  tools: z.array(z.string()).default([]),
})

// ── Process step (used on post) ────────────────────────────────

export const ProcessStepSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
})

// ── Offering (used on index — Grace + Post tiles) ──────────────

export const OfferingSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  blurb: z.string(),
  href: z.string(),
  cta: z.string().default("Learn more"),
})

// ── Shared content (nav + footer + global) ─────────────────────

export const SharedSchema = z.object({
  navLinks: z.array(LinkSchema).default([]),
  footer: z.object({
    tagline: z.string().optional(),
    columns: z.array(z.object({
      label: z.string(),
      links: z.array(LinkSchema),
    })).default([]),
    contactEmail: z.string().optional(),
  }).default({}),
})

// ── Per-page schemas ───────────────────────────────────────────

const HeroSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  motto: z.string().optional(),
  registrationMark: z.string().optional(),
})

export const IndexPageSchema = z.object({
  hero: HeroSchema,
  studio: z.object({
    kicker: z.string().default("The Studio"),
    heading: z.string(),
    body: z.string(),
    links: z.array(SectionLinkSchema).default([]),
  }),
  offerings: z.object({
    kicker: z.string().default("What We Make"),
    heading: z.string().optional(),
    items: z.array(OfferingSchema),
  }),
  partnership: z.object({
    kicker: z.string().default("In Partnership"),
    heading: z.string(),
    body: z.string().optional(),
    founders: z.array(FounderSchema).default([]),
    films: z.array(FilmSchema).default([]),
  }),
})

export const PartnershipPageSchema = z.object({
  hero: HeroSchema,
  story: z.object({ kicker: z.string(), heading: z.string(), body: z.string() }),
  twoStudios: z.object({
    kicker: z.string(),
    heading: z.string(),
    studios: z.array(z.object({
      tag: z.string(),
      name: z.string(),
      description: z.string(),
    })),
  }),
  filmmakers: z.object({
    kicker: z.string(),
    heading: z.string(),
    founders: z.array(FounderSchema),
  }),
  selectedWork: z.object({
    kicker: z.string(),
    heading: z.string(),
    films: z.array(FilmSchema),
  }),
  howWeWork: z.object({
    kicker: z.string(),
    heading: z.string(),
    body: z.string(),
  }).optional(),
  cta: z.object({
    heading: z.string(),
    body: z.string().optional(),
    link: LinkSchema,
  }).optional(),
})

export const PostPageSchema = z.object({
  hero: HeroSchema,
  approach: z.object({ kicker: z.string(), heading: z.string(), body: z.string() }),
  services: z.object({
    kicker: z.string(),
    heading: z.string().optional(),
    items: z.array(ServiceSchema),
  }),
  howItRuns: z.object({
    kicker: z.string(),
    heading: z.string().optional(),
    steps: z.array(ProcessStepSchema),
  }),
  filmmakers: z.object({
    kicker: z.string(),
    heading: z.string(),
    founders: z.array(FounderSchema),
  }).optional(),
  cta: z.object({
    heading: z.string(),
    body: z.string().optional(),
    link: LinkSchema,
  }).optional(),
})

export const GracePageSchema = z.object({
  hero: HeroSchema,
  // grace.html is product-marketing-heavy with screenshot placeholders.
  // Loose shape for now; commit 4 tightens this as we port content.
  sections: z.array(z.object({
    kicker: z.string().optional(),
    heading: z.string(),
    body: z.string().optional(),
    productShot: z.string().optional(),
    bullets: z.array(z.string()).default([]),
  })).default([]),
  cta: z.object({
    heading: z.string(),
    body: z.string().optional(),
    link: LinkSchema,
  }).optional(),
})

export const ContactPageSchema = z.object({
  hero: HeroSchema,
  info: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })).default([]),
  form: z.object({
    kicker: z.string().optional(),
    heading: z.string().optional(),
    body: z.string().optional(),
    topics: z.array(z.string()).default(["Grace", "Post production", "Partnership", "Press", "Other"]),
  }),
})

// ── Schema registry — maps filename → schema ───────────────────

export const CONTENT_SCHEMAS = {
  "shared.yml": SharedSchema,
  "index.yml": IndexPageSchema,
  "partnership.yml": PartnershipPageSchema,
  "post.yml": PostPageSchema,
  "grace.yml": GracePageSchema,
  "contact.yml": ContactPageSchema,
} as const

export type ContentFile = keyof typeof CONTENT_SCHEMAS

// ── Inferred types (exported for component props) ──────────────

export type SharedContent = z.infer<typeof SharedSchema>
export type IndexContent = z.infer<typeof IndexPageSchema>
export type PartnershipContent = z.infer<typeof PartnershipPageSchema>
export type PostContent = z.infer<typeof PostPageSchema>
export type GraceContent = z.infer<typeof GracePageSchema>
export type ContactContent = z.infer<typeof ContactPageSchema>

export type Founder = z.infer<typeof FounderSchema>
export type Film = z.infer<typeof FilmSchema>
export type Service = z.infer<typeof ServiceSchema>
export type ProcessStep = z.infer<typeof ProcessStepSchema>
export type Offering = z.infer<typeof OfferingSchema>
