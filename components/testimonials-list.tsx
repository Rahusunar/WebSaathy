import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsList() {
  const testimonials = [
    {
      id: 1,
      name: "Ram Bahadur Thapa",
      company: "Tech Solutions Inc.",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Working with this team was a game-changer for our business. Our new website has increased our leads by 150%! The design is beautiful, and the functionality is exactly what we needed. Their attention to detail and commitment to our project's success was impressive.",
      stars: 5,
    },
    {
      id: 2,
      name: "Manoj Bhatta",
      company: "Retail Innovations",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The SEO services provided have dramatically improved our search rankings and online visibility. We're now on the first page for all our target keywords, and our organic traffic has doubled in just three months. Their team is knowledgeable, responsive, and a pleasure to work with.",
      stars: 5,
    },
    {
      id: 3,
      name: "Gehendra Bohara",
      company: "Creative Studios",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The web design team created a beautiful, functional site that perfectly represents our brand. They took the time to understand our vision and translated it into a website that exceeds our expectations. The project was delivered on time and on budget.",
      stars: 4,
    },
    {
      id: 4,
      name: "Birendra Deuba",
      company: "Wilson & Associates",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "We hired this agency to redesign our outdated website and implement an SEO strategy. The results have been outstanding. Our website now looks modern and professional, and our organic traffic has increased by 200%. I highly recommend their services.",
      stars: 5,
    },
    {
      id: 5,
      name: "Prabhat Kunwar",
      company: "Wellness Center",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "As a small business owner, I needed a website that would help me compete with larger companies in my industry. The team delivered a stunning website that has helped me establish credibility and attract new clients. Their ongoing support has been invaluable.",
      stars: 5,
    },
    {
      id: 6,
      name: "Kiran Bhatta",
      company: "Garcia Construction",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Our e-commerce website needed a complete overhaul to improve user experience and increase sales. The development team created a seamless shopping experience that has resulted in a 75% increase in online sales. Their expertise and professionalism are top-notch.",
      stars: 4,
    },
    {
      id: 7,
      name: "Kepisee Thapa",
      company: "Digital Marketing Agency",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The team at Websaathy went above and beyond to deliver a website that perfectly captures our brand identity. Their attention to detail and creative approach has helped us stand out in a competitive market.",
      stars: 5,
    },
    {
      id: 8,
      name: "Lokesh Joshi",
      company: "Education Institute",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "We needed a website that would appeal to both students and parents while providing easy access to important information. Websaathy delivered exactly what we needed, and we've received numerous compliments on the design and functionality.",
      stars: 5,
    },
    {
      id: 9,
      name: "Sushmita Balayar",
      company: "Fashion Boutique",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Our online store has seen a significant increase in sales since Websaathy redesigned it. The user experience is seamless, and the mobile responsiveness is perfect. I couldn't be happier with the results.",
      stars: 5,
    },
    {
      id: 10,
      name: "Karishma Subedi",
      company: "Health & Wellness",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Working with Websaathy was a pleasure from start to finish. They took the time to understand our unique needs and created a website that perfectly represents our brand and services. Highly recommended!",
      stars: 4,
    },
    {
      id: 11,
      name: "Bulbul Thapa Magar",
      company: "Restaurant Chain",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The website Websaathy created for our restaurant chain has significantly improved our online presence. The online ordering system is intuitive and has increased our takeout orders by 40%. Great work!",
      stars: 5,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col h-full">
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
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

