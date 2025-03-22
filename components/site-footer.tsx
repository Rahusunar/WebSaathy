import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"
import { getSocialLinks } from "@/lib/actions"

export async function SiteFooter() {
  const socialLinks = await getSocialLinks()

  const services = [
    { name: "Web Design", href: "/services/web-design" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "SEO", href: "/services/seo" },
  ]

  const company = [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    github: Github,
  }

  // Filter out empty social links
  const activeSocialLinks = Object.entries(socialLinks)
    .filter(([_, url]) => url && url.length > 0)
    .map(([platform, url]) => ({
      platform,
      url,
      icon: socialIcons[platform],
    }))

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Websaathy. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}

