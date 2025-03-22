"use client"

import { useEffect } from "react"

export default function ScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".js-reveal")

    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight
        const elementTop = revealElements[i].getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add("active")
        }
      }
    }

    window.addEventListener("scroll", revealOnScroll)

    // Initial check
    revealOnScroll()

    return () => {
      window.removeEventListener("scroll", revealOnScroll)
    }
  }, [])

  return null
}

