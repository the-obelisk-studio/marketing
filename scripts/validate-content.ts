// Prebuild hook — parses every content/*.yml against its Zod schema.
// Fails CF Pages build (and local `npm run build`) on schema mismatch
// so a malformed Decap edit can't ship to production.

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { load as parseYaml } from "js-yaml"
import { CONTENT_SCHEMAS, type ContentFile } from "../src/lib/schema"

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

  const errors: string[] = []
  for (const f of files) {
    if (!(f in CONTENT_SCHEMAS)) {
      console.warn(`[validate-content] ${f} has no registered schema — skipping.`)
      continue
    }
    const raw = readFileSync(join(CONTENT_DIR, f), "utf-8")
    let parsed: unknown
    try {
      parsed = parseYaml(raw)
    } catch (e) {
      errors.push(`${f}: YAML parse error — ${(e as Error).message}`)
      continue
    }
    const schema = CONTENT_SCHEMAS[f as ContentFile]
    const result = schema.safeParse(parsed)
    if (!result.success) {
      const issues = result.error.issues
        .map(i => `  · ${i.path.join(".") || "(root)"} — ${i.message}`)
        .join("\n")
      errors.push(`${f}:\n${issues}`)
    } else {
      console.log(`[validate-content] ✓ ${f}`)
    }
  }

  if (errors.length > 0) {
    console.error("\n[validate-content] FAILED:\n")
    for (const e of errors) console.error(e + "\n")
    process.exit(1)
  }
  console.log(`[validate-content] ${files.length} file(s) validated successfully.`)
}

main()
