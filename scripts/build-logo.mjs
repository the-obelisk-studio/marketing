// Render the Obelisk wordmark as a square logo PNG for use in
// external services (Google OAuth, Stripe billing, Slack, etc.).
//
// Uses the same treatment as the marketing-site nav: "Obelisk" in
// Fraunces 500 + " studio" italic 350 in muted ink, paper bg, thin
// frame. Direct port of src/components/Nav.tsx's .nav-mark styling,
// scaled up to fit a 512×512 square with comfortable padding.
//
// Earlier iterations tried a standalone "O" monogram — looked
// generic. The full wordmark is more on-brand and still legible at
// the smallest sizes downstream services will downscale to.
//
// We render a single 512×512 master. Google OAuth requires minimum
// 120×120 (not exactly 120) and accepts larger; Stripe/Slack/etc.
// also accept 512+. Consumers downscale.
//
// Re-run when branding changes:
//   node scripts/build-logo.mjs

import { writeFileSync, mkdirSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, "..")
const OUT_DIR = join(REPO_ROOT, "public")

const TARGETS = [
  { size: 512, name: "logo.png" },
]

const HTML = (size) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>logo</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,360..520;1,9..144,320..420&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:${size}px;height:${size}px;overflow:hidden}
  body{
    background:#f1e8d6;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    font-family:'Fraunces',Georgia,serif;
  }
  .frame{
    position:absolute;
    inset:${Math.round(size * 0.07)}px;
    border:1px solid rgba(28,22,18,0.15);
  }
  /* Direct port of Nav.tsx .nav-mark + .nav-mark span — scaled. */
  .wordmark{
    display:inline-flex;
    align-items:baseline;
    font-family:'Fraunces',Georgia,serif;
    font-size:${Math.round(size * 0.14)}px;
    line-height:1;
    letter-spacing:0.02em;
  }
  .wordmark-main{
    font-variation-settings:"opsz" 96, "wght" 500;
    font-weight:500;
    color:#1c1612;
  }
  .wordmark-italic{
    font-variation-settings:"opsz" 96, "wght" 350;
    font-weight:350;
    font-style:italic;
    color:#6b5a44;
    margin-left:0.18em;
  }
</style>
</head>
<body>
  <div class="frame"></div>
  <div class="wordmark">
    <span class="wordmark-main">Obelisk</span>
    <span class="wordmark-italic">studio</span>
  </div>
</body>
</html>
`

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const CHROME = process.env.CHROME_PATH || "google-chrome"

for (const t of TARGETS) {
  const tmpHtml = join(tmpdir(), `obelisk-logo-${t.size}-${process.pid}.html`)
  writeFileSync(tmpHtml, HTML(t.size), "utf-8")
  const outPath = join(OUT_DIR, t.name)
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    `--window-size=${t.size},${t.size}`,
    `--screenshot=${outPath}`,
    // Bigger time budget than build-og to let Fraunces variable font
    // actually load — small file but external CDN fetch.
    "--virtual-time-budget=5000",
    `file://${tmpHtml}`,
  ]
  console.log(`→ rendering ${outPath} at ${t.size}×${t.size}`)
  execFileSync(CHROME, args, { stdio: "inherit" })
  console.log(`✓ wrote ${outPath}`)
}
