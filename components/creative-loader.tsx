"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

export default function CreativeLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation variables
    let animationId: number
    let loadingProgress = 0
    let angle = 0

    // Add this at the beginning of the useEffect
    const loaderTimeout = setTimeout(() => {
      if (canvas) {
        cancelAnimationFrame(animationId)
      }
    }, 3000) // Force loader to complete after 3 seconds

    // Draw Websaathy branding
    const drawBranding = () => {
      ctx.save()

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = isDarkMode ? "#1a1a1a" : "#f5f5f5"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw logo text
      ctx.font = "bold 32px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000"
      ctx.fillText("Websaathy", canvas.width / 2, canvas.height / 2 - 20)

      // Draw tagline
      ctx.font = "16px Arial"
      ctx.fillStyle = isDarkMode ? "#cccccc" : "#666666"
      ctx.fillText("Web Design & Development Solutions", canvas.width / 2, canvas.height / 2 + 20)

      // Draw loading bar
      const barWidth = 200
      const barHeight = 6
      const barX = canvas.width / 2 - barWidth / 2
      const barY = canvas.height / 2 + 60

      // Border
      ctx.strokeStyle = isDarkMode ? "#444444" : "#dddddd"
      ctx.lineWidth = 1
      ctx.strokeRect(barX, barY, barWidth, barHeight)

      // Fill
      const gradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY)
      gradient.addColorStop(0, "#4f46e5")
      gradient.addColorStop(1, "#8b5cf6")
      ctx.fillStyle = gradient
      ctx.fillRect(barX, barY, barWidth * loadingProgress, barHeight)

      // Draw decorative elements
      angle += 0.03 // Reduced animation speed
      for (let i = 0; i < 3; i++) {
        // Reduced from 5 to 3 elements
        const size = 10 + i * 5
        const distance = 100 + i * 20
        const x = canvas.width / 2 + Math.cos(angle + i * 0.5) * distance
        const y = canvas.height / 2 + Math.sin(angle + i * 0.5) * distance

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79, 70, 229, ${0.1 - i * 0.02})`
        ctx.fill()
      }

      // Update loading progress more efficiently
      loadingProgress += 0.015 // Increased speed slightly
      if (loadingProgress > 1) {
        loadingProgress = 0
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      drawBranding()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Update the cleanup function
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasDimensions)
      clearTimeout(loaderTimeout)
    }
  }, [isDarkMode])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

