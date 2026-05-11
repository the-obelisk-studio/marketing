// Kodak film registration mark — small plus-sign decorative anchor
// used at section corners. Pure CSS, no JS.

type Props = {
  className?: string
  style?: React.CSSProperties
}

export function RegMark({ className, style }: Props) {
  return (
    <span className={`reg-mark ${className ?? ""}`} aria-hidden style={style}>
      <style>{`
        .reg-mark {
          position: absolute;
          width: 14px;
          height: 14px;
          pointer-events: none;
          opacity: 0.35;
          display: inline-block;
        }
        .reg-mark::before, .reg-mark::after {
          content: "";
          position: absolute;
          background: var(--ink-muted);
        }
        .reg-mark::before {
          left: 50%; top: 0; bottom: 0;
          width: 1px;
          transform: translateX(-50%);
        }
        .reg-mark::after {
          top: 50%; left: 0; right: 0;
          height: 1px;
          transform: translateY(-50%);
        }
      `}</style>
    </span>
  )
}
