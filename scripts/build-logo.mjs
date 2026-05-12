// Render the Obelisk wordmark as a square logo PNG for use in
// external services (Google OAuth, Stripe billing, Slack, etc.).
//
// Treatment: "Obelisk" in Fraunces 500 + " studio" italic 350 in
// muted ink, paper bg, no border. Direct port of the marketing-site
// nav-mark (src/components/Nav.tsx), scaled up.
//
// No square frame — most platforms apply a circle mask to logos
// (Google account avatars, Slack/Discord, etc.) and an inner square
// border chops weirdly inside the circle crop. Open paper bg crops
// cleanly to a circle.
//
// 512×512 master. Google OAuth requires minimum 120×120 and accepts
// larger; Stripe/Slack/etc. also accept 512+. Consumers downscale.
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
    font-family:'Fraunces',Georgia,serif;
  }
  /* Direct port of Nav.tsx .nav-mark + .nav-mark span — scaled.
     No frame: circle-crop platforms (Google avatars, Slack, etc.)
     chop a square border ugly. */
  .wordmark{
    display:inline-flex;
    align-items:baseline;
    font-family:'Fraunces',Georgia,serif;
    font-size:${Math.round(size * 0.155)}px;
    line-height:1;
    letter-spacing:0.02em;
    /* Safe zone: stay inside the inscribed circle (radius = size/2)
       with a comfortable margin for visual breathing room. */
    max-width:${Math.round(size * 0.78)}px;
    /* Fraunces' line metrics put the cap-top-to-baseline mass in the
       upper portion of the line box, so flex-centering puts the text
       visually above center. Nudge down to optical center.
       Empirically tuned via Playwright screenshots — 5% lands the
       cap-to-baseline midpoint on the canvas center. */
    transform:translateY(${Math.round(size * 0.05)}px);
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
