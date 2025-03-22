"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (isDismissed || !isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm bg-background rounded-lg shadow-lg border border-primary/20 p-4 animate-in fade-in slide-in-from-bottom-10">
      <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleDismiss} aria-label="Close">
        <X className="h-4 w-4" />
      </Button>
      <div className="pt-2">
        <h3 className="font-semibold text-lg mb-2">Let's Start Your Project</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Ready to transform your online presence? Get in touch for a free consultation.
        </p>
        <div className="space-y-2">
          <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full border-primary/20 text-primary hover:bg-primary/10"
          >
            <a href="https://wa.me/9779805740156" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

