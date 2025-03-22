"use client"

import { useState, useEffect } from "react"

type ImageSection = "hero" | "services" | "portfolio" | "testimonials" | "team" | "blog" | "logo" | "background"

interface SiteImage {
  id: number
  title: string
  alt: string
  url: string
}

// Create a custom event for localStorage changes
export const createStorageEvent = (key: string) => {
  const event = new Event(`storage:${key}`)
  document.dispatchEvent(event)
  return event
}

export function useSiteImages(section: ImageSection) {
  const [images, setImages] = useState<SiteImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadImages = () => {
      try {
        setIsLoading(true)
        const storedImages = localStorage.getItem("websaathy_images")
        if (storedImages) {
          const parsedImages = JSON.parse(storedImages)
          setImages(parsedImages[section] || [])
        }
      } catch (error) {
        console.error(`Error loading ${section} images:`, error)
      } finally {
        setIsLoading(false)
      }
    }

    // Load images initially
    loadImages()

    // Listen for storage changes
    const handleStorageChange = () => {
      loadImages()
    }

    // Listen for custom storage events
    document.addEventListener(`storage:websaathy_images`, handleStorageChange)

    // Also listen for actual storage events (from other tabs)
    window.addEventListener("storage", (e) => {
      if (e.key === "websaathy_images") {
        loadImages()
      }
    })

    return () => {
      document.removeEventListener(`storage:websaathy_images`, handleStorageChange)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [section])

  return { images, isLoading }
}

export function getRandomImage(section: ImageSection): string {
  try {
    const storedImages = localStorage.getItem("websaathy_images")
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages)
      const sectionImages = parsedImages[section] || []

      if (sectionImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * sectionImages.length)
        return sectionImages[randomIndex].url
      }
    }
  } catch (error) {
    console.error(`Error getting random ${section} image:`, error)
  }

  // Fallback images
  const fallbacks = {
    hero: "/placeholder.svg?height=600&width=800",
    services: "/placeholder.svg?height=400&width=600",
    portfolio: "/placeholder.svg?height=400&width=600",
    testimonials: "/placeholder.svg?height=100&width=100",
    team: "/placeholder.svg?height=300&width=300",
    blog: "/placeholder.svg?height=400&width=600",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-12%20115534-ofFJfhgKEVAUBpxDbVviCapb4tmsDz.png",
    background: "/placeholder.svg?height=1200&width=1920",
  }

  return fallbacks[section]
}

export function getLogoImage(): string {
  try {
    const storedImages = localStorage.getItem("websaathy_images")
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages)
      const logoImages = parsedImages.logo || []

      if (logoImages.length > 0) {
        return logoImages[0].url
      }
    }
  } catch (error) {
    console.error("Error getting logo image:", error)
  }

  return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-12%20115534-ofFJfhgKEVAUBpxDbVviCapb4tmsDz.png"
}

