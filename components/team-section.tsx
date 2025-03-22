"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "./whatsapp-icon"
import OptimizedImage from "./optimized-image"
import { useSiteImages } from "@/hooks/use-site-images"

export default function TeamSection() {
  const [team, setTeam] = useState([])
  const { images: teamImages } = useSiteImages("team")

  const loadTeamData = useCallback(() => {
    // Load team members from localStorage if available
    try {
      const storedTeam = localStorage.getItem("websaathy_team")
      if (storedTeam) {
        setTeam(JSON.parse(storedTeam))
      }
    } catch (error) {
      console.error("Error loading team data:", error)
    }
  }, [])

  useEffect(() => {
    loadTeamData()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "websaathy_team" || !e.key) {
        loadTeamData()
      }
    }

    // Listen for custom storage events
    const handleCustomStorageChange = () => {
      loadTeamData()
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("storage:websaathy_team", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener("storage:websaathy_team", handleCustomStorageChange)
    }
  }, [loadTeamData])

  return (
    <section className="w-full py-12 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-transparent pointer-events-none"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight animate-fade-in-up">Meet Our Team</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-fade-in-up animation-delay-300">
            The talented people behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card
              key={member.id}
              className="overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="relative h-64">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    fallback={teamImages.length > 0 ? teamImages[index % teamImages.length]?.url : undefined}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-xl">{member.name}</h3>
                      <p className="text-sm text-white/80">{member.role}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                  <p className="text-sm">{member.bio}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-2 p-4 pt-0">
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href={member.social.facebook} aria-label="Facebook">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href={member.social.instagram} aria-label="Instagram">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a
                    href={`https://wa.me/${member.social.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

