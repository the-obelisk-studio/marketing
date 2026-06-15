// Privacy policy page. Renders content/privacy.yml — KK and Sid can
// edit through Decap (Privacy collection in admin/config.yml).
// Layout/styles live in <LegalDocument>, shared with /terms.

import { LegalDocument } from "@/components/LegalDocument"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Obelisk Studio collects, uses, and protects your data when you use Grace Production OS.",
  path: "/privacy/",
})

export default function PrivacyPage() {
  const c = loadContent("privacy.yml")
  return <LegalDocument hero={c.hero} sections={c.sections} contact={c.contact} />
}
