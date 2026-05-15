#!/usr/bin/env node
// Copy the guide image tree from ../grace-docs/img/ into
// public/grace/guide/img/ so that the static build references images
// at predictable URLs under /grace/guide/img/.
//
// Idempotent: removes the public destination first, then copies.

import { cpSync, existsSync, rmSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, "..")

// Mirror the lookup order in src/lib/guide/load-markdown.ts.
function resolveGuideRoot() {
  if (process.env.GRACE_DOCS_PATH) return resolve(process.env.GRACE_DOCS_PATH)
  const inRepo = resolve(REPO_ROOT, "grace-docs")
  if (existsSync(inRepo)) return inRepo
  return resolve(REPO_ROOT, "..", "grace-docs")
}

const SRC = resolve(resolveGuideRoot(), "img")
const DST = resolve(REPO_ROOT, "public", "grace", "guide", "img")

if (!existsSync(SRC)) {
  console.warn(`[copy-guide-assets] No grace-docs/img/ at ${SRC} — skipping. Guide images will 404.`)
  process.exit(0)
}

if (existsSync(DST)) rmSync(DST, { recursive: true, force: true })
mkdirSync(DST, { recursive: true })
cpSync(SRC, DST, { recursive: true })
console.log(`[copy-guide-assets] Copied ${SRC} → ${DST}`)
