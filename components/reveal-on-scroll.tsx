"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export default function RevealOnScroll({ children, className = "", threshold = 0.1, delay = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Add reveal class
    element.classList.add("reveal-on-scroll")

    // Add delay if specified
    if (delay) {
      element.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add("active")
            }, 100)
            observer.unobserve(element)
          }
        })
      },
      { threshold },
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [threshold, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

