// Numbered section primitive. Each KK section has the shape:
//   [01]  THE STUDIO
//          Building tools and finishing pictures…
//          <body content>

import type { ReactNode } from "react"
import { Reveal } from "./Reveal"

type Props = {
  number?: string       // "01", "02", etc.
  kicker?: string       // mono label — "THE STUDIO"
  heading?: string      // big serif headline
  children: ReactNode   // body — paragraphs, grids, etc.
  id?: string
}

export function Section({ number, kicker, heading, children, id }: Props) {
  return (
    <section className="section" id={id}>
      <div className="container">
        {(number || kicker) && (
          <Reveal>
            <div className="section-head">
              {number && <span className="section-number mono">[{number}]</span>}
              {kicker && <span className="section-kicker mono">{kicker}</span>}
            </div>
          </Reveal>
        )}
        {heading && (
          <Reveal delay={120}>
            <h2 className="section-heading">{heading}</h2>
          </Reveal>
        )}
        <Reveal delay={heading ? 240 : 120}>
          <div className="section-body">
            {children}
          </div>
        </Reveal>
      </div>

      <style>{`
        .section {
          padding: 160px 0;
        }
        .section-head {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }
        .section-number {
          color: var(--kodachrome);
          font-size: 11px;
        }
        .section-kicker {
          color: var(--ink-muted);
          font-size: 11px;
        }
        .section-heading {
          font-size: clamp(36px, 6vw, 88px);
          font-weight: 300;
          letter-spacing: -0.025em;
          line-height: 1.04;
          margin-bottom: 56px;
          color: var(--ink);
          max-width: 920px;
        }
        .section-body {
          font-size: clamp(16px, 1.2vw, 19px);
          color: var(--ink-soft);
          line-height: 1.7;
        }
        @media (max-width: 900px) {
          .section { padding: 100px 0; }
          .section-heading { margin-bottom: 36px; }
        }
      `}</style>
    </section>
  )
}
