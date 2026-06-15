"use client"

// Privacy / data-subject request form — client component. Submits to
// /api/privacy-request (CF Pages Function). The same component handles
// access, correction, deletion, restriction, and objection requests so
// non-account-holders (crew added to a production they never signed
// into) have one canonical entry point.

import { useState } from "react"

type Status = "idle" | "submitting" | "success" | "error"

const REQUEST_TYPES = [
  "Access my data (portable copy)",
  "Correct my data",
  "Delete my data",
  "Restrict or object to a particular use",
  "Other privacy question",
]

const JURISDICTIONS = [
  "California (CCPA / CPRA)",
  "European Economic Area (GDPR)",
  "United Kingdom (UK GDPR)",
  "Switzerland (FADP)",
  "Other United States",
  "Other / not sure",
]

const RELATIONSHIPS = [
  "I have a Grace account",
  "I'm in a production but don't have an account",
  "I was added as cast or crew without signing up",
  "I received a screener through the Vault",
  "Other",
]

export function PrivacyRequestForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setError(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())

    try {
      const res = await fetch("/api/privacy-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        setError(body?.error || `Submit failed (${res.status})`)
        setStatus("error")
        return
      }
      setStatus("success")
    } catch (err: any) {
      setError(err?.message || "Network error")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="form-success">
        <div className="success-eyebrow">Request received</div>
        <h3 className="success-title">Thanks. We'll respond within <em>30 days.</em></h3>
        <p className="success-body">
          Your privacy request landed with the Obelisk Studio Privacy Lead. We acknowledge receipt within a few business days and substantively respond within 30 days as required by law. If you don't hear from us, write directly to <a href="mailto:privacy@theobeliskstudio.com" style={{ color: "var(--kodachrome)", textDecoration: "underline" }}>privacy@theobeliskstudio.com</a>.
        </p>

        <style>{`
          .form-success { padding: 48px 0; }
          .success-eyebrow { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--kodachrome); margin-bottom: 18px; }
          .success-title { font-family: var(--font-display); font-size: clamp(36px, 5vw, 64px); color: var(--ink); margin-bottom: 20px; line-height: 1.05; }
          .success-title em { font-style: italic; }
          .success-body { font-family: var(--font-display); font-size: 17px; line-height: 1.65; color: var(--ink-soft); max-width: 56ch; }
        `}</style>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Name <span className="req">*</span></label>
          <input type="text" id="name" name="name" placeholder="Your name" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email <span className="req">*</span></label>
          <input type="email" id="email" name="email" placeholder="you@example.com" required autoComplete="email" />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="requestType">Type of request <span className="req">*</span></label>
        <select id="requestType" name="requestType" required defaultValue="">
          <option value="" disabled>Pick one</option>
          {REQUEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="jurisdiction">Your jurisdiction <span className="req">*</span></label>
        <select id="jurisdiction" name="jurisdiction" required defaultValue="">
          <option value="" disabled>Pick one</option>
          {JURISDICTIONS.map(j => <option key={j} value={j}>{j}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="relationship">Your relationship to Grace <span className="req">*</span></label>
        <select id="relationship" name="relationship" required defaultValue="">
          <option value="" disabled>Pick one</option>
          {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="production">Production name <span className="opt">(if you were added to one)</span></label>
        <input type="text" id="production" name="production" placeholder="Helps us locate your record" autoComplete="organization" />
      </div>

      <div className="form-field">
        <label htmlFor="details">Details of your request <span className="req">*</span></label>
        <textarea id="details" name="details" placeholder="What you want, and any specifics that will help us locate the right record" required rows={6} />
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <span className="form-note">We respond within 30 days as required by law.</span>
        <button type="submit" disabled={status === "submitting"} className="submit-btn">
          {status === "submitting" ? "Sending…" : "Submit request"}
          <span className="arrow">→</span>
        </button>
      </div>

      <style>{`
        .contact-form { display: flex; flex-direction: column; gap: 28px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .form-field { display: flex; flex-direction: column; gap: 10px; }
        .form-field label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-muted); }
        .form-field .req { color: var(--kodachrome); margin-left: 2px; }
        .form-field .opt { color: var(--ink-muted); margin-left: 6px; letter-spacing: 0.18em; }
        .form-field input, .form-field select, .form-field textarea {
          font-family: var(--font-display);
          font-size: 17px;
          color: var(--ink);
          background: var(--paper-warm);
          border: 1px solid var(--paper-edge);
          padding: 14px 16px;
          border-radius: 2px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .form-field textarea { resize: vertical; min-height: 140px; line-height: 1.55; }
        .form-field select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-right: 44px;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%236b5a44' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");
          background-repeat: no-repeat;
          background-position: right 16px center;
          cursor: pointer;
        }
        .form-field input:focus, .form-field select:focus, .form-field textarea:focus {
          border-color: var(--kodachrome);
          background: var(--paper);
        }
        .form-error {
          padding: 14px 16px;
          background: rgba(184, 58, 31, 0.08);
          border: 1px solid var(--kodachrome);
          color: var(--kodachrome);
          font-size: 14px;
          border-radius: 2px;
        }
        .form-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
          gap: 24px;
          flex-wrap: wrap;
        }
        .form-note { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-muted); }
        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .submit-btn:hover:not(:disabled) { background: var(--kodachrome); letter-spacing: 0.32em; }
        .submit-btn:disabled { opacity: 0.6; cursor: wait; }
        .submit-btn .arrow { transition: transform 0.3s ease; }
        .submit-btn:hover:not(:disabled) .arrow { transform: translateX(3px); }

        @media (max-width: 900px) {
          .form-row { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </form>
  )
}
