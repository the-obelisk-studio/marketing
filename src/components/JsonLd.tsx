// Inline JSON-LD <script> for structured data. Server-rendered so
// crawlers see it on first byte. Use one <JsonLd> per schema entity
// (Google's docs prefer separate blocks over a single @graph array
// for simple cases like ours).

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered string; the input is a typed object we control.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
