import "server-only"
import { readFileSync } from "fs"
import { resolve, normalize } from "path"

// Build-time only: the Cloudflare Pages deploy is a static export, so
// these reads happen on the build machine, not at request time. Docs
// live in the marketing repo at ./grace-docs/ (merged in from the
// former submodule — single repo, single push to deploy).
const GUIDE_ROOT = resolve(process.cwd(), "grace-docs")

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
