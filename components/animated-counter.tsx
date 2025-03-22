"use client"

import { useEffect, useRef, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useScrollAnimation<HTMLDivElement>({
    threshold: 0.5,
    once: true,
  })
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = countRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          let startTime: number
          const startValue = 0
          const changeInValue = end - startValue

          const easeOutQuad = (t: number) => t * (2 - t)

          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const easedProgress = easeOutQuad(progress)

            setCount(Math.floor(startValue + changeInValue * easedProgress))

            if (progress < 1) {
              requestAnimationFrame(animateCount)
            }
          }

          requestAnimationFrame(animateCount)
          observer.unobserve(element)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [end, duration])

  return (
    <div ref={countRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

