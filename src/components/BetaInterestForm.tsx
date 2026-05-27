"use client"

// Beta interest form. Posts directly to the Grace API ingest endpoint
// (NEXT_PUBLIC_GRACE_API_URL + /api/beta-interest). The Grace side
// owns CORS, validation, and the lead row insert (source='interest_form').
//
// Anti-spam: honeypot field (hidden 'company' input) + optional
// Cloudflare Turnstile widget when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
// In dev (no Turnstile key configured), the widget is skipped and the
// Grace endpoint accepts without a captcha token.

import { useEffect, useRef, useState } from "react"

type Status = "idle" | "submitting" | "success" | "error"

const ROLES = [
  "1st AD",
  "2nd AD",
  "Producer / Line Producer / UPM",
  "Production Coordinator",
  "Director",
  "DP / Cinematographer",
  "Script Supervisor",
  "Production Designer",
  "Editor",
  "Post Supervisor",
  "Other",
] as const

const STAGES = [
  "In pre-production",
  "Currently shooting",
  "In post",
  "Between projects",
] as const

const TOOLS = [
  "Movie Magic (Scheduling / Budgeting)",
  "StudioBinder",
  "Filmustage",
  "Saturation.io",
  "Spreadsheets + PDFs",
  "Nothing structured",
  "Other",
] as const

const GRACE_API = process.env.NEXT_PUBLIC_GRACE_API_URL ?? "https://app.theobeliskstudio.com"
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: {
        sitekey: string
        callback: (token: string) => void
        "error-callback"?: () => void
        "expired-callback"?: () => void
        theme?: "light" | "dark" | "auto"
      }) => string
      reset: (widgetId?: string) => void
    }
    onloadTurnstileCallback?: () => void
  }
}

