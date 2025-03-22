"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WhatsAppIcon } from "./whatsapp-icon"
import RateUs from "./rate-us"
import { getLogoImage } from "@/hooks/use-site-images"
import { useEffect, useState } from "react"

export default function Footer() {
  const [logoUrl, setLogoUrl] = useState("")

  useEffect(() => {
    // Get logo from localStorage
    setLogoUrl(getLogoImage())
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <Link href="/" className="block mb-4">
              <div className="relative h-8 w-auto">
                <Image
                  src="/images/logo.png"
                  alt="Websaathy Logo"
                  width={140}
                  height={32}
                  className="object-contain"
                  style={{ maxHeight: "32px", maxWidth: "140px" }}
                />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional web design and development services to help your business succeed online.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <Link href="/" className="block text-sm text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="block text-sm text-muted-foreground hover:text-primary">
              About Us
            </Link>
            <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary">
              Services
            </Link>
            <Link href="/portfolio" className="block text-sm text-muted-foreground hover:text-primary">
              Portfolio
            </Link>
            <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary">
              Blog
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <Link href="/services/web-design" className="block text-sm text-muted-foreground hover:text-primary">
              Web Design
            </Link>
            <Link href="/services/web-development" className="block text-sm text-muted-foreground hover:text-primary">
              Web Development
            </Link>
            <Link href="/services/seo" className="block text-sm text-muted-foreground hover:text-primary">
              SEO & Digital Marketing
            </Link>
            <Link href="/services/ecommerce" className="block text-sm text-muted-foreground hover:text-primary">
              E-commerce Solutions
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="max-w-[220px]" required />
              <Button type="submit" size="sm">
                Sign Up
              </Button>
            </form>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Follow Us</h4>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <Link
                    href="https://www.facebook.com/websathy"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <Link href="#" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <Link href="#" aria-label="WhatsApp">
                    <WhatsAppIcon className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-lg font-semibold">Rate Us</h3>
            <RateUs />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between border-t pt-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Websaathy. All rights reserved.{" "}
            <span className="block sm:inline">Created by Websaathy</span>
          </p>
          <Button variant="ghost" size="icon" className="mb-4 sm:mb-0" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  )
}

