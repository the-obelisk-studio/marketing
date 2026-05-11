import type { Service } from "@/lib/schema"

type Props = { service: Service }

export function ServiceCard({ service }: Props) {
  return (
    <article className="service-card">
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
      {service.tools.length > 0 && (
        <ul className="service-tools">
          {service.tools.map((t, i) => <li key={i} className="service-tool mono">{t}</li>)}
        </ul>
      )}

      <style>{`
        .service-card {
          padding: 32px 28px;
          background: var(--paper-warm);
          border: 1px solid var(--paper-edge);
        }
        .service-title {
          font-size: 26px;
          font-weight: 400;
          color: var(--ink);
          margin-bottom: 14px;
        }
        .service-desc {
          font-size: 15px;
          color: var(--ink-soft);
          line-height: 1.6;
          margin-bottom: 22px;
        }
        .service-tools {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .service-tool {
          background: var(--paper-deep);
          color: var(--ink-soft);
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 2px;
        }
      `}</style>
    </article>
  )
}
