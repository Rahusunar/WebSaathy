"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash, Save } from "lucide-react"
import { createStorageEvent } from "@/hooks/use-site-images"

interface BlogManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function BlogManager({ setError, setSuccess }: BlogManagerProps) {
  const [blogPosts, setBlogPosts] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Blog post form state
  const [newBlogPost, setNewBlogPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "",
    author: "",
  })

  // File upload ref
  const blogImageRef = useRef(null)

  useEffect(() => {
    const loadBlogPosts = () => {
      setIsLoading(true)
      try {
        const storedBlogPosts = localStorage.getItem("websaathy_blog")
        if (storedBlogPosts) {
          setBlogPosts(JSON.parse(storedBlogPosts))
        }
      } catch (error) {
        console.error("Error loading blog posts:", error)
        setError("Failed to load blog posts")
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogPosts()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "websaathy_blog" || !e.key) {
        loadBlogPosts()
      }
    }

    // Listen for custom storage events
    const handleCustomStorageChange = () => {
      loadBlogPosts()
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("storage:websaathy_blog", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener("storage:websaathy_blog", handleCustomStorageChange)
    }
  }, [setError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBlogPost((prev) => ({
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
      setNewBlogPost((prev) => ({
        ...prev,
        image: imageData,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddBlogPost = () => {
    if (
      !newBlogPost.title ||
      !newBlogPost.excerpt ||
      !newBlogPost.content ||
      !newBlogPost.category ||
      !newBlogPost.author
    ) {
      setError("Please fill in all required fields")
      return
    }

    const newPost = {
      id: Date.now(),
      ...newBlogPost,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      link: `/blog/${Date.now()}`,
    }

    const updatedBlogPosts = [...blogPosts, newPost]
    setBlogPosts(updatedBlogPosts)
    localStorage.setItem("websaathy_blog", JSON.stringify(updatedBlogPosts))
    createStorageEvent("websaathy_blog")

    // Reset form
    setNewBlogPost({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      author: "",
    })

    if (blogImageRef.current) {
      blogImageRef.current.value = ""
    }

    setSuccess("Blog post added successfully!")
  }

  const handleEditBlogPost = (post) => {
    setEditingItem(post)
    setNewBlogPost({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      category: post.category,
      author: post.author,
    })
  }

  const handleUpdateBlogPost = () => {
    if (
      !newBlogPost.title ||
      !newBlogPost.excerpt ||
      !newBlogPost.content ||
      !newBlogPost.category ||
      !newBlogPost.author
    ) {
      setError("Please fill in all required fields")
      return
    }

    const updatedBlogPosts = blogPosts.map((post) => (post.id === editingItem.id ? { ...post, ...newBlogPost } : post))

    setBlogPosts(updatedBlogPosts)
    localStorage.setItem("websaathy_blog", JSON.stringify(updatedBlogPosts))
    createStorageEvent("websaathy_blog")

    // Reset form
    setEditingItem(null)
    setNewBlogPost({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "",
      author: "",
    })

    if (blogImageRef.current) {
      blogImageRef.current.value = ""
    }

    setSuccess("Blog post updated successfully!")
  }

  const handleDeleteBlogPost = (id) => {
    const updatedBlogPosts = blogPosts.filter((post) => post.id !== id)
    setBlogPosts(updatedBlogPosts)
    localStorage.setItem("websaathy_blog", JSON.stringify(updatedBlogPosts))
    createStorageEvent("websaathy_blog")

    setSuccess("Blog post deleted successfully!")
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
          <CardTitle>{editingItem ? "Edit Blog Post" : "Add New Blog Post"}</CardTitle>
          <CardDescription>
            {editingItem ? "Update existing blog post" : "Add a new blog post to your website"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={newBlogPost.title}
                  onChange={handleInputChange}
                  placeholder="Blog Post Title"
                />
              </div>
              <div>
                <Label htmlFor="author">
                  Author <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={newBlogPost.author}
                  onChange={handleInputChange}
                  placeholder="Author Name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">
                Excerpt <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={newBlogPost.excerpt}
                onChange={handleInputChange}
                placeholder="Short excerpt for the blog post"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="content">
                Content <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                name="content"
                value={newBlogPost.content}
                onChange={handleInputChange}
                placeholder="Full blog post content"
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category"
                name="category"
                value={newBlogPost.category}
                onChange={handleInputChange}
                placeholder="Blog Post Category"
              />
            </div>

            <div>
              <Label htmlFor="blogImage">Featured Image</Label>
              <div className="flex items-center gap-4 mt-1">
                {newBlogPost.image && (
                  <div className="h-24 w-24 overflow-hidden rounded-md">
                    <img
                      src={newBlogPost.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input id="blogImage" type="file" accept="image/*" ref={blogImageRef} onChange={handleFileUpload} />
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
                      setNewBlogPost({
                        title: "",
                        excerpt: "",
                        content: "",
                        image: "",
                        category: "",
                        author: "",
                      })
                      if (blogImageRef.current) {
                        blogImageRef.current.value = ""
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateBlogPost}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Blog Post
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddBlogPost}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Blog Post
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="relative h-40">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => handleEditBlogPost(post)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => handleDeleteBlogPost(post.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                By {post.author} | {post.date} | {post.category}
              </p>
              <p className="text-sm line-clamp-3">{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

