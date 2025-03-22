import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "./whatsapp-icon"

export default function TeamMembers() {
  const team = [
    {
      name: "Aryan Thapa",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Aryan has over 15 years of experience in web development and digital marketing. He founded the company with a vision to help businesses succeed online through innovative web solutions.",
      social: {
        facebook: "#",
        instagram: "#",
        whatsapp: "9779841234567",
      },
    },
    {
      name: "Kamal Viswokarma",
      role: "Lead Designer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Kamal brings creativity and user-centered design principles to every project. With a background in graphic design and UX/UI, he ensures our websites are both beautiful and functional.",
      social: {
        facebook: "#",
        instagram: "#",
        whatsapp: "9779841234567",
      },
    },
    {
      name: "Lalita Mahar",
      role: "Senior Developer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Lalita specializes in creating robust, scalable web applications. Her expertise in front-end and back-end technologies allows her to build complex solutions that meet client needs.",
      social: {
        facebook: "#",
        instagram: "#",
        whatsapp: "9779841234567",
      },
    },
    {
      name: "Barsha Bogati",
      role: "Marketing Specialist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Barsha helps clients increase their online visibility and reach their target audience. Her strategies combine SEO, content marketing, and social media to drive traffic and conversions.",
      social: {
        facebook: "#",
        instagram: "#",
        whatsapp: "9779841234567",
      },
    },
    {
      name: "Rawal Sunar",
      role: "Project Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Rawal ensures projects are delivered on time and within budget. His organizational skills and attention to detail keep our team focused and our clients happy.",
      social: {
        facebook: "#",
        instagram: "#",
        whatsapp: "9779841234567",
      },
    },
    {
      name: "Ashish Upadhayay",
      role: "Content Strategist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Ashish develops content strategies that engage audiences and drive conversions. His background in journalism helps him create compelling narratives for our clients.",
      social: {
        facebook: "#",
        instagram: "#",
        whatsapp: "9779841234567",
      },
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
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

