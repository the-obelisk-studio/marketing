// Hero block — eyebrow + wordmark + motto. Used on every page. The
// `mark` prop hooks an SVG (e.g. obelisk glyph) into the bottom-right
// of the hero as a decorative anchor.

import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

type Props = {
  eyebrow?: string
  title: string
  motto?: string
  mark?: ReactNode
  align?: "left" | "center"
}

export function Hero({ eyebrow, title, motto, mark, align = "left" }: Props) {
  return (
    <section className="hero">
      <div className="container hero-inner" data-align={align}>
        {eyebrow && (
          <Reveal>
            <div className="mono hero-eyebrow">{eyebrow}</div>
          </Reveal>
        )}
        <Reveal delay={120}>
          <h1 className="hero-title">{title}</h1>
        </Reveal>
        {motto && (
          <Reveal delay={240}>
            <p className="hero-motto">{motto}</p>
          </Reveal>
        )}
        {mark && <div className="hero-mark" aria-hidden>{mark}</div>}
      </div>

      <style>{`
        .hero {
          min-height: 88vh;
          display: flex;
          align-items: center;
          padding: 160px 0 80px;
          position: relative;
        }
        .hero-inner[data-align="center"] {
          text-align: center;
        }
        .hero-eyebrow {
          color: var(--kodachrome);
          margin-bottom: 28px;
        }
        .hero-title {
          font-size: clamp(48px, 14vw, 220px);
          font-weight: 300;
          letter-spacing: -0.03em;
          font-variation-settings: "opsz" 144;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .hero-motto {
          font-size: clamp(18px, 2vw, 26px);
          color: var(--ink-soft);
          max-width: 580px;
          line-height: 1.5;
        }
        .hero-inner[data-align="center"] .hero-motto {
          margin-left: auto;
          margin-right: auto;
        }
        .hero-mark {
          position: absolute;
          right: var(--container-pad);
          bottom: 80px;
          opacity: 0.7;
        }
        @media (max-width: 900px) {
          .hero { min-height: 75vh; padding: 120px 0 60px; }
          .hero-mark { right: var(--container-pad-mobile); }
        }
      `}</style>
    </section>
  )
}
