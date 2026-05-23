// /grace — the combined product page. Conversion copy from /product
// woven together with the screenshot walkthrough of Grace itself, as
// one comprehensive page (the new design KK approved on 2026-05-22).
//
// Content is hard-coded in this iteration. Round 2 will move section
// copy back into content/grace.yml so KK can edit via Decap. The
// previous content schema (sections[].shots[]) is unused by this page
// but left in place to keep the YAML valid.
//
// Screenshot src paths point at /public/uploads/grace/*. The mockup
// (Desktop/Website/grace-product-page.html) referenced some filenames
// with a -new suffix that don't exist on disk — those are mapped to
// the actual uploaded file in the SHOTS table below.

import Link from "next/link"
import { Reveal } from "@/components/Reveal"
import { RegMark } from "@/components/RegMark"
import { JsonLd } from "@/components/JsonLd"
import { pageMetadata, softwareApplicationLd } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Grace — Production OS for working filmmakers",
  description:
    "The production operating system built by working filmmakers. Script, schedule, budget, call sheets, and on-set comms from one source of truth — so a 4 pm script revision doesn't become a 7 pm crisis.",
  path: "/grace/",
})

// Path table — mockup ref → actual uploaded file. Keeping it in one
// place so KK can swap a screenshot by editing this single map.
const SHOTS = {
  perProductionDashboard: "/uploads/grace/per-production-dashboard.png",
  dashboardHome: "/uploads/grace/dashboard-home.png",
  dotSystem: "/uploads/grace/dot-system.png",
  scenesList: "/uploads/grace/scenes-list.png",
  elementSummary: "/uploads/grace/element-summary.png",
  schedule: "/uploads/grace/schedule.png",
  dood: "/uploads/grace/dood.png",
  locations: "/uploads/grace/locations.png",
  budget: "/uploads/grace/budget.png",
  budgetDetail: "/uploads/grace/budget-detail.png",
  shotList: "/uploads/grace/shot-list.png",
  creativeRefs: "/uploads/grace/creative-refs.png",
  callSheetApproved: "/uploads/grace/day1-approved.png",
  setDashboard: "/uploads/grace/set-dashboard.png",
  setDashboardMobile: "/uploads/grace/set-dashboard-mobile-modes.png",
  timecards: "/uploads/grace/timecards-day1.png",
  scriptSupervisor: "/uploads/grace/script-supervisor.png",
  editorLog: "/uploads/grace/editor-log.png",
  vfx: "/uploads/grace/vfx.png",
  graceAi: "/uploads/grace/grace-ai-panel.png",
  ditPipeline: "/uploads/grace/dit-pipeline.png",
  dailies: "/uploads/grace/dailies.png",
  screeners: "/uploads/grace/screeners.png",
  orgSettings: "/uploads/grace/org-settings.png",
  access: "/uploads/grace/access.png",
  compliance: "/uploads/grace/compliance.png",
  castRoster: "/uploads/grace/cast-roster.png",
  crewRoster: "/uploads/grace/crew-roster.png",
  billing: "/uploads/grace/billing.png",
  graceLightDarkMockup: "/uploads/grace/grace-light-dark-mockup.png",
} as const

