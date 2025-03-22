import type React from "react"
import type { Metadata } from "next"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest articles and updates on web design, development, and digital marketing.",
}

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <ScrollArea className="h-full">{children}</ScrollArea>
}