export function BetaInterestForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<string>("")
  const [roleOther, setRoleOther] = useState("")
  const [country, setCountry] = useState("")
  const [stage, setStage] = useState<string>("")
  const [toolsToday, setToolsToday] = useState<string[]>([])
  const [toolsOther, setToolsOther] = useState("")
  const [recentCredit, setRecentCredit] = useState("")
  const [biggestPain, setBiggestPain] = useState("")
  // Honeypot. Non-semantic name so Chrome / password managers don't
  // autofill it (which would silently kill real submissions).
  const [hpField, setHpField] = useState("")

  // Turnstile widget
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string>("")

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return
    if (typeof window === "undefined") return

    function render() {
      if (!turnstileRef.current || !window.turnstile || widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t: string) => setTurnstileToken(t),
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
        theme: "light",
      })
    }

    if (window.turnstile) {
      render()
    } else {
      window.onloadTurnstileCallback = render
      const existing = document.querySelector('script[data-turnstile]')
      if (!existing) {
        const s = document.createElement("script")
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        s.async = true
        s.defer = true
        s.setAttribute("data-turnstile", "1")
        document.head.appendChild(s)
      }
    }
  }, [])

  function toggleTool(t: string) {
    setToolsToday(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setError(null)

    const payload = {
      name: name.trim(),
      email: email.trim(),
      role,
      roleOther: role === "Other" ? roleOther.trim() : "",
      country: country.trim(),
      stage,
      toolsToday,
      toolsOther: toolsToday.includes("Other") ? toolsOther.trim() : "",
      recentCredit: recentCredit.trim(),
      biggestPain: biggestPain.trim(),
      _hp_grace: hpField,       // honeypot — Grace silently 200s if non-empty
      turnstileToken,
    }

    try {
      const res = await fetch(`${GRACE_API}/api/beta-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string }
        setError(humanError(body?.error) || `Submit failed (${res.status})`)
        setStatus("error")
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current)
          setTurnstileToken("")
        }
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
        <div className="success-eyebrow">Interest received</div>
        <h3 className="success-title">Thanks. We'll be <em>in touch.</em></h3>
        <p className="success-body">
          Your interest is logged. If you're a fit for the closed beta we'll send your access link from{" "}
          <a href="mailto:invites@theobeliskstudio.com" style={{ color: "var(--kodachrome)", textDecoration: "underline" }}>
            invites@theobeliskstudio.com
          </a>{" "}
          — usually within a few days.
        </p>

        <style>{successStyles}</style>
      </div>
    )
  }

  return (
    <form className="beta-form" onSubmit={handleSubmit}>
      {/* Honeypot. Non-semantic name + autocomplete=off + tabIndex=-1.
          Chrome will autofill anything it recognizes (name, email,
          company, etc.) regardless of autocomplete=off, so the field
          name has to be something it doesn't pattern-match. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="_hp_grace">Leave this empty</label>
        <input
          type="text"
          id="_hp_grace"
          name="_hp_grace"
          tabIndex={-1}
          autoComplete="off"
          value={hpField}
          onChange={e => setHpField(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Full name <span className="req">*</span></label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" maxLength={200} />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email <span className="req">*</span></label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" maxLength={200} />
          <div className="field-hint">Use your production / work email if you have one.</div>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="role">Role <span className="req">*</span></label>
        <select id="role" value={role} onChange={e => setRole(e.target.value)} required>
          <option value="" disabled>Pick one</option>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {role === "Other" && (
          <input
            type="text"
            value={roleOther}
            onChange={e => setRoleOther(e.target.value)}
            placeholder="What role do you fill?"
            required
            maxLength={200}
            style={{ marginTop: 10 }}
          />
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="country">Country / region <span className="req">*</span></label>
          <input type="text" id="country" value={country} onChange={e => setCountry(e.target.value)} placeholder="e.g. United States · Los Angeles" required autoComplete="country" maxLength={100} />
        </div>
        <div className="form-field">
          <label>Current stage <span className="req">*</span></label>
          <div className="radio-group">
            {STAGES.map(s => (
              <label key={s} className="radio-row">
                <input type="radio" name="stage" value={s} checked={stage === s} onChange={() => setStage(s)} required />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="divider">
        <span>Optional — high-signal</span>
      </div>

      <div className="form-field">
        <label>What you use today <span className="opt">— optional, pick any</span></label>
        <div className="checkbox-grid">
          {TOOLS.map(t => (
            <label key={t} className="checkbox-row">
              <input type="checkbox" checked={toolsToday.includes(t)} onChange={() => toggleTool(t)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
        {toolsToday.includes("Other") && (
          <input
            type="text"
            value={toolsOther}
            onChange={e => setToolsOther(e.target.value)}
            placeholder="What else do you use?"
            maxLength={200}
            style={{ marginTop: 12 }}
          />
        )}
      </div>

      <div className="form-field">
        <label htmlFor="recentCredit">Recent credit or IMDB link <span className="opt">— optional</span></label>
        <input
          type="text"
          id="recentCredit"
          value={recentCredit}
          onChange={e => setRecentCredit(e.target.value)}
          placeholder="One title, or an IMDB URL"
          maxLength={500}
        />
      </div>

      <div className="form-field">
        <label htmlFor="biggestPain">What's your biggest pain in production management right now? <span className="opt">— optional</span></label>
        <textarea
          id="biggestPain"
          value={biggestPain}
          onChange={e => setBiggestPain(e.target.value)}
          placeholder="One or two lines is fine."
          rows={3}
          maxLength={2000}
        />
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="turnstile-wrap">
          <div ref={turnstileRef} />
        </div>
      )}

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <span className="form-note">We read every submission ourselves.</span>
        <button
          type="submit"
          disabled={status === "submitting" || (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)}
          className="submit-btn"
        >
          {status === "submitting" ? "Sending…" : "Request beta access"}
          <span className="arrow">→</span>
        </button>
      </div>

      <style>{formStyles}</style>
    </form>
  )
}

function humanError(code: string | undefined): string | null {
  if (!code) return null
  const map: Record<string, string> = {
    name_required: "Please enter your full name.",
    invalid_email: "Please enter a valid email address.",
    invalid_role: "Please pick a role from the list.",
    role_other_required: "Please tell us what role you fill.",
    country_required: "Please enter your country or region.",
    invalid_stage: "Please pick your current stage.",
    captcha_failed: "Captcha check failed — please retry.",
    forbidden_origin: "This form can't submit from this origin.",
    server_error: "Something went wrong on our end. Please try again.",
  }
  return map[code] ?? null
}

const formStyles = `
  .beta-form { display: flex; flex-direction: column; gap: 28px; position: relative; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .form-field { display: flex; flex-direction: column; gap: 10px; }
  .form-field label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-muted); }
  .form-field .req { color: var(--kodachrome); margin-left: 2px; }
  .form-field .opt { color: var(--ink-muted); margin-left: 6px; letter-spacing: 0.18em; font-size: 9px; }
  .field-hint { font-family: var(--font-display); font-size: 13px; color: var(--ink-muted); margin-top: -2px; line-height: 1.4; }
  .form-field input[type="text"], .form-field input[type="email"], .form-field select, .form-field textarea {
    font-family: var(--font-display);
    font-size: 17px;
    color: var(--ink);
    background: var(--paper-warm);
    border: 1px solid var(--paper-edge);
    padding: 14px 16px;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;
    width: 100%;
    box-sizing: border-box;
  }
  .form-field textarea { resize: vertical; min-height: 96px; line-height: 1.55; }
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
  .radio-group, .checkbox-grid { display: flex; flex-direction: column; gap: 10px; padding: 4px 0; }
  .checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; }
  .radio-row, .checkbox-row {
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-display); font-size: 16px; color: var(--ink);
    cursor: pointer; line-height: 1.4;
  }
  .radio-row input, .checkbox-row input {
    accent-color: var(--kodachrome);
    width: 18px; height: 18px; cursor: pointer; flex-shrink: 0;
  }

  .divider {
    display: flex; align-items: center; gap: 18px;
    margin: 8px 0 4px;
    color: var(--ink-muted);
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
  }
  .divider::before, .divider::after {
    content: ""; flex: 1; height: 1px; background: var(--paper-edge);
  }

  .turnstile-wrap { display: flex; justify-content: flex-start; margin-top: 4px; }

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
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .submit-btn .arrow { transition: transform 0.3s ease; }
  .submit-btn:hover:not(:disabled) .arrow { transform: translateX(3px); }

  @media (max-width: 900px) {
    .form-row { grid-template-columns: 1fr; gap: 24px; }
    .checkbox-grid { grid-template-columns: 1fr; }
  }
`

const successStyles = `
  .form-success { padding: 48px 0; }
  .success-eyebrow { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--kodachrome); margin-bottom: 18px; }
  .success-title { font-family: var(--font-display); font-size: clamp(36px, 5vw, 64px); color: var(--ink); margin-bottom: 20px; line-height: 1.05; }
  .success-title em { font-style: italic; }
  .success-body { font-family: var(--font-display); font-size: 17px; line-height: 1.65; color: var(--ink-soft); max-width: 56ch; }
`
