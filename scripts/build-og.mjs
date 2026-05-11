// Render the social-share OG card to public/og.png.
//
// Approach: write a minimal HTML template into a temp file, then
// shell out to system Chrome in headless mode for a 1200x630
// screenshot. No Puppeteer dependency — keeps the marketing repo's
// node_modules small (CF Pages free-tier build minutes care).
//
// Re-run when brand strings change:
//   node scripts/build-og.mjs

import { writeFileSync, mkdirSync, existsSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, "..")
const OUT_PATH = join(REPO_ROOT, "public", "og.png")
const TEMPLATE_PATH = join(tmpdir(), `obelisk-og-${process.pid}.html`)

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>og</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,360..520;1,9..144,320..420&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html,body{width:1200px;height:630px;overflow:hidden}
  body{
    background:#f1e8d6;
    color:#1c1612;
    font-family:'Fraunces',Georgia,serif;
    position:relative;
  }
  /* Subtle grain */
  body::before{
    content:"";
    position:absolute;inset:-5%;
    pointer-events:none;
    opacity:.28;
    mix-blend-mode:multiply;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.11 0 0 0 0 0.085 0 0 0 0 0.07 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }
  /* Vignette */
  body::after{
    content:"";
    position:absolute;inset:0;
    pointer-events:none;
    background:radial-gradient(ellipse 95% 65% at 50% 50%, transparent 35%, rgba(28,22,18,0.18) 100%);
  }
  .frame{
    position:absolute;
    inset:48px;
    border:1px solid rgba(28,22,18,0.18);
    padding:64px 80px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .reg{
    position:absolute;
    width:14px;height:14px;
    border:1px solid #1c1612;
    border-radius:50%;
  }
  .reg.tl{top:-7px;left:-7px}
  .reg.tr{top:-7px;right:-7px}
  .reg.bl{bottom:-7px;left:-7px}
  .reg.br{bottom:-7px;right:-7px}
  .reg::after{
    content:"";
    position:absolute;
    top:50%;left:50%;
    width:2px;height:2px;
    background:#1c1612;
    transform:translate(-50%,-50%);
    border-radius:50%;
  }
  .meta{
    font-family:'DM Mono',monospace;
    font-size:14px;
    letter-spacing:0.22em;
    text-transform:uppercase;
    color:#6b5a44;
    display:flex;
    align-items:center;
    gap:16px;
  }
  .meta .dash{width:48px;height:1px;background:#a8967c}
  .wordmark{
    font-family:'Fraunces',serif;
    font-variation-settings:"opsz" 144, "wght" 480;
    font-weight:480;
    font-size:200px;
    line-height:0.86;
    letter-spacing:-0.025em;
    color:#1c1612;
  }
  .wordmark-sub{
    font-family:'Fraunces',serif;
    font-variation-settings:"opsz" 60, "wght" 320;
    font-style:italic;
    font-weight:320;
    font-size:48px;
    color:#3d322a;
    margin-top:8px;
    margin-left:6px;
    letter-spacing:0.01em;
  }
  .tagline{
    font-family:'Fraunces',serif;
    font-variation-settings:"opsz" 22, "wght" 400;
    font-size:22px;
    line-height:1.5;
    color:#3d322a;
    max-width:680px;
  }
  .obelisk{
    position:absolute;
    right:70px;
    top:50%;
    transform:translateY(-50%);
    width:48px;
    height:280px;
    opacity:0.08;
  }
  .footer{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    font-family:'DM Mono',monospace;
    font-size:13px;
    letter-spacing:0.22em;
    text-transform:uppercase;
    color:#6b5a44;
  }
  .footer .accent{color:#b83a1f}
</style>
</head>
<body>
  <svg class="obelisk" viewBox="0 0 64 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M32 0 L48 56 L18 56 Z M18 56 L48 56 L46 380 L20 380 Z" fill="#1c1612"/>
  </svg>
  <div class="frame">
    <span class="reg tl"></span>
    <span class="reg tr"></span>
    <span class="reg bl"></span>
    <span class="reg br"></span>

    <div class="meta">
      <span>Burbank · Los Angeles</span>
      <span class="dash"></span>
      <span>Est. 2026</span>
    </div>

    <div>
      <div class="wordmark">Obelisk</div>
      <div class="wordmark-sub">studio</div>
      <div class="tagline" style="margin-top:36px;">
        An independent studio of working filmmakers — building tools and finishing pictures.
      </div>
    </div>

    <div class="footer">
      <span>theobeliskstudio.com</span>
      <span class="accent">● Studio · Software · Post</span>
    </div>
  </div>
</body>
</html>
`

writeFileSync(TEMPLATE_PATH, HTML, "utf-8")

if (!existsSync(dirname(OUT_PATH))) {
  mkdirSync(dirname(OUT_PATH), { recursive: true })
}

const CHROME = process.env.CHROME_PATH || "google-chrome"
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  "--default-background-color=00000000",
  "--window-size=1200,630",
  `--screenshot=${OUT_PATH}`,
  "--virtual-time-budget=4000",
  `file://${TEMPLATE_PATH}`,
]

console.log(`→ rendering ${OUT_PATH} via ${CHROME}`)
execFileSync(CHROME, args, { stdio: "inherit" })
console.log(`✓ wrote ${OUT_PATH}`)
