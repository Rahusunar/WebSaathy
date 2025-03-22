"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash, Save, Star } from "lucide-react"
import { createStorageEvent } from "@/hooks/use-site-images"

interface TestimonialManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function TestimonialManager({ setError, setSuccess }: TestimonialManagerProps) {
  const [testimonials, setTestimonials] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Testimonial form state
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    company: "",
    quote: "",
    image: "",
    stars: 5,
  })

  // File upload ref
  const testimonialImageRef = useRef(null)

  useEffect(() => {
    const loadTestimonials = () => {
      setIsLoading(true)
      try {
        const storedTestimonials = localStorage.getItem("websaathy_testimonials")
        if (storedTestimonials) {
          setTestimonials(JSON.parse(storedTestimonials))
        }
      } catch (error) {
        console.error("Error loading testimonials:", error)
        setError("Failed to load testimonials")
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "websaathy_testimonials" || !e.key) {
        loadTestimonials()
      }
    }

    // Listen for custom storage events
    const handleCustomStorageChange = () => {
      loadTestimonials()
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("storage:websaathy_testimonials", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener("storage:websaathy_testimonials", handleCustomStorageChange)
    }
  }, [setError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTestimonial((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStarRatingChange = (rating) => {
    setNewTestimonial((prev) => ({
      ...prev,
      stars: rating,
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
      setNewTestimonial((prev) => ({
        ...prev,
        image: imageData,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.company || !newTestimonial.quote) {
      setError("Please fill in all required fields")
      return
    }

    const newItem = {
      id: Date.now(),
      ...newTestimonial,
    }

    const updatedTestimonials = [...testimonials, newItem]
    setTestimonials(updatedTestimonials)
    localStorage.setItem("websaathy_testimonials", JSON.stringify(updatedTestimonials))
    createStorageEvent("websaathy_testimonials")

    // Reset form
    setNewTestimonial({
      name: "",
      company: "",
      quote: "",
      image: "",
      stars: 5,
    })

    if (testimonialImageRef.current) {
      testimonialImageRef.current.value = ""
    }

    setSuccess("Testimonial added successfully!")
  }

  const handleEditTestimonial = (item) => {
    setEditingItem(item)
    setNewTestimonial({
      name: item.name,
      company: item.company,
      quote: item.quote,
      image: item.image,
      stars: item.stars,
    })
  }

  const handleUpdateTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.company || !newTestimonial.quote) {
      setError("Please fill in all required fields")
      return
    }

    const updatedTestimonials = testimonials.map((item) =>
      item.id === editingItem.id ? { ...item, ...newTestimonial } : item,
    )

    setTestimonials(updatedTestimonials)
    localStorage.setItem("websaathy_testimonials", JSON.stringify(updatedTestimonials))
    createStorageEvent("websaathy_testimonials")

    // Reset form
    setEditingItem(null)
    setNewTestimonial({
      name: "",
      company: "",
      quote: "",
      image: "",
      stars: 5,
    })

    if (testimonialImageRef.current) {
      testimonialImageRef.current.value = ""
    }

    setSuccess("Testimonial updated successfully!")
  }

  const handleDeleteTestimonial = (id) => {
    const updatedTestimonials = testimonials.filter((item) => item.id !== id)
    setTestimonials(updatedTestimonials)
    localStorage.setItem("websaathy_testimonials", JSON.stringify(updatedTestimonials))
    createStorageEvent("websaathy_testimonials")

    setSuccess("Testimonial deleted successfully!")
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
          <CardTitle>{editingItem ? "Edit Testimonial" : "Add New Testimonial"}</CardTitle>
          <CardDescription>
            {editingItem ? "Update existing testimonial" : "Add a new client testimonial to your website"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  Client Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newTestimonial.name}
                  onChange={handleInputChange}
                  placeholder="Client Name"
                />
              </div>
              <div>
                <Label htmlFor="company">
                  Company <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={newTestimonial.company}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quote">
                Testimonial <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="quote"
                name="quote"
                value={newTestimonial.quote}
                onChange={handleInputChange}
                placeholder="Client testimonial"
                rows={4}
              />
            </div>

            <div>
              <Label>
                Rating <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarRatingChange(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newTestimonial.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="testimonialImage">Client Photo</Label>
              <div className="flex items-center gap-4 mt-1">
                {newTestimonial.image && (
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src={newTestimonial.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    id="testimonialImage"
                    type="file"
                    accept="image/*"
                    ref={testimonialImageRef}
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
                      setNewTestimonial({
                        name: "",
                        company: "",
                        quote: "",
                        image: "",
                        stars: 5,
                      })
                      if (testimonialImageRef.current) {
                        testimonialImageRef.current.value = ""
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateTestimonial}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Testimonial
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddTestimonial}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Testimonial
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xl font-bold text-muted-foreground">{item.name.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditTestimonial(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTestimonial(item.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex mt-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < item.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-sm italic">"{item.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

