"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Ram Bahadur Thapa",
      company: "Tech Solutions Inc.",
      image: "/placeholder.svg?height=50&width=50",
      quote:
        "Working with this team was a game-changer for our business. Our new website has increased our leads by 150%!",
      stars: 5,
    },
    {
      id: 2,
      name: "Manoj Bhatta",
      company: "Retail Innovations",
      image: "/placeholder.svg?height=50&width=50",
      quote: "The SEO services provided have dramatically improved our search rankings and online visibility.",
      stars: 5,
    },
    {
      id: 3,
      name: "Gehendra Bohara",
      company: "Creative Studios",
      image: "/placeholder.svg?height=50&width=50",
      quote: "The web design team created a beautiful, functional site that perfectly represents our brand.",
      stars: 4,
    },
  ])

  useEffect(() => {
    // Load testimonials from localStorage if available
    const storedTestimonials = localStorage.getItem("websaathy_testimonials")
    if (storedTestimonials) {
      setTestimonials(JSON.parse(storedTestimonials))
    }
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10 pointer-events-none"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 reveal">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Clients Say</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                index === 0 ? "reveal-left" : index === 1 ? "reveal" : "reveal-right"
              } animation-delay-${300 + index * 200}`}
            >
              <CardContent className="flex-grow pt-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.stars ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 pt-2">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full object-cover h-[50px] w-[50px]"
                  />
                ) : (
                  <div className="h-[50px] w-[50px] rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold text-muted-foreground">{testimonial.name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 reveal-scale animation-delay-700">
          <Button asChild size="lg" className="animate-pulse-slow">
            <Link href="/testimonials">Read More Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

