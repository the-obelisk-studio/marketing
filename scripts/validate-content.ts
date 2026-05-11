// Prebuild hook — parses every content/*.yml against its Zod schema.
// Fails CF Pages build (and local `npm run build`) on schema mismatch
// so a malformed Decap edit can't ship to production.
//
// Stub for commit 1 — real schemas land in commit 2 and this script
// will iterate `content/*.yml` and validate. For now it just succeeds.

import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const CONTENT_DIR = join(process.cwd(), "content")

function main() {
  if (!existsSync(CONTENT_DIR)) {
    console.log("[validate-content] No content/ directory yet — skipping.")
    return
  }
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith(".yml") || f.endsWith(".yaml"))
  if (files.length === 0) {
    console.log("[validate-content] content/ is empty — skipping.")
    return
  }
  console.log(`[validate-content] Found ${files.length} file(s); schemas not yet wired (commit 2).`)
}

main()
