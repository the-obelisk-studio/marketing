// Bootstrap placeholder — real content lands in commit 3 (port of KK's
// index.html into content/index.yml + this page).

import { Hero } from "@/components/Hero"
import { Section } from "@/components/Section"

export default function Home() {
  return (
    <main>
      <Hero
        eyebrow="Independent studio of working filmmakers"
        title="Obelisk studio"
        motto="One studio. Every stage."
      />
      <Section number="01" kicker="The Studio" heading="Building tools and finishing pictures.">
        <p>Bootstrap placeholder — the real homepage content + structured sections land in commit 3 of this build, sourced from <code>content/index.yml</code>.</p>
      </Section>
    </main>
  )
}
