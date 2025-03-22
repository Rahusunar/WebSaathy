"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Code, BarChart } from "lucide-react"
import { useSiteImages, getRandomImage } from "@/hooks/use-site-images"

export default function ServicesSection() {
  const { images: serviceImages } = useSiteImages("services")
  const [serviceImageUrls, setServiceImageUrls] = useState<string[]>([])

  useEffect(() => {
    // Get service images or use fallbacks
    if (serviceImages.length > 0) {
      // Use available images or generate placeholders for missing ones
      const urls = Array(3)
        .fill("")
        .map((_, index) => {
          if (index < serviceImages.length) {
            return serviceImages[index].url
          }
          return getRandomImage("services")
        })
      setServiceImageUrls(urls)
    } else {
      // Use fallback images
      setServiceImageUrls([getRandomImage("services"), getRandomImage("services"), getRandomImage("services")])
    }
  }, [serviceImages])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 reveal">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Services</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We offer a comprehensive range of web services to help your business succeed online.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Card className="reveal-left animation-delay-300 group transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-primary/50">
            <CardHeader className="pb-2 group-hover:bg-muted/30 transition-colors duration-500">
              <div className="h-40 w-full mb-4 overflow-hidden rounded-t-lg">
                {serviceImageUrls[0] && (
                  <Image
                    src={serviceImageUrls[0] || "/placeholder.svg"}
                    alt="Web Design Services"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
              <Palette className="h-12 w-12 text-primary mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <CardTitle className="group-hover:text-primary transition-colors duration-300">Web Design</CardTitle>
              <CardDescription>Beautiful, responsive websites that engage your audience</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 group-hover:bg-muted/30 transition-colors duration-500">
              <p className="group-hover:text-foreground transition-colors duration-300">
                Our expert designers create stunning, user-friendly websites that reflect your brand and engage your
                visitors.
              </p>
            </CardContent>
            <CardFooter className="group-hover:bg-muted/30 transition-colors duration-500">
              <Button asChild variant="outline" className="w-full relative overflow-hidden group/btn">
                <Link href="/services/web-design">
                  <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-[-4px]">
                    Learn More
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
                    className="h-4 w-4 absolute right-4 transition-transform duration-300 group-hover/btn:translate-x-1 opacity-0 group-hover/btn:opacity-100"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="reveal animation-delay-500 group transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-primary/50">
            <CardHeader className="pb-2 group-hover:bg-muted/30 transition-colors duration-500">
              <div className="h-40 w-full mb-4 overflow-hidden rounded-t-lg">
                {serviceImageUrls[1] && (
                  <Image
                    src={serviceImageUrls[1] || "/placeholder.svg"}
                    alt="Web Development Services"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
              <Code className="h-12 w-12 text-primary mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <CardTitle className="group-hover:text-primary transition-colors duration-300">Web Development</CardTitle>
              <CardDescription>Custom web applications and functionality</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 group-hover:bg-muted/30 transition-colors duration-500">
              <p className="group-hover:text-foreground transition-colors duration-300">
                From simple websites to complex web applications, our developers build solutions that meet your business
                needs.
              </p>
            </CardContent>
            <CardFooter className="group-hover:bg-muted/30 transition-colors duration-500">
              <Button asChild variant="outline" className="w-full relative overflow-hidden group/btn">
                <Link href="/services/web-development">
                  <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-[-4px]">
                    Learn More
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
                    className="h-4 w-4 absolute right-4 transition-transform duration-300 group-hover/btn:translate-x-1 opacity-0 group-hover/btn:opacity-100"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="reveal-right animation-delay-700 group transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-primary/50">
            <CardHeader className="pb-2 group-hover:bg-muted/30 transition-colors duration-500">
              <div className="h-40 w-full mb-4 overflow-hidden rounded-t-lg">
                {serviceImageUrls[2] && (
                  <Image
                    src={serviceImageUrls[2] || "/placeholder.svg"}
                    alt="SEO and Marketing Services"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
              <BarChart className="h-12 w-12 text-primary mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              <CardTitle className="group-hover:text-primary transition-colors duration-300">SEO & Marketing</CardTitle>
              <CardDescription>Increase visibility and drive more traffic</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 group-hover:bg-muted/30 transition-colors duration-500">
              <p className="group-hover:text-foreground transition-colors duration-300">
                Our digital marketing strategies help you reach more customers and grow your business online.
              </p>
            </CardContent>
            <CardFooter className="group-hover:bg-muted/30 transition-colors duration-500">
              <Button asChild variant="outline" className="w-full relative overflow-hidden group/btn">
                <Link href="/services/seo">
                  <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-[-4px]">
                    Learn More
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
                    className="h-4 w-4 absolute right-4 transition-transform duration-300 group-hover/btn:translate-x-1 opacity-0 group-hover/btn:opacity-100"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                  <span className="absolute inset-0 bg-primary/10 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-center mt-8 reveal-scale animation-delay-700">
          <Button
            asChild
            size="lg"
            className="transition-all duration-500 hover:shadow-xl hover:scale-105 relative overflow-hidden group"
          >
            <Link href="/services">
              <span className="relative z-10">View All Services</span>
              <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

