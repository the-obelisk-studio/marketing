// /grace — long-form product walkthrough.
//
// Layout, animation, and visual rhythm are owned by this component.
// Copy, screenshots, and section ordering are owned by content/grace.yml
// (validated by GracePageSchema in src/lib/schema.ts). Edits flow through
// Decap CMS → YAML → build.

import type { Metadata } from "next"
import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { HeroMark } from "@/components/HeroMark"
import { JsonLd } from "@/components/JsonLd"
import { ZoomableImage } from "@/components/ZoomableImage"
import { loadContent } from "@/lib/content"
import { pageMetadata, softwareApplicationLd } from "@/lib/seo"
import type { GraceContent } from "@/lib/schema"

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Grace · Production OS for working filmmakers",
    description:
      "The production operating system built by working filmmakers. Script, schedule, budget, call sheets, and on-set comms from one source of truth, so a 4 pm script revision doesn't become a 7 pm crisis.",
    path: "/grace/",
  }),
  // Cross-domain canonical: the standalone Grace marketing site
  // (graceproductionos.com) is the authoritative home for this content now.
  // Point search engines at it so this Obelisk-hosted duplicate doesn't
  // split ranking. SEO hint only — the page still serves here unchanged.
  alternates: { canonical: "https://graceproductionos.com/us/" },
}

type Shot = GraceContent["hero"]["shot"]
type Row = GraceContent["preProduction"]["rows"][number]

