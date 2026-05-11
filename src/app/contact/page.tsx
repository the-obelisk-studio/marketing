// Contact page — direct port of contact.html. Form submits to a CF
// Pages Function (/api/contact) that lands in commit 6.

import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { Inline } from "@/lib/rich-text"
import { ContactForm } from "@/components/ContactForm"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Obelisk Studios — software, finishing, partnership, or anything else.",
  path: "/contact/",
})

export default function ContactPage() {
  const c = loadContent("contact.yml")

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

          {c.info.length > 0 && (
            <Reveal eager delay={700}>
              <div className="direct-bar">
                {c.info.map((row, i) => (
                  <div key={i} className="direct-item">
                    <div className="direct-item-label">{row.label}</div>
                    <div className="direct-item-value">
                      {row.value.includes("@") ? (
                        <a href={`mailto:${row.value}`}>{row.value}</a>
                      ) : row.value}
                    </div>
                  </div>
                ))}
              </div>
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
              <span>01</span><span className="dash" /><span>{c.form.kicker ?? "The Form"}</span>
            </div>
          </Reveal>
          {c.form.heading && (
            <Reveal delay={120}>
              <h2 className="section-title"><Inline>{c.form.heading}</Inline></h2>
            </Reveal>
          )}
          {c.form.body && (
            <Reveal delay={220}>
              <p className="section-lead">{c.form.body}</p>
            </Reveal>
          )}
          <Reveal delay={320}>
            <div className="form-wrap">
              <ContactForm topics={c.form.topics} />
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .page-container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); position: relative; }
        .hero { min-height: 88vh; display: flex; flex-direction: column; justify-content: center; padding: 160px 0 80px; position: relative; }
        .hero-meta { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 48px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .hero-meta .dash { width: 64px; height: 1px; background: var(--ink-faint); }
        .hero-headline { font-family: var(--font-display); font-variation-settings: "opsz" 144, "wght" 440; font-size: clamp(48px, 9vw, 140px); line-height: 0.95; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 28px; max-width: 18ch; }
        .hero-headline em { font-style: italic; font-variation-settings: "opsz" 144, "wght" 380; }
        .hero-positioning { max-width: 620px; font-family: var(--font-display); font-size: 21px; line-height: 1.55; color: var(--ink-soft); margin-bottom: 56px; }
        .direct-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; padding-top: 32px; border-top: 1px solid var(--paper-edge); }
        .direct-item-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: 8px; }
        .direct-item-value { font-family: var(--font-display); font-size: 18px; color: var(--ink); }
        .direct-item-value a { color: var(--ink); border-bottom: 1px solid var(--ink-faint); transition: all 0.2s ease; }
        .direct-item-value a:hover { color: var(--kodachrome); border-bottom-color: var(--kodachrome); }

        .section { padding: 120px 0 160px; position: relative; border-top: 1px solid var(--paper-edge); }
        .section :global(.reg-mark.tl) { top: 24px; left: var(--container-pad); }
        .section :global(.reg-mark.tr) { top: 24px; right: var(--container-pad); }
        .section-num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 56px; display: flex; align-items: center; gap: 18px; }
        .section-num .dash { width: 48px; height: 1px; background: var(--ink-faint); }
        .section-title { font-family: var(--font-display); font-variation-settings: "opsz" 96, "wght" 380; font-size: clamp(44px, 7vw, 96px); line-height: 1.02; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 28px; max-width: 18ch; }
        .section-title em { font-style: italic; }
        .section-lead { font-family: var(--font-display); font-size: 19px; line-height: 1.65; color: var(--ink-soft); max-width: 620px; margin-bottom: 56px; }
        .form-wrap { max-width: 720px; }

        @media (max-width: 900px) {
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 60px; min-height: auto; }
          .section { padding: 80px 0 120px; }
          .direct-bar { grid-template-columns: 1fr; gap: 24px; }
          .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        }
      `}</style>
    </main>
  )
}
