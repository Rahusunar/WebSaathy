"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogGrid({ searchQuery = "" }: { searchQuery?: string }) {
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [allPosts, setAllPosts] = useState([
    {
      id: 1,
      title: "10 Web Design Trends to Watch in 2023",
      excerpt: "Stay ahead of the curve with these emerging web design trends that are shaping the digital landscape.",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 15, 2023",
      author: "Sarah Johnson",
      category: "Web Design",
      link: "/blog/web-design-trends-2023",
    },
    {
      id: 2,
      title: "How to Improve Your Website's Loading Speed",
      excerpt: "Discover practical tips to optimize your website's performance and provide a better user experience.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 28, 2023",
      author: "Michael Chen",
      category: "Web Development",
      link: "/blog/improve-website-loading-speed",
    },
    {
      id: 3,
      title: "The Ultimate Guide to SEO in 2023",
      excerpt: "Learn the latest SEO strategies to improve your search rankings and drive more organic traffic.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 12, 2023",
      author: "Emily Rodriguez",
      category: "SEO",
      link: "/blog/ultimate-seo-guide-2023",
    },
    {
      id: 4,
      title: "5 Ways to Increase Conversions on Your Website",
      excerpt: "Implement these proven techniques to turn more visitors into customers and boost your conversion rate.",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 30, 2023",
      author: "John Smith",
      category: "Conversion Optimization",
      link: "/blog/increase-website-conversions",
    },
    {
      id: 5,
      title: "The Benefits of Responsive Web Design",
      excerpt: "Learn why responsive design is essential for reaching users across all devices and improving SEO.",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 15, 2023",
      author: "David Wilson",
      category: "Web Design",
      link: "/blog/benefits-responsive-web-design",
    },
    {
      id: 6,
      title: "How to Create Effective Call-to-Action Buttons",
      excerpt: "Design CTAs that grab attention and drive users to take the desired action on your website.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 28, 2023",
      author: "Lisa Thompson",
      category: "UX Design",
      link: "/blog/effective-call-to-action-buttons",
    },
  ])

  useEffect(() => {
    // Load blog posts from localStorage if available
    const storedBlogPosts = localStorage.getItem("websaathy_blog")
    if (storedBlogPosts) {
      setAllPosts(JSON.parse(storedBlogPosts))
    }

    if (!searchQuery.trim()) {
      setFilteredPosts(allPosts)
    } else {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercaseQuery) ||
          post.excerpt.toLowerCase().includes(lowercaseQuery) ||
          post.category.toLowerCase().includes(lowercaseQuery),
      )
      setFilteredPosts(filtered)
    }

    setIsLoaded(true)
  }, [searchQuery, allPosts])

  // Show a loading state until the effect has run
  if (!isLoaded) {
    return (
      <div className="container px-4 md:px-6 pb-12 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="flex flex-col h-full">
              <CardContent className="p-0">
                <div className="w-full h-48 bg-muted animate-pulse" />
                <div className="p-6">
                  <div className="h-6 w-24 bg-muted animate-pulse mb-2" />
                  <div className="h-8 w-full bg-muted animate-pulse mb-2" />
                  <div className="h-20 w-full bg-muted animate-pulse mb-4" />
                  <div className="h-4 w-32 bg-muted animate-pulse" />
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-0 px-6 pb-6">
                <div className="h-10 w-full bg-muted animate-pulse" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 pb-12 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col h-full transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-primary/50 group"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-4 text-white">
                      <Badge variant="outline" className="bg-white/20 text-white border-white/40">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-6 group-hover:bg-muted/30 transition-colors duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className="transition-colors duration-300 group-hover:bg-primary/20 group-hover:text-primary"
                    >
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground">By {post.author}</p>
                </div>
              </CardContent>
              <CardFooter className="mt-auto pt-0 px-6 pb-6 group-hover:bg-muted/30 transition-colors duration-500">
                <Button asChild variant="outline" className="w-full group relative overflow-hidden">
                  <Link href={post.link} className="flex items-center justify-center gap-1">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-[-4px]">
                      Read Article
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                    <span className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-bold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try a different search term or browse all our articles.</p>
          </div>
        )}
      </div>
    </div>
  )
}

