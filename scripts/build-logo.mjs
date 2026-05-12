// Render the Obelisk monogram as a square logo PNG for use in
// external services (Google OAuth, Stripe billing, Slack, etc.).
//
// The brand mark on the marketing site is the obelisk silhouette, but
// at small square sizes its 1:5.94 aspect ratio renders as a near-
// invisible vertical line. So this logo uses the Fraunces letterform
// "O" as a monogram — instantly recognizable, still tied to the
// wordmark.
//
// We render a single 512×512 master. Google OAuth requires minimum
// 120×120 (not exactly 120) and accepts larger; Stripe/Slack/etc.
// also accept 512+. Downsizing in headless Chrome is unreliable
// because the Fraunces CDN race condition produces inconsistent
// results at small viewports — so we just ship one source-of-truth
// image and let consumers downscale if they need to.
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
    inset:${Math.round(size * 0.06)}px;
    border:1px solid rgba(28,22,18,0.15);
  }
  .monogram{
    font-family:'Fraunces',Georgia,serif;
    font-variation-settings:"opsz" 144, "wght" 480;
    font-weight:480;
    font-size:${Math.round(size * 0.62)}px;
    line-height:1.15;
    color:#1c1612;
    letter-spacing:-0.04em;
    /* Use translate, not margin, so flex centering math stays clean. */
    transform:translateY(${Math.round(size * 0.02)}px);
  }
</style>
</head>
<body>
  <div class="frame"></div>
  <div class="monogram">O</div>
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
