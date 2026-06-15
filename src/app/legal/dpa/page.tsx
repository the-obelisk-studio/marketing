// Data Processing Addendum page. Renders content/dpa.yml — KK can edit
// through Decap. Layout/styles live in <LegalDocument>, shared with
// /privacy and /terms.

import type { Metadata } from "next"
import { LegalDocument } from "@/components/LegalDocument"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Data Processing Addendum",
  description:
    "The Data Processing Addendum that supplements Obelisk Studio's Terms of Service for customers acting as data controllers.",
  path: "/legal/dpa/",
})

export default function DpaPage() {
  const c = loadContent("dpa.yml")
  return <LegalDocument hero={c.hero} sections={c.sections} contact={c.contact} />
}
