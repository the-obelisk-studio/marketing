"use client"

// Click an image to open it full-screen in a native <dialog> lightbox.
// Closes via ESC (browser default), the × button, or clicking the backdrop.
// Styling lives wherever this component is used — the host page is
// expected to provide CSS for .zoom-trigger, .zoom-dialog, etc.
//
// Why native <dialog>: ESC-to-close, focus trapping, and inert background
// come for free. No portal / no extra deps.

import { useRef, type MouseEvent } from "react"

type Props = {
  src: string
  alt: string
  className?: string
  loading?: "lazy" | "eager"
}

export function ZoomableImage({ src, alt, className, loading = "lazy" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  // Click on the dialog itself (not on the image / close button) = backdrop click → close.
  const onDialogClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close()
  }

  return (
    <>
      <button
        type="button"
        className={`zoom-trigger${className ? ` ${className}` : ""}`}
        onClick={open}
        aria-label={`Expand image: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading={loading} decoding="async" />
      </button>

      <dialog ref={dialogRef} className="zoom-dialog" onClick={onDialogClick}>
        <button
          type="button"
          className="zoom-dialog-close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </dialog>
    </>
  )
}
