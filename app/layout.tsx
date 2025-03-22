import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { BackToTop } from "@/components/back-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Websaathy | Web Design & Development Services",
    template: "%s | Websaathy",
  },
  description:
    "Professional web design and development services to help your business grow online. We create responsive, user-friendly websites that convert visitors into customers.",
  keywords:
    "web design, web development, responsive design, SEO, digital marketing, website creation, professional websites, Websaathy",
  authors: [{ name: "Websaathy Team" }],
  creator: "Websaathy",
  publisher: "Websaathy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://websaathy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://websaathy.com",
    title: "Websaathy | Web Design & Development Services",
    description: "Professional web design and development services to help your business grow online.",
    siteName: "Websaathy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Websaathy - Web Design & Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websaathy | Web Design & Development Services",
    description: "Professional web design and development services to help your business grow online.",
    images: ["/og-image.jpg"],
    creator: "@websaathy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <BackToTop />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'