import type { Metadata } from "next"
import { Fraunces, DM_Mono } from "next/font/google"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"
import { loadContent } from "@/lib/content"
import "./globals.css"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
})

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  title: "Obelisk Studios",
  description:
    "One studio. Every stage. Independent filmmakers building tools and finishing pictures.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const shared = loadContent("shared.yml")

  return (
    <html lang="en" className={`${fraunces.variable} ${dmMono.variable}`}>
      <body>
        <Nav links={shared.navLinks} />
        {children}
        <Footer footer={shared.footer} />
      </body>
    </html>
  )
}
