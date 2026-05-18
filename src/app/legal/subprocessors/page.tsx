// Sub-processors page. Renders content/subprocessors.yml — KK can edit
// through Decap. Layout/styles live in <LegalDocument>, shared with
// /privacy and /terms.

import type { Metadata } from "next"
import { LegalDocument } from "@/components/LegalDocument"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Sub-processors",
  description:
    "Third-party service providers that process personal data on Obelisk Studios' behalf to operate Grace Production OS.",
  path: "/legal/subprocessors/",
})

export default function SubprocessorsPage() {
  const c = loadContent("subprocessors.yml")
  return <LegalDocument hero={c.hero} sections={c.sections} contact={c.contact} />
}
