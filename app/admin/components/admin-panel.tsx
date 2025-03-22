"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Upload, X, Plus, Trash2 } from "lucide-react"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("general")
  const [isLoading, setIsLoading] = useState(false)
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Websaathy",
    siteDescription: "Web Design & Development Agency",
    contactEmail: "info@websaathy.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Web Street, Digital City, 12345",
  })

  const [images, setImages] = useState({
    logo: [],
    hero: [],
    about: [],
    portfolio: [],
  })

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedSettings = localStorage.getItem("websaathy_settings")
    if (storedSettings) {
      try {
        setGeneralSettings(JSON.parse(storedSettings))
      } catch (error) {
        console.error("Error parsing settings:", error)
      }
    }

    const storedImages = localStorage.getItem("websaathy_images")
    if (storedImages) {
      try {
        setImages(JSON.parse(storedImages))
      } catch (error) {
        console.error("Error parsing images:", error)
      }
    }
  }, [])

  // Save general settings
  const saveGeneralSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("websaathy_settings", JSON.stringify(generalSettings))

      // Dispatch custom event to notify other components
      const event = new CustomEvent("websaathy:settings_updated")
      document.dispatchEvent(event)

      toast({
        title: "Settings saved",
        description: "Your general settings have been saved successfully.",
      })

      setIsLoading(false)
    }, 1000)
  }

  // Handle image upload
  const handleImageUpload = (e, category) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setIsLoading(true)

    // Process each file
    const newImages = files.map((file) => {
      // Create object URL for preview
      const url = URL.createObjectURL(file)
      return {
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        file,
      }
    })

    // Update images state
    setImages((prev) => {
      const updated = {
        ...prev,
        [category]: [...prev[category], ...newImages],
      }

      // Save to localStorage
      localStorage.setItem("websaathy_images", JSON.stringify(updated))

      // Dispatch custom event
      const event = new CustomEvent("websaathy:images_updated")
      document.dispatchEvent(event)

      // Also dispatch a storage event for components that listen to storage
      const storageEvent = new CustomEvent("storage:websaathy_images")
      document.dispatchEvent(storageEvent)

      return updated
    })

    toast({
      title: "Images uploaded",
      description: `${files.length} image(s) uploaded successfully.`,
    })

    setIsLoading(false)
  }

  // Remove image
  const removeImage = (category, index) => {
    setImages((prev) => {
      const updated = { ...prev }

      // Release object URL to prevent memory leaks
      if (updated[category][index].url.startsWith("blob:")) {
        URL.revokeObjectURL(updated[category][index].url)
      }

      // Remove the image
      updated[category] = updated[category].filter((_, i) => i !== index)

      // Save to localStorage
      localStorage.setItem("websaathy_images", JSON.stringify(updated))

      // Dispatch custom events
      document.dispatchEvent(new CustomEvent("websaathy:images_updated"))
      document.dispatchEvent(new CustomEvent("storage:websaathy_images"))

      return updated
    })

    toast({
      title: "Image removed",
      description: "The image has been removed successfully.",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage your website settings and content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General Settings</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            {/* General Settings Tab */}
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={saveGeneralSettings} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Settings"
                )}
              </Button>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="space-y-6 mt-4">
              {/* Logo Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo</CardTitle>
                  <CardDescription>Upload your website logo (recommended size: 200x50px)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.logo.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Logo ${index + 1}`}
                          className="h-20 w-auto object-contain border rounded p-2"
                        />
                        <button
                          onClick={() => removeImage("logo", index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed rounded p-2 cursor-pointer hover:bg-muted/50 transition-colors">
                      <Plus className="h-6 w-6 mb-1" />
                      <span className="text-xs">Add Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "logo")}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Hero Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Hero Images</CardTitle>
                  <CardDescription>
                    Upload images for your homepage hero section (recommended size: 1200x600px)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {images.hero.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Hero ${index + 1}`}
                          className="h-40 w-full object-cover border rounded"
                        />
                        <button
                          onClick={() => removeImage("hero", index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-8 w-8 mb-2" />
                      <span>Add Hero Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "hero")}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* About Images */}
              <Card>
                <CardHeader>
                  <CardTitle>About Images</CardTitle>
                  <CardDescription>Upload images for your about page (recommended size: 800x600px)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {images.about.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`About ${index + 1}`}
                          className="h-40 w-full object-cover border rounded"
                        />
                        <button
                          onClick={() => removeImage("about", index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-8 w-8 mb-2" />
                      <span>Add About Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "about")}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Images</CardTitle>
                  <CardDescription>Upload images for your portfolio (recommended size: 800x600px)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {images.portfolio.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Portfolio ${index + 1}`}
                          className="h-40 w-full object-cover border rounded"
                        />
                        <button
                          onClick={() => removeImage("portfolio", index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-8 w-8 mb-2" />
                      <span>Add Portfolio Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, "portfolio")}
                      />
                    </label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage your website content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Content management features will be available in the next update.
                  </p>
                  <Button disabled>Coming Soon</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <p className="text-xs text-muted-foreground">
            Websaathy Admin Panel v1.0.0 | &copy; {new Date().getFullYear()} Websaathy
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

