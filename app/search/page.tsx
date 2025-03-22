"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { type SearchableItem, searchItems } from "@/lib/search"
import { Loader2, Calendar, Tag, FileText, Briefcase, Users } from "lucide-react"

// Mock data for demonstration - in a real app, this would come from your API/database
const mockSearchableItems: SearchableItem[] = [
  {
    id: 1,
    title: "10 Web Design Trends for 2023",
    excerpt: "Discover the latest web design trends that are dominating the digital landscape in 2023.",
    tags: ["web design", "trends", "UI/UX"],
    type: "blog",
    url: "/blog/web-design-trends-2023",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-03-15T10:30:00Z",
  },
  {
    id: 2,
    title: "How to Optimize Your Website for SEO",
    excerpt: "Learn the essential techniques to improve your website's search engine ranking and visibility.",
    tags: ["SEO", "optimization", "marketing"],
    type: "blog",
    url: "/blog/website-seo-optimization",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-03-10T14:45:00Z",
  },
  {
    id: 3,
    title: "Web Development Services",
    content: "Professional web development services to build responsive, fast, and user-friendly websites.",
    tags: ["web development", "coding", "responsive design"],
    type: "service",
    url: "/services/web-development",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "E-commerce Website for Fashion Brand",
    excerpt: "A custom e-commerce solution for a premium fashion brand with advanced filtering and payment options.",
    tags: ["e-commerce", "fashion", "portfolio"],
    type: "portfolio",
    url: "/portfolio/fashion-ecommerce",
    image: "/placeholder.svg?height=200&width=300",
    date: "2023-02-20T09:15:00Z",
  },
  {
    id: 5,
    title: "Rahul Kumar",
    content: "Lead Web Developer with over 8 years of experience in creating modern web applications.",
    tags: ["developer", "team", "web design"],
    type: "team",
    url: "/team/rahul-kumar",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchableItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        const searchResults = searchItems(mockSearchableItems, query)
        setResults(searchResults)
        setIsLoading(false)
      }, 500)
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Update URL with search query
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url.toString())

      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        const searchResults = searchItems(mockSearchableItems, searchQuery)
        setResults(searchResults)
        setIsLoading(false)
      }, 500)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blog":
        return <FileText className="h-4 w-4" />
      case "portfolio":
        return <Briefcase className="h-4 w-4" />
      case "team":
        return <Users className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
          <p className="text-muted-foreground mt-2">
            {query ? `Showing results for "${query}"` : "Enter a search term to find content"}
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search for articles, services, team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </form>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((result) => (
              <Card key={`${result.type}-${result.id}`}>
                <div className="md:flex">
                  {result.image && (
                    <div className="md:w-1/3">
                      <Image
                        src={result.image || "/placeholder.svg"}
                        alt={result.title}
                        width={300}
                        height={200}
                        className="h-full w-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                  )}
                  <div className={result.image ? "md:w-2/3" : "w-full"}>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        {getTypeIcon(result.type)}
                        <span className="capitalize">{result.type}</span>
                        {result.date && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(result.date).toLocaleDateString()}
                            </div>
                          </>
                        )}
                      </div>
                      <CardTitle>{result.title}</CardTitle>
                      {result.excerpt && <CardDescription>{result.excerpt}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                      {result.content && <p className="text-sm">{result.content}</p>}
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {result.tags.map((tag) => (
                            <div key={tag} className="flex items-center text-xs bg-muted px-2 py-1 rounded-full">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link href={result.url}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">No results found</h2>
            <p className="text-muted-foreground mt-2">Try different keywords or check your spelling</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

