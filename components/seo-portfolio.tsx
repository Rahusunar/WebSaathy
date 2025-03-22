import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SeoPortfolio() {
  const projects = [
    {
      id: 1,
      title: "E-commerce SEO Campaign",
      description: "Increased organic traffic by 150% and conversions by 75% for an online retailer.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/9",
    },
    {
      id: 2,
      title: "Local Business SEO",
      description: "Helped a local service business achieve top 3 rankings for all target keywords in their city.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/10",
    },
    {
      id: 3,
      title: "Content Marketing Strategy",
      description: "Developed a content strategy that doubled blog traffic and generated 45% more leads.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/11",
    },
    {
      id: 4,
      title: "PPC Campaign Management",
      description: "Reduced cost per acquisition by 40% while increasing conversion volume for a B2B company.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/12",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Digital Marketing Case Studies</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Real results we've achieved for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <Button asChild variant="outline">
                    <Link href={project.link}>View Case Study</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/portfolio">View All Case Studies</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

