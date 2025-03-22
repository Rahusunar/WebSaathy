"use client"
import { Inter } from "next/font/google"
import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

// Component to scroll to top on page navigation
function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

