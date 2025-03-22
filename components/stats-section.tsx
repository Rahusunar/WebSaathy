"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import AnimatedCounter from "@/components/animated-counter"

interface StatsItem {
  value: number
  suffix: string
  label: string
}

interface StatsData {
  projectsCompleted: number
  clientSatisfaction: number
  yearsExperience: number
  support: string
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatsData>({
    projectsCompleted: 150,
    clientSatisfaction: 98,
    yearsExperience: 12,
    support: "24/7",
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load stats from localStorage if available
    const storedSettings = localStorage.getItem("websaathy_settings")
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings)
        if (settings.stats) {
          setStats(settings.stats)
        }
      } catch (error) {
        console.error("Error parsing settings:", error)
      }
    }

    // Listen for settings changes
    const handleSettingsChange = () => {
      const updatedSettings = localStorage.getItem("websaathy_settings")
      if (updatedSettings) {
        try {
          const settings = JSON.parse(updatedSettings)
          if (settings.stats) {
            setStats(settings.stats)
          }
        } catch (error) {
          console.error("Error parsing updated settings:", error)
        }
      }
    }

    document.addEventListener("websaathy:settings_updated", handleSettingsChange)

    return () => {
      document.removeEventListener("websaathy:settings_updated", handleSettingsChange)
    }
  }, [])

  if (!mounted) return null

  const statsItems: StatsItem[] = [
    { value: stats.projectsCompleted, suffix: "+", label: "Projects Completed" },
    { value: stats.clientSatisfaction, suffix: "%", label: "Client Satisfaction" },
    { value: stats.yearsExperience, suffix: "+", label: "Years Experience" },
    { value: 0, suffix: stats.support, label: "Support" }, // Special case for 24/7
  ]

  return (
    <section className="w-full py-12 bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {statsItems.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4"
            >
              {index === 3 ? (
                <div className="text-4xl md:text-5xl font-bold text-primary">{stat.suffix}</div>
              ) : (
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold text-primary"
                />
              )}
              <p className="text-sm md:text-base text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

