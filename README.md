# Obelisk Studio marketing site

Live at https://www.theobeliskstudio.com (post-deploy).

Static Next.js export, deployed via Cloudflare Pages. Content lives in
`content/*.yml` and is edited via the Decap CMS admin at `/admin/`
(post-Decap commit).

## For Sid (dev work)

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

Pre-build runs `scripts/validate-content.ts` which Zod-validates every
`content/*.yml` against `src/lib/schema.ts`. Schema mismatch fails the
build — so a broken Decap commit gets caught before it ships.

## For KK (content editing)

Open https://www.theobeliskstudio.com/admin/ and log in with GitHub.
Edit copy / images / lists / structured cards via the WYSIWYG editor.
Click Publish. The site rebuilds and updates within ~30 seconds.

## For KK (design changes)

Run Claude Code in this repo (Sid sets this up once):
```
cd ~/marketing
claude
```
Prompt in plain English. Claude edits components + tokens, runs the
dev server for preview. When you're happy, ask Claude to commit on a
branch and push. Open the PR on GitHub, review the CF Pages preview
URL, click Merge.

## Repo structure

- `src/app/` — Next.js pages
- `src/components/` — shared layout primitives
- `src/lib/` — design tokens, content loader, Zod schemas
- `content/` — editable YAML (DO NOT edit directly — use Decap)
- `public/admin/` — Decap CMS shell + config
- `functions/api/contact.ts` — CF Pages Function for the contact form
