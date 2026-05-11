// Homepage — direct port of KK's index.html. Content comes from
// content/index.yml; KK edits via Decap. Layout matches KK's design
// pixel-faithfully (Kodak-film palette, Fraunces wordmark with italic
// "studio" suffix, numbered sections with corner reg marks, the
// 4-credit "Previous Collaboration" subsection inside the partnership
// section).

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { Inline, Body } from "@/lib/rich-text"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Obelisk Studios",
  description:
    "Independent filmmakers building tools and finishing pictures. Software and post production, run by working filmmakers, in Burbank.",
  path: "/",
})

export default function HomePage() {
  const c = loadContent("index.yml")

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-container">
          <svg className="obelisk-glyph" viewBox="0 0 64 380" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M32 0 L48 56 L18 56 Z M18 56 L48 56 L46 380 L20 380 Z" fill="currentColor" />
          </svg>

          <Reveal eager delay={100}>
            <div className="hero-meta">
              <span>Burbank · Los Angeles</span>
              <span className="dash" />
              <span>Independent Studio</span>
              <span className="dash" />
              <span>Est. 2026</span>
            </div>
          </Reveal>

          <Reveal eager delay={250}>
            <h1 className="wordmark">{c.hero.title}</h1>
          </Reveal>
          <Reveal eager delay={450}>
            <div className="wordmark-sub">studio</div>
          </Reveal>

          {c.hero.motto && (
            <Reveal eager delay={700}>
              <div className="motto-area">
                <div className="motto">{c.hero.motto}</div>
              </div>
            </Reveal>
          )}

          <Reveal eager delay={950}>
            <p className="hero-positioning">
              An independent studio of working filmmakers — building tools and finishing pictures for the people who actually make films.
            </p>
          </Reveal>
        </div>

        <div className="hero-scroll">scroll ↓</div>
      </section>

      {/* ── 01 · THE STUDIO ── */}
      <section className="section" id="about">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>01</span>
              <span className="dash" />
              <span>{c.studio.kicker}</span>
            </div>
          </Reveal>

          <div className="about-grid">
            <Reveal>
              <h2 className="section-title">
                <Inline>{c.studio.heading}</Inline>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="section-body">
                <Body>{c.studio.body}</Body>
              </div>

              <aside className="about-aside">
                <div className="about-aside-label">Studio Index</div>
                <dl>
                  <dt>Founded</dt><dd>2026</dd>
                  <dt>Discipline</dt><dd>Software · Post Production</dd>
                  <dt>Location</dt><dd>Burbank, California</dd>
                </dl>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 · WHAT WE MAKE ── */}
      <section className="section" id="offerings">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>02</span>
              <span className="dash" />
              <span>{c.offerings.kicker}</span>
            </div>
          </Reveal>

          {c.offerings.heading && (
            <Reveal delay={120}>
              <h2 className="section-title">
                <Inline>{c.offerings.heading}</Inline>
              </h2>
            </Reveal>
          )}

          <div className="offerings-grid">
            {c.offerings.items.map((item, i) => (
              <Reveal key={item.href} delay={200 + i * 120}>
                <article className="offering">
                  <div className="offering-meta">
                    <span>{item.kicker}</span>
                    {item.status && (
                      <span className={`offering-status ${item.statusKind === "future" ? "future" : ""}`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                  <h3 className="offering-name">{item.title}</h3>
                  {item.tagline && <p className="offering-tagline">{item.tagline}</p>}
                  <div className="section-body">
                    <Body>{item.blurb}</Body>
                  </div>
                  <Link href={item.href} className="offering-link">{item.cta} →</Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · IN PARTNERSHIP ── */}
      <section className="section" id="studio">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>03</span>
              <span className="dash" />
              <span>{c.partnership.kicker}</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="section-title">
              <Inline>{c.partnership.heading}</Inline>
            </h2>
          </Reveal>

          <div className="founders-grid">
            {c.partnership.founders.map((f, i) => (
              <Reveal key={f.name} delay={200 + i * 120}>
                <article className="founder">
                  {f.company && <div className="founder-role">{f.company}</div>}
                  <h3 className="founder-name">{f.name}</h3>
                  <p className="founder-bio">{f.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {c.partnership.films.length > 0 && (
            <div className="collab-subsection">
              <Reveal>
                <div className="collab-eyebrow">— Previous Collaboration</div>
              </Reveal>
              <Reveal delay={120}>
                <h3 className="collab-title">A working history, <em>on screen.</em></h3>
              </Reveal>
              <Reveal delay={220}>
                <p className="collab-lead">
                  Selected films from the partners — together and apart. The work that built the trust this partnership runs on.
                </p>
              </Reveal>

              <div className="credits-list">
                {c.partnership.films.map((film, i) => (
                  <Reveal key={film.title} delay={160 + i * 100}>
                    <div className="credit-row">
                      <div className="credit-title">{film.title}</div>
                      {film.year && <div className="credit-year">{String(film.year)}</div>}
                      {film.synopsis && <div className="credit-detail">{film.synopsis}</div>}
                    </div>
                  </Reveal>
                ))}
              </div>

              <div style={{ marginTop: 48 }}>
                <Link href="/partnership" className="portfolio-link">
                  View the full partnership
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        /* ── Page container (1320 max + responsive pad) ── */
        .hero-container,
        .page-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-pad);
          position: relative;
        }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 160px 0 100px;
          position: relative;
        }
        .obelisk-glyph {
          position: absolute;
          top: 50%;
          right: -30px;
          transform: translateY(-50%);
          width: 64px;
          height: 380px;
          opacity: 0.06;
          pointer-events: none;
          color: var(--ink);
        }
        .hero-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 56px;
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .hero-meta .dash {
          width: 64px;
          height: 1px;
          background: var(--ink-faint);
        }
        .wordmark {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 144, "wght" 480;
          font-size: clamp(80px, 19vw, 290px);
          line-height: 0.86;
          letter-spacing: -0.025em;
          color: var(--ink);
          font-weight: 480;
        }
        .wordmark-sub {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 60, "wght" 320;
          font-style: italic;
          font-size: clamp(28px, 4.6vw, 64px);
          letter-spacing: 0.01em;
          color: var(--ink-soft);
          margin-top: 14px;
          margin-left: 6px;
        }
        .motto-area {
          margin-top: 80px;
          max-width: 720px;
          padding-top: 32px;
          border-top: 1px solid var(--paper-edge);
        }
        .motto {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 360;
          font-style: italic;
          font-size: clamp(30px, 3.7vw, 46px);
          color: var(--ink);
          letter-spacing: 0.002em;
          line-height: 1.2;
        }
        .hero-positioning {
          max-width: 560px;
          font-family: var(--font-display);
          font-variation-settings: "opsz" 22, "wght" 400;
          font-size: 19px;
          line-height: 1.6;
          color: var(--ink-soft);
          margin-top: 64px;
        }
        .hero-scroll {
          position: absolute;
          bottom: 32px;
          right: var(--container-pad);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-muted);
          writing-mode: vertical-rl;
          text-orientation: mixed;
          opacity: 0.7;
        }

        /* ── SECTION ── */
        .section {
          padding: 160px 0;
          position: relative;
          border-top: 1px solid var(--paper-edge);
        }
        .section :global(.reg-mark.tl) { top: 24px; left: var(--container-pad); }
        .section :global(.reg-mark.tr) { top: 24px; right: var(--container-pad); }
        .section-num {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 56px;
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .section-num .dash {
          width: 48px;
          height: 1px;
          background: var(--ink-faint);
        }
        .section-title {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 380;
          font-size: clamp(44px, 7vw, 96px);
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-bottom: 64px;
          max-width: 18ch;
        }
        .section-title em {
          font-style: italic;
          font-variation-settings: "opsz" 96, "wght" 380;
        }
        .section-body {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 18, "wght" 400;
          font-size: 19px;
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 620px;
        }
        .section-body p + p { margin-top: 1.2em; }
        .section-body em {
          font-style: italic;
          font-variation-settings: "opsz" 18, "wght" 400;
        }

        /* ── ABOUT ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 96px;
          align-items: start;
        }
        .about-aside {
          margin-top: 48px;
          padding-top: 20px;
          border-top: 1px solid var(--paper-edge);
        }
        .about-aside-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 20px;
        }
        .about-aside dl {
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 14px 32px;
        }
        .about-aside dt {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-muted);
          padding-top: 4px;
        }
        .about-aside dd {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 16, "wght" 400;
          font-size: 16px;
          color: var(--ink-soft);
        }

        /* ── OFFERINGS ── */
        .offerings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          margin-top: 24px;
        }
        .offering {
          padding: 40px 0 0;
          border-top: 1px solid var(--ink);
        }
        .offering-meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 36px;
        }
        .offering-status {
          color: var(--kodachrome);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .offering-status::before {
          content: '●';
          font-size: 8px;
        }
        .offering-status.future {
          color: var(--ink-muted);
        }
        .offering-status.future::before {
          content: '○';
        }
        .offering-tagline {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 32, "wght" 320;
          font-style: italic;
          font-size: 22px;
          color: var(--ink-soft);
          margin-bottom: 24px;
        }
        .offering-name {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 480;
          font-size: 64px;
          line-height: 0.95;
          color: var(--ink);
          margin-bottom: 14px;
          letter-spacing: -0.015em;
        }
        .offering-link {
          display: inline-block;
          margin-top: 28px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink);
          border-bottom: 1px solid var(--ink-faint);
          padding-bottom: 4px;
          transition: all 0.25s ease;
        }
        .offering-link:hover {
          color: var(--kodachrome);
          border-bottom-color: var(--kodachrome);
          letter-spacing: 0.28em;
        }

        /* ── FOUNDERS ── */
        .founders-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-top: 24px;
        }
        .founder {
          padding-top: 32px;
          border-top: 1px solid var(--ink);
        }
        .founder-role {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 24px;
        }
        .founder-name {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 60, "wght" 440;
          font-size: 44px;
          line-height: 1.05;
          color: var(--ink);
          margin-bottom: 28px;
          letter-spacing: -0.012em;
        }
        .founder-bio {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 16, "wght" 400;
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink-soft);
        }

        /* ── COLLAB SUBSECTION ── */
        .collab-subsection {
          margin-top: 120px;
          padding-top: 56px;
          border-top: 1px solid var(--paper-edge);
        }
        .collab-eyebrow {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--kodachrome);
          margin-bottom: 24px;
        }
        .collab-title {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 60, "wght" 380;
          font-size: 36px;
          line-height: 1.1;
          color: var(--ink);
          letter-spacing: -0.01em;
          margin-bottom: 18px;
          max-width: 18ch;
        }
        .collab-title em {
          font-style: italic;
          font-variation-settings: "opsz" 60, "wght" 360;
        }
        .collab-lead {
          font-family: var(--font-display);
          font-size: 16px;
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 56ch;
          margin-bottom: 48px;
        }

        /* ── CREDITS LIST ── */
        .credits-list { border-top: 1px solid var(--ink); }
        .credit-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4px 24px;
          padding: 28px 0;
          border-bottom: 1px solid var(--paper-edge);
          align-items: baseline;
          transition: padding-left 0.35s ease, background 0.35s ease;
        }
        .credit-row:hover {
          padding-left: 16px;
          background: rgba(184, 58, 31, 0.03);
        }
        .credit-title {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 72, "wght" 440;
          font-size: 34px;
          line-height: 1.1;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .credit-year {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--ink-muted);
          align-self: center;
        }
        .credit-detail {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 16, "wght" 400;
          font-style: italic;
          font-size: 15px;
          color: var(--ink-soft);
          grid-column: 1 / -1;
          margin-top: 4px;
        }

        .portfolio-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink);
          border-bottom: 1px solid var(--ink-faint);
          padding-bottom: 6px;
          transition: all 0.25s ease;
        }
        .portfolio-link:hover {
          color: var(--kodachrome);
          border-bottom-color: var(--kodachrome);
          letter-spacing: 0.28em;
        }
        .portfolio-link .arrow { transition: transform 0.3s ease; }
        .portfolio-link:hover .arrow { transform: translateX(3px); }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .hero-container,
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 60px; min-height: auto; }
          .section { padding: 100px 0; }
          .obelisk-glyph, .hero-scroll { display: none; }
          .about-grid, .offerings-grid, .founders-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .section-title { margin-bottom: 40px; }
          .offering-name { font-size: 44px; }
          .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        }
      `}</style>
    </main>
  )
}
