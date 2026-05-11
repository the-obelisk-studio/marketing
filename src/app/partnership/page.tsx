// Partnership page — direct port of partnership.html. The hero uses
// a headline + positioning + pills shape (different from the index
// hero's wordmark treatment). Sections: Story, Two Studios, The
// Filmmakers, Selected Work (rich film cards), CTA.

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { Inline, Body } from "@/lib/rich-text"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import type { CrewEntry, FestivalEntry } from "@/lib/schema"

export const metadata = pageMetadata({
  title: "Partnership",
  description:
    "Obelisk Studios and TDH Systems — a partnership built on the work. Two studios, one picture.",
  path: "/partnership/",
})

function CrewLine({ entry }: { entry: CrewEntry }) {
  const names = entry.names ?? (entry.name ? [entry.name] : [])
  return (
    <div className="crew-row">
      <dt className="crew-role">{entry.role}</dt>
      <dd className="crew-names">
        {names.map((n, i) => (
          <span key={i} className="crew-name">{n}</span>
        ))}
      </dd>
    </div>
  )
}

function FestivalLine({ entry }: { entry: FestivalEntry }) {
  if (typeof entry === "string") {
    return <li className="festival-row"><span className="festival-name">{entry}</span></li>
  }
  return (
    <li className="festival-row">
      <span className="festival-name">{entry.name}</span>
      {entry.award && <span className="festival-award">{entry.award}</span>}
    </li>
  )
}

