// Fixed top nav, paper-warm semi-transparent bg with backdrop blur.
// Wordmark uses Fraunces with italic suffix to match KK's design.
// Links list comes from content/shared.yml; passed in as a prop so
// the layout can read content/ once at the server-component layer.
//
// Active state uses next/navigation's usePathname so the current
// page's link gets a kodachrome underline (matches KK's .current
// styling).

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SharedContent } from "@/lib/schema"

type NavLink = SharedContent["navLinks"][number]

const FALLBACK_LINKS: NavLink[] = [
  { label: "Grace", href: "/grace" },
  { label: "Post Services", href: "/post" },
  { label: "Partnership", href: "/partnership" },
  { label: "Contact", href: "/contact" },
]

function isCurrent(pathname: string | null, href: string): boolean {
  if (!pathname) return false
  // Normalize trailing slashes since next.config.ts sets trailingSlash: true.
  const a = pathname.replace(/\/+$/, "") || "/"
  const b = href.replace(/\/+$/, "") || "/"
  return a === b
}

export function Nav({ links = FALLBACK_LINKS }: { links?: NavLink[] }) {
  const pathname = usePathname()

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-mark">
          Obelisk <span>studio</span>
        </Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={isCurrent(pathname, l.href) ? "current" : undefined}>
                {l.label}
              </Link>
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
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-pad);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-mark {
          font-family: var(--font-display);
          font-variation-settings: "opsz" 96, "wght" 500;
          font-size: 20px;
          letter-spacing: 0.02em;
          color: var(--ink);
        }
        .nav-mark span {
          font-style: italic;
          font-variation-settings: "opsz" 96, "wght" 350;
          color: var(--ink-muted);
          margin-left: 4px;
        }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .nav-links a {
          color: var(--ink-soft);
          transition: color 200ms;
        }
        .nav-links a:hover {
          color: var(--kodachrome);
        }
        .nav-links a.current {
          color: var(--ink);
          position: relative;
        }
        .nav-links a.current::after {
          content: "";
          position: absolute;
          left: 0; right: 0;
          bottom: -8px;
          height: 1px;
          background: var(--kodachrome);
        }
        @media (max-width: 900px) {
          .nav-inner { padding: 0 var(--container-pad-mobile); }
          .nav-links { gap: 16px; font-size: 10px; }
          .nav-links li:nth-child(3) { display: none; }
        }
      `}</style>
    </nav>
  )
}
