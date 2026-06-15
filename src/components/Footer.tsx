// Footer — big Obelisk wordmark + tagline + 3-col link grid + base
// strip. Mirrors KK's exact layout from index.html.

import Link from "next/link"
import type { SharedContent } from "@/lib/schema"

type Props = {
  footer?: SharedContent["footer"]
}

const FALLBACK: SharedContent["footer"] = {
  tagline: "studio · grace · post",
  contactEmail: "hello@theobeliskstudio.com",
  columns: [
    { label: "Studio", links: [
      { label: "About", href: "/#about" },
      { label: "Work", href: "/#offerings" },
      { label: "Partnership", href: "/partnership" },
    ] },
    { label: "Legal", links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ] },
    { label: "Contact", links: [
      { label: "hello@theobeliskstudio.com", href: "mailto:hello@theobeliskstudio.com" },
      { label: "Contact form", href: "/contact" },
    ] },
  ],
}

const FOOTER_YEAR = new Date().getFullYear()

export function Footer({ footer = FALLBACK }: Props) {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-mark">Obelisk</div>
            {footer.tagline && <div className="footer-tagline">{footer.tagline}</div>}
          </div>
          {footer.columns.map(col => (
            <div key={col.label} className="footer-col">
              <h4>{col.label}</h4>
              <ul>
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-base">
          <div>© {FOOTER_YEAR} Obelisk Studio · Burbank, California</div>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 100px 0 56px;
          border-top: 1px solid var(--paper-edge);
          background: var(--paper-warm);
        }
        .footer-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-pad);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.3fr 1fr;
          gap: 64px;
          margin-bottom: 80px;
        }
        .footer-mark {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 144, "wght" 480;
          font-size: clamp(60px, 9vw, 108px);
          line-height: 0.86;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 14px;
        }
        .footer-tagline {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 22, "wght" 320;
          font-style: italic;
          font-size: 19px;
          color: var(--ink-muted);
        }
        .footer-col h4 {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 22px;
          font-weight: 400;
        }
        .footer-col ul {
          list-style: none;
          font-family: var(--font-display);
          font-size: 16px;
          line-height: 1.85;
        }
        .footer-col a {
          color: var(--ink-soft);
          transition: color 200ms;
        }
        .footer-col a:hover {
          color: var(--kodachrome);
        }
        .footer-base {
          display: flex;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid var(--paper-edge);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }
        @media (max-width: 900px) {
          .footer-container { padding: 0 var(--container-pad-mobile); }
          .footer-grid { grid-template-columns: 1fr; gap: 48px; }
          .footer-base { flex-direction: column; gap: 14px; }
        }
      `}</style>
    </footer>
  )
}
