// Fixed top nav, semi-transparent paper bg with backdrop blur. Same shape
// across every page. Links list comes from content/shared.yml in
// commit 2; for the bootstrap phase the links are hard-coded.

import Link from "next/link"

type NavLink = { label: string; href: string }

const DEFAULT_LINKS: NavLink[] = [
  { label: "Partnership", href: "/partnership" },
  { label: "Post", href: "/post" },
  { label: "Grace", href: "/grace" },
  { label: "Contact", href: "/contact" },
]

export function Nav({ links = DEFAULT_LINKS }: { links?: NavLink[] }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-mark">
          <span className="mono nav-mark-label">Obelisk</span>
        </Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="mono nav-link">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 22px 0;
          background: rgba(241, 232, 214, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(28, 22, 18, 0.06);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-mark {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .nav-mark-label {
          font-size: 12px;
          letter-spacing: 0.28em;
          color: var(--ink);
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 36px;
        }
        .nav-link {
          font-size: 11px;
          letter-spacing: 0.22em;
          color: var(--ink-soft);
          transition: color 200ms;
        }
        .nav-link:hover {
          color: var(--kodachrome);
        }
        @media (max-width: 900px) {
          .nav-links { gap: 18px; }
          .nav-link { font-size: 10px; letter-spacing: 0.18em; }
        }
      `}</style>
    </nav>
  )
}
