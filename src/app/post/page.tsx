// Post production page — direct port of post.html.

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { HeroMark } from "@/components/HeroMark"
import { Inline, Body } from "@/lib/rich-text"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Post Production",
  description:
    "A finishing house run by working filmmakers. Edit, color, and finishing, supervised by the people who shot the picture.",
  path: "/post/",
})

export default function PostPage() {
  const c = loadContent("post.yml")

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
              <HeroMark>
                <h1 className="hero-headline"><Inline>{c.hero.headline}</Inline></h1>
              </HeroMark>
            </Reveal>
          )}

          {c.hero.positioning && (
            <Reveal eager delay={450}>
              <p className="hero-positioning">{c.hero.positioning}</p>
            </Reveal>
          )}

          {c.hero.pills.length > 0 && (
            <Reveal eager delay={700}>
              <div className="hero-pill-row">
                {c.hero.pills.map((p, i) => (
                  <span key={i} className={`pill ${p.startsWith("●") ? "pill-active" : ""}`}>{p}</span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 01 · APPROACH ── */}
      <section className="section">
        <RegMark className="tl" /><RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num"><span>01</span><span className="dash" /><span>{c.approach.kicker}</span></div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.approach.heading}</Inline></h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="section-body"><Body>{c.approach.body}</Body></div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · SERVICES ── */}
      <section className="section" id="services">
        <RegMark className="tl" /><RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num"><span>02</span><span className="dash" /><span>{c.services.kicker}</span></div>
          </Reveal>
          {c.services.heading && (
            <Reveal delay={120}>
              <h2 className="section-title"><Inline>{c.services.heading}</Inline></h2>
            </Reveal>
          )}
          <div className="services-grid">
            {c.services.items.map((s, i) => (
              <Reveal key={s.title} delay={200 + i * 100}>
                <article className="service">
                  {(s.roman || s.status) && (
                    <div className="service-roman">
                      {s.roman && <span>{s.roman}</span>}
                      {s.status && (
                        <span className={`service-status ${s.statusKind ?? "active"}`}>
                          {s.status}
                        </span>
                      )}
                    </div>
                  )}
                  <h3 className="service-name">{s.title}</h3>
                  {s.tagline && <p className="service-tagline">{s.tagline}</p>}
                  <p className="service-body">{s.description}</p>
                  {s.tools.length > 0 && (
                    <div className="service-tools">
                      {s.tools.map(t => <span key={t} className="tool-pill">{t}</span>)}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · HOW IT RUNS ── */}
      <section className="section">
        <RegMark className="tl" /><RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num"><span>03</span><span className="dash" /><span>{c.howItRuns.kicker}</span></div>
          </Reveal>
          {c.howItRuns.heading && (
            <Reveal delay={120}>
              <h2 className="section-title"><Inline>{c.howItRuns.heading}</Inline></h2>
            </Reveal>
          )}
          <div className="process-grid">
            {c.howItRuns.steps.map((step, i) => (
              <Reveal key={step.number} delay={200 + i * 100}>
                <div className="process-step">
                  <div className="process-num">{step.number} · {step.title.replace(/\.$/, "")}</div>
                  <h4 className="process-title">{step.title}</h4>
                  <p className="process-body">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · FILMMAKERS ── */}
      {c.filmmakers && (
        <section className="section">
          <RegMark className="tl" /><RegMark className="tr" />
          <div className="page-container">
            <Reveal>
              <div className="section-num"><span>04</span><span className="dash" /><span>{c.filmmakers.kicker}</span></div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="section-title"><Inline>{c.filmmakers.heading}</Inline></h2>
            </Reveal>
            <div className="filmmakers-grid">
              {c.filmmakers.founders.map((f, i) => (
                <Reveal key={f.name} delay={200 + i * 140}>
                  <article className="filmmaker">
                    {f.company && <div className="filmmaker-role">{f.company}</div>}
                    <h3 className="filmmaker-name">{f.name}</h3>
                    <p className="filmmaker-bio">{f.bio}</p>
                    {f.portfolioLinks.map(l => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                        {l.label}<span className="arrow">↗</span>
                      </a>
                    ))}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      {c.cta && (
        <section className="cta-section">
          <div className="page-container">
            {c.cta.eyebrow && (
              <Reveal>
                <div className="cta-eyebrow">{c.cta.eyebrow}</div>
              </Reveal>
            )}
            <Reveal delay={120}>
              <h2 className="cta-title"><Inline>{c.cta.heading}</Inline></h2>
            </Reveal>
            {c.cta.body && (
              <Reveal delay={220}>
                <p className="cta-sub">{c.cta.body}</p>
              </Reveal>
            )}
            <Reveal delay={320}>
              <Link href={c.cta.link.href} className="cta-button">
                {c.cta.link.label}<span className="arrow">→</span>
              </Link>
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
        .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 160px 0 100px; position: relative; }
        .hero-meta { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 48px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .hero-meta .dash { width: 64px; height: 1px; background: var(--ink-faint); }
        .hero-headline { font-family: var(--font-display); font-variation-settings: "opsz" 144, "wght" 440; font-size: clamp(48px, 9.5vw, 144px); line-height: 0.95; letter-spacing: -0.025em; color: var(--ink); margin-bottom: 32px; max-width: 18ch; }
        .hero-headline em { font-style: italic; font-variation-settings: "opsz" 144, "wght" 380; }
        .hero-positioning { max-width: 620px; font-family: var(--font-display); font-size: 21px; line-height: 1.55; color: var(--ink-soft); margin-bottom: 48px; }
        .hero-pill-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .pill { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-soft); padding: 8px 16px; border: 1px solid var(--paper-edge); border-radius: 999px; background: var(--paper-warm); }
        .pill-active { color: var(--kodachrome); border-color: var(--kodachrome); background: rgba(184, 58, 31, 0.06); }

        .section { padding: 160px 0; position: relative; border-top: 1px solid var(--paper-edge); }
        .section :global(.reg-mark.tl) { top: 24px; left: var(--container-pad); }
        .section :global(.reg-mark.tr) { top: 24px; right: var(--container-pad); }
        .section-num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 56px; display: flex; align-items: center; gap: 18px; }
        .section-num .dash { width: 48px; height: 1px; background: var(--ink-faint); }
        .section-title { font-family: var(--font-display); font-variation-settings: "opsz" 96, "wght" 380; font-size: clamp(44px, 7vw, 96px); line-height: 1.02; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 64px; max-width: 18ch; }
        .section-title em { font-style: italic; font-variation-settings: "opsz" 96, "wght" 380; }
        .section-body { font-family: var(--font-display); font-size: 19px; line-height: 1.65; color: var(--ink-soft); max-width: 620px; }
        .section-body p + p { margin-top: 1.2em; }
        .section-body em { font-style: italic; }

        /* SERVICES */
        .services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 16px; }
        .service { padding: 40px 0 0; border-top: 1px solid var(--ink); }
        .service-roman {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 32px;
        }
        .service-status { display: inline-flex; align-items: center; gap: 6px; color: var(--kodachrome); }
        .service-status::before { content: '●'; font-size: 8px; }
        .service-status.collab { color: var(--saffron); }
        .service-status.collab::before { content: '◐'; }
        .service-status.future { color: var(--ink-muted); }
        .service-status.future::before { content: '○'; }
        .service-name { font-family: var(--font-display); font-variation-settings: "opsz" 96, "wght" 480; font-size: 56px; line-height: 1; color: var(--ink); margin-bottom: 14px; letter-spacing: -0.018em; }
        .service-tagline { font-family: var(--font-display); font-variation-settings: "opsz" 32, "wght" 320; font-style: italic; font-size: 22px; color: var(--ink-soft); margin-bottom: 24px; }
        .service-body { font-family: var(--font-display); font-size: 16px; line-height: 1.7; color: var(--ink-soft); margin-bottom: 24px; }
        .service-tools { display: flex; flex-wrap: wrap; gap: 8px; }
        .tool-pill { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-soft); padding: 6px 12px; background: var(--paper-deep); border-radius: 2px; }

        /* PROCESS */
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
        .process-step { padding-top: 24px; border-top: 1px solid var(--paper-edge); }
        .process-num { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--kodachrome); margin-bottom: 12px; }
        .process-title { font-family: var(--font-display); font-size: 22px; line-height: 1.15; color: var(--ink); margin-bottom: 14px; font-weight: 400; }
        .process-body { font-family: var(--font-display); font-size: 14px; line-height: 1.6; color: var(--ink-soft); }

        /* FILMMAKERS */
        .filmmakers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 16px; }
        .filmmaker { padding-top: 32px; border-top: 1px solid var(--ink); }
        .filmmaker-role { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink-muted); margin-bottom: 24px; }
        .filmmaker-name { font-family: var(--font-display); font-variation-settings: "opsz" 60, "wght" 440; font-size: 44px; line-height: 1.05; color: var(--ink); margin-bottom: 24px; letter-spacing: -0.012em; }
        .filmmaker-bio { font-family: var(--font-display); font-size: 16px; line-height: 1.7; color: var(--ink-soft); margin-bottom: 24px; }
        .portfolio-link { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--ink); border-bottom: 1px solid var(--ink-faint); padding-bottom: 6px; transition: all 0.25s ease; }
        .portfolio-link:hover { color: var(--kodachrome); border-bottom-color: var(--kodachrome); }
        .portfolio-link .arrow { transition: transform 0.3s ease; }
        .portfolio-link:hover .arrow { transform: translate(2px, -2px); }

        /* CTA */
        .cta-section { padding: 160px 0; border-top: 1px solid var(--paper-edge); text-align: center; }
        .cta-eyebrow { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--kodachrome); margin-bottom: 24px; }
        .cta-title { font-family: var(--font-display); font-variation-settings: "opsz" 96, "wght" 380; font-size: clamp(40px, 6.4vw, 88px); line-height: 1.02; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 24px; }
        .cta-title em { font-style: italic; }
        .cta-sub { font-family: var(--font-display); font-size: 19px; line-height: 1.55; color: var(--ink-soft); margin: 0 auto 40px; max-width: 560px; }
        .cta-button { display: inline-flex; align-items: center; gap: 12px; padding: 18px 32px; background: var(--ink); color: var(--paper); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; border-radius: 2px; transition: all 0.25s ease; }
        .cta-button:hover { background: var(--kodachrome); letter-spacing: 0.32em; }
        .cta-button .arrow { transition: transform 0.3s ease; }
        .cta-button:hover .arrow { transform: translateX(3px); }

        @media (max-width: 900px) {
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 60px; min-height: auto; }
          .section, .cta-section { padding: 100px 0; }
          .services-grid, .filmmakers-grid { grid-template-columns: 1fr; gap: 48px; }
          .process-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        }
      `}</style>
    </main>
  )
}
