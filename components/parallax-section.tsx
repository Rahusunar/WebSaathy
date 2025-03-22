"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function ParallaxSection({ children, speed = 0.2, className = "" }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      // Only apply parallax when section is in view
      if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        const yPos = (scrollY - sectionTop) * speed
        section.style.transform = `translateY(${yPos}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <div ref={sectionRef} className={`parallax ${className}`}>
      {children}
    </div>
  )
}

