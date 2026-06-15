// Terms of Service page. Renders content/terms.yml — KK and Sid can
// edit through Decap (Terms collection in admin/config.yml).
// Layout/styles live in <LegalDocument>, shared with /privacy.

import { LegalDocument } from "@/components/LegalDocument"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms governing the use of Grace Production OS, the software product operated by Obelisk Studio.",
  path: "/terms/",
})

export default function TermsPage() {
  const c = loadContent("terms.yml")
  return <LegalDocument hero={c.hero} sections={c.sections} contact={c.contact} />
}
