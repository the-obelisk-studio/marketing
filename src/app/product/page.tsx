// /product — long-form conversion page. Distinct from /grace
// (lightweight overview) and /grace/guide (post-purchase docs).
// Content: content/product.yml. Schema: src/lib/schema.ts →
// ProductPageSchema. CTA goes to the existing /contact form with a
// topic prefilled to Grace.

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { Inline, Body } from "@/lib/rich-text"
import { loadContent } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Grace — Production OS for working filmmakers",
  description:
    "Grace runs your script, schedule, budget, call sheets, and on-set comms from one source of truth. Built by working filmmakers, in Burbank.",
  path: "/product",
})

export default function ProductPage() {
  const c = loadContent("product.yml")

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-container">
          {c.hero.eyebrow && (
            <Reveal eager delay={100}>
              <div className="hero-eyebrow">{c.hero.eyebrow}</div>
            </Reveal>
          )}
          <Reveal eager delay={250}>
            <h1 className="hero-title"><Inline>{c.hero.title}</Inline></h1>
          </Reveal>
          <Reveal eager delay={450}>
            <p className="hero-sub"><Inline>{c.hero.sub}</Inline></p>
          </Reveal>
          <Reveal eager delay={650}>
            <div className="hero-ctas">
              <Link href={c.hero.primaryCta.href} className="cta-primary">
                {c.hero.primaryCta.label} →
              </Link>
              {c.hero.secondaryCta && (
                <Link href={c.hero.secondaryCta.href} className="cta-secondary">
                  {c.hero.secondaryCta.label} ↓
                </Link>
              )}
            </div>
          </Reveal>
        </div>
        <div className="hero-scroll">scroll ↓</div>
      </section>

      {/* ── 01 · PAIN CARDS ──────────────────────────────────────── */}
      <section className="section" id="pain">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.painCards.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.painCards.heading}</Inline></h2>
          </Reveal>
          <div className="pain-grid">
            {c.painCards.cards.map((card, i) => (
              <Reveal key={i} delay={200 + i * 140}>
                <article className="pain-card">
                  <div className="pain-num">0{i + 1}</div>
                  <p className="pain-scenario"><Inline>{card.scenario}</Inline></p>
                  <p className="pain-response">{card.response}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 · DOT SYSTEM ──────────────────────────────────────── */}
      <section className="section" id="dot-system">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.dotSystem.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.dotSystem.heading}</Inline></h2>
          </Reveal>
          {c.dotSystem.body && (
            <Reveal delay={200}>
              <div className="section-body"><Body>{c.dotSystem.body}</Body></div>
            </Reveal>
          )}
          <div className="dots-ladder">
            {c.dotSystem.dots.map((dot, i) => (
              <Reveal key={dot.color} delay={280 + i * 140}>
                <div className={`dot-row dot-${dot.color}`}>
                  <span className="dot-glyph" aria-hidden />
                  <div className="dot-text">
                    <div className="dot-label">{dot.label}</div>
                    <div className="dot-detail">{dot.detail}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {c.dotSystem.closingLine && (
            <Reveal delay={700}>
              <p className="dot-closer">{c.dotSystem.closingLine}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 03 · WORKFLOW CASCADE ────────────────────────────────── */}
      <section className="section" id="workflow">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.workflow.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.workflow.heading}</Inline></h2>
          </Reveal>
          {c.workflow.body && (
            <Reveal delay={200}>
              <div className="section-body"><Body>{c.workflow.body}</Body></div>
            </Reveal>
          )}

          <Reveal delay={280}>
            <WorkflowDiagram steps={c.workflow.steps} />
          </Reveal>

          <div className="workflow-list">
            {c.workflow.steps.map((step, i) => (
              <Reveal key={step.label} delay={400 + i * 70}>
                <div className="workflow-list-row">
                  <span className="workflow-list-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="workflow-list-label">{step.label}</div>
                    {step.detail && <div className="workflow-list-detail">{step.detail}</div>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {c.workflow.timeToValue && (
            <Reveal delay={1100}>
              <p className="workflow-ttv">{c.workflow.timeToValue}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 04 · ROLES ───────────────────────────────────────────── */}
      <section className="section" id="roles">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.roles.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.roles.heading}</Inline></h2>
          </Reveal>
          {c.roles.body && (
            <Reveal delay={200}>
              <div className="section-body"><Body>{c.roles.body}</Body></div>
            </Reveal>
          )}
          <div className="roles-grid">
            {c.roles.tiles.map((tile, i) => (
              <Reveal key={tile.role} delay={280 + i * 80}>
                <article className="role-tile">
                  <div className="role-name">{tile.role}</div>
                  <ul className="role-gives">
                    {tile.gives.map((g, j) => (
                      <li key={j}>{g}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 · COMPLIANCE ──────────────────────────────────────── */}
      <section className="section" id="compliance">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.compliance.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.compliance.heading}</Inline></h2>
          </Reveal>
          {c.compliance.body && (
            <Reveal delay={200}>
              <div className="section-body"><Body>{c.compliance.body}</Body></div>
            </Reveal>
          )}
          <Reveal delay={280}>
            <div className="profile-pills">
              {c.compliance.profiles.map((p) => (
                <span key={p} className="profile-pill">{p}</span>
              ))}
            </div>
          </Reveal>
          <ul className="compliance-features">
            {c.compliance.features.map((f, i) => (
              <Reveal key={i} delay={400 + i * 80}>
                <li>{f}</li>
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

      {/* ── 06 · VAULT ───────────────────────────────────────────── */}
      <section className="section" id="vault">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.vault.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.vault.heading}</Inline></h2>
          </Reveal>
          {c.vault.body && (
            <Reveal delay={200}>
              <div className="section-body"><Body>{c.vault.body}</Body></div>
            </Reveal>
          )}
          <div className="vault-grid">
            <Reveal delay={280}>
              <ul className="vault-features">
                {c.vault.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={400}>
              <VaultIllustration />
            </Reveal>
          </div>
          {c.vault.tierNote && (
            <Reveal delay={600}>
              <p className="tier-note">{c.vault.tierNote}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 07 · WHY BUILT ───────────────────────────────────────── */}
      <section className="section" id="why-built">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.whyBuilt.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.whyBuilt.heading}</Inline></h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="section-body"><Body>{c.whyBuilt.body}</Body></div>
          </Reveal>
          {c.whyBuilt.link && (
            <Reveal delay={320}>
              <Link href={c.whyBuilt.link.href} className="link-arrow">
                {c.whyBuilt.link.label} <span className="arrow">→</span>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 08 · PRICING SNAPSHOT ────────────────────────────────── */}
      <section className="section" id="pricing">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.pricing.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.pricing.heading}</Inline></h2>
          </Reveal>
          {c.pricing.body && (
            <Reveal delay={200}>
              <div className="section-body"><Body>{c.pricing.body}</Body></div>
            </Reveal>
          )}
          <div className="pricing-grid">
            {c.pricing.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={280 + i * 140}>
                <article className="pricing-tier">
                  <div className="tier-name">{tier.name}</div>
                  {tier.tagline && <div className="tier-tagline">{tier.tagline}</div>}
                  <div className="tier-price">{tier.price}</div>
                  <ul className="tier-bullets">
                    {tier.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          {c.pricing.addonNote && (
            <Reveal delay={600}>
              <p className="pricing-note">{c.pricing.addonNote}</p>
            </Reveal>
          )}
          {c.pricing.betaNote && (
            <Reveal delay={700}>
              <p className="beta-note">{c.pricing.betaNote}</p>
            </Reveal>
          )}
          {c.pricing.fullPricingLink && (
            <Reveal delay={800}>
              <Link href={c.pricing.fullPricingLink.href} className="link-arrow">
                {c.pricing.fullPricingLink.label} <span className="arrow">→</span>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── 09 · FAQ ─────────────────────────────────────────────── */}
      <section className="section" id="faq">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionHead kicker={c.faq.kicker} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title"><Inline>{c.faq.heading}</Inline></h2>
          </Reveal>
          <div className="faq-list">
            {c.faq.items.map((item, i) => (
              <Reveal key={i} delay={200 + i * 80}>
                <details className="faq-item">
                  <summary className="faq-q">{item.q}</summary>
                  <div className="faq-a">{item.a}</div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 · FINAL CTA ───────────────────────────────────────── */}
      <section className="section section-cta">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <h2 className="cta-heading"><Inline>{c.finalCta.heading}</Inline></h2>
          </Reveal>
          {c.finalCta.body && (
            <Reveal delay={140}>
              <p className="cta-body">{c.finalCta.body}</p>
            </Reveal>
          )}
          <Reveal delay={280}>
            <div className="hero-ctas">
              <Link href={c.finalCta.primary.href} className="cta-primary">
                {c.finalCta.primary.label} →
              </Link>
              {c.finalCta.secondary && (
                <Link href={c.finalCta.secondary.href} className="cta-secondary">
                  {c.finalCta.secondary.label} →
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <PageStyles />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────────
// Sub-components (kept local — single-page use, not worth lifting)
// ─────────────────────────────────────────────────────────────────

function SectionHead({ kicker }: { kicker: string }) {
  const parts = kicker.split("·").map(s => s.trim())
  return (
    <div className="section-num">
      <span>{parts[0]}</span>
      <span className="dash" />
      <span>{parts.slice(1).join(" · ")}</span>
    </div>
  )
}

// Hand-coded SVG cascade — paper aesthetic, low ink density, no
// external assets. Renders horizontally on desktop, falls back to a
// stacked vertical strip on mobile (CSS handled).
function WorkflowDiagram({ steps }: { steps: { label: string; detail?: string }[] }) {
  const W = 1100
  const H = 140
  const margin = 40
  const slotWidth = (W - margin * 2) / steps.length

  return (
    <div className="workflow-diagram-wrap" aria-hidden>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="workflow-diagram"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Workflow cascade: script through editor"
      >
        {/* Horizontal track */}
        <line
          x1={margin + slotWidth / 2}
          y1={H / 2}
          x2={W - margin - slotWidth / 2}
          y2={H / 2}
          stroke="var(--ink-faint)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {steps.map((step, i) => {
          const cx = margin + slotWidth * i + slotWidth / 2
          return (
            <g key={step.label}>
              {/* Node circle */}
              <circle
                cx={cx}
                cy={H / 2}
                r="14"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="1.2"
              />
              <circle
                cx={cx}
                cy={H / 2}
                r="4"
                fill="var(--kodachrome)"
              />
              {/* Index label above */}
              <text
                x={cx}
                y={H / 2 - 30}
                textAnchor="middle"
                fontFamily="DM Mono, Courier New, monospace"
                fontSize="10"
                fill="var(--ink-muted)"
                letterSpacing="2"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
              {/* Step label below */}
              <text
                x={cx}
                y={H / 2 + 40}
                textAnchor="middle"
                fontFamily="Fraunces, serif"
                fontSize="14"
                fontWeight="500"
                fill="var(--ink)"
              >
                {step.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Hand-coded illustration for the Vault section — stands in for a
// product screenshot without the "generic SaaS screenshot" feel. Shows
// the conceptual core: a watermarked screener frame (corner badge +
// diagonal sweep) with a magic-link envelope feeding into a 6-digit
// code field. Pure SVG, paper/ink palette, no external assets.
function VaultIllustration() {
  return (
    <div className="vault-illustration-wrap" aria-hidden>
      <svg
        viewBox="0 0 520 340"
        xmlns="http://www.w3.org/2000/svg"
        className="vault-illustration"
        role="img"
        aria-label="The Vault — magic-link delivery with forensic watermarking"
      >
        {/* Envelope (magic link) */}
        <g transform="translate(30, 140)">
          <rect width="80" height="56" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="1.2" />
          <path
            d="M 0 0 L 40 32 L 80 0"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />
          <text x="40" y="78" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="var(--ink-muted)" letterSpacing="2">
            MAGIC LINK
          </text>
        </g>

        {/* Dashed connector → code */}
        <line
          x1="115"
          y1="168"
          x2="170"
          y2="168"
          stroke="var(--ink-faint)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* 6-digit code box */}
        <g transform="translate(175, 150)">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={i * 18} y={0} width="14" height="36" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1" />
              <text x={i * 18 + 7} y={24} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="14" fill="var(--ink)" fontWeight="600">
                {"482917"[i]}
              </text>
            </g>
          ))}
          <text x="54" y="58" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="var(--ink-muted)" letterSpacing="2">
            6-DIGIT CODE
          </text>
        </g>

        {/* Dashed connector → frame */}
        <line
          x1="295"
          y1="168"
          x2="335"
          y2="168"
          stroke="var(--ink-faint)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Watermarked screener frame */}
        <g transform="translate(335, 80)">
          {/* Frame */}
          <rect width="160" height="120" fill="var(--ink)" stroke="var(--ink)" strokeWidth="1.5" />

          {/* Play triangle */}
          <path d="M 70 48 L 70 72 L 92 60 Z" fill="var(--paper)" opacity="0.85" />

          {/* Diagonal wandering watermark */}
          <text
            x="80"
            y="60"
            textAnchor="middle"
            fontFamily="DM Mono, monospace"
            fontSize="10"
            fill="var(--paper)"
            opacity="0.18"
            transform="rotate(-18 80 60)"
            letterSpacing="2"
          >
            VAULT · a3f9c2 · UTC
          </text>

          {/* Corner watermark badge */}
          <rect x="2" y="106" width="80" height="12" fill="var(--ink)" stroke="var(--paper)" strokeWidth="0.5" opacity="0.95" />
          <text
            x="6"
            y="115"
            fontFamily="DM Mono, monospace"
            fontSize="7"
            fill="var(--paper)"
            letterSpacing="1"
          >
            jane@studio · a3f9c2
          </text>

          {/* Frame label below */}
          <text x="80" y="142" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="9" fill="var(--ink-muted)" letterSpacing="2">
            WATERMARKED · DEVICE-LOCKED
          </text>
        </g>

        {/* Forensic-log tick marks (decorative — event log) */}
        <g transform="translate(335, 240)" opacity="0.5">
          <text x="0" y="0" fontFamily="DM Mono, monospace" fontSize="8" fill="var(--ink-muted)" letterSpacing="1">EVENTS</text>
          <text x="0" y="14" fontFamily="DM Mono, monospace" fontSize="8" fill="var(--ink-soft)">→ 19:14  code requested</text>
          <text x="0" y="28" fontFamily="DM Mono, monospace" fontSize="8" fill="var(--ink-soft)">→ 19:15  play started</text>
          <text x="0" y="42" fontFamily="DM Mono, monospace" fontSize="8" fill="var(--kodachrome)">→ 19:22  2nd device blocked</text>
        </g>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// Inline scoped CSS (matches the per-page pattern used on /grace,
// /partnership, /post). Keeps the page self-contained.
// ─────────────────────────────────────────────────────────────────

function PageStyles() {
  return (
    <style>{`
      .hero-container,
      .page-container {
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 0 var(--container-pad);
        position: relative;
      }

      /* ── HERO ── */
      .hero {
        min-height: 86vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 160px 0 100px;
        position: relative;
      }
      .hero-eyebrow {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--ink-muted);
        margin-bottom: 48px;
      }
      .hero-title {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 144, "wght" 440;
        font-size: clamp(48px, 8vw, 112px);
        line-height: 1.02;
        letter-spacing: -0.025em;
        color: var(--ink);
        margin-bottom: 40px;
        max-width: 18ch;
      }
      .hero-title em {
        font-style: italic;
        font-variation-settings: "opsz" 144, "wght" 440;
      }
      .hero-sub {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 24, "wght" 400;
        font-size: clamp(20px, 2.4vw, 28px);
        line-height: 1.5;
        color: var(--ink-soft);
        max-width: 760px;
        margin-bottom: 56px;
      }
      .hero-sub em {
        font-style: italic;
        font-variation-settings: "opsz" 24, "wght" 400;
      }
      .hero-ctas {
        display: flex;
        gap: 32px;
        flex-wrap: wrap;
        align-items: center;
      }
      .cta-primary {
        display: inline-block;
        padding: 16px 28px;
        background: var(--ink);
        color: var(--paper);
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        transition: background 0.25s ease, transform 0.25s ease;
      }
      .cta-primary:hover {
        background: var(--kodachrome);
        transform: translateY(-1px);
      }
      .cta-secondary {
        display: inline-block;
        padding: 16px 0;
        color: var(--ink);
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        border-bottom: 1px solid var(--ink-faint);
        padding-bottom: 6px;
        transition: all 0.25s ease;
      }
      .cta-secondary:hover {
        color: var(--kodachrome);
        border-bottom-color: var(--kodachrome);
        letter-spacing: 0.28em;
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
        padding: 140px 0;
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
        margin-bottom: 48px;
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
        font-size: clamp(40px, 6vw, 84px);
        line-height: 1.04;
        letter-spacing: -0.02em;
        color: var(--ink);
        margin-bottom: 48px;
        max-width: 20ch;
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
        max-width: 680px;
        margin-bottom: 56px;
      }
      .section-body p + p { margin-top: 1.2em; }
      .section-body em {
        font-style: italic;
        font-variation-settings: "opsz" 18, "wght" 400;
      }

      /* ── PAIN CARDS ── */
      .pain-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 48px;
        margin-top: 24px;
      }
      .pain-card {
        padding: 32px 0 0;
        border-top: 1px solid var(--ink);
      }
      .pain-num {
        font-family: var(--font-mono);
        font-size: 10px;
        letter-spacing: 0.28em;
        color: var(--kodachrome);
        margin-bottom: 24px;
      }
      .pain-scenario {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 36, "wght" 440;
        font-size: 26px;
        line-height: 1.25;
        color: var(--ink);
        margin-bottom: 24px;
        letter-spacing: -0.005em;
      }
      .pain-scenario em {
        font-style: italic;
        font-variation-settings: "opsz" 36, "wght" 440;
      }
      .pain-response {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 16, "wght" 400;
        font-size: 16px;
        line-height: 1.65;
        color: var(--ink-soft);
      }

      /* ── DOT SYSTEM ── */
      .dots-ladder {
        display: grid;
        gap: 24px;
        margin-top: 16px;
        max-width: 720px;
      }
      .dot-row {
        display: grid;
        grid-template-columns: 36px 1fr;
        gap: 24px;
        align-items: start;
        padding: 24px 0;
        border-top: 1px solid var(--paper-edge);
      }
      .dot-row:first-child {
        border-top-color: var(--ink);
      }
      .dot-glyph {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-top: 6px;
        display: inline-block;
      }
      .dot-blue .dot-glyph { background: #3B82F6; }
      .dot-gold .dot-glyph { background: #b8862c; }
      .dot-green .dot-glyph { background: #4a5d4a; }
      .dot-label {
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink);
        margin-bottom: 8px;
      }
      .dot-detail {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 16, "wght" 400;
        font-size: 16px;
        line-height: 1.6;
        color: var(--ink-soft);
      }
      .dot-closer {
        margin-top: 48px;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 32, "wght" 400;
        font-style: italic;
        font-size: 22px;
        color: var(--ink);
        max-width: 32ch;
      }

      /* ── WORKFLOW ── */
      .workflow-diagram-wrap {
        margin: 8px 0 56px;
        padding: 32px 0;
        border-top: 1px solid var(--paper-edge);
        border-bottom: 1px solid var(--paper-edge);
        overflow-x: auto;
      }
      .workflow-diagram {
        width: 100%;
        min-width: 720px;
        height: auto;
        display: block;
      }
      .workflow-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px 48px;
        max-width: 920px;
      }
      .workflow-list-row {
        display: grid;
        grid-template-columns: 48px 1fr;
        gap: 16px;
        align-items: start;
      }
      .workflow-list-num {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.2em;
        color: var(--kodachrome);
        padding-top: 4px;
      }
      .workflow-list-label {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 32, "wght" 480;
        font-size: 22px;
        color: var(--ink);
        margin-bottom: 6px;
        letter-spacing: -0.005em;
      }
      .workflow-list-detail {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 14, "wght" 400;
        font-size: 14px;
        line-height: 1.55;
        color: var(--ink-soft);
      }
      .workflow-ttv {
        margin-top: 56px;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 28, "wght" 400;
        font-style: italic;
        font-size: 20px;
        color: var(--ink);
        max-width: 50ch;
      }

      /* ── ROLES ── */
      .roles-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
        margin-top: 24px;
      }
      .role-tile {
        padding: 28px 0 0;
        border-top: 1px solid var(--ink);
      }
      .role-name {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 48, "wght" 480;
        font-size: 28px;
        color: var(--ink);
        margin-bottom: 20px;
        letter-spacing: -0.01em;
      }
      .role-gives {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .role-gives li {
        position: relative;
        padding: 8px 0 8px 20px;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 14, "wght" 400;
        font-size: 14.5px;
        line-height: 1.5;
        color: var(--ink-soft);
        border-bottom: 1px solid var(--paper-edge);
      }
      .role-gives li:last-child { border-bottom: none; }
      .role-gives li::before {
        content: "·";
        position: absolute;
        left: 6px;
        top: 8px;
        color: var(--kodachrome);
        font-weight: 700;
      }

      /* ── COMPLIANCE ── */
      .profile-pills {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 0 0 40px;
      }
      .profile-pill {
        display: inline-block;
        padding: 6px 14px;
        border: 1px solid var(--ink-faint);
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--ink);
        background: var(--paper-warm);
      }
      .compliance-features {
        list-style: none;
        padding: 0;
        margin: 0;
        max-width: 760px;
      }
      .compliance-features li {
        position: relative;
        padding: 18px 0 18px 24px;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 16, "wght" 400;
        font-size: 16.5px;
        line-height: 1.55;
        color: var(--ink-soft);
        border-bottom: 1px solid var(--paper-edge);
      }
      .compliance-features li::before {
        content: "✓";
        position: absolute;
        left: 0;
        top: 18px;
        color: var(--sage);
        font-weight: 700;
      }
      .deferral-note {
        margin-top: 32px;
        font-family: var(--font-mono);
        font-size: 12px;
        letter-spacing: 0.05em;
        color: var(--ink-muted);
        max-width: 80ch;
        line-height: 1.6;
      }

      /* ── VAULT ── */
      .vault-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: center;
        margin-top: 24px;
      }
      .vault-illustration-wrap {
        padding: 24px;
        background: var(--paper-warm);
        border: 1px solid var(--paper-edge);
      }
      .vault-illustration {
        width: 100%;
        height: auto;
        display: block;
      }
      .vault-features {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .vault-features li {
        position: relative;
        padding: 14px 0 14px 22px;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 16, "wght" 400;
        font-size: 16px;
        line-height: 1.55;
        color: var(--ink-soft);
        border-bottom: 1px solid var(--paper-edge);
      }
      .vault-features li::before {
        content: "·";
        position: absolute;
        left: 4px;
        top: 14px;
        color: var(--kodachrome);
        font-weight: 700;
      }
      .tier-note {
        margin-top: 32px;
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        color: var(--kodachrome);
        text-transform: uppercase;
      }

      /* ── PRICING ── */
      .pricing-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        margin-top: 24px;
      }
      .pricing-tier {
        padding: 32px;
        border: 1px solid var(--ink-faint);
        background: var(--paper-warm);
      }
      .pricing-tier:last-child {
        border-color: var(--ink);
        background: var(--paper-deep);
      }
      .tier-name {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 48, "wght" 480;
        font-size: 32px;
        color: var(--ink);
        letter-spacing: -0.01em;
        margin-bottom: 8px;
      }
      .tier-tagline {
        font-family: var(--font-display);
        font-style: italic;
        font-size: 15px;
        color: var(--ink-soft);
        margin-bottom: 20px;
        max-width: 32ch;
      }
      .tier-price {
        font-family: var(--font-mono);
        font-size: 14px;
        letter-spacing: 0.04em;
        color: var(--ink);
        padding: 12px 0;
        border-top: 1px solid var(--paper-edge);
        border-bottom: 1px solid var(--paper-edge);
        margin-bottom: 24px;
      }
      .tier-bullets {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .tier-bullets li {
        position: relative;
        padding: 8px 0 8px 18px;
        font-family: var(--font-display);
        font-size: 14.5px;
        line-height: 1.55;
        color: var(--ink-soft);
      }
      .tier-bullets li::before {
        content: "·";
        position: absolute;
        left: 4px;
        color: var(--kodachrome);
        font-weight: 700;
      }
      .pricing-note,
      .beta-note {
        margin-top: 24px;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 16, "wght" 400;
        font-size: 15.5px;
        line-height: 1.6;
        color: var(--ink-soft);
        max-width: 64ch;
      }
      .beta-note {
        padding: 16px 20px;
        border-left: 2px solid var(--saffron);
        background: var(--paper-warm);
        font-style: italic;
      }

      /* ── FAQ ── */
      .faq-list {
        display: grid;
        gap: 0;
        max-width: 880px;
        margin-top: 24px;
        border-top: 1px solid var(--ink);
      }
      .faq-item {
        border-bottom: 1px solid var(--paper-edge);
      }
      .faq-q {
        cursor: pointer;
        padding: 22px 24px 22px 0;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 24, "wght" 440;
        font-size: 19px;
        color: var(--ink);
        list-style: none;
        position: relative;
        transition: color 0.2s ease;
      }
      .faq-q::-webkit-details-marker { display: none; }
      .faq-q::after {
        content: "+";
        position: absolute;
        right: 0;
        top: 22px;
        font-family: var(--font-mono);
        color: var(--ink-muted);
        font-size: 22px;
        font-weight: 300;
        transition: transform 0.2s ease;
      }
      .faq-item[open] .faq-q::after {
        content: "−";
      }
      .faq-q:hover { color: var(--kodachrome); }
      .faq-a {
        padding: 0 24px 24px 0;
        font-family: var(--font-display);
        font-variation-settings: "opsz" 16, "wght" 400;
        font-size: 16px;
        line-height: 1.65;
        color: var(--ink-soft);
        max-width: 70ch;
      }

      /* ── LINK ARROW ── */
      .link-arrow {
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
        margin-top: 16px;
        transition: all 0.25s ease;
      }
      .link-arrow:hover {
        color: var(--kodachrome);
        border-bottom-color: var(--kodachrome);
        letter-spacing: 0.28em;
      }
      .link-arrow .arrow { transition: transform 0.3s ease; }
      .link-arrow:hover .arrow { transform: translateX(3px); }

      /* ── FINAL CTA ── */
      .section-cta {
        background: var(--paper-warm);
      }
      .cta-heading {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 96, "wght" 400;
        font-style: italic;
        font-size: clamp(36px, 5vw, 60px);
        line-height: 1.1;
        color: var(--ink);
        margin-bottom: 24px;
        max-width: 26ch;
      }
      .cta-body {
        font-family: var(--font-display);
        font-variation-settings: "opsz" 20, "wght" 400;
        font-size: 19px;
        line-height: 1.6;
        color: var(--ink-soft);
        max-width: 60ch;
        margin-bottom: 40px;
      }

      /* ── MOBILE ── */
      @media (max-width: 900px) {
        .hero-container,
        .page-container { padding: 0 var(--container-pad-mobile); }
        .hero {
          padding: 120px 0 80px;
          min-height: auto;
        }
        .hero-scroll { display: none; }
        .section { padding: 88px 0; }
        .section-title { margin-bottom: 32px; }
        .section :global(.reg-mark.tl) { left: var(--container-pad-mobile); }
        .section :global(.reg-mark.tr) { right: var(--container-pad-mobile); }
        .pain-grid,
        .roles-grid,
        .pricing-grid,
        .vault-grid,
        .workflow-list { grid-template-columns: 1fr; gap: 32px; }
        .workflow-diagram-wrap {
          margin-left: calc(-1 * var(--container-pad-mobile));
          margin-right: calc(-1 * var(--container-pad-mobile));
          padding-left: var(--container-pad-mobile);
          padding-right: var(--container-pad-mobile);
        }
        .hero-ctas { gap: 20px; flex-direction: column; align-items: flex-start; }
      }
    `}</style>
  )
}
