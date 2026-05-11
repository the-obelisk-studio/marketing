/// <reference types="@cloudflare/workers-types" />

// OAuth bridge — auth step. Decap CMS opens a popup pointed at
// /oauth/auth?provider=github&scope=repo. We redirect the popup to
// GitHub's authorize endpoint with our OAuth App's client_id and
// the callback URL pointing back at /oauth/callback.

type Env = {
  GITHUB_OAUTH_CLIENT_ID?: string
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.GITHUB_OAUTH_CLIENT_ID) {
    return new Response("OAuth not configured (missing GITHUB_OAUTH_CLIENT_ID)", { status: 500 })
  }

  const url = new URL(request.url)
  const scope = url.searchParams.get("scope") || "repo,user"
  const state = crypto.randomUUID()

  const gh = new URL("https://github.com/login/oauth/authorize")
  gh.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID)
  gh.searchParams.set("redirect_uri", `${url.origin}/oauth/callback/`)
  gh.searchParams.set("scope", scope)
  gh.searchParams.set("state", state)

  return Response.redirect(gh.toString(), 302)
}
