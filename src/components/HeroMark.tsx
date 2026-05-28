import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export function HeroMark({ children }: Props) {
  return (
    <div className="hero-mark">
      {children}
      <svg
        className="hero-mark-glyph"
        viewBox="0 0 64 380"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M32 0 L48 56 L18 56 Z M18 56 L48 56 L46 380 L20 380 Z" fill="currentColor" />
      </svg>
      <style>{`
        .hero-mark {
          position: relative;
          display: inline-block;
        }
        .hero-mark-glyph {
          position: absolute;
          top: 0;
          left: 100%;
          font-size: clamp(80px, 19vw, 290px);
          margin-left: 0.08em;
          width: 0.16em;
          height: calc(0.86em + clamp(44px, 7.1vw, 100px) + 94px);
          opacity: 0.06;
          pointer-events: none;
          color: var(--ink);
        }
        @media (max-width: 628px) {
          .hero-mark-glyph { display: none; }
        }
      `}</style>
    </div>
  )
}
