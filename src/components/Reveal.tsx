"use client"

// Wraps any block in an IntersectionObserver fade-up. Matches KK's
// .reveal pattern from the HTML — same opacity + translateY transition,
// triggered on enter, optional stagger via the `delay` prop (ms).

import { useEffect, useRef, type ReactNode } from "react"

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
  /**
   * Eager = animate on page load (no scroll required). Use for above-
   * the-fold content (heroes) where waiting for IntersectionObserver
   * causes a flash of invisible content. Matches KK's `.fade-1` ..
   * `.fade-5` keyframe pattern.
   */
  eager?: boolean
}

export function Reveal({ children, delay = 0, className, style, eager }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Eager: paint visible immediately (CSS animation handles the
    // fade-up via the [data-reveal][data-revealed=true] selector).
    if (eager) {
      el.setAttribute("data-revealed", "true")
      return
    }
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-revealed", "true")
      return
    }
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute("data-revealed", "true")
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [eager])

  return (
    <div
      ref={ref}
      data-reveal
      data-eager={eager ? "true" : undefined}
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
