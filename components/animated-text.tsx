"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedTextProps {
  text: string
  type?: "gradient" | "typing" | "reveal" | "highlight"
  className?: string
  delay?: number
  duration?: number
}

export default function AnimatedText({
  text,
  type = "reveal",
  className = "",
  delay = 0,
  duration = 1000,
}: AnimatedTextProps) {
  const textRef = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    delay,
    duration,
  })
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  useEffect(() => {
    if (type === "typing" && isVisible) {
      let index = 0
      const timer = setInterval(() => {
        setDisplayText(text.substring(0, index))
        index++

        if (index > text.length) {
          clearInterval(timer)
        }
      }, 100)

      return () => clearInterval(timer)
    }
  }, [isVisible, text, type])

  if (type === "gradient") {
    return (
      <div ref={textRef} className={`text-gradient ${className}`}>
        {text}
      </div>
    )
  }

  if (type === "typing") {
    return (
      <div ref={textRef} className={`text-typing ${className}`} style={{ width: isVisible ? "100%" : "0" }}>
        {displayText}
      </div>
    )
  }

  if (type === "highlight") {
    return (
      <div ref={textRef} className={`relative inline-block ${className}`}>
        {text}
        <span
          className="absolute bottom-0 left-0 w-full h-[30%] bg-primary/20 -z-10 transform origin-left transition-transform duration-1000 ease-out"
          style={{
            transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          }}
        ></span>
      </div>
    )
  }

  // Default reveal animation
  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  )
}

