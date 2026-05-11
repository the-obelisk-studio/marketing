import type { ProcessStep as ProcessStepData } from "@/lib/schema"

type Props = { step: ProcessStepData }

export function ProcessStep({ step }: Props) {
  return (
    <div className="process-step">
      <div className="mono process-number">[{step.number}]</div>
      <h4 className="process-title">{step.title}</h4>
      <p className="process-desc">{step.description}</p>

      <style>{`
        .process-step {
          padding-top: 24px;
          border-top: 1px solid var(--paper-edge);
        }
        .process-number {
          color: var(--kodachrome);
          font-size: 11px;
          margin-bottom: 12px;
        }
        .process-title {
          font-size: 20px;
          font-weight: 400;
          color: var(--ink);
          margin-bottom: 10px;
        }
        .process-desc {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.6;
        }
      `}</style>
    </div>
  )
}
