// Privacy / data-subject request form page. Anyone whose data we hold
// — whether or not they have a Grace account — can submit a structured
// privacy request here. Submissions go to privacy@theobeliskstudio.com
// via the /api/privacy-request CF Pages Function.

import type { Metadata } from "next"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { PrivacyRequestForm } from "@/components/PrivacyRequestForm"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Privacy request",
  description:
    "Submit a data-access, correction, deletion, or other privacy request to Obelisk Studios. Account-holders and non-account-holders alike.",
  path: "/privacy/request/",
})

export default function PrivacyRequestPage() {
  return (
    <main>
      <section className="hero">
        <div className="page-container">
          <Reveal eager delay={100}>
            <div className="hero-meta">
              <span>Privacy</span>
              <span className="dash" />
              <span>Data request</span>
            </div>
          </Reveal>

          <Reveal eager delay={250}>
            <h1 className="hero-headline">Submit a privacy <em>request.</em></h1>
          </Reveal>

          <Reveal eager delay={450}>
            <p className="hero-positioning">
              Use this form to ask us to access, correct, delete, restrict, or object to the use of personal data we hold about you. It works for Grace account-holders and for anyone else whose data may be in our records: production crew added to a Grace production, screener recipients, or anyone who contacted us at some point.
            </p>
            <p className="hero-positioning">
              We respond within 30 days as required by law, and usually much sooner. If you'd rather skip the form, email <a href="mailto:privacy@theobeliskstudio.com">privacy@theobeliskstudio.com</a> directly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <RegMark className="tl" /><RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>01</span><span className="dash" /><span>The Request</span>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="form-wrap">
              <PrivacyRequestForm />
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .page-container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); position: relative; }
        .hero { min-height: 60vh; display: flex; flex-direction: column; justify-content: center; padding: 160px 0 80px; position: relative; }
        .hero-meta { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 48px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .hero-meta .dash { width: 64px; height: 1px; background: var(--ink-faint); }
        .hero-headline { font-family: var(--font-display); font-variation-settings: "opsz" 144, "wght" 440; font-size: clamp(48px, 9vw, 120px); line-height: 0.95; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 28px; max-width: 18ch; }
        .hero-headline em { font-style: italic; font-variation-settings: "opsz" 144, "wght" 380; }
        .hero-positioning { max-width: 620px; font-family: var(--font-display); font-size: 19px; line-height: 1.6; color: var(--ink-soft); margin-bottom: 18px; }
        .hero-positioning a { color: var(--ink); border-bottom: 1px solid var(--ink-faint); transition: all 0.2s ease; }
        .hero-positioning a:hover { color: var(--kodachrome); border-bottom-color: var(--kodachrome); }

        .section { padding: 80px 0 160px; position: relative; border-top: 1px solid var(--paper-edge); }
        .section :global(.reg-mark.tl) { top: 24px; left: var(--container-pad); }
        .section :global(.reg-mark.tr) { top: 24px; right: var(--container-pad); }
        .section-num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 56px; display: flex; align-items: center; gap: 18px; }
        .section-num .dash { width: 48px; height: 1px; background: var(--ink-faint); }
        .form-wrap { max-width: 720px; }

        @media (max-width: 900px) {
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 60px; min-height: auto; }
          .section { padding: 60px 0 120px; }
          .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        }
      `}</style>
    </main>
  )
}
