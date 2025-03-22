"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash, Edit, Save, Plus, ImageIcon } from "lucide-react"
import { createStorageEvent } from "@/hooks/use-site-images"

export default function ImageManager() {
  const [activeTab, setActiveTab] = useState("hero")
  const [images, setImages] = useState<Record<string, any[]>>({
    hero: [],
    services: [],
    portfolio: [],
    testimonials: [],
    team: [],
    blog: [],
    logo: [],
    background: [],
  })
  const [newImage, setNewImage] = useState({
    title: "",
    alt: "",
    section: "hero",
    image: "",
  })
  const [editingItem, setEditingItem] = useState<any>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load images from localStorage
    const storedImages = localStorage.getItem("websaathy_images")
    if (storedImages) {
      try {
        const parsedImages = JSON.parse(storedImages)
        setImages(parsedImages)
      } catch (error) {
        console.error("Error parsing stored images:", error)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewImage((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.includes("image/")) {
      setError("Please upload an image file")
      return
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setNewImage((prev) => ({
        ...prev,
        image: imageData,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddImage = () => {
    if (!newImage.title || !newImage.alt || !newImage.image) {
      setError("Please fill in all required fields and upload an image")
      return
    }

    const section = newImage.section
    const newItem = {
      id: Date.now(),
      title: newImage.title,
      alt: newImage.alt,
      url: newImage.image,
    }

    const updatedImages = {
      ...images,
      [section]: [...(images[section] || []), newItem],
    }

    setImages(updatedImages)
    localStorage.setItem("websaathy_images", JSON.stringify(updatedImages))

    // Dispatch custom event to notify components about the change
    createStorageEvent("websaathy_images")

    // Reset form
    setNewImage({
      title: "",
      alt: "",
      section: section,
      image: "",
    })

    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }

    setSuccess("Image added successfully!")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleEditImage = (item: any, section: string) => {
    setEditingItem({ ...item, section })
    setNewImage({
      title: item.title,
      alt: item.alt,
      section: section,
      image: item.url,
    })
  }

  const handleUpdateImage = () => {
    if (!newImage.title || !newImage.alt || !newImage.image) {
      setError("Please fill in all required fields and upload an image")
      return
    }

    const section = editingItem.section
    const updatedImages = {
      ...images,
      [section]: images[section].map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title: newImage.title,
              alt: newImage.alt,
              url: newImage.image,
            }
          : item,
      ),
    }

    setImages(updatedImages)
    localStorage.setItem("websaathy_images", JSON.stringify(updatedImages))

    // Dispatch custom event to notify components about the change
    createStorageEvent("websaathy_images")

    // Reset form
    setEditingItem(null)
    setNewImage({
      title: "",
      alt: "",
      section: section,
      image: "",
    })

    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }

    setSuccess("Image updated successfully!")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleDeleteImage = (id: number, section: string) => {
    const updatedImages = {
      ...images,
      [section]: images[section].filter((item) => item.id !== id),
    }

    setImages(updatedImages)
    localStorage.setItem("websaathy_images", JSON.stringify(updatedImages))

    // Dispatch custom event to notify components about the change
    createStorageEvent("websaathy_images")

    setSuccess("Image deleted successfully!")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editingItem ? "Edit Image" : "Add New Image"}</CardTitle>
          <CardDescription>{editingItem ? "Update existing image" : "Add a new image to your website"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">
                  Image Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newImage.title}
                  onChange={handleInputChange}
                  placeholder="Image Title"
                />
              </div>
              <div>
                <Label htmlFor="alt">
                  Alt Text <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="alt"
                  name="alt"
                  value={newImage.alt}
                  onChange={handleInputChange}
                  placeholder="Alternative Text"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="section">
                Section <span className="text-red-500">*</span>
              </Label>
              <select
                id="section"
                name="section"
                value={newImage.section}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!!editingItem}
              >
                <option value="hero">Hero Section</option>
                <option value="services">Services Section</option>
                <option value="portfolio">Portfolio Section</option>
                <option value="testimonials">Testimonials Section</option>
                <option value="team">Team Section</option>
                <option value="blog">Blog Section</option>
                <option value="logo">Logo</option>
                <option value="background">Background Images</option>
              </select>
            </div>

            <div>
              <Label htmlFor="image">
                Image <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-4 mt-1">
                {newImage.image && (
                  <div className="h-24 w-24 overflow-hidden rounded-md">
                    <img
                      src={newImage.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input id="image" type="file" accept="image/*" ref={imageInputRef} onChange={handleFileUpload} />
                  <p className="text-xs text-muted-foreground mt-1">
                    Max file size: 2MB. Recommended dimensions: 1200x800px
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              {editingItem ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingItem(null)
                      setNewImage({
                        title: "",
                        alt: "",
                        section: activeTab,
                        image: "",
                      })
                      if (imageInputRef.current) {
                        imageInputRef.current.value = ""
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateImage}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Image
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddImage}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 overflow-x-auto">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="background">Backgrounds</TabsTrigger>
        </TabsList>

        {Object.keys(images).map((section) => (
          <TabsContent key={section} value={section}>
            {images[section]?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images[section].map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img src={item.url || "/placeholder.svg"} alt={item.alt} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/80 hover:bg-white"
                          onClick={() => handleEditImage(item, section)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/80 hover:bg-white"
                          onClick={() => handleDeleteImage(item.id, section)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.alt}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No images found</h3>
                <p className="text-muted-foreground mb-4">Add images to the {section} section using the form above.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

