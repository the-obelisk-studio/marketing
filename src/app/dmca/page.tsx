// DMCA / copyright takedown page. Renders content/dmca.yml — KK can
// edit through Decap. Layout/styles live in <LegalDocument>, shared
// with /privacy and /terms.

import type { Metadata } from "next"
import { LegalDocument } from "@/components/LegalDocument"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "DMCA Notice & Takedown",
  description:
    "How to file a DMCA notice or counter-notification with Obelisk Studio, and how to reach our designated agent.",
  path: "/dmca/",
})

export default function DmcaPage() {
  const c = loadContent("dmca.yml")
  return <LegalDocument hero={c.hero} sections={c.sections} contact={c.contact} />
}
