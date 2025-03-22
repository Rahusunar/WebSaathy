"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("all")
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      category: "ecommerce",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Corporate Branding",
      category: "corporate",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Mobile App Design",
      category: "mobile",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 4,
      title: "Blog Platform",
      category: "blog",
      image: "/placeholder.svg?height=400&width=600",
    },
  ])

  useEffect(() => {
    // Load portfolio items from localStorage if available
    const storedPortfolio = localStorage.getItem("websaathy_portfolio")
    if (storedPortfolio) {
      setPortfolioItems(JSON.parse(storedPortfolio))
    }
  }, [])

  const filteredItems =
    activeTab === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeTab)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10 pointer-events-none"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 reveal">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Portfolio</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Check out some of our recent projects and see what we can do for you.
            </p>
          </div>
        </div>

        <Tabs defaultValue="all" className="mt-8">
          <div className="flex justify-center overflow-x-auto">
            <TabsList className="flex flex-nowrap reveal animation-delay-300">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="web-design" onClick={() => setActiveTab("web-design")}>
                Web Design
              </TabsTrigger>
              <TabsTrigger value="development" onClick={() => setActiveTab("development")}>
                Development
              </TabsTrigger>
              <TabsTrigger value="marketing" onClick={() => setActiveTab("marketing")}>
                Marketing
              </TabsTrigger>
              <TabsTrigger value="ecommerce" onClick={() => setActiveTab("ecommerce")}>
                E-commerce
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.slice(0, 4).map((item, index) => (
                <Card
                  key={item.id}
                  className={`overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${index % 2 === 0 ? "reveal-left" : "reveal-right"} animation-delay-${300 + index * 100}`}
                >
                  <CardContent className="p-0">
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                          <p className="text-sm text-white/80">{item.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                      <Button asChild variant="link" className="px-0 group">
                        <Link href={`/portfolio/${item.id}`} className="flex items-center gap-1">
                          View Project
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
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["web-design", "development", "marketing", "ecommerce"].map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredItems.slice(0, 4).map((item, index) => (
                  <Card
                    key={item.id}
                    className={`overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${index % 2 === 0 ? "reveal-left" : "reveal-right"} animation-delay-${300 + index * 100}`}
                  >
                    <CardContent className="p-0">
                      <div className="relative w-full h-48 sm:h-56 md:h-64">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                          <div className="p-4 text-white">
                            <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                            <p className="text-sm text-white/80">{item.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                        <Button asChild variant="link" className="px-0 group">
                          <Link href={`/portfolio/${item.id}`} className="flex items-center gap-1">
                            View Project
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
                              className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-center mt-8 reveal-scale animation-delay-700">
          <Button asChild size="lg" className="animate-pulse-slow">
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

