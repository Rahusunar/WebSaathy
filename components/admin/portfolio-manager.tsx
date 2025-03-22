"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash, Save } from "lucide-react"
import { createStorageEvent } from "@/hooks/use-site-images"

interface PortfolioManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function PortfolioManager({ setError, setSuccess }: PortfolioManagerProps) {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Portfolio form state
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    link: "",
  })

  // File upload ref
  const portfolioImageRef = useRef(null)

  useEffect(() => {
    const loadPortfolioItems = () => {
      setIsLoading(true)
      try {
        const storedPortfolio = localStorage.getItem("websaathy_portfolio")
        if (storedPortfolio) {
          setPortfolioItems(JSON.parse(storedPortfolio))
        }
      } catch (error) {
        console.error("Error loading portfolio items:", error)
        setError("Failed to load portfolio items")
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolioItems()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "websaathy_portfolio" || !e.key) {
        loadPortfolioItems()
      }
    }

    // Listen for custom storage events
    const handleCustomStorageChange = () => {
      loadPortfolioItems()
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("storage:websaathy_portfolio", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener("storage:websaathy_portfolio", handleCustomStorageChange)
    }
  }, [setError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPortfolio((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = (e) => {
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
      const imageData = event.target?.result
      setNewPortfolio((prev) => ({
        ...prev,
        image: imageData,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddPortfolio = () => {
    if (!newPortfolio.title || !newPortfolio.description || !newPortfolio.category) {
      setError("Please fill in all required fields")
      return
    }

    const newItem = {
      id: Date.now(),
      ...newPortfolio,
      link: `/portfolio/${Date.now()}`,
    }

    const updatedPortfolio = [...portfolioItems, newItem]
    setPortfolioItems(updatedPortfolio)
    localStorage.setItem("websaathy_portfolio", JSON.stringify(updatedPortfolio))
    createStorageEvent("websaathy_portfolio")

    // Reset form
    setNewPortfolio({
      title: "",
      description: "",
      category: "",
      image: "",
      link: "",
    })

    if (portfolioImageRef.current) {
      portfolioImageRef.current.value = ""
    }

    setSuccess("Portfolio item added successfully!")
  }

  const handleEditPortfolio = (item) => {
    setEditingItem(item)
    setNewPortfolio({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
    })
  }

  const handleUpdatePortfolio = () => {
    if (!newPortfolio.title || !newPortfolio.description || !newPortfolio.category) {
      setError("Please fill in all required fields")
      return
    }

    const updatedPortfolio = portfolioItems.map((item) =>
      item.id === editingItem.id ? { ...item, ...newPortfolio } : item,
    )

    setPortfolioItems(updatedPortfolio)
    localStorage.setItem("websaathy_portfolio", JSON.stringify(updatedPortfolio))
    createStorageEvent("websaathy_portfolio")

    // Reset form
    setEditingItem(null)
    setNewPortfolio({
      title: "",
      description: "",
      category: "",
      image: "",
      link: "",
    })

    if (portfolioImageRef.current) {
      portfolioImageRef.current.value = ""
    }

    setSuccess("Portfolio item updated successfully!")
  }

  const handleDeletePortfolio = (id) => {
    const updatedPortfolio = portfolioItems.filter((item) => item.id !== id)
    setPortfolioItems(updatedPortfolio)
    localStorage.setItem("websaathy_portfolio", JSON.stringify(updatedPortfolio))
    createStorageEvent("websaathy_portfolio")

    setSuccess("Portfolio item deleted successfully!")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="h-7 w-40 bg-muted animate-pulse rounded-md mb-2"></div>
            <div className="h-5 w-64 bg-muted animate-pulse rounded-md"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              <div className="h-32 bg-muted animate-pulse rounded-md"></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-40 bg-muted animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md mb-4"></div>
                <div className="h-16 bg-muted animate-pulse rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}</CardTitle>
          <CardDescription>
            {editingItem ? "Update existing portfolio item" : "Add a new project to your portfolio"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={newPortfolio.title}
                onChange={handleInputChange}
                placeholder="Project Title"
              />
            </div>

            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newPortfolio.description}
                onChange={handleInputChange}
                placeholder="Project Description"
              />
            </div>

            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                id="category"
                name="category"
                value={newPortfolio.category}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                <option value="web-design">Web Design</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
                <option value="ecommerce">E-commerce</option>
                <option value="social-media">Social Media Management</option>
              </select>
            </div>

            <div>
              <Label htmlFor="portfolioImage">
                Project Image <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-4 mt-1">
                {newPortfolio.image && (
                  <div className="h-24 w-24 overflow-hidden rounded-md">
                    <img
                      src={newPortfolio.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    id="portfolioImage"
                    type="file"
                    accept="image/*"
                    ref={portfolioImageRef}
                    onChange={handleFileUpload}
                  />
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
                      setNewPortfolio({
                        title: "",
                        description: "",
                        category: "",
                        image: "",
                        link: "",
                      })
                      if (portfolioImageRef.current) {
                        portfolioImageRef.current.value = ""
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdatePortfolio}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Portfolio Item
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddPortfolio}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Portfolio Item
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => handleEditPortfolio(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => handleDeletePortfolio(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">Category: {item.category}</p>
              <p className="text-sm line-clamp-3">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

