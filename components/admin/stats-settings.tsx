"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface StatsSettings {
  projectsCompleted: number
  clientSatisfaction: number
  yearsExperience: number
  support: string
}

export function StatsSettings() {
  const [stats, setStats] = useState<StatsSettings>({
    projectsCompleted: 150,
    clientSatisfaction: 98,
    yearsExperience: 12,
    support: "24/7",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
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
  }, [])

  const handleChange = (field: keyof StatsSettings, value: string) => {
    setStats((prev) => ({
      ...prev,
      [field]: field === "support" ? value : Number.parseInt(value) || 0,
    }))
  }

  const handleSave = () => {
    setIsSaving(true)

    try {
      // Get current settings
      const storedSettings = localStorage.getItem("websaathy_settings")
      const settings = storedSettings ? JSON.parse(storedSettings) : {}

      // Update stats
      settings.stats = stats

      // Save back to localStorage
      localStorage.setItem("websaathy_settings", JSON.stringify(settings))

      // Dispatch event to notify components
      const event = new Event("websaathy:settings_updated")
      document.dispatchEvent(event)

      toast({
        title: "Statistics updated",
        description: "Your statistics have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "There was an error saving your statistics.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics Settings</CardTitle>
        <CardDescription>
          Update the statistics displayed on your homepage. These numbers showcase your achievements to visitors.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectsCompleted">Projects Completed</Label>
            <div className="flex items-center">
              <Input
                id="projectsCompleted"
                type="number"
                value={stats.projectsCompleted}
                onChange={(e) => handleChange("projectsCompleted", e.target.value)}
                min={0}
              />
              <span className="ml-2 text-muted-foreground">+</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientSatisfaction">Client Satisfaction</Label>
            <div className="flex items-center">
              <Input
                id="clientSatisfaction"
                type="number"
                value={stats.clientSatisfaction}
                onChange={(e) => handleChange("clientSatisfaction", e.target.value)}
                min={0}
                max={100}
              />
              <span className="ml-2 text-muted-foreground">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsExperience">Years Experience</Label>
            <div className="flex items-center">
              <Input
                id="yearsExperience"
                type="number"
                value={stats.yearsExperience}
                onChange={(e) => handleChange("yearsExperience", e.target.value)}
                min={0}
              />
              <span className="ml-2 text-muted-foreground">+</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="support">Support</Label>
            <Input
              id="support"
              value={stats.support}
              onChange={(e) => handleChange("support", e.target.value)}
              placeholder="e.g. 24/7"
            />
          </div>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full md:w-auto">
          {isSaving ? "Saving..." : "Save Statistics"}
        </Button>
      </CardContent>
    </Card>
  )
}