export default function PartnershipPage() {
  const c = loadContent("partnership.yml")

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="page-container">
          <svg className="obelisk-glyph" viewBox="0 0 64 380" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M32 0 L48 56 L18 56 Z M18 56 L48 56 L46 380 L20 380 Z" fill="currentColor" />
          </svg>

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
              <h1 className="hero-headline">
                <Inline>{c.hero.headline}</Inline>
              </h1>
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
                {c.hero.pills.map((p, i) => <span key={i} className="pill">{p}</span>)}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 01 · STORY ── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>01</span><span className="dash" /><span>{c.story.kicker}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.story.heading}</Inline></h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="section-body"><Body>{c.story.body}</Body></div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 · TWO STUDIOS ── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>02</span><span className="dash" /><span>{c.twoStudios.kicker}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.twoStudios.heading}</Inline></h2>
          </Reveal>
          {c.twoStudios.body && (
            <Reveal delay={220}>
              <div className="section-body"><Body>{c.twoStudios.body}</Body></div>
            </Reveal>
          )}

          <div className="entities-grid">
            {c.twoStudios.studios.map((s, i) => (
              <Reveal key={s.name} delay={300 + i * 160}>
                <article className="entity">
                  <div className="entity-label">{s.label}</div>
                  <h3 className="entity-name">{s.name}</h3>
                  {s.founder && <div className="entity-founder">{s.founder}</div>}
                  <p className="entity-body">{s.description}</p>
                  {s.tags.length > 0 && (
                    <div className="entity-tags">
                      {s.tags.map(t => <span key={t} className="entity-tag">{t}</span>)}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · FILMMAKERS ── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>03</span><span className="dash" /><span>{c.filmmakers.kicker}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.filmmakers.heading}</Inline></h2>
          </Reveal>

          <div className="filmmakers-grid">
            {c.filmmakers.founders.map((f, i) => (
              <Reveal key={f.name} delay={220 + i * 140}>
                <article className="filmmaker">
                  {f.company && <div className="filmmaker-role">{f.company}</div>}
                  <h3 className="filmmaker-name">{f.name}</h3>
                  <p className="filmmaker-bio">{f.bio}</p>
                  {f.portfolioLinks.map(l => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                      {l.label}
                      <span className="arrow">↗</span>
                    </a>
                  ))}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · SELECTED WORK ── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <div className="section-num">
              <span>04</span><span className="dash" /><span>{c.selectedWork.kicker}</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.selectedWork.heading}</Inline></h2>
          </Reveal>
          {c.selectedWork.body && (
            <Reveal delay={220}>
              <div className="section-body"><Body>{c.selectedWork.body}</Body></div>
            </Reveal>
          )}

          <div className="films-list">
            {c.selectedWork.films.map((film, i) => (
              <Reveal key={film.title} delay={300 + i * 80}>
                <article className="film">
                  <div className="film-meta-row">
                    {film.genre && <span>{film.genre}</span>}
                    {film.status && <span className="film-status">{film.status}</span>}
                  </div>
                  <h3 className="film-title">{film.title}</h3>
                  {film.logline && <p className="film-logline">{film.logline}</p>}

                  <div className="film-detail">
                    {film.crew.length > 0 && (
                      <div className="film-crew">
                        <dl>
                          {film.crew.map((c, i) => <CrewLine key={i} entry={c} />)}
                        </dl>
                      </div>
                    )}

                    <div className="film-synopsis-block">
                      {film.synopsis && (
                        <>
                          <h4>Synopsis</h4>
                          <div className="film-synopsis"><Body>{film.synopsis}</Body></div>
                        </>
                      )}
                      {film.festivals.length > 0 && (
                        <>
                          <div className="festivals-label">Featured Festivals</div>
                          <ul className="festivals-list">
                            {film.festivals.map((f, i) => <FestivalLine key={i} entry={f} />)}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      {c.cta && (
        <section className="cta-section">
          <div className="page-container">
            {c.cta.eyebrow && (
              <Reveal><div className="cta-eyebrow">{c.cta.eyebrow}</div></Reveal>
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
              <Link href={c.cta.button.href} className="cta-button">
                {c.cta.button.label}<span className="arrow">→</span>
              </Link>
            </Reveal>
            {c.cta.note && (
              <Reveal delay={400}>
                <div className="cta-note">{c.cta.note}</div>
              </Reveal>
            )}
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
          top: 50%; right: -30px;
          transform: translateY(-50%);
          width: 64px; height: 380px;
          opacity: 0.06; pointer-events: none;
          color: var(--ink);
        }
        .hero-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 48px;
          display: flex; align-items: center;
          gap: 18px; flex-wrap: wrap;
        }
        .hero-meta .dash {
          width: 64px; height: 1px;
          background: var(--ink-faint);
        }
        .hero-headline {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 144, "wght" 440;
          font-size: clamp(56px, 11vw, 168px);
          line-height: 0.92;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 32px;
          max-width: 16ch;
        }
        .hero-headline em {
          font-style: italic;
          font-variation-settings: "opsz" 144, "wght" 380;
        }
        .hero-positioning {
          max-width: 620px;
          font-family: var(--font-display);
          font-variation-settings: "opsz" 22, "wght" 400;
          font-size: 21px;
          line-height: 1.55;
          color: var(--ink-soft);
          margin-bottom: 48px;
        }
        .hero-pill-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .pill {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-soft);
          padding: 8px 16px;
          border: 1px solid var(--paper-edge);
          border-radius: 999px;
          background: var(--paper-warm);
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
          display: flex; align-items: center; gap: 18px;
        }
        .section-num .dash { width: 48px; height: 1px; background: var(--ink-faint); }
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
          margin-bottom: 64px;
        }
        .section-body p + p { margin-top: 1.2em; }
        .section-body em {
          font-style: italic;
          font-variation-settings: "opsz" 18, "wght" 400;
        }

        /* ── ENTITIES (Two Studios) ── */
        .entities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          margin-top: 16px;
        }
        .entity {
          padding-top: 40px;
          border-top: 1px solid var(--ink);
        }
        .entity-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--kodachrome);
          margin-bottom: 28px;
        }
        .entity-name {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 480;
          font-size: 56px;
          line-height: 1;
          color: var(--ink);
          margin-bottom: 8px;
          letter-spacing: -0.018em;
        }
        .entity-founder {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 28px;
        }
        .entity-body {
          font-family: var(--font-display);
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink-soft);
          margin-bottom: 28px;
        }
        .entity-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .entity-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-soft);
          padding: 6px 12px;
          background: var(--paper-deep);
          border-radius: 2px;
        }

        /* ── FILMMAKERS ── */
        .filmmakers-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-top: 24px;
        }
        .filmmaker {
          padding-top: 32px;
          border-top: 1px solid var(--ink);
        }
        .filmmaker-role {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 24px;
        }
        .filmmaker-name {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 60, "wght" 440;
          font-size: 44px;
          line-height: 1.05;
          color: var(--ink);
          margin-bottom: 24px;
          letter-spacing: -0.012em;
        }
        .filmmaker-bio {
          font-family: var(--font-display);
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink-soft);
          margin-bottom: 24px;
        }

        .portfolio-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
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
        }
        .portfolio-link .arrow { transition: transform 0.3s ease; }
        .portfolio-link:hover .arrow { transform: translate(3px, -3px); }

        /* ── FILMS LIST ── */
        .films-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 16px;
        }
        .film {
          padding: 96px 0;
          border-top: 1px solid var(--ink);
        }
        .film:last-child {
          border-bottom: 1px solid var(--paper-edge);
        }
        .film-meta-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .film-status { color: var(--kodachrome); }
        .film-title {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 480;
          font-size: clamp(36px, 5.6vw, 72px);
          line-height: 1;
          color: var(--ink);
          margin-bottom: 24px;
          letter-spacing: -0.015em;
        }
        .film-logline {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 22, "wght" 360;
          font-style: italic;
          font-size: 20px;
          line-height: 1.5;
          color: var(--ink-soft);
          max-width: 760px;
          margin-bottom: 48px;
        }
        .film-detail {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 64px;
          align-items: start;
        }
        .film-crew dl {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .crew-row { display: flex; flex-direction: column; gap: 6px; }
        .crew-role {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        .crew-names { display: flex; flex-direction: column; gap: 2px; }
        .crew-name {
          font-family: var(--font-display);
          font-size: 17px;
          color: var(--ink);
        }
        .film-synopsis-block h4 {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-muted);
          font-weight: 400;
          margin-bottom: 18px;
        }
        .film-synopsis {
          font-family: var(--font-display);
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink-soft);
          margin-bottom: 36px;
        }
        .film-synopsis em {
          font-style: italic;
        }
        .festivals-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 18px;
        }
        .festivals-list { list-style: none; }
        .festival-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4px 16px;
          padding: 14px 0;
          border-bottom: 1px solid var(--paper-edge);
          align-items: baseline;
        }
        .festival-name {
          font-family: var(--font-display);
          font-size: 15px;
          color: var(--ink);
        }
        .festival-award {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--saffron);
        }

        /* ── CTA ── */
        .cta-section {
          padding: 160px 0;
          border-top: 1px solid var(--paper-edge);
          text-align: center;
        }
        .cta-eyebrow {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--kodachrome);
          margin-bottom: 24px;
        }
        .cta-title {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 380;
          font-size: clamp(40px, 6.4vw, 88px);
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .cta-title em {
          font-style: italic;
          font-variation-settings: "opsz" 96, "wght" 380;
        }
        .cta-sub {
          font-family: var(--font-display);
          font-size: 19px;
          line-height: 1.55;
          color: var(--ink-soft);
          margin: 0 auto 40px;
          max-width: 560px;
        }
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 32px;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .cta-button:hover {
          background: var(--kodachrome);
          letter-spacing: 0.32em;
        }
        .cta-button .arrow { transition: transform 0.3s ease; }
        .cta-button:hover .arrow { transform: translateX(3px); }
        .cta-note {
          margin-top: 32px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        /* ── MOBILE ── */
        @media (max-width: 900px) {
          .page-container { padding: 0 var(--container-pad-mobile); }
          .hero { padding: 130px 0 60px; min-height: auto; }
          .section, .cta-section { padding: 100px 0; }
          .obelisk-glyph { display: none; }
          .entities-grid, .filmmakers-grid { grid-template-columns: 1fr; gap: 48px; }
          .film-detail { grid-template-columns: 1fr; gap: 32px; }
          .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
          .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        }
      `}</style>
    </main>
  )
}
