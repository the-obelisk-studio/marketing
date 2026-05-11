// Tiny inline-markdown renderer for the body copy and headlines KK
// authored with *asterisk emphasis*. Splits text into paragraphs on
// blank lines, then renders inline *foo* as <em>foo</em>. Safe — no
// HTML injection; content is YAML, parsed by js-yaml.

import type { ReactNode } from "react"

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*\n]+\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith("*") && p.endsWith("*") && p.length > 2) {
      return <em key={i}>{p.slice(1, -1)}</em>
    }
    return p
  })
}

// Inline (single-line) — for headlines.
export function Inline({ children }: { children: string }) {
  return <>{renderInline(children)}</>
}

// Multi-paragraph body. Splits on blank lines, wraps each in <p>.
export function Body({ children }: { children: string }) {
  const paragraphs = children
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i}>{renderInline(p)}</p>
      ))}
    </>
  )
}