export default function GracePage() {
  const c = loadContent("grace.yml")
  return (
    <main>
      <JsonLd data={softwareApplicationLd()} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="page-container">
          {c.hero.badge && (
            <Reveal eager delay={80}>
              <div className="hero-badge">{c.hero.badge}</div>
            </Reveal>
          )}
          <Reveal eager delay={220}>
            <HeroMark>
              <h1 className="hero-title">
                {c.hero.title}
                {c.hero.titleMuted && <> <span className="muted">{c.hero.titleMuted}</span></>}
              </h1>
            </HeroMark>
          </Reveal>
          <Reveal eager delay={420}>
            <p className="hero-sub">{c.hero.sub}</p>
          </Reveal>
          <Reveal eager delay={620}>
            <div className="hero-ctas">
              <Link href={c.hero.primaryCta.href} className="cta-primary">{c.hero.primaryCta.label}</Link>
              <a href={c.hero.secondaryCta.href} className="cta-secondary">{c.hero.secondaryCta.label}</a>
            </div>
          </Reveal>
          <Reveal eager delay={820}>
            <figure className="hero-shot">
              <ZoomableImage
                src={c.hero.shot.src}
                alt={c.hero.shot.alt ?? c.hero.shot.caption ?? ""}
                loading="eager"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────── */}
      <section className="section" id="problem">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.problems.num} label={c.problems.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.problems.heading} muted={c.problems.headingMuted} />
          </Reveal>
          {c.problems.body && (
            <Reveal delay={200}><p className="section-body">{c.problems.body}</p></Reveal>
          )}
          <div className="problem-grid">
            {c.problems.items.map((p, i) => (
              <Reveal key={i} delay={200 + i * 140}>
                <article className="problem-card">
                  <div className="problem-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="problem-h">{p.scenario}</h3>
                  <p className="problem-p">{p.response}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THESIS ───────────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.thesis.num} label={c.thesis.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.thesis.heading} muted={c.thesis.headingMuted} />
          </Reveal>
          {c.thesis.body && (
            <Reveal delay={200}><p className="section-body">{c.thesis.body}</p></Reveal>
          )}
          <div className="thesis-points">
            {c.thesis.points.map((t, i) => (
              <Reveal key={i} delay={280 + i * 90}>
                <div className="thesis-point">
                  <span className="thesis-dot" aria-hidden />
                  <p>{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={640}>
            <div className="flow-diagram" role="img" aria-label={c.thesis.flow.ariaLabel ?? ""}>
              <div className="flow-column flow-inputs">
                <span className="flow-label">{c.thesis.flow.inputsLabel}</span>
                {c.thesis.flow.inputs.map((label, i) => (
                  <div key={i} className="flow-card">{label}</div>
                ))}
              </div>
              <div className="flow-hub">
                <div className="flow-hub-label">{c.thesis.flow.hub.label}</div>
                {c.thesis.flow.hub.sub && <div className="flow-hub-sub">{c.thesis.flow.hub.sub}</div>}
                {c.thesis.flow.hub.meta && <div className="flow-hub-meta">{c.thesis.flow.hub.meta}</div>}
              </div>
              <div className="flow-column flow-outputs">
                <span className="flow-label">{c.thesis.flow.outputsLabel}</span>
                {c.thesis.flow.outputs.map((label, i) => (
                  <div key={i} className="flow-card">{label}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DOT SYSTEM ───────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.dots.num} label={c.dots.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.dots.heading} muted={c.dots.headingMuted} />
          </Reveal>
          {c.dots.body && (
            <Reveal delay={200}><p className="section-body">{c.dots.body}</p></Reveal>
          )}
          <div className="dots-grid">
            {c.dots.items.map((d, i) => (
              <Reveal key={d.color} delay={280 + i * 120}>
                <div className="dot-card">
                  <div className="dot-row">
                    <span className={`dot dot-${d.color}`} aria-hidden />
                    <span className={`dot-label dot-label-${d.color}`}>{d.label}</span>
                  </div>
                  <p>{d.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {c.dots.closer && (
            <Reveal delay={700}><p className="dot-closer">{c.dots.closer}</p></Reveal>
          )}
          {c.dots.shot && (
            <div className="screenshot-grid one-col">
              <Reveal delay={820}>
                <ShotItem shot={c.dots.shot} />
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ── CASCADE ──────────────────────────────────────────────── */}
      <section className="section" id="workflow">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.cascade.num} label={c.cascade.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.cascade.heading} muted={c.cascade.headingMuted} />
          </Reveal>
          {c.cascade.body && (
            <Reveal delay={200}><p className="section-body">{c.cascade.body}</p></Reveal>
          )}

          <div className="cascade-wrap">
            {chunk(c.cascade.steps, 4).map((row, ri) => {
              const rowStart = 280 + ri * 340
              return (
                <div key={ri} className="cascade-row">
                  {row.map((s, i) => {
                    const n = ri * 4 + i + 1
                    return (
                      <Reveal key={s.label} delay={rowStart + i * 70}>
                        <CascadeStep n={n} label={s.label} detail={s.detail} last={i === row.length - 1} />
                      </Reveal>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {c.cascade.stat && (
            <Reveal delay={1000}>
              <div className="cascade-stat">
                <div className="cascade-stat-num">{c.cascade.stat.num}</div>
                <div className="cascade-stat-label">{c.cascade.stat.label}</div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── PRE-PRODUCTION ───────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.preProduction.num} label={c.preProduction.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.preProduction.heading} muted={c.preProduction.headingMuted} />
          </Reveal>
          {c.preProduction.body && (
            <Reveal delay={200}><p className="section-body">{c.preProduction.body}</p></Reveal>
          )}
          <ShotRows rows={c.preProduction.rows} startDelay={280} />
        </div>
      </section>

      {/* ── PRODUCTION ───────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.production.num} label={c.production.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.production.heading} muted={c.production.headingMuted} />
          </Reveal>
          {c.production.body && (
            <Reveal delay={200}><p className="section-body">{c.production.body}</p></Reveal>
          )}
          <ShotRows rows={c.production.rows} startDelay={280} />
        </div>
      </section>

      {/* ── GRACE AI ─────────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.graceAi.num} label={c.graceAi.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.graceAi.heading} muted={c.graceAi.headingMuted} />
          </Reveal>
          {c.graceAi.body && (
            <Reveal delay={200}><p className="section-body">{c.graceAi.body}</p></Reveal>
          )}
          {c.graceAi.shot && (
            <div className="screenshot-grid one-col">
              <Reveal delay={280}>
                <ShotItem shot={c.graceAi.shot} />
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ── DEPARTMENTS ──────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.departments.num} label={c.departments.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.departments.heading} muted={c.departments.headingMuted} />
          </Reveal>
          {c.departments.body && (
            <Reveal delay={200}><p className="section-body">{c.departments.body}</p></Reveal>
          )}
          <div className="dept-grid">
            {c.departments.items.map((d, i) => (
              <Reveal key={d.role} delay={280 + i * 70}>
                <article className="dept-card">
                  <div className="dept-role">{d.role}</div>
                  <ul>
                    {d.gives.map((g, j) => (
                      <li key={j}>{g}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ───────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.compliance.num} label={c.compliance.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.compliance.heading} muted={c.compliance.headingMuted} />
          </Reveal>
          {c.compliance.body && (
            <Reveal delay={200}><p className="section-body">{c.compliance.body}</p></Reveal>
          )}
          {c.compliance.unions.length > 0 && (
            <Reveal delay={280}>
              <div className="union-tags">
                {c.compliance.unions.map((u) => (
                  <span key={u.label} className={`union-tag${u.active ? " active" : ""}`}>{u.label}</span>
                ))}
              </div>
            </Reveal>
          )}
          <ul className="compliance-list">
            {c.compliance.bullets.map((b, i) => (
              <Reveal key={i} delay={400 + i * 80}>
                <li>
                  <span className="check" aria-hidden>✓</span>
                  <span>{b}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          {c.compliance.deferralNote && (
            <Reveal delay={900}>
              <p className="deferral-note">{c.compliance.deferralNote}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── VAULT ────────────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.vault.num} label={c.vault.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.vault.heading} muted={c.vault.headingMuted} />
          </Reveal>
          {c.vault.body && (
            <Reveal delay={200}><p className="section-body">{c.vault.body}</p></Reveal>
          )}
          <div className="vault-features">
            {c.vault.features.map((v, i) => (
              <Reveal key={v.title} delay={280 + i * 60}>
                <div className="vault-feature">
                  <h4>{v.title}</h4>
                  <p>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {c.vault.shots.length > 0 && (
            <div className="screenshot-grid three-col">
              {c.vault.shots.map((s, i) => (
                <Reveal key={s.src} delay={680 + i * 80}>
                  <ShotItem shot={s} />
                </Reveal>
              ))}
            </div>
          )}
          {c.vault.tierNote && (
            <Reveal delay={920}>
              <p className="tier-note">{c.vault.tierNote}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── OPERATIONS ───────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.operations.num} label={c.operations.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.operations.heading} muted={c.operations.headingMuted} />
          </Reveal>
          {c.operations.body && (
            <Reveal delay={200}><p className="section-body">{c.operations.body}</p></Reveal>
          )}
          <div className="ops-grid">
            {c.operations.items.map((o, i) => (
              <Reveal key={o.title} delay={200 + i * 80}>
                <div className="ops-item">
                  <h4>{o.title}</h4>
                  <p>{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <ShotRows rows={c.operations.rows} startDelay={560} />
        </div>
      </section>

      {/* ── WHY WE BUILT THIS ────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.whyBuilt.num} label={c.whyBuilt.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.whyBuilt.heading} muted={c.whyBuilt.headingMuted} />
          </Reveal>
          <div className="why-split">
            <div className="why-text">
              {c.whyBuilt.paragraphs.map((p, i) => (
                <Reveal key={i} delay={200 + i * 120}>
                  <p>{p}</p>
                </Reveal>
              ))}
              {c.whyBuilt.link && (
                <Reveal delay={200 + c.whyBuilt.paragraphs.length * 120}>
                  <Link href={c.whyBuilt.link.href} className="link-arrow">
                    {c.whyBuilt.link.label} <span className="arrow">→</span>
                  </Link>
                </Reveal>
              )}
            </div>
            {c.whyBuilt.shot && (
              <Reveal delay={360}>
                <figure className="why-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.whyBuilt.shot.src} alt={c.whyBuilt.shot.alt ?? c.whyBuilt.shot.caption ?? ""} />
                </figure>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────── */}
      <section className="section" id="pricing">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.pricing.num} label={c.pricing.numLabel} /></Reveal>
          <Reveal delay={120}>
            <SectionTitle heading={c.pricing.heading} muted={c.pricing.headingMuted} />
          </Reveal>
          {c.pricing.body && (
            <Reveal delay={200}><p className="section-body">{c.pricing.body}</p></Reveal>
          )}
          {c.pricing.tiers && c.pricing.tiers.length > 0 ? (
            <div className="pricing-grid">
              {c.pricing.tiers.map((t, i) => (
                <Reveal key={t.name} delay={280 + i * 140}>
                  <article className={`pricing-card${t.featured ? " featured" : ""}`}>
                    {t.badge && <div className="tier-badge">{t.badge}</div>}
                    <div className="tier-name">{t.name}</div>
                    <div className="tier-desc">{t.desc}</div>
                    <div className="tier-price">{t.price}<span> / month</span></div>
                    {t.annual && <div className="tier-annual">{t.annual}</div>}
                    <ul className="tier-bullets">
                      {t.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                    {c.pricing.tierCta && (
                      <Link href={c.pricing.tierCta.href} className="cta-primary tier-cta">{c.pricing.tierCta.label}</Link>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          ) : c.pricing.cta ? (
            <Reveal delay={280}>
              <div className="hero-ctas centered">
                <a href={c.pricing.cta.href} className="cta-primary">{c.pricing.cta.label}</a>
              </div>
            </Reveal>
          ) : null}
          {c.pricing.note && (
            <Reveal delay={620}>
              <p className="pricing-note">{c.pricing.note}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="section" id="faq">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n={c.faq.num} label={c.faq.numLabel} /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title section-title-centered">
              {c.faq.heading}
              {c.faq.headingMuted && <> <span className="muted">{c.faq.headingMuted}</span></>}
            </h2>
          </Reveal>
          <div className="faq-list">
            {c.faq.items.map((f, i) => (
              <Reveal key={i} delay={200 + i * 60}>
                <details className="faq-item">
                  <summary className="faq-q">{f.q}</summary>
                  <div className="faq-a">{f.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="section section-cta" id="contact">
        <div className="page-container">
          <Reveal>
            <h2 className="cta-heading">
              {c.finalCta.heading}
              {c.finalCta.headingMuted && <> <span className="muted">{c.finalCta.headingMuted}</span></>}
            </h2>
          </Reveal>
          {c.finalCta.body && (
            <Reveal delay={140}><p className="cta-body">{c.finalCta.body}</p></Reveal>
          )}
          <Reveal delay={280}>
            <div className="hero-ctas centered">
              <Link href={c.finalCta.primaryCta.href} className="cta-primary">{c.finalCta.primaryCta.label}</Link>
              {c.finalCta.secondaryCta && (
                <a href={c.finalCta.secondaryCta.href} className="cta-secondary">{c.finalCta.secondaryCta.label}</a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <PageStyles />
    </main>
  )
}

// ─── Sub-components ─────────────────────────────────────────────

function SectionNum({ n, label }: { n: string; label?: string }) {
  return (
    <div className="section-num">
      <span>{n}</span>
      {label && (
        <>
          <span className="dash" />
          <span>{label}</span>
        </>
      )}
    </div>
  )
}

function SectionTitle({ heading, muted }: { heading: string; muted?: string }) {
  return (
    <h2 className="section-title">
      {heading}
      {muted && <> <span className="muted">{muted}</span></>}
    </h2>
  )
}

function ShotItem({ shot }: { shot: Shot }) {
  const alt = shot.alt ?? shot.caption ?? ""
  return (
    <figure className={`shot${shot.wide ? " shot-wide" : ""}`}>
      <ZoomableImage src={shot.src} alt={alt} />
      {shot.caption && <figcaption>{shot.caption}</figcaption>}
    </figure>
  )
}

function ShotRows({ rows, startDelay }: { rows: Row[]; startDelay: number }) {
  let idx = 0
  return (
    <>
      {rows.map((row, ri) => (
        <div key={ri} className={`screenshot-grid ${row.layout}`}>
          {row.shots.map((shot) => {
            const delay = startDelay + idx * 80
            idx += 1
            return (
              <Reveal key={shot.src} delay={delay}>
                <ShotItem shot={shot} />
              </Reveal>
            )
          })}
        </div>
      ))}
    </>
  )
}

function CascadeStep({ n, label, detail, last }: { n: number; label: string; detail: string; last: boolean }) {
  return (
    <div className="cascade-step">
      <div className="cascade-num">{String(n).padStart(2, "0")}</div>
      <h4>{label}</h4>
      <p>{detail}</p>
      {!last && <span className="cascade-arrow" aria-hidden>→</span>}
    </div>
  )
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

// ─── Page-scoped CSS ────────────────────────────────────────────

function PageStyles() {
  return (
    <style>{`
      .page-container {
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 0 var(--container-pad);
        position: relative;
      }

      /* ── HERO ── */
      .hero {
        padding: clamp(140px, 18vw, 220px) 0 clamp(80px, 10vw, 140px);
        text-align: center;
      }
      .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink-muted);
        background: var(--paper-warm);
        padding: 8px 18px;
        border-radius: 999px;
        margin-bottom: 36px;
        border: 1px solid var(--paper-edge);
      }
      .hero-title {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 144, "wght" 460;
        font-size: clamp(44px, 7vw, 88px);
        line-height: 1.05;
        letter-spacing: -0.03em;
        color: var(--ink);
        max-width: 18ch;
        margin: 0 auto 28px;
      }
      .hero-title .muted { color: var(--ink-faint); }
      .hero-sub {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 24, "wght" 400;
        font-size: clamp(18px, 2vw, 22px);
        line-height: 1.6;
        color: var(--ink-soft);
        max-width: 640px;
        margin: 0 auto 44px;
      }
      .hero-ctas {
        display: flex;
        gap: 24px;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
      .hero-ctas.centered { justify-content: center; }
      .cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        background: var(--ink);
        color: var(--paper);
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        border-radius: 4px;
        transition: background 0.25s ease, transform 0.25s ease, letter-spacing 0.25s ease;
      }
      .cta-primary:hover {
        background: var(--kodachrome);
        transform: translateY(-1px);
        letter-spacing: 0.26em;
      }
      .cta-secondary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 0;
        color: var(--ink-soft);
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        border-bottom: 1px solid var(--ink-faint);
        transition: all 0.25s ease;
      }
      .cta-secondary:hover {
        color: var(--kodachrome);
        border-bottom-color: var(--kodachrome);
        letter-spacing: 0.26em;
      }
      .hero-shot {
        margin: 64px auto 0;
        max-width: 1100px;
      }
      .hero-shot img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
        border: 1px solid var(--paper-edge);
        box-shadow: 0 30px 60px -30px rgba(28, 22, 18, 0.25);
      }

      /* ── SECTION ── */
      .section {
        padding: clamp(96px, 11vw, 160px) 0;
        position: relative;
        border-top: 1px solid var(--paper-edge);
      }
      .section :global(.reg-mark.tl) { top: 24px; left: var(--container-pad); }
      .section :global(.reg-mark.tr) { top: 24px; right: var(--container-pad); }
      .section-num {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--ink-muted);
        margin-bottom: 24px;
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
        font-variation-settings: "opsz" 96, "wght" 420;
        font-size: clamp(36px, 5.4vw, 64px);
        line-height: 1.08;
        letter-spacing: -0.025em;
        color: var(--ink);
        margin-bottom: 32px;
        max-width: 22ch;
      }
      .section-title.section-title-centered {
        max-width: none;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
      .section-title .muted { color: var(--ink-faint); }
      .section-body {
        font-family: var(--font-display);
        font-size: 19px;
        line-height: 1.65;
        color: var(--ink-soft);
        max-width: 640px;
        margin-bottom: 48px;
      }

      /* ── 01 PROBLEM ── */
      .problem-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-top: 48px;
      }
      .problem-card {
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        border-radius: 12px;
        padding: 32px;
        height: 100%;
        transition: border-color 0.3s, transform 0.3s;
      }
      .problem-card:hover {
        border-color: var(--ink-muted);
        transform: translateY(-2px);
      }
      .problem-num {
        font-family: var(--font-mono);
        font-size: 38px;
        font-weight: 700;
        color: var(--paper-deep);
        -webkit-text-stroke: 1px var(--paper-edge);
        line-height: 1;
        margin-bottom: 20px;
      }
      .problem-h {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 36, "wght" 500;
        font-size: 18px;
        line-height: 1.3;
        color: var(--ink);
        margin-bottom: 12px;
        letter-spacing: -0.005em;
      }
      .problem-p {
        font-family: var(--font-display);
        font-size: 15px;
        line-height: 1.65;
        color: var(--ink-soft);
      }

      /* ── 02 THESIS ── */
      .thesis-points {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
        margin: 32px 0 56px;
      }
      .thesis-point {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        padding: 20px;
        background: var(--paper-warm);
        border-radius: 10px;
        border: 1px solid var(--paper-edge);
      }
      .thesis-dot {
        width: 8px;
        height: 8px;
        min-width: 8px;
        background: var(--saffron);
        border-radius: 50%;
        margin-top: 8px;
      }
      .thesis-point p {
        font-family: var(--font-display);
        font-size: 16px;
        line-height: 1.5;
        color: var(--ink-soft);
      }

      /* ── 02 FLOW DIAGRAM (Connect everything) ── */
      .flow-diagram {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 56px;
        align-items: center;
        margin-top: 8px;
        padding: 40px 36px;
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        border-radius: 16px;
      }
      .flow-column {
        display: flex;
        flex-direction: column;
        gap: 14px;
        position: relative;
      }
      .flow-label {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--ink-muted);
        margin-bottom: 4px;
      }
      .flow-card {
        padding: 14px 18px;
        background: var(--paper);
        border: 1px solid var(--paper-edge);
        border-radius: 8px;
        font-family: var(--font-display);
        font-size: 14.5px;
        line-height: 1.4;
        color: var(--ink-soft);
        position: relative;
      }
      .flow-inputs .flow-card::after,
      .flow-outputs .flow-card::before {
        content: "→";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: var(--saffron);
        font-size: 18px;
        font-family: var(--font-mono);
        line-height: 1;
      }
      .flow-inputs .flow-card::after { right: -40px; }
      .flow-outputs .flow-card::before { left: -40px; }
      .flow-hub {
        background: var(--ink);
        color: var(--paper);
        border-radius: 14px;
        padding: 32px 36px;
        text-align: center;
        min-width: 220px;
      }
      .flow-hub-label {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 48, "wght" 540;
        font-size: 28px;
        color: var(--paper);
        letter-spacing: -0.01em;
        line-height: 1;
      }
      .flow-hub-sub {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--saffron);
        margin-top: 8px;
      }
      .flow-hub-meta {
        font-family: var(--font-display);
        font-size: 13px;
        color: rgba(241, 232, 214, 0.55);
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid rgba(241, 232, 214, 0.12);
      }

      /* ── 03 DOT SYSTEM ── */
      .dots-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin: 32px 0;
      }
      .dot-card {
        padding: 28px;
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        border-radius: 12px;
        height: 100%;
      }
      .dot-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 14px;
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
      }
      .dot-blue { background: #2563EB; box-shadow: 0 0 10px rgba(37, 99, 235, 0.35); }
      .dot-gold { background: #D69821; box-shadow: 0 0 10px rgba(214, 152, 33, 0.35); }
      .dot-green { background: #1F8A3B; box-shadow: 0 0 10px rgba(31, 138, 59, 0.35); }
      .dot-label {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 600;
      }
      .dot-label-blue { color: #2563EB; }
      .dot-label-gold { color: #D69821; }
      .dot-label-green { color: #1F8A3B; }
      .dot-card p {
        font-family: var(--font-display);
        font-size: 15px;
        line-height: 1.6;
        color: var(--ink-soft);
      }
      .dot-closer {
        margin: 32px 0 24px;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 32, "wght" 400;
        font-style: italic;
        font-size: 20px;
        color: var(--ink-muted);
      }

      /* ── 04 CASCADE ── */
      .cascade-wrap { margin-top: 48px; }
      .cascade-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
        position: relative;
      }
      .cascade-row + .cascade-row { margin-top: -1px; }
      .cascade-step {
        padding: 22px;
        border: 1px solid var(--paper-edge);
        border-right: none;
        position: relative;
        background: var(--paper);
        height: 100%;
      }
      .cascade-row .cascade-step:last-child { border-right: 1px solid var(--paper-edge); }
      .cascade-row:first-child .cascade-step:first-child { border-top-left-radius: 12px; }
      .cascade-row:first-child .cascade-step:last-child { border-top-right-radius: 12px; }
      .cascade-row:last-child .cascade-step:first-child { border-bottom-left-radius: 12px; }
      .cascade-row:last-child .cascade-step:last-child { border-bottom-right-radius: 12px; }
      .cascade-num {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.2em;
        color: var(--saffron);
        margin-bottom: 8px;
      }
      .cascade-step h4 {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 24, "wght" 500;
        font-size: 16px;
        margin-bottom: 6px;
        color: var(--ink);
        letter-spacing: -0.005em;
      }
      .cascade-step p {
        font-family: var(--font-display);
        font-size: 13px;
        line-height: 1.5;
        color: var(--ink-muted);
      }
      .cascade-arrow {
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--saffron);
        font-size: 13px;
        background: var(--paper);
        padding: 2px;
        z-index: 2;
      }
      .cascade-stat {
        text-align: center;
        margin-top: 40px;
        padding: 28px;
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        border-radius: 12px;
      }
      .cascade-stat-num {
        font-family: var(--font-mono);
        font-size: clamp(32px, 5vw, 44px);
        font-weight: 700;
        color: var(--saffron);
        line-height: 1.1;
      }
      .cascade-stat-label {
        font-family: var(--font-display);
        font-size: 15px;
        color: var(--ink-soft);
        margin-top: 4px;
      }

      /* ── SCREENSHOT GRIDS ── */
      .screenshot-grid {
        display: grid;
        gap: 20px;
        margin-top: 24px;
      }
      .screenshot-grid + .screenshot-grid { margin-top: 20px; }
      .screenshot-grid.two-col { grid-template-columns: repeat(2, 1fr); }
      .screenshot-grid.three-col { grid-template-columns: repeat(3, 1fr); }
      .screenshot-grid.featured { grid-template-columns: 1fr 1fr; }
      .screenshot-grid.one-col { grid-template-columns: 1fr; max-width: 960px; margin-left: auto; margin-right: auto; }

      .shot {
        margin: 0;
      }
      .shot img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
        border: 1px solid var(--paper-edge);
        box-shadow: 0 4px 24px rgba(28, 22, 18, 0.08);
      }
      .shot-wide img {
        max-width: 100%;
      }
      .shot figcaption {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--ink-muted);
        margin-top: 12px;
      }

      /* ── ZOOMABLE IMAGE (click to expand → fullscreen <dialog>) ── */
      .zoom-trigger {
        display: block;
        width: 100%;
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        cursor: zoom-in;
        border-radius: 12px;
        transition: transform 0.25s ease, box-shadow 0.25s ease;
      }
      .zoom-trigger:hover {
        transform: translateY(-2px);
      }
      .zoom-trigger:focus-visible {
        outline: 2px solid var(--saffron);
        outline-offset: 3px;
      }
      .hero-shot .zoom-trigger:hover { transform: none; }

      .zoom-dialog {
        border: none;
        padding: 0;
        background: transparent;
        max-width: min(96vw, 1800px);
        max-height: 96vh;
        width: auto;
        height: auto;
        margin: auto;
        overflow: visible;
        color: var(--paper);
      }
      .zoom-dialog::backdrop {
        background: rgba(20, 16, 12, 0.88);
        backdrop-filter: blur(6px);
      }
      .zoom-dialog img {
        display: block;
        max-width: 100%;
        max-height: 96vh;
        width: auto;
        height: auto;
        border: none;
        border-radius: 8px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
        cursor: zoom-out;
      }
      .zoom-dialog-close {
        position: absolute;
        top: -44px;
        right: 0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid rgba(241, 232, 214, 0.35);
        background: rgba(241, 232, 214, 0.08);
        color: var(--paper);
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-family: var(--font-mono);
        transition: background 0.2s, border-color 0.2s;
      }
      .zoom-dialog-close:hover {
        background: rgba(241, 232, 214, 0.18);
        border-color: rgba(241, 232, 214, 0.55);
      }
      .zoom-dialog-close:focus-visible {
        outline: 2px solid var(--saffron);
        outline-offset: 2px;
      }

      /* ── 08 DEPARTMENTS ── */
      .dept-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 18px;
        margin-top: 24px;
      }
      .dept-card {
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        border-radius: 12px;
        padding: 28px;
        transition: border-color 0.3s, transform 0.3s;
      }
      .dept-card:hover {
        border-color: var(--saffron);
        transform: translateY(-2px);
      }
      .dept-role {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--saffron);
        margin-bottom: 18px;
      }
      .dept-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .dept-card li {
        font-family: var(--font-display);
        font-size: 14.5px;
        line-height: 1.55;
        color: var(--ink-soft);
        padding-left: 14px;
        position: relative;
      }
      .dept-card li::before {
        content: "";
        position: absolute;
        left: 0;
        top: 9px;
        width: 5px;
        height: 5px;
        background: var(--paper-edge);
        border-radius: 50%;
      }

      /* ── 09 COMPLIANCE ── */
      .union-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 0 0 32px;
      }
      .union-tag {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        padding: 8px 14px;
        border: 1px solid var(--paper-edge);
        border-radius: 6px;
        color: var(--ink-soft);
        background: var(--paper-warm);
      }
      .union-tag.active {
        border-color: var(--saffron);
        color: var(--saffron);
        background: rgba(184, 134, 44, 0.1);
      }
      .compliance-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .compliance-list li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        font-family: var(--font-display);
        font-size: 16px;
        line-height: 1.6;
        color: var(--ink-soft);
      }
      .compliance-list .check {
        color: var(--sage);
        font-weight: 700;
        min-width: 18px;
        margin-top: 2px;
      }
      .deferral-note {
        margin-top: 32px;
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.04em;
        color: var(--ink-muted);
        line-height: 1.6;
        max-width: 80ch;
      }

      /* ── 10 VAULT ── */
      .vault-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 14px;
        margin: 32px 0;
      }
      .vault-feature {
        padding: 20px;
        background: var(--paper-warm);
        border-radius: 10px;
        border: 1px solid var(--paper-edge);
      }
      .vault-feature h4 {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 24, "wght" 500;
        font-size: 15px;
        margin-bottom: 6px;
        color: var(--ink);
        letter-spacing: -0.005em;
      }
      .vault-feature p {
        font-family: var(--font-display);
        font-size: 13.5px;
        line-height: 1.55;
        color: var(--ink-muted);
      }
      .tier-note {
        margin-top: 24px;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--saffron);
      }

      /* ── 11 OPS ── */
      .ops-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        margin: 24px 0 40px;
      }
      .ops-item {
        padding: 28px 22px;
        text-align: center;
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        border-radius: 12px;
      }
      .ops-item h4 {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 24, "wght" 500;
        font-size: 15px;
        margin-bottom: 6px;
        color: var(--ink);
        letter-spacing: -0.005em;
      }
      .ops-item p {
        font-family: var(--font-display);
        font-size: 13.5px;
        line-height: 1.55;
        color: var(--ink-muted);
      }

      /* ── 12 WHY ── */
      .why-split {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 56px;
        align-items: center;
        margin-top: 24px;
      }
      .why-text p {
        font-family: var(--font-display);
        font-size: 17px;
        line-height: 1.7;
        color: var(--ink-soft);
        margin-bottom: 18px;
      }
      .why-shot img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
        border: 1px solid var(--paper-edge);
        box-shadow: 0 20px 50px -25px rgba(28, 22, 18, 0.22);
      }
      .link-arrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--ink);
        border-bottom: 1px solid var(--ink-faint);
        padding-bottom: 4px;
        margin-top: 8px;
        transition: all 0.25s ease;
      }
      .link-arrow:hover {
        color: var(--kodachrome);
        border-bottom-color: var(--kodachrome);
        letter-spacing: 0.26em;
      }
      .link-arrow .arrow { transition: transform 0.3s ease; }
      .link-arrow:hover .arrow { transform: translateX(3px); }

      /* ── 13 PRICING ── */
      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
        margin-top: 32px;
      }
      .pricing-card {
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
        border-radius: 16px;
        padding: 36px;
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .pricing-card.featured {
        border-color: var(--saffron);
        background: linear-gradient(to bottom, rgba(184, 134, 44, 0.08), var(--paper-warm));
      }
      .tier-badge {
        position: absolute;
        top: 24px;
        right: 24px;
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--saffron);
        background: rgba(184, 134, 44, 0.12);
        padding: 6px 12px;
        border-radius: 4px;
      }
      .tier-name {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 48, "wght" 540;
        font-size: 28px;
        color: var(--ink);
        margin-bottom: 6px;
        letter-spacing: -0.01em;
      }
      .tier-desc {
        font-family: var(--font-display);
        font-size: 14.5px;
        line-height: 1.5;
        color: var(--ink-soft);
        margin-bottom: 24px;
        max-width: 32ch;
      }
      .tier-price {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 48, "wght" 580;
        font-size: 36px;
        color: var(--ink);
        line-height: 1;
      }
      .tier-price span {
        font-family: var(--font-display);
        font-size: 14px;
        font-weight: 400;
        color: var(--ink-muted);
        letter-spacing: 0;
      }
      .tier-annual {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.1em;
        color: var(--ink-muted);
        margin-top: 6px;
        margin-bottom: 24px;
      }
      .tier-bullets {
        list-style: none;
        padding: 0;
        margin: 0 0 28px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex-grow: 1;
      }
      .tier-bullets li {
        font-family: var(--font-display);
        font-size: 14.5px;
        line-height: 1.55;
        color: var(--ink-soft);
        padding-left: 20px;
        position: relative;
      }
      .tier-bullets li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--sage);
        font-weight: 700;
        font-size: 12px;
      }
      .tier-cta {
        justify-content: center;
        width: 100%;
      }
      .pricing-note {
        text-align: center;
        margin: 32px auto 0;
        font-family: var(--font-display);
        font-size: 14.5px;
        color: var(--ink-muted);
        line-height: 1.6;
        max-width: 640px;
      }

      /* ── 14 FAQ ── */
      .faq-list {
        max-width: 820px;
        margin: 32px auto 0;
        border-top: 1px solid var(--paper-edge);
      }
      .faq-item {
        border-bottom: 1px solid var(--paper-edge);
      }
      .faq-q {
        cursor: pointer;
        list-style: none;
        padding: 22px 32px 22px 0;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 24, "wght" 460;
        font-size: 17px;
        color: var(--ink);
        position: relative;
        transition: color 0.2s;
      }
      .faq-q::-webkit-details-marker { display: none; }
      .faq-q::after {
        content: "+";
        position: absolute;
        right: 0;
        top: 20px;
        font-family: var(--font-mono);
        color: var(--ink-muted);
        font-size: 22px;
        font-weight: 300;
        transition: transform 0.25s ease;
      }
      .faq-item[open] .faq-q::after { content: "−"; }
      .faq-q:hover { color: var(--saffron); }
      .faq-a {
        padding: 0 32px 22px 0;
        font-family: var(--font-display);
        font-size: 15.5px;
        line-height: 1.7;
        color: var(--ink-soft);
        max-width: 72ch;
      }

      /* ── FINAL CTA ── */
      .section-cta { background: linear-gradient(to bottom, var(--paper), var(--paper-warm), var(--paper)); text-align: center; }
      .cta-heading {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 96, "wght" 420;
        font-size: clamp(34px, 5vw, 58px);
        line-height: 1.08;
        color: var(--ink);
        margin: 0 auto 20px;
        max-width: 22ch;
        letter-spacing: -0.025em;
      }
      .cta-heading .muted { color: var(--ink-faint); }
      .cta-body {
        font-family: var(--font-display);
        font-size: 17px;
        line-height: 1.6;
        color: var(--ink-soft);
        max-width: 560px;
        margin: 0 auto 32px;
      }

      /* ── RESPONSIVE ── */
      @media (max-width: 1024px) {
        .why-split { gap: 32px; }
      }
      @media (max-width: 900px) {
        .page-container { padding: 0 var(--container-pad-mobile); }
        .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
        .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }

        .problem-grid { grid-template-columns: 1fr; }
        .thesis-points { grid-template-columns: 1fr; }
        .dots-grid { grid-template-columns: 1fr; }
        .cascade-row { grid-template-columns: repeat(2, 1fr); }
        .cascade-row .cascade-step:nth-child(2) { border-right: 1px solid var(--paper-edge); }
        .cascade-row .cascade-step:nth-child(2) .cascade-arrow,
        .cascade-row .cascade-step:nth-child(4) .cascade-arrow { display: none; }
        .cascade-row:first-child .cascade-step:nth-child(2) { border-top-right-radius: 12px; }
        .cascade-row:first-child .cascade-step:nth-child(3) { border-radius: 0; }
        .cascade-row:last-child .cascade-step:nth-child(2) { border-bottom-right-radius: 12px; }
        .cascade-row:last-child .cascade-step:nth-child(3) { border-bottom-left-radius: 12px; border-bottom-right-radius: 0; }

        .screenshot-grid.two-col,
        .screenshot-grid.three-col,
        .screenshot-grid.featured { grid-template-columns: 1fr; }
        .pricing-grid { grid-template-columns: 1fr; }
        .why-split { grid-template-columns: 1fr; gap: 40px; }

        .flow-diagram { grid-template-columns: 1fr; gap: 20px; padding: 28px 22px; }
        .flow-inputs .flow-card::after,
        .flow-outputs .flow-card::before { content: none; }
        .flow-hub { min-width: 0; padding: 24px; }
      }
      @media (max-width: 600px) {
        .cascade-row { grid-template-columns: 1fr; }
        .cascade-step { border-right: 1px solid var(--paper-edge) !important; }
        .cascade-arrow { display: none; }
        .cascade-row:first-child .cascade-step:first-child { border-radius: 12px 12px 0 0; }
        .cascade-row:first-child .cascade-step:not(:first-child) { border-radius: 0; }
        .cascade-row:last-child .cascade-step:last-child { border-radius: 0 0 12px 12px; }
        .cascade-row:last-child .cascade-step:not(:last-child) { border-radius: 0; }
        .hero-ctas { flex-direction: column; }
      }
    `}</style>
  )
}
