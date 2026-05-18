/// <reference types="@cloudflare/workers-types" />

// Cloudflare Pages Function — POST /api/privacy-request
//
// Receives data-subject access / correction / deletion / objection
// requests from /privacy/request and forwards them to PRIVACY_TO_EMAIL
// via Resend's HTTP API. Mirrors the /api/contact pattern.
//
// Env vars (set in CF Pages → Settings → Environment variables):
//   - RESEND_API_KEY        Resend API key.
//   - PRIVACY_TO_EMAIL      Where to deliver. Default privacy@theobeliskstudio.com
//   - PRIVACY_FROM_EMAIL    Sender (Resend-verified). Default privacy@theobeliskstudio.com

type Env = {
  RESEND_API_KEY?: string
  PRIVACY_TO_EMAIL?: string
  PRIVACY_FROM_EMAIL?: string
}

type Payload = {
  name?: string
  email?: string
  requestType?: string
  jurisdiction?: string
  relationship?: string
  production?: string
  details?: string
}

const DEFAULT_TO = "privacy@theobeliskstudio.com"
const DEFAULT_FROM = "Obelisk Studios Privacy <privacy@theobeliskstudio.com>"

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!
  ))
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY) {
    return json({ error: "Privacy-request endpoint not configured" }, 500)
  }

  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return json({ error: "Invalid JSON body" }, 400)
  }

  const name = (body.name ?? "").trim()
  const email = (body.email ?? "").trim()
  const requestType = (body.requestType ?? "").trim()
  const jurisdiction = (body.jurisdiction ?? "").trim()
  const relationship = (body.relationship ?? "").trim()
  const production = (body.production ?? "").trim()
  const details = (body.details ?? "").trim()

  if (!name) return json({ error: "Name is required" }, 400)
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Valid email is required" }, 400)
  }
  if (!requestType) return json({ error: "Request type is required" }, 400)
  if (!jurisdiction) return json({ error: "Jurisdiction is required" }, 400)
  if (!relationship) return json({ error: "Relationship is required" }, 400)
  if (!details) return json({ error: "Details are required" }, 400)
  if (details.length > 8000) return json({ error: "Details too long" }, 400)

  const to = env.PRIVACY_TO_EMAIL || DEFAULT_TO
  const from = env.PRIVACY_FROM_EMAIL || DEFAULT_FROM

  const subject = `[Privacy] ${requestType} — ${name}`
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1c1612;background:#f1e8d6;padding:24px;">
      <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.22em;color:#6b5a44;margin-bottom:16px;">OBELISK STUDIOS · PRIVACY / DSAR REQUEST</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#6b5a44;width:160px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Request type</td><td>${escapeHtml(requestType)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Jurisdiction</td><td>${escapeHtml(jurisdiction)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Relationship</td><td>${escapeHtml(relationship)}</td></tr>
        ${production ? `<tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Production</td><td>${escapeHtml(production)}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding:20px;background:#ede2cd;border-left:3px solid #b83a1f;white-space:pre-wrap;line-height:1.6;">${escapeHtml(details)}</div>
      <div style="margin-top:24px;padding:14px 16px;background:#f7f0e0;border:1px dashed #b83a1f;font-size:13px;color:#1c1612;">
        <strong>30-day clock starts on receipt.</strong> Respond from privacy@ — verify identity per the response playbook before disclosing or modifying records.
      </div>
    </div>`

  const text =
    `Obelisk Studios · privacy / DSAR request\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Request type: ${requestType}\n` +
    `Jurisdiction: ${jurisdiction}\n` +
    `Relationship: ${relationship}\n` +
    (production ? `Production: ${production}\n` : "") +
    `\n${details}\n\n` +
    `30-day clock starts on receipt. Verify identity before disclosing or modifying records.\n`

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      html,
      text,
    }),
  })

  if (!resendRes.ok) {
    const err = await resendRes.text().catch(() => "")
    console.error("[privacy-request] Resend send failed:", resendRes.status, err)
    return json({ error: "Failed to send. Email privacy@theobeliskstudio.com directly instead." }, 502)
  }

  return json({ ok: true })
}
