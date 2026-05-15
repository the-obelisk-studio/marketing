import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import type { Metadata } from "next"
import { loadMarkdownSync } from "@/lib/guide/load-markdown"
import { GUIDE_TREE, findEntry, siblings } from "@/lib/guide/tree"
import { pageMetadata } from "@/lib/seo"

// Static-export catch-all. generateStaticParams emits one route per
// GUIDE_TREE entry; the build runs at deploy time on Cloudflare Pages,
// so the markdown reads happen there and the output is plain HTML.

export const dynamicParams = false

export function generateStaticParams() {
  return GUIDE_TREE.flatMap(section =>
    section.items.map(item => ({
      slug: item.slug === "" ? [] : item.slug.split("/"),
    })),
  )
}

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugParts } = await params
  const slug = (slugParts ?? []).join("/")
  const entry = findEntry(slug)
  const title = entry ? `${entry.title} · Grace Guide` : "Grace Guide"
  return pageMetadata({
    title,
    description:
      "Grace Production OS user guide — workflows, role quickstarts, and feature reference for the production OS Obelisk runs on.",
    path: `/grace/guide${slug ? "/" + slug : ""}/`,
  })
}

export default async function GuidePage({ params }: PageProps) {
  const { slug: slugParts } = await params
  const slug = (slugParts ?? []).join("/")
  const entry = findEntry(slug)

  if (!entry) {
    return (
      <GuideShell slug={slug}>
        <div className="guide-missing">
          <h1>Page not found</h1>
          <p>
            No guide page at <code>/grace/guide/{slug}</code>.
          </p>
          <p>
            <Link href="/grace/guide/">← Back to the overview</Link>
          </p>
        </div>
      </GuideShell>
    )
  }

  const source = loadMarkdownSync(entry.file)
  if (!source) {
    return (
      <GuideShell slug={slug}>
        <div className="guide-missing">
          <h1>Content not available</h1>
          <p>
            This doc exists in the table of contents but its content wasn&rsquo;t
            available at build time.
          </p>
          <p>
            <Link href="/grace/guide/">← Back to the overview</Link>
          </p>
        </div>
      </GuideShell>
    )
  }

  const { prev, next } = siblings(entry.slug)

  return (
    <GuideShell slug={slug}>
      <article className="guide-article">
        <MarkdownRender source={source} />

        <nav className="guide-pager">
          {prev ? (
            <Link href={`/grace/guide${prev.slug ? "/" + prev.slug : ""}/`}>
              <div className="guide-pager-direction">← Previous</div>
              <div className="guide-pager-title">{prev.title}</div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/grace/guide${next.slug ? "/" + next.slug : ""}/`}
              className="guide-pager-next"
            >
              <div className="guide-pager-direction">Next →</div>
              <div className="guide-pager-title">{next.title}</div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </GuideShell>
  )
}

// Sidebar TOC + content column. Marketing site's Nav + Footer wrap
// from the root layout — this just owns the body grid.
function GuideShell({ children }: { slug: string; children: React.ReactNode }) {
  return (
    <main className="guide-body">
      <aside className="guide-sidebar">
        {GUIDE_TREE.map(section => (
          <div key={section.label} className="guide-sidebar-section">
            <div className="guide-sidebar-label">{section.label}</div>
            <ul>
              {section.items.map(item => (
                <li key={item.slug}>
                  <Link href={`/grace/guide${item.slug ? "/" + item.slug : ""}/`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <div className="guide-main">{children}</div>

      <style>{GUIDE_CSS}</style>
    </main>
  )
}

// Markdown components — rewrite image refs from grace-docs's relative
// 'img/...' paths to the public /grace/guide/img/ tree the build copies
// them into. Internal '.md' links route through Next as /grace/guide/...
function MarkdownRender({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={{
        img(props) {
          const src = typeof props.src === "string" ? props.src : ""
          const normalized = src.replace(/^(\.\.\/)*img\//, "")
          // eslint-disable-next-line @next/next/no-img-element
          return (
            <img
              src={`/grace/guide/img/${normalized}`}
              alt={typeof props.alt === "string" ? props.alt : ""}
              loading="lazy"
            />
          )
        },
        a(props) {
          const href = typeof props.href === "string" ? props.href : ""
          if (
            !href ||
            href.startsWith("http") ||
            href.startsWith("#") ||
            href.startsWith("mailto:")
          ) {
            return <a {...props} />
          }
          const cleaned = href
            .replace(/^(\.\.\/)+/, "")
            .replace(/\.md$/, "")
            .replace(/^README$/, "")
          const finalHref = `/grace/guide${cleaned ? "/" + cleaned : ""}/`
          return <Link href={finalHref}>{props.children}</Link>
        },
      }}
    >
      {source}
    </ReactMarkdown>
  )
}

const GUIDE_CSS = `
.guide-body {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 56px var(--container-pad) 80px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 56px;
}
@media (max-width: 900px) {
  .guide-body {
    grid-template-columns: 1fr;
    padding: 32px var(--container-pad-mobile) 56px;
    gap: 32px;
  }
}

.guide-sidebar {
  position: sticky;
  top: 88px;
  align-self: start;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding-right: 8px;
  font-size: 14px;
  font-family: var(--font-display);
}
@media (max-width: 900px) {
  .guide-sidebar {
    position: static;
    max-height: none;
    border-bottom: 1px solid var(--paper-edge);
    padding-bottom: 16px;
  }
}
.guide-sidebar-section { margin-bottom: 22px; }
.guide-sidebar-label {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: var(--ink-muted);
  margin-bottom: 10px;
}
.guide-sidebar ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0;
  margin: 0;
}
.guide-sidebar a {
  display: block;
  padding: 4px 0 4px 12px;
  margin-left: -12px;
  color: var(--ink-soft);
  text-decoration: none;
  line-height: 1.5;
  border-left: 2px solid transparent;
  transition: border-color 100ms, color 100ms;
}
.guide-sidebar a:hover {
  color: var(--kodachrome);
  border-left-color: var(--saffron);
}

.guide-main { min-width: 0; max-width: 760px; }
.guide-article { font-family: var(--font-display); color: var(--ink); }

.guide-main h1 {
  font-family: var(--font-display);
  font-variation-settings: "opsz" 96, "wght" 460;
  font-weight: normal;
  font-size: 44px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: var(--ink);
}
.guide-main h2 {
  font-family: var(--font-display);
  font-variation-settings: "opsz" 36, "wght" 460;
  font-weight: normal;
  font-size: 28px;
  line-height: 1.25;
  letter-spacing: -0.01em;
  margin: 44px 0 14px;
  padding-top: 20px;
  border-top: 1px solid var(--paper-edge);
  color: var(--ink);
}
.guide-main h3 {
  font-family: var(--font-display);
  font-variation-settings: "opsz" 24, "wght" 500;
  font-weight: 500;
  font-size: 21px;
  line-height: 1.3;
  margin: 30px 0 10px;
  color: var(--ink-soft);
}
.guide-main h4 {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin: 22px 0 8px;
  color: var(--ink-muted);
  font-weight: 500;
}
.guide-main p, .guide-main li {
  font-size: 17px;
  line-height: 1.72;
  color: var(--ink);
}
.guide-main p { margin: 0 0 16px; }
.guide-main ul, .guide-main ol { margin: 0 0 18px 22px; padding: 0; }
.guide-main li { margin-bottom: 6px; }
.guide-main strong { font-weight: 600; color: var(--ink); }
.guide-main em { color: var(--ink-soft); }
.guide-main a {
  color: var(--kodachrome);
  text-decoration: none;
  border-bottom: 1px solid rgba(184, 58, 31, 0.28);
  transition: border-color 150ms;
}
.guide-main a:hover { border-bottom-color: var(--kodachrome); }
.guide-main code {
  font-family: var(--font-mono);
  font-size: 0.86em;
  background: var(--paper-warm);
  padding: 2px 6px;
  border-radius: 3px;
  color: var(--ink-soft);
  border: 1px solid var(--paper-edge);
}
.guide-main pre {
  background: var(--ink);
  color: var(--paper-warm);
  padding: 16px 18px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 18px 0 22px;
  font-size: 14px;
  line-height: 1.55;
}
.guide-main pre code {
  background: transparent;
  border: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}
.guide-main blockquote {
  margin: 18px 0;
  padding: 12px 18px;
  border-left: 3px solid var(--saffron);
  background: var(--paper-warm);
  color: var(--ink-soft);
  font-style: italic;
}
.guide-main hr {
  border: 0;
  border-top: 1px solid var(--paper-edge);
  margin: 36px 0;
}
.guide-main table {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0;
  font-size: 15px;
}
.guide-main th, .guide-main td {
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid var(--paper-edge);
  vertical-align: top;
}
.guide-main th {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-muted);
  font-weight: 500;
  background: var(--paper-warm);
}
.guide-main img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 24px 0;
  border: 1px solid var(--paper-edge);
  border-radius: 3px;
  box-shadow: 0 4px 18px rgba(28, 22, 18, 0.08);
}

.guide-pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 56px 0 8px;
  padding-top: 28px;
  border-top: 1px solid var(--paper-edge);
}
@media (max-width: 600px) {
  .guide-pager { grid-template-columns: 1fr; }
}
.guide-pager a {
  display: block;
  padding: 14px 18px;
  background: var(--paper-warm);
  border: 1px solid var(--paper-edge);
  border-radius: 4px;
  text-decoration: none;
  border-bottom-width: 1px;
  color: var(--ink);
  transition: background 150ms, border-color 150ms;
}
.guide-pager a:hover {
  background: var(--paper-deep);
  border-color: var(--ink-faint);
}
.guide-pager-direction {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink-muted);
  margin-bottom: 4px;
}
.guide-pager-title { font-size: 16px; color: var(--ink); }
.guide-pager .guide-pager-next { text-align: right; }

.guide-missing {
  padding: 80px 0;
  text-align: center;
  color: var(--ink-muted);
}
.guide-missing h1 { font-size: 32px; margin-bottom: 12px; color: var(--ink-soft); }
`
