# Deploy guide — Obelisk Studios marketing site

Code is shipped; the remaining work is Cloudflare-side. Follow this in order.

## 1. Cloudflare Pages project

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorise CF to read the `the-obelisk-studio` GitHub org. Select the `marketing` repo.
3. Build settings:
   - **Framework preset**: Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: leave blank
   - **Node version**: 20 (set under Environment variables → `NODE_VERSION=20`)
4. Click **Save and Deploy**. First build runs; lands on a `<project>.pages.dev` URL.

## 2. Environment variables

CF Pages → Settings → Environment variables. Both Production and Preview need these:

| Key | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_FNWyJ...` | Same key Grace uses (Step 4 of master migration plan). |
| `CONTACT_TO_EMAIL` | `support@theobeliskstudio.com` | Or whichever inbox should receive form submissions. |
| `CONTACT_FROM_EMAIL` | `Obelisk Studios <contact@theobeliskstudio.com>` | Must be a Resend-verified address. |
| `NODE_VERSION` | `20` | |

Save, then trigger a re-deploy.

## 3. Custom domain

1. CF Pages → Settings → **Custom domains** → **Set up a custom domain**.
2. Add `www.theobeliskstudio.com`. CF auto-creates the CNAME (zone already managed by CF per Step 2 of the master plan). HTTPS provisions automatically.
3. Apex redirect: CF dashboard → DNS → add a CNAME `theobeliskstudio.com` → `www.theobeliskstudio.com` (CF Pages handles the redirect when this proxied CNAME hits the Pages project).
   - Alternative: CF Rules → Bulk Redirects → 301 `theobeliskstudio.com/*` → `https://www.theobeliskstudio.com/$1`.

## 4. Branch protection on `main`

GitHub → `the-obelisk-studio/marketing` → Settings → **Branches** → Add rule for `main`:
- Require a pull request before merging
- Dismiss stale reviews when new commits are pushed
- Require status checks to pass (select the CF Pages preview deploy check once it has run once)

This prevents KK from accidentally force-pushing broken state to production.

## 5. Decap CMS OAuth bridge

KK's `/admin/` editor authenticates against GitHub. Decap needs an OAuth proxy at the URL configured in `public/admin/config.yml` (`base_url: https://auth.theobeliskstudio.com`).

Two options, easiest first:

### 5a. Community-hosted bridge (fastest to ship)

Use a community-maintained bridge URL — change `base_url` in `public/admin/config.yml` to one of:
- `https://oauth-bridge-tg.netlify.app` (community-maintained)
- `https://decap-cms-oauth-provider.deno.dev/` (varies)

These come and go; do a fresh search on the Decap docs for the current recommendation. Commit the change to `main`, KK can log in immediately.

### 5b. Self-hosted CF Worker (recommended longer-term)

A small CF Worker (~80 lines) that handles the GitHub OAuth dance. Steps:

1. GitHub → Settings (personal) → Developer settings → **OAuth Apps** → New OAuth App
   - Homepage URL: `https://www.theobeliskstudio.com`
   - Authorization callback URL: `https://auth.theobeliskstudio.com/callback`
   - Note the Client ID + Client Secret.
2. CF dashboard → Workers & Pages → **Create Worker**. Name: `decap-oauth-bridge`.
3. Paste the canonical Decap GitHub-OAuth worker code (search "Decap CMS GitHub OAuth Cloudflare Worker"). Set secrets:
   - `OAUTH_CLIENT_ID` (GitHub App Client ID)
   - `OAUTH_CLIENT_SECRET` (GitHub App Client Secret)
4. Bind the worker to `auth.theobeliskstudio.com` via CF Workers Routes.
5. Test: open `https://www.theobeliskstudio.com/admin/`, click Login with GitHub. Should land back on `/admin/` authenticated.

Once auth works, KK can edit any page's YAML via the WYSIWYG editor + click Publish. CF Pages rebuilds within ~30s.

## 6. KK onboarding (one-time)

Walk KK through the workflow over screen-share. He needs to:

1. Create a GitHub account if he doesn't have one (`kshitij-kapil` or similar).
2. Accept the org invite Sid sends from `the-obelisk-studio` (Member role, `marketing` repo write access).
3. **Content editing path**: bookmark `https://www.theobeliskstudio.com/admin/`. Log in once with GitHub. Done — that's his content tool from now on.
4. **Design editing path** (optional, only if he wants to tweak design): install Claude Code, clone the repo, walk through one full prompt → branch → PR → merge cycle. See README.md for the workflow.

## 7. Post-launch checks

- [ ] `https://www.theobeliskstudio.com` returns 200 + valid TLS
- [ ] All 5 pages render: `/`, `/partnership/`, `/post/`, `/grace/`, `/contact/`
- [ ] Apex redirect: `curl -I https://theobeliskstudio.com` → 301 → `https://www.theobeliskstudio.com`
- [ ] Contact form submits and a test email arrives in `support@theobeliskstudio.com`
- [ ] KK can log into `/admin/`, edit a string in `content/index.yml`, click Publish, and the change appears live within ~60s
- [ ] Bad Decap edit fails the build (sanity test: remove a required field, save, watch CF Pages build fail loudly)
