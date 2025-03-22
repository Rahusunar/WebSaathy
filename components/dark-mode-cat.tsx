"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function DarkModeCat() {
  const { theme } = useTheme()
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [isBlinking, setIsBlinking] = useState(false)
  const [tailWag, setTailWag] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || theme !== "dark") return

    // Random movement
    const moveInterval = setInterval(() => {
      setPosition((prev) => {
        // Calculate new position with some randomness
        const newX = prev.x + (Math.random() * 10 - 5) * direction
        const newY = prev.y + (Math.random() * 6 - 3)

        // Keep cat within viewport
        const boundedX = Math.max(10, Math.min(90, newX))
        const boundedY = Math.max(10, Math.min(90, newY))

        // Change direction if cat reaches screen edge
        if (boundedX <= 10 || boundedX >= 90) {
          setDirection((prev) => prev * -1)
        }

        return { x: boundedX, y: boundedY }
      })
    }, 2000)

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 300)
    }, 5000)

    // Tail wagging
    const tailInterval = setInterval(() => {
      setTailWag((prev) => (prev + 1) % 3)
    }, 500)

    return () => {
      clearInterval(moveInterval)
      clearInterval(blinkInterval)
      clearInterval(tailInterval)
    }
  }, [mounted, theme, direction])

  if (!mounted || theme !== "dark") return null

  return (
    <div
      className="fixed z-50 pointer-events-none transition-all duration-1000 ease-in-out"
      style={{
        left: `${position.x}%`,
        bottom: `${position.y}%`,
        transform: `scale(0.7) ${direction === -1 ? "scaleX(-1)" : ""}`,
      }}
    >
      {/* Cat body */}
      <div className="relative">
        {/* Body */}
        <div className="w-16 h-10 bg-gray-800 rounded-full relative">
          {/* Head */}
          <div className="absolute -top-8 left-2 w-12 h-10 bg-gray-800 rounded-full">
            {/* Ears */}
            <div className="absolute -top-3 left-1 w-3 h-4 bg-gray-800 transform rotate-45 rounded-tl-lg"></div>
            <div className="absolute -top-3 right-1 w-3 h-4 bg-gray-800 transform -rotate-45 rounded-tr-lg"></div>

            {/* Eyes */}
            <div className="absolute top-3 left-2 w-2 h-2 bg-yellow-400 rounded-full">
              <div
                className={`absolute inset-0 bg-gray-800 rounded-full transition-transform ${isBlinking ? "scale-y-100" : "scale-y-0"}`}
              ></div>
            </div>
            <div className="absolute top-3 right-2 w-2 h-2 bg-yellow-400 rounded-full">
              <div
                className={`absolute inset-0 bg-gray-800 rounded-full transition-transform ${isBlinking ? "scale-y-100" : "scale-y-0"}`}
              ></div>
            </div>

            {/* Nose */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-300 rounded-full"></div>

            {/* Whiskers */}
            <div className="absolute top-6 left-1 w-3 h-0.5 bg-gray-600 transform -rotate-10"></div>
            <div className="absolute top-7 left-0.5 w-3 h-0.5 bg-gray-600 transform rotate-10"></div>
            <div className="absolute top-6 right-1 w-3 h-0.5 bg-gray-600 transform rotate-10"></div>
            <div className="absolute top-7 right-0.5 w-3 h-0.5 bg-gray-600 transform -rotate-10"></div>
          </div>

          {/* Tail */}
          <div
            className={`absolute -right-8 top-3 w-8 h-2 bg-gray-800 rounded-full transform origin-left ${
              tailWag === 0 ? "rotate-0" : tailWag === 1 ? "rotate-20" : "-rotate-20"
            }`}
          ></div>

          {/* Legs */}
          <div className="absolute bottom-0 left-2 w-2 h-3 bg-gray-800 rounded-b-lg"></div>
          <div className="absolute bottom-0 right-2 w-2 h-3 bg-gray-800 rounded-b-lg"></div>
          <div className="absolute bottom-0 left-10 w-2 h-3 bg-gray-800 rounded-b-lg"></div>
          <div className="absolute bottom-0 right-10 w-2 h-3 bg-gray-800 rounded-b-lg"></div>
        </div>
      </div>
    </div>
  )
}

