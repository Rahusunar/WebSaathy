import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import ScrollProgress from "@/components/scroll-progress"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest articles and updates on web design, development, and digital marketing.",
}

export default function BlogPage() {
  // Sample blog posts data
  const blogPosts = [
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
      title: "The Importance of Mobile-First Design",
      excerpt: "Learn why designing for mobile devices first is crucial in today's smartphone-dominated world.",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 10, 2023",
      author: "Emily Rodriguez",
      category: "Web Design",
      link: "/blog/mobile-first-design",
    },
    {
      id: 4,
      title: "SEO Basics Every Website Owner Should Know",
      excerpt: "A beginner's guide to search engine optimization and why it matters for your business.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 22, 2023",
      author: "David Kim",
      category: "SEO",
      link: "/blog/seo-basics",
    },
    {
      id: 5,
      title: "The Role of UX Design in Customer Satisfaction",
      excerpt: "Explore how user experience design directly impacts customer satisfaction and business success.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 15, 2023",
      author: "Jessica Patel",
      category: "UX Design",
      link: "/blog/ux-design-customer-satisfaction",
    },
    {
      id: 6,
      title: "Choosing the Right CMS for Your Business",
      excerpt: "A comparison of popular content management systems to help you make the best choice for your needs.",
      image: "/placeholder.svg?height=400&width=600",
      date: "January 30, 2023",
      author: "Robert Wilson",
      category: "Web Development",
      link: "/blog/choosing-right-cms",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <ScrollProgress />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-24">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our Blog</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Insights, tips, and updates from our team of web experts
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild variant="link" className="px-0">
                    <Link href={post.link}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
      {/* Removed FloatingCTA which contained the WhatsApp button */}
    </div>
  )
}

