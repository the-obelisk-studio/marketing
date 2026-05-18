// Vault Recipient Terms page. Renders content/vault.yml — KK can edit
// through Decap. Layout/styles live in <LegalDocument>, shared with
// /privacy and /terms.

import type { Metadata } from "next"
import { LegalDocument } from "@/components/LegalDocument"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Vault Recipient Terms",
  description:
    "Terms governing access to confidential screeners shared through the Grace Vault.",
  path: "/legal/vault/",
})

export default function VaultPage() {
  const c = loadContent("vault.yml")
  return <LegalDocument hero={c.hero} sections={c.sections} contact={c.contact} />
}
