// Grace page — product marketing for Grace Production OS.
// Structural port of grace.html; product-shot placeholders render
// dark frames where real Grace UI screenshots will land via Decap
// uploads (KK delivers those separately). The full GSAP/scroll-pin
// treatment from KK's HTML is deferred — basic vertical scroll for
// v1 is fine.

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { Inline, Body } from "@/lib/rich-text"
import { ProductShot } from "@/components/ProductShot"
import { JsonLd } from "@/components/JsonLd"
import { loadContent } from "@/lib/content"
import { pageMetadata, softwareApplicationLd } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Grace",
  description:
    "A production operating system. Connect everything, re-enter nothing — call sheets, scheduling, budgets, scripts, dailies, and Vault screeners in one place. Built for the people running production.",
  path: "/grace/",
})

export default function GracePage() {
  const c = loadContent("grace.yml")

  return (
    <main>
      <JsonLd data={softwareApplicationLd()} />
      {/* ── HERO ── */}
      <section className="hero">
        <div className="page-container">
          <svg className="obelisk-glyph" viewBox="0 0 64 380" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M32 0 L48 56 L18 56 Z M18 56 L48 56 L46 380 L20 380 Z" fill="currentColor" />
          </svg>

          <Reveal eager delay={100}>
            <div className="hero-meta">
              <span>Obelisk Studios</span>
              <span className="dash" />
              <span>Software</span>
              <span className="dash" />
              <span>In Development</span>
            </div>
          </Reveal>
          <Reveal eager delay={250}>
            <h1 className="grace-wordmark">{c.hero.title}</h1>
          </Reveal>
          {c.hero.motto && (
            <Reveal eager delay={450}>
              <p className="grace-tagline">{c.hero.motto}</p>
            </Reveal>
          )}
          <Reveal eager delay={700}>
            <p className="hero-positioning">
              Grace is the production operating system Obelisk runs on. Built by working filmmakers, in partnership with TDH Systems. Co-pilot, never autopilot — filmmakers stay in command.
            </p>
          </Reveal>
        </div>

        <div className="hero-scroll">scroll ↓</div>
      </section>

      {/* ── NUMBERED SECTIONS ── */}
      {c.sections.map((section, idx) => (
        <section key={idx} className="section">
          <RegMark className="tl" />
          <RegMark className="tr" />
          <div className="page-container">
            {section.kicker && (
              <Reveal>
                <div className="section-num">
                  <span>{section.kicker.split(" · ")[0]}</span>
                  <span className="dash" />
                  <span>{section.kicker.split(" · ").slice(1).join(" · ")}</span>
                </div>
              </Reveal>
            )}
            <Reveal delay={120}>
              <h2 className="section-title"><Inline>{section.heading}</Inline></h2>
            </Reveal>
            {section.body && (
              <Reveal delay={220}>
                <div className="section-body"><Body>{section.body}</Body></div>
              </Reveal>
            )}
            {section.bullets.length > 0 && (
              <Reveal delay={320}>
                <ul className="bullet-grid">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="bullet">
                      <Inline>{b}</Inline>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
            {section.productShot !== undefined && (
              <Reveal delay={420}>
                <ProductShot src={section.productShot || undefined} alt={section.heading} />
              </Reveal>
            )}
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      {c.cta && (
        <section className="cta-section">
          <div className="page-container">
            <Reveal>
              <h2 className="cta-title">{c.cta.heading}</h2>
            </Reveal>
            {c.cta.body && (
              <Reveal delay={120}>
                <p className="cta-sub">{c.cta.body}</p>
              </Reveal>
            )}
            <Reveal delay={240}>
              <Link href={c.cta.link.href} className="cta-button">
                {c.cta.link.label}<span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <style>{`
        .page-container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-pad); position: relative; }
        .hero { min-height: 88vh; display: flex; flex-direction: column; justify-content: center; padding: 160px 0 80px; position: relative; }
        .obelisk-glyph {
          position: absolute;
          top: 50%; right: -30px;
          transform: translateY(-50%);
          width: 64px; height: 380px;
          opacity: 0.06; pointer-events: none;
          color: var(--ink);
        }
        .hero-scroll {
          position: absolute;
          bottom: 32px; right: var(--container-pad);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-muted);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          opacity: 0.7;
        }
        .hero-meta { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 48px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .hero-meta .dash { width: 64px; height: 1px; background: var(--ink-faint); }
        .grace-wordmark { font-family: var(--font-display); font-variation-settings: "opsz" 144, "wght" 480; font-size: clamp(80px, 18vw, 260px); line-height: 0.86; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 20px; }
        .grace-tagline { font-family: var(--font-display); font-variation-settings: "opsz" 60, "wght" 320; font-style: italic; font-size: clamp(28px, 4vw, 56px); letter-spacing: 0.01em; color: var(--ink-soft); margin-bottom: 32px; }
        .hero-positioning { max-width: 620px; font-family: var(--font-display); font-size: 21px; line-height: 1.55; color: var(--ink-soft); }

        .section { padding: 160px 0; position: relative; border-top: 1px solid var(--paper-edge); }
        .section :global(.reg-mark.tl) { top: 24px; left: var(--container-pad); }
        .section :global(.reg-mark.tr) { top: 24px; right: var(--container-pad); }
        .section-num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 56px; display: flex; align-items: center; gap: 18px; }
        .section-num .dash { width: 48px; height: 1px; background: var(--ink-faint); }
        .section-title { font-family: var(--font-display); font-variation-settings: "opsz" 96, "wght" 380; font-size: clamp(44px, 6.5vw, 88px); line-height: 1.02; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 48px; max-width: 22ch; }
        .section-title em { font-style: italic; }
        .section-body { font-family: var(--font-display); font-size: 19px; line-height: 1.65; color: var(--ink-soft); max-width: 720px; margin-bottom: 32px; }
        .section-body p + p { margin-top: 1.2em; }
        .section-body em { font-style: italic; }

        /* Bullets render as h3-style feature callouts to match KK's
           grace.html "One upload changes everything downstream" /
           "The set dashboard is the schedule, live" treatment. Big
           serif text with italic emphasis, not flat list items. */
        .bullet-grid {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
          gap: 48px;
          margin-top: 24px;
        }
        .bullet {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 60, "wght" 380;
          font-size: clamp(24px, 2.6vw, 32px);
          line-height: 1.15;
          letter-spacing: -0.012em;
          color: var(--ink);
          padding: 28px 0 0;
          border-top: 1px solid var(--ink);
        }
        .bullet em {
          font-style: italic;
          font-variation-settings: "opsz" 60, "wght" 360;
        }

        .cta-section { padding: 160px 0; border-top: 1px solid var(--paper-edge); text-align: center; background: var(--paper-warm); }
        .cta-title { font-family: var(--font-display); font-variation-settings: "opsz" 96, "wght" 380; font-size: clamp(36px, 5.6vw, 72px); line-height: 1.05; color: var(--ink); margin-bottom: 24px; }
        .cta-sub { font-family: var(--font-display); font-size: 19px; line-height: 1.55; color: var(--ink-soft); margin: 0 auto 40px; max-width: 560px; }
        .cta-button { display: inline-flex; align-items: center; gap: 12px; padding: 18px 32px; background: var(--ink); color: var(--paper); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; border-radius: 2px; transition: all 0.25s ease; }
        .cta-button:hover { background: var(--kodachrome); letter-spacing: 0.32em; }
        .cta-button .arrow { transition: transform 0.3s ease; }
        .cta-button:hover .arrow { transform: translateX(3px); }

        @media (max-width: 900px) {
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 60px; min-height: auto; }
          .section, .cta-section { padding: 100px 0; }
          .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        }
      `}</style>
    </main>
  )
}
