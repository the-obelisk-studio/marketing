import "server-only"
import { existsSync, readFileSync } from "fs"
import { resolve, normalize } from "path"

// Build-time only: the Cloudflare Pages deploy is a static export, so
// these reads happen on the build machine, not at request time.
//
// Lookup order:
//   1. GRACE_DOCS_PATH env var (escape hatch).
//   2. ./grace-docs/ inside the marketing repo (git submodule — the
//      shape Cloudflare Pages expects when --recurse-submodules is on).
//   3. ../grace-docs/ sibling worktree (local dev on Sid's machine).
function resolveGuideRoot(): string {
  if (process.env.GRACE_DOCS_PATH) return resolve(process.env.GRACE_DOCS_PATH)
  const inRepo = resolve(process.cwd(), "grace-docs")
  if (existsSync(inRepo)) return inRepo
  return resolve(process.cwd(), "..", "grace-docs")
}

const GUIDE_ROOT = resolveGuideRoot()

export function loadMarkdownSync(relativePath: string): string | null {
  // Guard against path traversal — the resolved absolute path must
  // stay under GUIDE_ROOT.
  const absolute = normalize(resolve(GUIDE_ROOT, relativePath))
  if (!absolute.startsWith(GUIDE_ROOT)) return null
  try {
    return readFileSync(absolute, "utf8")
  } catch {
    return null
  }
}
