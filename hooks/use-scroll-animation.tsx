"use client"

import { useEffect, useRef } from "react"

type AnimationType =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "fade-in-left"
  | "fade-in-right"
  | "zoom-in"
  | "scale-in"
  | "flip-up"
  | "rotate-in"
  | "bounce-in"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"

interface UseScrollAnimationProps {
  type?: AnimationType
  threshold?: number
  delay?: number
  rootMargin?: string
  duration?: number
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement>({
  type = "fade-in",
  threshold = 0.1,
  delay = 0,
  rootMargin = "0px",
  duration = 800,
  once = true,
}: UseScrollAnimationProps = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Add initial state class
    element.classList.add("scroll-animation")
    element.classList.add(type)

    if (delay) {
      element.style.transitionDelay = `${delay}ms`
    }

    if (duration !== 800) {
      element.style.transitionDuration = `${duration}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add small delay to ensure animation triggers properly
            setTimeout(() => {
              element.classList.add("animate")
            }, 100)

            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            // If not using "once" mode, remove the animate class when out of view
            element.classList.remove("animate")
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [type, threshold, delay, rootMargin, duration, once])

  return ref
}

// Helper hook for staggered animations on child elements
export function useStaggeredAnimation(
  selector: string,
  options: {
    type?: AnimationType
    baseDelay?: number
    staggerDelay?: number
    threshold?: number
    rootMargin?: string
    duration?: number
  } = {},
) {
  const containerRef = useRef<HTMLElement>(null)

  const {
    type = "fade-in-up",
    baseDelay = 0,
    staggerDelay = 100,
    threshold = 0.1,
    rootMargin = "0px",
    duration = 800,
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll(selector)

    elements.forEach((element, index) => {
      // Add animation classes
      element.classList.add("scroll-animation")
      element.classList.add(type)

      // Set delay based on index
      const delay = baseDelay + index * staggerDelay
      element.setAttribute("style", `transition-delay: ${delay}ms; transition-duration: ${duration}ms;`)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate all child elements with staggered delay
          setTimeout(() => {
            elements.forEach((element) => {
              element.classList.add("animate")
            })
          }, 100)

          observer.unobserve(container)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(container)

    return () => {
      if (container) observer.unobserve(container)
    }
  }, [selector, type, baseDelay, staggerDelay, threshold, rootMargin, duration])

  return containerRef
}

