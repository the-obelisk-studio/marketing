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

// ── Film credit ────────────────────────────────────────────────
// Permissive shape — index uses just title + year + synopsis; partnership
// uses the full set with crew breakdown, festivals + awards, etc.

export const CrewEntrySchema = z.object({
  role: z.string(),
  // Either a single name or a multi-line list of names. Both accepted
  // so YAML can be written naturally.
  name: z.string().optional(),
  names: z.array(z.string()).optional(),
})

export const FestivalEntrySchema = z.union([
  z.string(),
  z.object({ name: z.string(), award: z.string().optional() }),
])

export const FilmSchema = z.object({
  title: z.string(),
  year: z.union([z.string(), z.number()]).optional(),
  genre: z.string().optional(),         // "Short Film · Drama"
  status: z.string().optional(),        // "In Festival Circuit · 2026"
  logline: z.string().optional(),
  synopsis: z.string().optional(),
  crew: z.array(CrewEntrySchema).default([]),
  festivals: z.array(FestivalEntrySchema).default([]),
  poster: z.string().optional(),
})

export type CrewEntry = z.infer<typeof CrewEntrySchema>
export type FestivalEntry = z.infer<typeof FestivalEntrySchema>

// ── Service item (used on post) ────────────────────────────────

export const ServiceSchema = z.object({
  roman: z.string().optional(),                         // "I · Editorial"
  status: z.string().optional(),                        // "Booking" / "In Collaboration"
  statusKind: z.enum(["active", "future", "collab"]).optional(),
  title: z.string(),
  tagline: z.string().optional(),                       // italic line under title
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
  kicker: z.string(),                                   // "I · Software"
  status: z.string().optional(),                        // "In Development" / "In Planning"
  statusKind: z.enum(["active", "future"]).optional(),  // ● vs ○
  title: z.string(),
  tagline: z.string().optional(),                       // italic line under title
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

// Hero "pill" badges used on partnership/post page heroes.
export const HeroPillsHeroSchema = HeroSchema.extend({
  headline: z.string().optional(),       // matches "Two studios, *one picture.*" treatment
  positioning: z.string().optional(),    // sub-paragraph under headline
  meta: z.array(z.string()).default([]), // "Burbank · Los Angeles", "Independent Studio"
  pills: z.array(z.string()).default([]),
})

export const StudioEntitySchema = z.object({
  label: z.string(),                     // "— Studio of Record"
  name: z.string(),                      // "Obelisk Studios"
  founder: z.string().optional(),        // "Founded by Kshitij Kapil"
  description: z.string(),
  tags: z.array(z.string()).default([]),
})

export const PartnershipPageSchema = z.object({
  hero: HeroPillsHeroSchema,
  story: z.object({ kicker: z.string(), heading: z.string(), body: z.string() }),
  twoStudios: z.object({
    kicker: z.string(),
    heading: z.string(),
    body: z.string().optional(),
    studios: z.array(StudioEntitySchema),
  }),
  filmmakers: z.object({
    kicker: z.string(),
    heading: z.string(),
    founders: z.array(FounderSchema),
  }),
  selectedWork: z.object({
    kicker: z.string(),
    heading: z.string(),
    body: z.string().optional(),
    films: z.array(FilmSchema),
  }),
  cta: z.object({
    eyebrow: z.string().optional(),
    heading: z.string(),
    body: z.string().optional(),
    button: z.object({ label: z.string(), href: z.string() }),
    note: z.string().optional(),
  }).optional(),
})

export const PostPageSchema = z.object({
  hero: HeroPillsHeroSchema,
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

// Per-section gallery item. `src` points to a Decap-managed upload
// under /uploads/grace/. `label` shows under the active thumb in the
// strip — short ("Strip board", "DOOD grid") — and is optional so a
// single-shot section doesn't need to invent a label.
export const GraceShotSchema = z.object({
  src: z.string(),
  label: z.string().optional(),
})

export const GracePageSchema = z.object({
  hero: HeroSchema,
  sections: z.array(z.object({
    kicker: z.string().optional(),
    heading: z.string(),
    body: z.string().optional(),
    shots: z.array(GraceShotSchema).default([]),
    bullets: z.array(z.string()).default([]),
  })).default([]),
  cta: z.object({
    heading: z.string(),
    body: z.string().optional(),
    link: LinkSchema,
  }).optional(),
})

export const ContactPageSchema = z.object({
  hero: HeroPillsHeroSchema,
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

// ── Privacy policy ─────────────────────────────────────────────
// Structured sections so KK can edit through Decap. Each section has
// a heading, optional body (markdown-lite paragraphs via Body), and an
// optional list of {label, detail} rows for subprocessor enumerations.

export const PrivacySectionSchema = z.object({
  heading: z.string(),
  body: z.string().optional(),
  list: z.array(z.object({
    label: z.string(),
    detail: z.string(),
  })).default([]).optional(),
})

export const PrivacyPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string().default("Privacy"),
    title: z.string(),
    lastUpdated: z.string(),    // ISO date or display string
    intro: z.string(),          // markdown-lite paragraphs
  }),
  sections: z.array(PrivacySectionSchema).default([]),
  contact: z.object({
    heading: z.string().default("Contact"),
    body: z.string(),
    email: z.string(),
  }).optional(),
})

// Terms of Service. Structurally identical to PrivacyPageSchema but
// kept separate so the two can diverge later (e.g., adding an
// "effectiveDate" field distinct from "lastUpdated" on terms only).
// Shares PrivacySectionSchema for the per-section shape — that part
// is genuinely identical and reuse keeps the Decap admin UX symmetric.

export const TermsPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string().default("Legal"),
    title: z.string(),
    lastUpdated: z.string(),
    intro: z.string(),
  }),
  sections: z.array(PrivacySectionSchema).default([]),
  contact: z.object({
    heading: z.string().default("Contact"),
    body: z.string(),
    email: z.string(),
  }).optional(),
})

