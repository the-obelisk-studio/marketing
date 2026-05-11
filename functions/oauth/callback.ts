/// <reference types="@cloudflare/workers-types" />

// OAuth bridge — callback step. GitHub redirects here after the user
// authorizes. We exchange the code for an access_token, then return
// an HTML page that posts the token back to the Decap window via
// window.postMessage. Standard Decap OAuth handshake:
//
//   1. popup → opener: "authorizing:github"
//   2. opener → popup: any message (we don't read the content)
//   3. popup → opener: "authorization:github:success:{token, provider}"
//
// After (3), Decap reads the token and closes the popup.

type Env = {
  GITHUB_OAUTH_CLIENT_ID?: string
  GITHUB_OAUTH_CLIENT_SECRET?: string
}

const PROVIDER = "github"

function htmlEscape(s: string): string {
  return s.replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!
  ))
}

function renderPopup(payload: string, status: "success" | "error"): Response {
  const body = `<!DOCTYPE html>
<html><head><title>Authorizing…</title></head>
<body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;padding:24px;color:#1c1612;">
<p>Authorizing… you can close this window if it doesn’t close automatically.</p>
<script>
(function() {
  var msg = ${JSON.stringify(`authorization:${PROVIDER}:${status}:${payload}`)};
  function receiveMessage(e) {
    window.opener && window.opener.postMessage(msg, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener && window.opener.postMessage("authorizing:${PROVIDER}", "*");
})();
</script>
</body></html>`
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
    return new Response("OAuth not configured", { status: 500 })
  }

  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  if (!code) {
    return renderPopup(JSON.stringify({ message: "No authorization code returned by GitHub" }), "error")
  }

  let tokenData: { access_token?: string; error?: string; error_description?: string }
  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
      }),
    })
    tokenData = await tokenRes.json() as typeof tokenData
  } catch (err) {
    return renderPopup(JSON.stringify({ message: "GitHub token exchange failed (network)" }), "error")
  }

  if (!tokenData.access_token) {
    const reason = tokenData.error_description || tokenData.error || "no access_token in response"
    return renderPopup(JSON.stringify({ message: htmlEscape(reason) }), "error")
  }

  const payload = JSON.stringify({ provider: PROVIDER, token: tokenData.access_token })
  return renderPopup(payload, "success")
}
