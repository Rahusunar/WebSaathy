"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"

interface SettingsManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function SettingsManager({ setError, setSuccess }: SettingsManagerProps) {
  const [settings, setSettings] = useState({
    siteName: "Websaathy",
    siteDescription: "Web Design & Development Solutions",
    contactEmail: "websathy@gmail.com",
    contactPhone: "+977 9805740156",
    address: "Attariya, Kailali, Nepal",
    enableDarkMode: true,
    enableRatings: true,
    enableContactForm: true,
    enableBlog: true,
    logoUrl: "/images/logo.png",
    stats: {
      projectsCompleted: 150,
      clientSatisfaction: 98,
      yearsExperience: 12,
      support: "24/7",
    },
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSettings = () => {
      setIsLoading(true)
      try {
        const storedSettings = localStorage.getItem("websaathy_settings")
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings))
        }
      } catch (error) {
        console.error("Error loading settings:", error)
        setError("Failed to load settings")
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "websaathy_settings" || !e.key) {
        loadSettings()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [setError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name, checked) => {
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSaveSettings = () => {
    try {
      localStorage.setItem("websaathy_settings", JSON.stringify(settings))

      // Dispatch a custom event to notify components about the settings change
      const event = new Event("websaathy:settings_change")
      document.dispatchEvent(event)

      setSuccess("Settings saved successfully!")
    } catch (error) {
      console.error("Error saving settings:", error)
      setError("Failed to save settings")
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-7 w-40 bg-muted animate-pulse rounded-md mb-2"></div>
          <div className="h-5 w-64 bg-muted animate-pulse rounded-md"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 bg-muted animate-pulse rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-auto">
      <Card className="min-w-[320px]">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure your website's basic information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="logoUrl">Logo URL</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="logoUrl"
                    name="logoUrl"
                    value={settings.logoUrl}
                    onChange={handleInputChange}
                    placeholder="/images/logo.png"
                  />
                  {settings.logoUrl && (
                    <div className="w-16 h-16 border rounded flex items-center justify-center overflow-hidden">
                      <img
                        src={settings.logoUrl || "/placeholder.svg"}
                        alt="Logo Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter the URL of your logo image (recommended size: 240x60px)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" name="siteName" value={settings.siteName} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={settings.address} onChange={handleInputChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-[320px]">
        <CardHeader>
          <CardTitle>Feature Settings</CardTitle>
          <CardDescription>Enable or disable website features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">Allow users to switch to dark mode</p>
              </div>
              <Switch
                checked={settings.enableDarkMode}
                onCheckedChange={(checked) => handleSwitchChange("enableDarkMode", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Ratings</h3>
                <p className="text-sm text-muted-foreground">Allow users to rate your services</p>
              </div>
              <Switch
                checked={settings.enableRatings}
                onCheckedChange={(checked) => handleSwitchChange("enableRatings", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Contact Form</h3>
                <p className="text-sm text-muted-foreground">Enable the contact form on your website</p>
              </div>
              <Switch
                checked={settings.enableContactForm}
                onCheckedChange={(checked) => handleSwitchChange("enableContactForm", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Blog</h3>
                <p className="text-sm text-muted-foreground">Enable the blog section on your website</p>
              </div>
              <Switch
                checked={settings.enableBlog}
                onCheckedChange={(checked) => handleSwitchChange("enableBlog", checked)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="min-w-[320px]">
        <CardHeader>
          <CardTitle>Stats Settings</CardTitle>
          <CardDescription>Configure the statistics shown on your homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectsCompleted">Projects Completed</Label>
                <Input
                  id="projectsCompleted"
                  type="number"
                  value={settings.stats.projectsCompleted}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: {
                        ...settings.stats,
                        projectsCompleted: Number.parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="clientSatisfaction">Client Satisfaction (%)</Label>
                <Input
                  id="clientSatisfaction"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.stats.clientSatisfaction}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: {
                        ...settings.stats,
                        clientSatisfaction: Number.parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsExperience">Years Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={settings.stats.yearsExperience}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: {
                        ...settings.stats,
                        yearsExperience: Number.parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="support">Support</Label>
                <Input
                  id="support"
                  value={settings.stats.support}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      stats: {
                        ...settings.stats,
                        support: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

