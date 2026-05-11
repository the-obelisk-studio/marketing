"use client"

// Contact form — client component. Submits to /api/contact (CF Pages
// Function landing in commit 6). Until that ships, falls back to a
// mailto: link for hello@theobeliskstudio.com.

import { useState } from "react"

type Status = "idle" | "submitting" | "success" | "error"

type Props = { topics: string[] }

export function ContactForm({ topics }: Props) {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setError(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())

    try {
      const res = await fetch("/api/contact", {
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
        <div className="success-eyebrow">Message received</div>
        <h3 className="success-title">Thanks. We'll be <em>in touch.</em></h3>
        <p className="success-body">
          Your message landed in our inbox. We'll respond within a few days, usually faster. If it's urgent, you can also reach us directly at <a href="mailto:hello@theobeliskstudio.com" style={{ color: "var(--kodachrome)", textDecoration: "underline" }}>hello@theobeliskstudio.com</a>.
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
        <label htmlFor="topic">I'm reaching out about <span className="req">*</span></label>
        <select id="topic" name="topic" required defaultValue="">
          <option value="" disabled>Pick one</option>
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="project">Production or project name <span className="opt">— optional</span></label>
        <input type="text" id="project" name="project" placeholder="If applicable" autoComplete="organization" />
      </div>

      <div className="form-field">
        <label htmlFor="message">Message <span className="req">*</span></label>
        <textarea id="message" name="message" placeholder="What you're working on, what you need, when you need it by" required rows={6} />
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <span className="form-note">We read every message ourselves.</span>
        <button type="submit" disabled={status === "submitting"} className="submit-btn">
          {status === "submitting" ? "Sending…" : "Send message"}
          <span className="arrow">→</span>
        </button>
      </div>

      <style>{`
        .contact-form { display: flex; flex-direction: column; gap: 28px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .form-field { display: flex; flex-direction: column; gap: 10px; }
        .form-field label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-muted); }
        .form-field .req { color: var(--kodachrome); margin-left: 2px; }
        .form-field .opt { color: var(--ink-faint); margin-left: 6px; letter-spacing: 0.18em; }
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
