"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, FileText, ImageIcon } from "lucide-react"

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    inquiries: 0,
    blogPosts: 0,
    portfolioItems: 0,
    teamMembers: 0,
    testimonials: 0,
    images: 0,
  })
  const [recentInquiries, setRecentInquiries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = () => {
      setIsLoading(true)
      try {
        // Load inquiries
        const inquiries = JSON.parse(localStorage.getItem("websaathy_inquiries") || "[]")

        // Load team members
        const teamMembers = JSON.parse(localStorage.getItem("websaathy_team") || "[]")

        // Load portfolio items
        const portfolioItems = JSON.parse(localStorage.getItem("websaathy_portfolio") || "[]")

        // Load testimonials
        const testimonials = JSON.parse(localStorage.getItem("websaathy_testimonials") || "[]")

        // Load blog posts
        const blogPosts = JSON.parse(localStorage.getItem("websaathy_blog") || "[]")

        // Load images
        const images = JSON.parse(localStorage.getItem("websaathy_images") || "{}")
        let totalImages = 0
        Object.keys(images).forEach((key) => {
          totalImages += images[key]?.length || 0
        })

        setStats({
          inquiries: inquiries.length,
          blogPosts: blogPosts.length,
          portfolioItems: portfolioItems.length,
          teamMembers: teamMembers.length,
          testimonials: testimonials.length,
          images: totalImages,
        })

        setRecentInquiries(inquiries.slice(0, 3))
      } catch (error) {
        console.error("Error loading dashboard stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()

    // Listen for storage changes
    const handleStorageChange = () => {
      loadStats()
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-5 w-24 bg-muted animate-pulse rounded-md mb-2"></div>
              <div className="h-4 w-32 bg-muted animate-pulse rounded-md"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-12 bg-muted animate-pulse rounded-md"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Inquiries
            </CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.inquiries}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Blog Posts
            </CardTitle>
            <CardDescription>Total published</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.blogPosts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Portfolio Items
            </CardTitle>
            <CardDescription>Total projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.portfolioItems}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Team Members
            </CardTitle>
            <CardDescription>Active members</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.teamMembers}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {inquiry.projectType ? `${inquiry.projectType} Inquiry` : "Website Inquiry"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          From: {inquiry.name} - {new Date(inquiry.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm mt-1 line-clamp-2">{inquiry.message}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">
                  No inquiries yet. When users submit the contact form, their submissions will appear here.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

