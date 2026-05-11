import type { Founder } from "@/lib/schema"

type Props = { founder: Founder }

export function FounderCard({ founder }: Props) {
  return (
    <article className="founder-card">
      <div className="founder-portrait">
        {founder.photo ? (
          // Static export → vanilla <img>. No next/image (needs server).
          // eslint-disable-next-line @next/next/no-img-element
          <img src={founder.photo} alt={founder.name} className="founder-photo" loading="lazy" decoding="async" />
        ) : (
          <div className="founder-monogram">
            {founder.initials || founder.name.split(" ").map(p => p[0]).join("").slice(0, 2)}
          </div>
        )}
      </div>
      <div className="founder-meta">
        {founder.company && <div className="mono founder-company">{founder.company}</div>}
        <h3 className="founder-name">{founder.name}</h3>
        {founder.roles.length > 0 && (
          <div className="founder-roles">{founder.roles.join(" · ")}</div>
        )}
        <p className="founder-bio">{founder.bio}</p>
        {founder.portfolioLinks.length > 0 && (
          <ul className="founder-links">
            {founder.portfolioLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="founder-link">
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .founder-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          padding: 28px 0;
          border-bottom: 1px solid var(--paper-edge);
        }
        .founder-card:last-child { border-bottom: none; }
        .founder-portrait {
          width: 200px;
          aspect-ratio: 3/4;
          background: var(--paper-warm);
          border: 1px solid var(--paper-edge);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .founder-photo {
          width: 100%; height: 100%; object-fit: cover;
        }
        .founder-monogram {
          font-family: var(--font-display);
          font-size: 64px;
          color: var(--ink-faint);
          font-weight: 300;
          font-variation-settings: "opsz" 96;
        }
        .founder-company {
          font-size: 10px;
          color: var(--kodachrome);
          margin-bottom: 8px;
        }
        .founder-name {
          font-size: 28px;
          font-weight: 400;
          color: var(--ink);
          margin-bottom: 6px;
        }
        .founder-roles {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--ink-muted);
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .founder-bio {
          font-size: 16px;
          line-height: 1.65;
          color: var(--ink-soft);
          margin-bottom: 16px;
        }
        .founder-links {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
        }
        .founder-link {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--kodachrome);
          text-transform: uppercase;
        }
        @media (max-width: 900px) {
          .founder-card { grid-template-columns: 1fr; gap: 18px; }
          .founder-portrait { width: 140px; }
        }
      `}</style>
    </article>
  )
}
