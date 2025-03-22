"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PortfolioFilter from "./portfolio-filter"

export default function PortfolioGrid() {
  const allProjects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "A sleek, user-friendly online store with advanced filtering and seamless checkout.",
      image:
        "https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "web-design",
      link: "/portfolio/1",
    },
    {
      id: 2,
      title: "Corporate Rebrand & Website",
      description: "Complete visual identity refresh and responsive website for a financial services firm.",
      image:
        "https://images.pexels.com/photos/5239880/pexels-photo-5239880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "web-design",
      link: "/portfolio/2",
    },
    {
      id: 3,
      title: "Restaurant Website",
      description: "Mouth-watering design with online reservation system and mobile-friendly menu.",
      image:
        "https://images.pexels.com/photos/6804080/pexels-photo-6804080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "web-design",
      link: "/portfolio/3",
    },
    {
      id: 4,
      title: "Healthcare Provider Portal",
      description: "Accessible, intuitive website design for a medical practice with patient portal integration.",
      image:
        "https://images.pexels.com/photos/7054524/pexels-photo-7054524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "web-design",
      link: "/portfolio/4",
    },
    {
      id: 5,
      title: "E-commerce Platform",
      description: "Custom-built online store with inventory management, payment processing, and customer accounts.",
      image:
        "https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "development",
      link: "/portfolio/5",
    },
    {
      id: 6,
      title: "Real Estate Listing Portal",
      description: "Property search platform with advanced filtering, map integration, and agent dashboards.",
      image:
        "https://images.pexels.com/photos/7480236/pexels-photo-7480236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "development",
      link: "/portfolio/6",
    },
    {
      id: 7,
      title: "Membership Portal",
      description: "Subscription-based platform with user authentication, content restriction, and payment processing.",
      image:
        "https://images.pexels.com/photos/11358939/pexels-photo-11358939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "development",
      link: "/portfolio/7",
    },
    {
      id: 8,
      title: "Booking System",
      description: "Appointment scheduling system with calendar integration, notifications, and admin dashboard.",
      image:
        "https://images.pexels.com/photos/12899140/pexels-photo-12899140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "development",
      link: "/portfolio/8",
    },
    {
      id: 9,
      title: "E-commerce SEO Campaign",
      description: "Increased organic traffic by 150% and conversions by 75% for an online retailer.",
      image:
        "https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "marketing",
      link: "/portfolio/9",
    },
    {
      id: 10,
      title: "Local Business SEO",
      description: "Helped a local service business achieve top 3 rankings for all target keywords in their city.",
      image:
        "https://images.pexels.com/photos/20044367/pexels-photo-20044367/free-photo-of-hands-holding-smartphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "marketing",
      link: "/portfolio/10",
    },
    {
      id: 11,
      title: "Content Marketing Strategy",
      description: "Developed a content strategy that doubled blog traffic and generated 45% more leads.",
      image:
        "https://images.pexels.com/photos/5592598/pexels-photo-5592598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "marketing",
      link: "/portfolio/11",
    },
    {
      id: 12,
      title: "PPC Campaign Management",
      description: "Reduced cost per acquisition by 40% while increasing conversion volume for a B2B company.",
      image:
        "https://images.pexels.com/photos/15717312/pexels-photo-15717312/free-photo-of-illuminated-screens-with-images.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "marketing",
      link: "/portfolio/12",
    },
  ]

  const [filteredProjects, setFilteredProjects] = useState(allProjects)

  const handleFilterChange = (category: string) => {
    if (category === "all") {
      setFilteredProjects(allProjects)
    } else {
      setFilteredProjects(allProjects.filter((project) => project.category === category))
    }
  }

  return (
    <div className="container px-4 md:px-6 pb-12 md:pb-24">
      <PortfolioFilter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden flex flex-col h-full group transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-primary/50"
          >
            <CardContent className="p-0 flex flex-col h-full">
              <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-4 text-white">
                    <span className="text-xs uppercase tracking-wider">{project.category}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-grow group-hover:bg-muted/30 transition-colors duration-500">
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base flex-grow group-hover:text-foreground transition-colors duration-300">
                  {project.description}
                </p>
                <Button asChild variant="outline" className="w-full mt-auto relative overflow-hidden group/btn">
                  <Link href={project.link}>
                    <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-[-4px]">
                      View Project Details
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

