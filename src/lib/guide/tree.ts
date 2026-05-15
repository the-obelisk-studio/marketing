// Static table of contents for the Grace Production OS guide.
// Mirrors the actual files in ../grace-docs/ (sibling worktree at
// build time). Add new docs here when they're written so they show
// up in the sidebar nav.

export interface GuideTreeNode {
  slug: string         // URL path relative to /grace/guide — '' for the index
  file: string         // path relative to ../grace-docs/, e.g. 'concepts.md'
  title: string        // human-readable label for sidebar + breadcrumbs
}

export interface GuideSection {
  label: string
  items: GuideTreeNode[]
}

export const GUIDE_TREE: GuideSection[] = [
  {
    label: "Start here",
    items: [
      { slug: "",         file: "README.md",   title: "Overview" },
      { slug: "concepts", file: "concepts.md", title: "Concepts" },
    ],
  },
  {
    label: "I'm a…",
    items: [
      { slug: "quickstart/owner",           file: "quickstart/owner.md",           title: "Producer / Org Owner" },
      { slug: "quickstart/upm",             file: "quickstart/upm.md",             title: "UPM" },
      { slug: "quickstart/ad",              file: "quickstart/ad.md",              title: "1st AD" },
      { slug: "quickstart/director",        file: "quickstart/director.md",        title: "Director" },
      { slug: "quickstart/dp",              file: "quickstart/dp.md",              title: "DP / Camera Op" },
      { slug: "quickstart/script-sup",      file: "quickstart/script-sup.md",      title: "Script Supervisor" },
      { slug: "quickstart/vfx-sup",         file: "quickstart/vfx-sup.md",         title: "VFX Supervisor" },
      { slug: "quickstart/department-head", file: "quickstart/department-head.md", title: "Department Head" },
      { slug: "quickstart/crew",            file: "quickstart/crew.md",            title: "Crew / Cast" },
    ],
  },
  {
    label: "Workflows",
    items: [
      { slug: "workflows/01-production-setup",    file: "workflows/01-production-setup.md",    title: "01 · Production setup" },
      { slug: "workflows/02-script-to-breakdown", file: "workflows/02-script-to-breakdown.md", title: "02 · Script → Breakdown" },
      { slug: "workflows/03-pre-production",      file: "workflows/03-pre-production.md",      title: "03 · Pre-production" },
      { slug: "workflows/04-call-sheets",         file: "workflows/04-call-sheets.md",         title: "04 · Call sheets" },
      { slug: "workflows/05-set-dashboard",       file: "workflows/05-set-dashboard.md",       title: "05 · Set Dashboard" },
      { slug: "workflows/06-compliance",          file: "workflows/06-compliance.md",          title: "06 · Compliance" },
      { slug: "workflows/07-script-supervisor",   file: "workflows/07-script-supervisor.md",   title: "07 · Script supervisor" },
      { slug: "workflows/08-vfx",                 file: "workflows/08-vfx.md",                 title: "08 · VFX" },
      { slug: "workflows/09-editor-log",          file: "workflows/09-editor-log.md",          title: "09 · Editor log" },
      { slug: "workflows/10-vault",               file: "workflows/10-vault.md",               title: "10 · Vault" },
      { slug: "workflows/11-wrap",                file: "workflows/11-wrap.md",                title: "11 · Wrap + delivery" },
    ],
  },
  {
    label: "Reference",
    items: [
      { slug: "reference/access-control",            file: "reference/access-control.md",            title: "Access control" },
      { slug: "reference/billing-and-seats",         file: "reference/billing-and-seats.md",         title: "Billing & seats" },
      { slug: "reference/revisions",                 file: "reference/revisions.md",                 title: "Script revisions" },
      { slug: "reference/timecards",                 file: "reference/timecards.md",                 title: "Timecards" },
      { slug: "reference/compliance-docs",           file: "reference/compliance-docs.md",           title: "Compliance documents" },
      { slug: "reference/vault-security",            file: "reference/vault-security.md",            title: "Vault security" },
      { slug: "reference/dashboard-cards",           file: "reference/dashboard-cards.md",           title: "Dashboard cards" },
      { slug: "reference/shortcuts-and-conventions", file: "reference/shortcuts-and-conventions.md", title: "Shortcuts & conventions" },
    ],
  },
]

export function findEntry(slug: string): GuideTreeNode | null {
  for (const section of GUIDE_TREE) {
    for (const item of section.items) {
      if (item.slug === slug) return item
    }
  }
  return null
}

export function siblings(slug: string): { prev: GuideTreeNode | null; next: GuideTreeNode | null } {
  const flat: GuideTreeNode[] = GUIDE_TREE.flatMap(s => s.items)
  const idx = flat.findIndex(i => i.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  }
}
