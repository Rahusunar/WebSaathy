"use client"

import { useEffect } from "react"

export default function ScrollAnimations() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")

    const reveal = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = revealElements[i].getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add("active")
        } else {
          revealElements[i].classList.remove("active")
        }
      }
    }

    window.addEventListener("scroll", reveal)
    // Initial check
    reveal()

    return () => {
      window.removeEventListener("scroll", reveal)
    }
  }, [])

  return null
}

