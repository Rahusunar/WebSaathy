import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function WebDesignPortfolio() {
  const projects = [
    {
      id: 1,
      title: "Modern E-commerce Website",
      description: "A sleek, user-friendly online store with advanced filtering and seamless checkout.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/1",
    },
    {
      id: 2,
      title: "Corporate Rebrand & Website",
      description: "Complete visual identity refresh and responsive website for a financial services firm.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/2",
    },
    {
      id: 3,
      title: "Restaurant Website",
      description: "Mouth-watering design with online reservation system and mobile-friendly menu.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/3",
    },
    {
      id: 4,
      title: "Healthcare Provider Portal",
      description: "Accessible, intuitive website design for a medical practice with patient portal integration.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/portfolio/4",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Web Design Portfolio</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Check out some of our recent web design projects.
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
                    <Link href={project.link}>View Project Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