export default function GracePage() {
  return (
    <main>
      <JsonLd data={softwareApplicationLd()} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="page-container">
          <Reveal eager delay={80}>
            <div className="hero-badge">In Development · Closed Beta</div>
          </Reveal>
          <Reveal eager delay={220}>
            <h1 className="hero-title">
              The production operating system <span className="muted">built by working filmmakers.</span>
            </h1>
          </Reveal>
          <Reveal eager delay={420}>
            <p className="hero-sub">
              Script, schedule, budget, call sheets, and on-set comms running from one source of truth — so a 4 pm script revision doesn&apos;t become a 7 pm crisis.
            </p>
          </Reveal>
          <Reveal eager delay={620}>
            <div className="hero-ctas">
              <Link href="/contact?topic=Grace" className="cta-primary">Request beta access →</Link>
              <a href="#problem" className="cta-secondary">See how it works ↓</a>
            </div>
          </Reveal>
          <Reveal eager delay={820}>
            <figure className="hero-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SHOTS.perProductionDashboard} alt="Per-production dashboard" />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · THE PROBLEM ─────────────────────────────────────── */}
      <section className="section" id="problem">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <SectionNum n="01" />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Three things that go wrong every week, <span className="muted">handled.</span>
            </h2>
          </Reveal>
          <div className="problem-grid">
            {PROBLEMS.map((p, i) => (
              <Reveal key={i} delay={200 + i * 140}>
                <article className="problem-card">
                  <div className="problem-num">0{i + 1}</div>
                  <h3 className="problem-h">{p.scenario}</h3>
                  <p className="problem-p">{p.response}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 · THESIS ─────────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="02" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Connect everything. <span className="muted">Re-enter nothing.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Grace is built around one idea: every department on a film should be working from the same picture. Breakdown feeds schedule. Schedule feeds budget. Budget feeds call sheet. Everything connects, nothing gets re-entered, and no one is working from a stale version.
            </p>
          </Reveal>
          <div className="thesis-points">
            {THESIS_POINTS.map((t, i) => (
              <Reveal key={i} delay={280 + i * 90}>
                <div className="thesis-point">
                  <span className="thesis-dot" aria-hidden />
                  <p>{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="screenshot-grid two-col">
            <Reveal delay={640}>
              <ShotItem src={SHOTS.perProductionDashboard} caption="Per-production dashboard" />
            </Reveal>
            <Reveal delay={720}>
              <ShotItem src={SHOTS.dashboardHome} caption="Studio home" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · DOT SYSTEM ─────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="03" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Co-pilot, <span className="muted">not autopilot.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Every value in Grace carries a colored dot that tells you who made the call. Software does the busywork. The people running the show stay in the chair.
            </p>
          </Reveal>
          <div className="dots-grid">
            {DOTS.map((d, i) => (
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
          <Reveal delay={700}>
            <p className="dot-closer">Grace suggests. You decide. Signed docs lock it in.</p>
          </Reveal>
          <div className="screenshot-grid one-col">
            <Reveal delay={820}>
              <ShotItem src={SHOTS.dotSystem} caption="Breakdown — dots visible in every cell" wide />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 04 · WORKFLOW CASCADE ───────────────────────────────── */}
      <section className="section" id="workflow">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="04" label="One workflow, end to end" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Upload the script. <span className="muted">Everything else cascades.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Every module in Grace reads from the modules upstream of it. Re-enter nothing, hand off nothing.
            </p>
          </Reveal>

          <div className="cascade-wrap">
            <div className="cascade-row">
              {CASCADE.slice(0, 4).map((s, i) => (
                <Reveal key={s.label} delay={280 + i * 70}>
                  <CascadeStep n={i + 1} {...s} last={i === 3} />
                </Reveal>
              ))}
            </div>
            <div className="cascade-row">
              {CASCADE.slice(4, 8).map((s, i) => (
                <Reveal key={s.label} delay={620 + i * 70}>
                  <CascadeStep n={i + 5} {...s} last={i === 3} />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={1000}>
            <div className="cascade-stat">
              <div className="cascade-stat-num">~12 min</div>
              <div className="cascade-stat-label">
                From script upload to first sendable call sheet on a 90-page feature.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 05 · PRE-PRODUCTION ─────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="05" label="Pre-Production" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Plan the picture <span className="muted">before the picture rolls.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Script breakdown that knows scenes and elements. Scheduling and DOOD that pack locations and respect minor hours. A budget that actualizes from purchase orders. A shot list with VFX flags and storyboards. All connected, all live.
            </p>
          </Reveal>

          <div className="screenshot-grid two-col">
            <Reveal delay={280}><ShotItem src={SHOTS.scenesList} caption="Scene breakdown" /></Reveal>
            <Reveal delay={360}><ShotItem src={SHOTS.elementSummary} caption="Element summary" /></Reveal>
          </div>
          <div className="screenshot-grid three-col">
            <Reveal delay={440}><ShotItem src={SHOTS.schedule} caption="Strip board" /></Reveal>
            <Reveal delay={520}><ShotItem src={SHOTS.dood} caption="Day Out of Days" /></Reveal>
            <Reveal delay={600}><ShotItem src={SHOTS.locations} caption="Locations" /></Reveal>
          </div>
          <div className="screenshot-grid two-col">
            <Reveal delay={680}><ShotItem src={SHOTS.budget} caption="Budget — top sheet" /></Reveal>
            <Reveal delay={760}><ShotItem src={SHOTS.budgetDetail} caption="Budget — line-item detail" /></Reveal>
          </div>
          <div className="screenshot-grid two-col">
            <Reveal delay={840}><ShotItem src={SHOTS.shotList} caption="Shot list" /></Reveal>
            <Reveal delay={920}><ShotItem src={SHOTS.creativeRefs} caption="Creative references" /></Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 · PRODUCTION ─────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="06" label="Production" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Every department, <span className="muted">working from the same picture.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Call sheets that build themselves from the schedule. Time cards that prefill from call time and meal duration. A set dashboard tracking actuals against the strip plan. Script supervisor notes, editor log, VFX flags — every department&apos;s daily work in one tool.
            </p>
          </Reveal>

          <div className="screenshot-grid featured">
            <Reveal delay={280}><ShotItem src={SHOTS.callSheetApproved} caption="Call sheet — approved" /></Reveal>
            <Reveal delay={360}><ShotItem src={SHOTS.setDashboard} caption="Set dashboard — live" /></Reveal>
          </div>
          <div className="screenshot-grid three-col">
            <Reveal delay={440}><ShotItem src={SHOTS.setDashboardMobile} caption="Mobile dashboards" /></Reveal>
            <Reveal delay={520}><ShotItem src={SHOTS.timecards} caption="Timecards" /></Reveal>
            <Reveal delay={600}><ShotItem src={SHOTS.scriptSupervisor} caption="Script supervisor" /></Reveal>
          </div>
          <div className="screenshot-grid two-col">
            <Reveal delay={680}><ShotItem src={SHOTS.editorLog} caption="Editor log" /></Reveal>
            <Reveal delay={760}><ShotItem src={SHOTS.vfx} caption="VFX tracking" /></Reveal>
          </div>
        </div>
      </section>

      {/* ── 07 · GRACE AI ───────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="07" label="Grace AI" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              A co-pilot <span className="muted">that knows your production.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              The chat panel reads the production state and answers questions in context. Why is this scene&apos;s HMU so long? Which crew member&apos;s call time conflicts with a turnaround? What&apos;s our French-hours exposure today? Trained on industry compliance — IATSE, DGA, SAG, Teamsters thresholds built in.
            </p>
          </Reveal>
          <div className="screenshot-grid one-col">
            <Reveal delay={280}>
              <ShotItem src={SHOTS.graceAi} caption="Grace AI — co-pilot panel open on the strip board" wide />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 08 · DEPARTMENT VIEWS ───────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="08" label="Built for the people on set" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Every department, <span className="muted">the same picture.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Grace&apos;s access model maps to how productions are actually organized. The right people see the right view, and nothing else.
            </p>
          </Reveal>
          <div className="dept-grid">
            {DEPARTMENTS.map((d, i) => (
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

      {/* ── 09 · COMPLIANCE ─────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="09" label="Built-in compliance" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Union rules, <span className="muted">enforced when it matters.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Pick your union profile on production setup. Grace&apos;s compliance engine uses the right thresholds for turnaround, meal penalties, OT, and minor hours from day one.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="union-tags">
              {UNIONS.map((u) => (
                <span key={u.label} className={`union-tag${u.active ? " active" : ""}`}>{u.label}</span>
              ))}
            </div>
          </Reveal>
          <ul className="compliance-list">
            {COMPLIANCE.map((c, i) => (
              <Reveal key={i} delay={400 + i * 80}>
                <li>
                  <span className="check" aria-hidden>✓</span>
                  <span>{c}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={900}>
            <p className="deferral-note">
              Paper-first today: generated PDFs get signed in person and re-uploaded. In-app electronic signatures (DocuSeal-backed) land in the next release.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 10 · THE VAULT ──────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="10" label="The Vault" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Send screeners. <span className="muted">Stay in control.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Send a cut to a financier on Tuesday. Know on Friday they opened it twice from a hotel Wi-Fi in Park City.
            </p>
          </Reveal>
          <div className="vault-features">
            {VAULT.map((v, i) => (
              <Reveal key={v.title} delay={280 + i * 60}>
                <div className="vault-feature">
                  <h4>{v.title}</h4>
                  <p>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="screenshot-grid three-col">
            <Reveal delay={680}><ShotItem src={SHOTS.ditPipeline} caption="DIT pipeline" /></Reveal>
            <Reveal delay={760}><ShotItem src={SHOTS.dailies} caption="Dailies delivery" /></Reveal>
            <Reveal delay={840}><ShotItem src={SHOTS.screeners} caption="Screeners — watermarked" /></Reveal>
          </div>
          <Reveal delay={920}>
            <p className="tier-note">The Vault is a Studio-tier feature.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 11 · OPERATIONS ─────────────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="11" label="Operations" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              The unglamorous work, <span className="muted">handled.</span>
            </h2>
          </Reveal>
          <div className="ops-grid">
            {OPS.map((o, i) => (
              <Reveal key={o.title} delay={200 + i * 80}>
                <div className="ops-item">
                  <h4>{o.title}</h4>
                  <p>{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="screenshot-grid three-col">
            <Reveal delay={560}><ShotItem src={SHOTS.orgSettings} caption="Org settings" /></Reveal>
            <Reveal delay={640}><ShotItem src={SHOTS.access} caption="Access control — per person" /></Reveal>
            <Reveal delay={720}><ShotItem src={SHOTS.compliance} caption="Compliance — union profiles" /></Reveal>
          </div>
          <div className="screenshot-grid three-col">
            <Reveal delay={800}><ShotItem src={SHOTS.castRoster} caption="Cast roster — SAG-AFTRA" /></Reveal>
            <Reveal delay={880}><ShotItem src={SHOTS.crewRoster} caption="Crew roster — IATSE rates" /></Reveal>
            <Reveal delay={960}><ShotItem src={SHOTS.billing} caption="Billing" /></Reveal>
          </div>
        </div>
      </section>

      {/* ── 12 · WHY WE BUILT THIS ──────────────────────────────── */}
      <section className="section">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="12" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Every feature here exists because <span className="muted">one of us needed it.</span>
            </h2>
          </Reveal>
          <div className="why-split">
            <div className="why-text">
              <Reveal delay={200}>
                <p>
                  Grace is built by Kshitij Kapil, a working cinematographer and colorist, and Siddharth Agrawal, who runs the studio. We&apos;ve sat in the AD chair, signed the timesheets, and watched a call sheet die because someone re-cut the script at 4 pm.
                </p>
              </Reveal>
              <Reveal delay={320}>
                <p>This isn&apos;t market research. It&apos;s the tool we wanted on our own pictures.</p>
              </Reveal>
              <Reveal delay={440}>
                <Link href="/partnership" className="link-arrow">
                  About the partnership <span className="arrow">→</span>
                </Link>
              </Reveal>
            </div>
            <Reveal delay={360}>
              <figure className="why-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SHOTS.graceLightDarkMockup} alt="Grace — light and dark mode" />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 13 · PRICING ─────────────────────────────────────────── */}
      <section className="section" id="pricing">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="13" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title">
              Two plans. <span className="muted">No per-user gouging.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="section-body">
              Pricing is per production company, not per seat. Pack-style add-ons let you grow without re-negotiating.
            </p>
          </Reveal>
          <div className="pricing-grid">
            {TIERS.map((t, i) => (
              <Reveal key={t.name} delay={280 + i * 140}>
                <article className={`pricing-card${t.featured ? " featured" : ""}`}>
                  {t.featured && <div className="tier-badge">Recommended</div>}
                  <div className="tier-name">{t.name}</div>
                  <div className="tier-desc">{t.desc}</div>
                  <div className="tier-price">{t.price}<span> / month</span></div>
                  <div className="tier-annual">{t.annual}</div>
                  <ul className="tier-bullets">
                    {t.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <Link href="/contact?topic=Grace" className="cta-primary tier-cta">Request access →</Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={620}>
            <p className="pricing-note">
              Add-on packs: additional production slots ($30/mo), seat packs by tier. All prorated. Beta access includes a 90-day trial on a card-on-file Standard or Studio subscription.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 14 · FAQ ─────────────────────────────────────────────── */}
      <section className="section" id="faq">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal><SectionNum n="14" /></Reveal>
          <Reveal delay={120}>
            <h2 className="section-title section-title-centered">
              Things people ask <span className="muted">before they buy.</span>
            </h2>
          </Reveal>
          <div className="faq-list">
            {FAQ.map((f, i) => (
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

      {/* ── FINAL CTA ───────────────────────────────────────────── */}
      <section className="section section-cta" id="contact">
        <RegMark className="tl" />
        <RegMark className="tr" />
        <div className="page-container">
          <Reveal>
            <h2 className="cta-heading">
              Grace is open to a small beta cohort <span className="muted">right now.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="cta-body">
              Tell us about your production — title, format, shoot dates, union status — and we&apos;ll get you set up.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="hero-ctas centered">
              <Link href="/contact?topic=Grace" className="cta-primary">Request beta access →</Link>
              <a href="#" className="cta-secondary">Back to top ↑</a>
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

function ShotItem({ src, caption, wide }: { src: string; caption: string; wide?: boolean }) {
  return (
    <figure className={`shot${wide ? " shot-wide" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={caption} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
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

// ─── Static content ─────────────────────────────────────────────

const PROBLEMS = [
  {
    scenario: "Tomorrow's call sheet is hostage to today's script revision.",
    response: "Upload the new revision. Grace diffs it against the current breakdown, lets you accept or reject scene-by-scene, and rolls the survivors into a forked schedule, budget, and shot list. The call sheet rebuilds itself.",
  },
  {
    scenario: "Three departments are looking at three versions of the schedule.",
    response: "One stripboard, one budget, one DOOD. Every department reads the same number. Approvals lock the version; what-if branches let you model a re-shoot day without breaking what's live.",
  },
  {
    scenario: "Compliance violations show up in payroll, not on set.",
    response: "Turnaround, meal-penalty, and minor-hours thresholds are checked when you build the day — not when you account for it. The sheet refuses to lock on a violation unless an authorized signer overrides it. Audit trail attached.",
  },
]

const THESIS_POINTS = [
  "One upload changes everything downstream.",
  "The set dashboard is the schedule, live.",
  "Cast and crew see only what they should.",
  "What-if branches without breaking what's live.",
]

const DOTS = [
  { color: "blue", label: "Grace did this", detail: "Suggested from your data — rate cards, breakdown inferences, recommended pacings. Editable, overridable." },
  { color: "gold", label: "You did this", detail: "Entered or changed by a human. Grace doesn't touch a gold value without asking." },
  { color: "green", label: "Verified", detail: "Locked from a signed document — deal memo, contract, executed compliance form." },
]

const CASCADE = [
  { label: "Script", detail: "PDF, FDX, Fountain, DOCX. Parsed into scenes, headings, elements." },
  { label: "Breakdown", detail: "Per-scene elements, cast, locations. Diff-aware revisions." },
  { label: "Schedule", detail: "Stripboard, DOOD, location packing, HMU chain." },
  { label: "Budget", detail: "Line items, vendor POs, actualized rollup." },
  { label: "Call Sheet", detail: "Auto-built from the day. Weather, drive time, French hours." },
  { label: "Set Dashboard", detail: "Live timing, takes, circle/hold. The schedule, live." },
  { label: "Timecards", detail: "Prefilled from call time + meal duration. Overrides flagged." },
  { label: "Editor Log", detail: "CSV, PDF, EDL, FCPXML for turnover." },
]

const DEPARTMENTS = [
  { role: "1st AD", gives: ["Call sheets that build themselves from the schedule", "Compliance alerts before the sheet locks, not after payroll", "Set Dashboard that mirrors the strip plan in real time"] },
  { role: "UPM / Line Producer", gives: ["Live budget actuals from POs and vendor rolls", "What-if branches for schedule changes, costed out before commit", "Owner-grade access to every dept's daily output"] },
  { role: "Director", gives: ["Shot list, storyboards, scene timing, creative refs", "Take selects flowing straight to the editor's log", "A Grace AI panel that knows your production's state"] },
  { role: "DP", gives: ["Shot list with movement, lens, camera notes per scene", "VFX flagging + per-shot capture requirements", "Camera report + scene timing exports for the camera dept"] },
  { role: "Script Supervisor", gives: ["Per-take logging with circle/hold/NG and continuity photos", "Cross-shot-list-version editor log — never orphans a circled take", "Daily Script Sup Report PDF, ready to send"] },
  { role: "VFX Supervisor", gives: ["Flag shots from the shot list; track plates required vs captured", "AI auto-suggests VFX shots from scene context", "Per-shot turnover package for vendors"] },
  { role: "DIT", gives: ["Media-card pipeline: hot → offloading → offloaded → verified → cleared", "Per-day dailies packages delivered to editorial via the Vault", "Shared-key delivery — no byte duplication"] },
]

const UNIONS = [
  { label: "IATSE", active: true },
  { label: "DGA", active: false },
  { label: "SAG-AFTRA", active: false },
  { label: "Teamsters", active: false },
  { label: "Non-union", active: false },
  { label: "Mixed (strictest)", active: false },
]

const COMPLIANCE = [
  "Turnaround check at call-sheet lock — refuses approval on a short rest, requires authorized override",
  "Meal-penalty math baked into the day clock — six- and twelve-hour windows tracked",
  "Minor hours hard-blocked server-side — minors can't be scheduled past the cap without acknowledgement",
  "French hours (continuous workday) handled as a per-day flag",
  "Exhibit G, Studio Teacher Daily Report, Safety Meeting sign-in, Daily Timesheets — generated as PDFs",
]

const VAULT = [
  { title: "Magic-link delivery", body: "Recipient verifies via 6-digit code to their email. No accounts to create." },
  { title: "Forensic watermarking", body: "Recipient email, share ID, UTC timestamp burned into the player." },
  { title: "Device locking", body: "First device claims the session. Second device gets kicked." },
  { title: "Time-bound access", body: "Sliding session refresh, range-only streaming, access codes that expire." },
  { title: "Full event log", body: "Code requests, play starts, seeks, device changes. Everything tracked." },
  { title: "DIT pipeline", body: "Dailies packages delivered with the same auth and forensic trail." },
]

const OPS = [
  { title: "Union profiles, built in", body: "Rate cards and compliance thresholds from day one." },
  { title: "The right people, the right view", body: "Role-based access that maps to how productions work." },
  { title: "Server-rendered PDFs", body: "Call sheets, timecards, reports — by the dozen." },
  { title: "Real software, under the hood", body: "Audit trails, version history, API-first architecture." },
]

const TIERS = [
  {
    name: "Standard",
    desc: "Run pre-pro and shoot a project end-to-end.",
    price: "$149",
    annual: "$1,499 / year",
    bullets: [
      "1 active production",
      "3 producer-tier + 5 dept-head-tier + 20 crew/cast seats",
      "Full breakdown, schedule, budget, call sheets",
      "Set dashboard, compliance, editor turnover",
      "Vault and DIT pipeline available as upgrade",
    ],
    featured: false,
  },
  {
    name: "Studio",
    desc: "Plus secure dailies, screener portal, and DIT workflow.",
    price: "$299",
    annual: "$2,999 / year",
    bullets: [
      "Everything in Standard",
      "Vault: forensic-watermarked screener portal with magic-link auth",
      "DIT pipeline: media cards, dailies packages, clip delivery",
      "Higher seat ceilings: 6 T1 · 10 T2 · 40 T3",
      "Priority beta support",
    ],
    featured: true,
  },
]

const FAQ = [
  { q: "How is this different from StudioBinder / Yamdu / Croogloo?", a: "Those tools are databases. Grace is a workflow. Your script change cascades to your call sheet automatically; their schedule pages don't talk to their call sheet pages. We also enforce union compliance at the point of decision, not at the audit. And every value carries a dot showing who decided it — humans, not the software, own the production." },
  { q: "Can my whole crew use it, or just production?", a: "Whole crew. Seat tiers are T1 (producer / UPM), T2 (director / 1st AD / DP / department heads), T3 (crew + cast). Standard includes 28 seats out of the box; Studio includes 56. Pack add-ons extend further. T3 sees only their day, their call, their own time card — never the budget." },
  { q: "What happens to my data if I cancel?", a: "Read-only access through the end of the billing period. Export every artifact (PDFs, CSVs, EDL, FCPXML) before then. After that, we retain your data for 30 days in case you reactivate, then deletion runs on schedule per the Privacy Policy." },
  { q: "Does it handle weekly TV or multi-block episodics?", a: "Today, Grace is optimized for a single production at a time. Multi-block / weekly TV is on the roadmap. If that's your shape, reach out — we'd like to talk before we build it." },
  { q: "What about SAG Ultra Low Budget / Short Project Agreement?", a: "Standard SAG-AFTRA thresholds today. SAG tier-specific variants (Low Budget, Ultra Low Budget, Short Project Agreement) are scoped for the next compliance release." },
  { q: "Can I run this on a script I haven't shared with anyone yet?", a: "Yes. Scripts live in your private org. Per-section access controls mean a confidential script can be uploaded by the producer and stay locked from the rest of the org until it's broken down and shared. The Vault adds another layer: magic-link sharing with watermarking and device locking when you do need to send something out." },
  { q: "Are you self-hosted or SaaS?", a: "SaaS, hosted on Railway + Neon (US-East) with Cloudflare R2 for object storage. Self-hosted for enterprise is on the table — get in touch if that's a hard requirement." },
  { q: "Who's behind it?", a: "Obelisk Studios — Kshitij Kapil (working DP / colorist) and Siddharth Agrawal. A real, small, working studio. Burbank, California." },
]

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
      .dot-blue { background: #4a6fa5; box-shadow: 0 0 10px rgba(74, 111, 165, 0.35); }
      .dot-gold { background: var(--saffron); box-shadow: 0 0 10px rgba(184, 134, 44, 0.35); }
      .dot-green { background: var(--sage); box-shadow: 0 0 10px rgba(74, 93, 74, 0.35); }
      .dot-label {
        font-family: var(--font-mono);
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 600;
      }
      .dot-label-blue { color: #4a6fa5; }
      .dot-label-gold { color: var(--saffron); }
      .dot-label-green { color: var(--sage); }
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
      .screenshot-grid.featured { grid-template-columns: 1.5fr 1fr; }
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
