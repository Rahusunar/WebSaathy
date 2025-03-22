"use client"

import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Globe, Search } from "lucide-react"

export default function AllServices() {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <section className="w-full py-12 md:py-24 relative">
      {/* Cat background in dark mode */}
      {isDarkMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <img
            src="/images/cat-background.png"
            alt="Cat Background"
            className="absolute right-0 bottom-0 w-64 h-auto"
          />
        </div>
      )}

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a comprehensive range of digital services to help your business succeed online
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Web Design Card */}
          <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Web Design</CardTitle>
              <CardDescription>Beautiful, responsive websites that engage your audience</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Custom website design</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Responsive layouts</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>User experience optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Brand integration</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/services/web-design">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Web Development Card */}
          <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Web Development</CardTitle>
              <CardDescription>Powerful, scalable websites and web applications</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Custom web development</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>E-commerce solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Content management systems</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>API integration</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/services/web-development">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* SEO Card */}
          <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>SEO</CardTitle>
              <CardDescription>Improve your visibility and rankings in search engines</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Keyword research</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>On-page optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Technical SEO</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Link building</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/services/seo">Learn More</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

