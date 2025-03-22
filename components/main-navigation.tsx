"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

export default function MainNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logo, setLogo] = useState("/images/logo.png")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"
  const [shouldRender, setShouldRender] = useState(true)

  // Check if we should render the navigation
  useEffect(() => {
    const shouldRenderNav = !(pathname && pathname.startsWith("/blog/") && window.location.pathname !== pathname)
    setShouldRender(shouldRenderNav)
  }, [pathname])

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load logo from localStorage if available
  const loadLogo = useCallback(() => {
    const storedImages = localStorage.getItem("websaathy_images")
    if (storedImages) {
      try {
        const images = JSON.parse(storedImages)
        if (images.logo && images.logo.length > 0) {
          setLogo(images.logo[0].url)
        }
      } catch (error) {
        console.error("Error parsing images:", error)
      }
    }
  }, [])

  useEffect(() => {
    loadLogo()

    // Listen for image changes
    const handleImagesChange = () => {
      loadLogo()
    }

    document.addEventListener("websaathy:images_updated", handleImagesChange)
    document.addEventListener("storage:websaathy_images", handleImagesChange)

    return () => {
      document.removeEventListener("websaathy:images_updated", handleImagesChange)
      document.removeEventListener("storage:websaathy_images", handleImagesChange)
    }
  }, [loadLogo])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      children: [
        { name: "Web Design", href: "/services/web-design" },
        { name: "Web Development", href: "/services/web-development" },
        { name: "SEO", href: "/services/seo" },
      ],
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
            <img
              src={logo || "/placeholder.svg"}
              alt="Websaathy"
              className={`h-12 w-auto transition-all duration-300 ${isDarkMode ? "brightness-150 contrast-150" : ""}`}
              style={{ maxHeight: "48px" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.name} className="relative group">
                    <button
                      className={`px-3 py-2 text-sm font-medium rounded-md flex items-center transition-all duration-300 hover:scale-105 ${
                        pathname === item.href ? "text-primary" : "text-foreground/80 hover:text-primary hover:bg-muted"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="absolute left-0 mt-1 w-48 origin-top-left rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                      <div className="py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:pl-6"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 relative group hover:scale-105 ${
                    pathname === item.href ? "text-primary" : "text-foreground/80 hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Link>
              )
            })}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Search bar (expanded) */}
            {isSearchOpen && (
              <form onSubmit={handleSearch} className="relative mr-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 md:w-60 h-9 px-3 py-2 text-sm rounded-md border border-input bg-background"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full transition-all duration-300 hover:bg-primary/20 hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 transition-transform hover:rotate-45 duration-300" />
              ) : (
                <Moon className="h-5 w-5 transition-transform hover:-rotate-45 duration-300" />
              )}
            </Button>

            {/* Search button (collapsed) */}
            {!isSearchOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full transition-all duration-300 hover:bg-primary/20 hover:scale-110"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex transition-all duration-300 hover:scale-105 hover:shadow-lg bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <Link href="/contact">Get Started</Link>
            </Button>

            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full transition-all duration-300 hover:bg-primary/20 hover:scale-110"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="transition-transform duration-300 hover:scale-105"
                    >
                      <img src={logo || "/placeholder.svg"} alt="Websaathy" className="h-10 w-auto" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-full transition-all duration-300 hover:bg-primary/20 hover:rotate-90"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-1 mt-4">
                    {navItems.map((item) => {
                      if (item.children) {
                        return (
                          <div key={item.name} className="space-y-1">
                            <div
                              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                                pathname === item.href
                                  ? "text-primary bg-primary/10"
                                  : "text-foreground/80 hover:text-primary hover:bg-muted"
                              }`}
                            >
                              {item.name}
                            </div>
                            <div className="pl-4 space-y-1 border-l-2 border-muted ml-3">
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block px-3 py-2 text-sm rounded-md transition-all duration-300 hover:pl-5 ${
                                    pathname === child.href
                                      ? "text-primary bg-primary/10"
                                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      }

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:pl-5 ${
                            pathname === item.href
                              ? "text-primary bg-primary/10"
                              : "text-foreground/80 hover:text-primary hover:bg-muted"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>
                  <div className="mt-auto pt-4">
                    <Button
                      asChild
                      className="w-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] bg-black text-white dark:bg-white dark:text-black"
                    >
                      <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

