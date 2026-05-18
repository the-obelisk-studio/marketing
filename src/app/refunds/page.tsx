// Refund policy page. Renders content/refunds.yml — KK can edit through
// Decap. Standalone so Stripe merchant-policy links and customer-dispute
// references can point directly here.

import type { Metadata } from "next"
import { LegalDocument } from "@/components/LegalDocument"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Refund Policy",
  description:
    "How Obelisk Studios handles cancellations, refunds, and charges in error for Grace Production OS subscriptions.",
  path: "/refunds/",
})

export default function RefundsPage() {
  const c = loadContent("refunds.yml")
  return <LegalDocument hero={c.hero} sections={c.sections} contact={c.contact} />
}
