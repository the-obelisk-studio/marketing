// Placeholder frame for Grace UI screenshots on /grace. KK delivers
// real captures later via Decap (upload → image picks up the same
// `src` field). For now the frame renders a stylised mockup so the
// layout reads correctly before content lands.

type Props = {
  src?: string
  alt?: string
  caption?: string
}

export function ProductShot({ src, alt, caption }: Props) {
  return (
    <figure className="product-shot">
      <div className="product-frame">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ""} className="product-img" loading="lazy" decoding="async" />
        ) : (
          <div className="product-placeholder">
            <div className="mono product-placeholder-label">grace · screenshot</div>
          </div>
        )}
      </div>
      {caption && <figcaption className="mono product-caption">{caption}</figcaption>}

      <style>{`
        .product-shot {
          margin: 32px 0;
        }
        .product-frame {
          aspect-ratio: 16/10;
          background: #0C0F14;
          border: 1px solid var(--paper-edge);
          overflow: hidden;
          position: relative;
        }
        .product-img { width: 100%; height: 100%; object-fit: cover; }
        .product-placeholder {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0C0F14, #161B22);
        }
        .product-placeholder-label {
          color: #D4A843;
          letter-spacing: 0.3em;
          font-size: 12px;
        }
        .product-caption {
          color: var(--ink-muted);
          font-size: 10px;
          margin-top: 12px;
        }
      `}</style>
    </figure>
  )
}
