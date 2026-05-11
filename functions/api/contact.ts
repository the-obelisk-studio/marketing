/// <reference types="@cloudflare/workers-types" />

// Cloudflare Pages Function — POST /api/contact
//
// Receives form submissions from /contact and forwards them to
// CONTACT_TO_EMAIL via Resend's HTTP API. CF Pages Functions run on
// the Workers runtime; we use fetch() rather than the @resend/node
// SDK to avoid bundling Node-only modules.
//
// Env vars (set in CF Pages → Settings → Environment variables):
//   - RESEND_API_KEY        Resend API key (same one used by Grace)
//   - CONTACT_TO_EMAIL      Where to deliver. Default support@theobeliskstudio.com
//   - CONTACT_FROM_EMAIL    Sender (must be a Resend-verified address).
//                            Default contact@theobeliskstudio.com

type Env = {
  RESEND_API_KEY?: string
  CONTACT_TO_EMAIL?: string
  CONTACT_FROM_EMAIL?: string
}

type Payload = {
  name?: string
  email?: string
  topic?: string
  project?: string
  message?: string
}

const DEFAULT_TO = "support@theobeliskstudio.com"
const DEFAULT_FROM = "Obelisk Studios <contact@theobeliskstudio.com>"

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
    return json({ error: "Contact endpoint not configured" }, 500)
  }

  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return json({ error: "Invalid JSON body" }, 400)
  }

  const name = (body.name ?? "").trim()
  const email = (body.email ?? "").trim()
  const topic = (body.topic ?? "").trim()
  const message = (body.message ?? "").trim()
  const project = (body.project ?? "").trim()

  if (!name) return json({ error: "Name is required" }, 400)
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Valid email is required" }, 400)
  }
  if (!topic) return json({ error: "Topic is required" }, 400)
  if (!message) return json({ error: "Message is required" }, 400)
  if (message.length > 8000) return json({ error: "Message too long" }, 400)

  const to = env.CONTACT_TO_EMAIL || DEFAULT_TO
  const from = env.CONTACT_FROM_EMAIL || DEFAULT_FROM

  const subject = `[Obelisk] ${topic} — ${name}`
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1c1612;background:#f1e8d6;padding:24px;">
      <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.22em;color:#6b5a44;margin-bottom:16px;">OBELISK STUDIOS · CONTACT FORM</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#6b5a44;width:120px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Topic</td><td>${escapeHtml(topic)}</td></tr>
        ${project ? `<tr><td style="padding:6px 0;color:#6b5a44;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">Project</td><td>${escapeHtml(project)}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding:20px;background:#ede2cd;border-left:3px solid #b83a1f;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</div>
    </div>`

  const text =
    `Obelisk Studios · contact form\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Topic: ${topic}\n` +
    (project ? `Project: ${project}\n` : "") +
    `\n${message}\n`

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
    console.error("[contact] Resend send failed:", resendRes.status, err)
    return json({ error: "Failed to send. Email us directly instead." }, 502)
  }

  return json({ ok: true })
}