// ── Schema registry — maps filename → schema ───────────────────

// Generic legal-document schema. Structurally identical to Privacy/Terms.
// Used for any standalone legal page that follows the hero + sections +
// optional contact-card shape: DMCA, DPA, sub-processors, refunds, vault
// recipient terms. New legal pages should register their YAML here and
// the existing <LegalDocument> renderer covers the markup.
export const LegalDocumentSchema = z.object({
  hero: z.object({
    eyebrow: z.string().default("Legal"),
    title: z.string(),
    lastUpdated: z.string(),
    intro: z.string(),
  }),
  sections: z.array(PrivacySectionSchema).default([]),
  contact: z.object({
    heading: z.string().default("Contact"),
    body: z.string(),
    email: z.string(),
  }).optional(),
})

export type LegalDocumentContent = z.infer<typeof LegalDocumentSchema>

export const CONTENT_SCHEMAS = {
  "shared.yml": SharedSchema,
  "index.yml": IndexPageSchema,
  "partnership.yml": PartnershipPageSchema,
  "post.yml": PostPageSchema,
  "grace.yml": GracePageSchema,
  "contact.yml": ContactPageSchema,
  "privacy.yml": PrivacyPageSchema,
  "terms.yml": TermsPageSchema,
  "dmca.yml": LegalDocumentSchema,
  "dpa.yml": LegalDocumentSchema,
  "subprocessors.yml": LegalDocumentSchema,
  "refunds.yml": LegalDocumentSchema,
  "vault.yml": LegalDocumentSchema,
} as const

export type ContentFile = keyof typeof CONTENT_SCHEMAS

// ── Inferred types (exported for component props) ──────────────

export type SharedContent = z.infer<typeof SharedSchema>
export type IndexContent = z.infer<typeof IndexPageSchema>
export type PartnershipContent = z.infer<typeof PartnershipPageSchema>
export type PostContent = z.infer<typeof PostPageSchema>
export type GraceContent = z.infer<typeof GracePageSchema>
export type GraceShot = z.infer<typeof GraceShotSchema>
export type ContactContent = z.infer<typeof ContactPageSchema>
export type PrivacyContent = z.infer<typeof PrivacyPageSchema>
export type PrivacySection = z.infer<typeof PrivacySectionSchema>
export type TermsContent = z.infer<typeof TermsPageSchema>

export type Founder = z.infer<typeof FounderSchema>
export type Film = z.infer<typeof FilmSchema>
export type Service = z.infer<typeof ServiceSchema>
export type ProcessStep = z.infer<typeof ProcessStepSchema>
export type Offering = z.infer<typeof OfferingSchema>
