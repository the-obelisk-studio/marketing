"use client"

// Per-section gallery on /grace. Takes a list of {src, label} shots:
//   0 shots → dark placeholder frame (early-state stand-in).
//   1 shot  → just the hero image, no strip.
//   2+ shots → hero image + clickable thumb strip; clicking a thumb
//              swaps the hero. Active thumb gets a gold underline.
//
// Hero renders at native aspect to handle Grace's wide (~1.9:1)
// captures without letterboxing. KK uploads images via Decap; this
// component is intentionally unaware of any /uploads/ path convention.

import { useState } from "react"
import type { GraceShot } from "@/lib/schema"

type Props = {
  shots: GraceShot[]
  alt?: string
}

export function ProductShowcase({ shots, alt }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (shots.length === 0) {
    return (
      <figure className="showcase">
        <div className="showcase-frame placeholder">
          <div className="mono placeholder-label">grace · screenshot</div>
        </div>
        <Styles />
      </figure>
    )
  }

  const active = shots[Math.min(activeIdx, shots.length - 1)]
  const hasStrip = shots.length > 1

  return (
    <figure className="showcase">
      <div className="showcase-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active.src}
          src={active.src}
          alt={active.label ?? alt ?? ""}
          className="showcase-img"
          loading="lazy"
          decoding="async"
        />
      </div>

      {active.label && (
        <figcaption className="mono showcase-caption">{active.label}</figcaption>
      )}

      {hasStrip && (
        <div className="thumb-strip" role="tablist" aria-label="Screenshot gallery">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={shot.label ?? `Screenshot ${i + 1}`}
              className={`thumb${i === activeIdx ? " is-active" : ""}`}
              onClick={() => setActiveIdx(i)}
            >
              <span className="thumb-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt="" loading="lazy" decoding="async" />
              </span>
              {shot.label && <span className="mono thumb-label">{shot.label}</span>}
            </button>
          ))}
        </div>
      )}

      <Styles />
    </figure>
  )
}

function Styles() {
  return (
    <style>{`
      .showcase { margin: 48px 0 0; }

      .showcase-frame {
        background: #0C0F14;
        border: 1px solid var(--paper-edge);
        overflow: hidden;
        position: relative;
        box-shadow: 0 30px 60px -30px rgba(28, 22, 18, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        /* Cap hero height so portrait/phone-shape captures don't
           dominate the viewport. Landscape captures hit max-width
           first, so this only kicks in for tall images. */
        max-height: 80vh;
      }
      .showcase-frame.placeholder {
        aspect-ratio: 16/10;
        background: linear-gradient(135deg, #0C0F14, #161B22);
      }
      .placeholder-label {
        color: #D4A843;
        letter-spacing: 0.3em;
        font-size: 12px;
      }
      .showcase-img {
        display: block;
        max-width: 100%;
        max-height: 80vh;
        width: auto;
        height: auto;
      }

      .showcase-caption {
        color: var(--ink-muted);
        font-size: 10px;
        margin-top: 14px;
        letter-spacing: 0.28em;
      }

      .thumb-strip {
        display: flex;
        gap: 14px;
        margin-top: 28px;
        overflow-x: auto;
        scrollbar-width: thin;
        padding-bottom: 6px;
        scroll-snap-type: x mandatory;
      }
      .thumb-strip::-webkit-scrollbar { height: 4px; }
      .thumb-strip::-webkit-scrollbar-thumb { background: var(--ink-faint); }

      .thumb {
        flex: 0 0 auto;
        background: transparent;
        border: 0;
        padding: 0;
        cursor: pointer;
        text-align: left;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        gap: 8px;
        opacity: 0.55;
        transition: opacity 220ms ease;
      }
      .thumb:hover { opacity: 0.85; }
      .thumb.is-active { opacity: 1; }

      .thumb-img-wrap {
        display: block;
        width: 144px;
        aspect-ratio: 16/10;
        background: #0C0F14;
        border: 1px solid var(--paper-edge);
        overflow: hidden;
        position: relative;
        transition: border-color 220ms ease;
      }
      .thumb.is-active .thumb-img-wrap {
        border-color: var(--ink);
        box-shadow: 0 0 0 1px var(--ink);
      }
      .thumb-img-wrap img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top left;
      }

      .thumb-label {
        font-size: 9px;
        color: var(--ink-muted);
        letter-spacing: 0.22em;
        max-width: 144px;
        line-height: 1.4;
      }
      .thumb.is-active .thumb-label { color: var(--ink); }

      @media (max-width: 900px) {
        .showcase { margin: 32px 0 0; }
        .thumb-img-wrap { width: 108px; }
        .thumb-label { max-width: 108px; }
      }
    `}</style>
  )
}
