// /beta-interest — Grace closed-beta opt-in form. POSTs directly to the
// Grace API (NEXT_PUBLIC_GRACE_API_URL/api/beta-interest), lands as a
// beta_invites lead with source='interest_form'. Three grace.yml CTAs
// point here.

import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { Inline } from "@/lib/rich-text"
import { BetaInterestForm } from "@/components/BetaInterestForm"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Request beta access · Grace Production OS",
  description:
    "Tell us about your production. Grace is open to a small beta cohort of working productions, and we'll get back to you with an access link if it's a fit.",
  path: "/beta-interest/",
})

export default function BetaInterestPage() {
  const c = loadContent("beta-interest.yml")

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="page-container">
          {c.hero.meta.length > 0 && (
            <Reveal eager delay={100}>
              <div className="hero-meta">
                {c.hero.meta.map((m, i) => (
                  <span key={i}>
                    {i > 0 && <span className="dash" />}
                    <span>{m}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          )}

          {c.hero.headline && (
            <Reveal eager delay={250}>
              <h1 className="hero-headline"><Inline>{c.hero.headline}</Inline></h1>
            </Reveal>
          )}

          {c.hero.positioning && (
            <Reveal eager delay={450}>
              <p className="hero-positioning">{c.hero.positioning}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 01 · FORM ── */}
      <section className="section">
        <RegMark className="tl" /><RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>01</span><span className="dash" /><span>{c.intro.kicker ?? "The Form"}</span>
            </div>
          </Reveal>
          {c.intro.heading && (
            <Reveal delay={120}>
              <h2 className="section-title"><Inline>{c.intro.heading}</Inline></h2>
            </Reveal>
          )}
          {c.intro.body && (
            <Reveal delay={220}>
              <p className="section-lead">{c.intro.body}</p>
            </Reveal>
          )}
          <Reveal delay={320}>
            <div className="form-wrap">
              <BetaInterestForm />
              {c.finePrint && <p className="fine-print">{c.finePrint}</p>}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .page-container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); position: relative; }
        .hero { min-height: 60vh; display: flex; flex-direction: column; justify-content: center; padding: 160px 0 60px; position: relative; }
        .hero-meta { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 48px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .hero-meta .dash { width: 64px; height: 1px; background: var(--ink-faint); }
        .hero-headline { font-family: var(--font-display); font-variation-settings: "opsz" 144, "wght" 440; font-size: clamp(48px, 9vw, 140px); line-height: 0.95; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 28px; max-width: 18ch; }
        .hero-headline em { font-style: italic; font-variation-settings: "opsz" 144, "wght" 380; }
        .hero-positioning { max-width: 620px; font-family: var(--font-display); font-size: 21px; line-height: 1.55; color: var(--ink-soft); margin-bottom: 0; }

        .section { padding: 80px 0 160px; position: relative; border-top: 1px solid var(--paper-edge); }
        .section :global(.reg-mark.tl) { top: 24px; left: var(--container-pad); }
        .section :global(.reg-mark.tr) { top: 24px; right: var(--container-pad); }
        .section-num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 56px; display: flex; align-items: center; gap: 18px; }
        .section-num .dash { width: 48px; height: 1px; background: var(--ink-faint); }
        .section-title { font-family: var(--font-display); font-variation-settings: "opsz" 96, "wght" 380; font-size: clamp(36px, 6vw, 72px); line-height: 1.04; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 24px; max-width: 18ch; }
        .section-title em { font-style: italic; }
        .section-lead { font-family: var(--font-display); font-size: 19px; line-height: 1.65; color: var(--ink-soft); max-width: 620px; margin-bottom: 48px; }
        .form-wrap { max-width: 720px; }
        .fine-print { font-family: var(--font-display); font-size: 13px; line-height: 1.55; color: var(--ink-muted); margin-top: 36px; max-width: 56ch; }

        @media (max-width: 900px) {
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 40px; min-height: auto; }
          .section { padding: 60px 0 120px; }
          .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        }
      `}</style>
    </main>
  )
}
