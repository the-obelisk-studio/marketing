import type { Film } from "@/lib/schema"

type Props = { film: Film }

export function FilmCard({ film }: Props) {
  return (
    <article className="film-card">
      <div className="film-poster">
        {film.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={film.poster} alt={film.title} className="film-poster-img" loading="lazy" decoding="async" />
        ) : (
          <div className="film-poster-blank" aria-hidden />
        )}
      </div>
      <div className="film-meta">
        <div className="film-head">
          <h3 className="film-title">{film.title}</h3>
          {film.year && <span className="mono film-year">{film.year}</span>}
        </div>
        {film.synopsis && <p className="film-synopsis">{film.synopsis}</p>}
        {film.crew.length > 0 && (
          <dl className="film-crew">
            {film.crew.map((c, i) => (
              <div key={i} className="film-crew-row">
                <dt className="mono film-crew-role">{c.role}</dt>
                <dd className="film-crew-name">{c.name}</dd>
              </div>
            ))}
          </dl>
        )}
        {film.festivals.length > 0 && (
          <ul className="film-festivals">
            {film.festivals.map((f, i) => (
              <li key={i} className="film-festival mono">
                {typeof f === "string" ? f : `${f.name}${f.award ? ` · ${f.award}` : ""}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .film-card {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 28px;
          padding: 32px 0;
          border-bottom: 1px solid var(--paper-edge);
        }
        .film-card:last-child { border-bottom: none; }
        .film-poster {
          aspect-ratio: 2/3;
          background: var(--paper-warm);
          border: 1px solid var(--paper-edge);
          overflow: hidden;
        }
        .film-poster-img { width: 100%; height: 100%; object-fit: cover; }
        .film-poster-blank { width: 100%; height: 100%; background: linear-gradient(135deg, var(--paper-warm), var(--paper-deep)); }
        .film-head {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 14px;
        }
        .film-title {
          font-size: 26px;
          font-weight: 400;
          color: var(--ink);
        }
        .film-year {
          font-size: 10px;
          color: var(--ink-muted);
        }
        .film-synopsis {
          font-size: 15px;
          color: var(--ink-soft);
          line-height: 1.6;
          margin-bottom: 18px;
        }
        .film-crew {
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 8px 16px;
          margin-bottom: 16px;
        }
        .film-crew-row { display: contents; }
        .film-crew-role {
          font-size: 10px;
          color: var(--ink-muted);
          letter-spacing: 0.18em;
        }
        .film-crew-name {
          font-size: 14px;
          color: var(--ink-soft);
        }
        .film-festivals {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .film-festival {
          background: rgba(184, 134, 44, 0.12);
          color: var(--saffron);
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 2px;
        }
        @media (max-width: 900px) {
          .film-card { grid-template-columns: 1fr; gap: 18px; }
          .film-poster { max-width: 240px; }
        }
      `}</style>
    </article>
  )
}
