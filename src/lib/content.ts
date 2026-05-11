// Content loader. Reads YAML from /content, parses with js-yaml,
// validates against the matching Zod schema. Throws on validation
// failure so a malformed file fails the build (caught by prebuild
// validation script before it reaches Next's static-export step).

import { readFileSync } from "node:fs"
import { join } from "node:path"
import { load as parseYaml } from "js-yaml"
import { z } from "zod"
import { CONTENT_SCHEMAS, type ContentFile } from "./schema"

const CONTENT_DIR = join(process.cwd(), "content")

export function loadContent<F extends ContentFile>(
  file: F,
): z.infer<(typeof CONTENT_SCHEMAS)[F]> {
  const path = join(CONTENT_DIR, file)
  const raw = readFileSync(path, "utf-8")
  const parsed = parseYaml(raw)
  const schema = CONTENT_SCHEMAS[file]
  return schema.parse(parsed) as z.infer<(typeof CONTENT_SCHEMAS)[F]>
}
