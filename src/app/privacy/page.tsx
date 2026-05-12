// Privacy policy page. Renders content/privacy.yml — KK and Sid can
// edit through Decap (Privacy collection in admin/config.yml). The
// section list is denser than the marketing pages because there are
// ~13 sections — full hero-style treatment per section would make
// the page absurdly long.

import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { Body } from "@/lib/rich-text"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Obelisk Studios collects, uses, and protects your data when you use Grace Production OS.",
  path: "/privacy/",
})

export default function PrivacyPage() {
  const c = loadContent("privacy.yml")

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="page-container">
          <Reveal eager delay={100}>
            <div className="hero-meta">
              <span>{c.hero.eyebrow}</span>
              <span className="dash" />
              <span>Last updated · {c.hero.lastUpdated}</span>
            </div>
          </Reveal>

          <Reveal eager delay={250}>
            <h1 className="hero-headline">{c.hero.title}</h1>
          </Reveal>

          <Reveal eager delay={450}>
            <div className="hero-intro">
              <Body>{c.hero.intro}</Body>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className="sections">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          {c.sections.map((s, i) => (
            <Reveal key={i} delay={Math.min(i * 60, 240)}>
              <article className="section-row">
                <div className="section-num">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="dash" />
                </div>
                <div className="section-content">
                  <h2 className="section-heading">{s.heading}</h2>
                  {s.body && (
                    <div className="section-body">
                      <Body>{s.body}</Body>
                    </div>
                  )}
                  {s.list && s.list.length > 0 && (
                    <dl className="section-list">
                      {s.list.map((row, j) => (
                        <div key={j} className="section-list-row">
                          <dt className="section-list-label">{row.label}</dt>
                          <dd className="section-list-detail">{row.detail}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      {c.contact && (
        <section className="contact">
          <div className="page-container">
            <Reveal>
              <div className="contact-card">
                <h2 className="contact-heading">{c.contact.heading}</h2>
                <div className="contact-body">
                  <Body>{c.contact.body}</Body>
                </div>
                <a className="contact-email" href={`mailto:${c.contact.email}`}>
                  {c.contact.email}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <style>{`
        .page-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-pad);
          position: relative;
        }

        /* ── Hero ── */
        .hero {
          padding: 160px 0 80px;
          position: relative;
        }
        .hero-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .hero-meta .dash {
          width: 48px;
          height: 1px;
          background: var(--ink-faint);
        }
        .hero-headline {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 144, "wght" 440;
          font-size: clamp(48px, 8vw, 120px);
          line-height: 0.95;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 48px;
          max-width: 16ch;
        }
        .hero-intro {
          max-width: 680px;
          font-family: var(--font-display);
          font-variation-settings: "opsz" 22, "wght" 400;
          font-size: 19px;
          line-height: 1.65;
          color: var(--ink-soft);
        }
        .hero-intro p + p {
          margin-top: 1.2em;
        }
        .hero-intro em {
          font-style: italic;
          font-variation-settings: "opsz" 22, "wght" 400;
        }

        /* ── Sections list ── */
        .sections {
          padding: 80px 0 120px;
          position: relative;
          border-top: 1px solid var(--paper-edge);
        }
        .sections :global(.reg-mark.tl) {
          top: 24px;
          left: var(--container-pad);
        }
        .sections :global(.reg-mark.tr) {
          top: 24px;
          right: var(--container-pad);
        }

        .section-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 32px;
          padding: 48px 0;
          border-bottom: 1px solid var(--paper-edge);
          align-items: start;
        }
        .section-row:last-child {
          border-bottom: none;
        }
        .section-num {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          color: var(--ink-muted);
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 14px;
        }
        .section-num .dash {
          width: 24px;
          height: 1px;
          background: var(--ink-faint);
        }
        .section-content {
          max-width: 720px;
        }
        .section-heading {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 60, "wght" 460;
          font-size: clamp(26px, 3.4vw, 36px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .section-body {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 17, "wght" 400;
          font-size: 17px;
          line-height: 1.7;
          color: var(--ink-soft);
        }
        .section-body p + p {
          margin-top: 1em;
        }
        .section-body em {
          font-style: italic;
          font-variation-settings: "opsz" 17, "wght" 400;
        }

        /* ── Subprocessor / list rows inside a section ── */
        .section-list {
          margin-top: 24px;
          border-top: 1px solid var(--paper-edge);
        }
        .section-list-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 24px;
          padding: 18px 0;
          border-bottom: 1px solid var(--paper-edge);
          align-items: baseline;
        }
        .section-list-row:last-child {
          border-bottom: none;
        }
        .section-list-label {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .section-list-detail {
          font-family: var(--font-display);
          font-size: 15px;
          line-height: 1.6;
          color: var(--ink-soft);
        }

        /* ── Contact card ── */
        .contact {
          padding: 80px 0 160px;
          border-top: 1px solid var(--paper-edge);
        }
        .contact-card {
          max-width: 720px;
          padding: 48px 0;
        }
        .contact-heading {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 440;
          font-size: clamp(36px, 5.5vw, 64px);
          line-height: 1.05;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .contact-body {
          font-family: var(--font-display);
          font-size: 18px;
          line-height: 1.65;
          color: var(--ink-soft);
          margin-bottom: 32px;
        }
        .contact-email {
          font-family: var(--font-mono);
          font-size: 15px;
          letter-spacing: 0.06em;
          color: var(--ink);
          border-bottom: 1px solid var(--ink-faint);
          padding-bottom: 4px;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .contact-email:hover {
          color: var(--kodachrome);
          border-bottom-color: var(--kodachrome);
        }

        /* ── Mobile ── */
        @media (max-width: 900px) {
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 60px; }
          .sections :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .sections :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
          .section-row {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 36px 0;
          }
          .section-num {
            padding-top: 0;
          }
          .section-num .dash { display: none; }
          .section-list-row {
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 14px 0;
          }
          .contact { padding: 64px 0 100px; }
        }
      `}</style>
    </main>
  )
}
