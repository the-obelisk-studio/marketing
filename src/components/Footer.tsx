// Shared footer. Warmer paper bg + thin top border. Three columns on
// desktop, stack on mobile.

import Link from "next/link"

const FOOTER_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="mono footer-label">Studio</div>
          <Link href="/partnership" className="footer-link">Partnership</Link>
          <Link href="/post" className="footer-link">Post production</Link>
          <Link href="/grace" className="footer-link">Grace</Link>
        </div>
        <div className="footer-col">
          <div className="mono footer-label">Reach</div>
          <Link href="/contact" className="footer-link">Contact</Link>
          <a href="mailto:hello@theobeliskstudio.com" className="footer-link">hello@theobeliskstudio.com</a>
        </div>
        <div className="footer-col footer-meta">
          <div className="mono footer-label">Obelisk Studios</div>
          <div className="footer-fine">One studio. Every stage.</div>
          <div className="footer-fine">© {FOOTER_YEAR} Obelisk Studios &middot; in partnership with TDH Systems</div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--paper-warm);
          border-top: 1px solid var(--paper-edge);
          padding: 64px 0 48px;
          margin-top: 120px;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1fr 1fr 1.4fr;
          gap: 48px;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-label {
          font-size: 10px;
          color: var(--ink-muted);
          margin-bottom: 8px;
        }
        .footer-link {
          color: var(--ink-soft);
          font-size: 15px;
          transition: color 200ms;
        }
        .footer-link:hover {
          color: var(--kodachrome);
        }
        .footer-fine {
          font-size: 13px;
          color: var(--ink-muted);
          line-height: 1.6;
        }
        @media (max-width: 900px) {
          .footer { padding: 40px 0 32px; margin-top: 80px; }
          .footer-inner { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
    </footer>
  )
}
