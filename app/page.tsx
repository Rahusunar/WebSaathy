"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import CreativeLoader from "@/components/creative-loader"
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedCounter from "@/components/animated-counter"
import AnimatedText from "@/components/animated-text"
import { useTheme } from "next-themes"
import HomeContactSection from "@/components/home-contact-section"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  // First, add a new state for settings:
  const [settings, setSettings] = useState({
    stats: {
      projectsCompleted: 150,
      clientSatisfaction: 98,
      yearsExperience: 5, // Changed from 12 to 5
      support: "24/7",
    },
  })

  // Scroll animation refs
  const heroTitleRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up" })
  const heroImageRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-left", delay: 300 })
  const heroButtonsRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up", delay: 600 })

  const servicesTitleRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up" })
  const servicesCard1Ref = useScrollAnimation<HTMLDivElement>({ type: "slide-up", delay: 200 })
  const servicesCard2Ref = useScrollAnimation<HTMLDivElement>({ type: "slide-up", delay: 400 })
  const servicesCard3Ref = useScrollAnimation<HTMLDivElement>({ type: "slide-up", delay: 600 })
  const servicesButtonRef = useScrollAnimation<HTMLDivElement>({ type: "scale-in", delay: 800 })

  const portfolioTitleRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up" })
  const portfolioItem1Ref = useScrollAnimation<HTMLDivElement>({ type: "fade-in-left", delay: 300 })
  const portfolioItem2Ref = useScrollAnimation<HTMLDivElement>({ type: "fade-in-right", delay: 500 })
  const portfolioButtonRef = useScrollAnimation<HTMLDivElement>({ type: "bounce-in", delay: 700 })

  const testimonialsTitleRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up" })
  const testimonial1Ref = useScrollAnimation<HTMLDivElement>({ type: "flip-up", delay: 200 })
  const testimonial2Ref = useScrollAnimation<HTMLDivElement>({ type: "flip-up", delay: 400 })
  const testimonial3Ref = useScrollAnimation<HTMLDivElement>({ type: "flip-up", delay: 600 })
  const testimonialsButtonRef = useScrollAnimation<HTMLDivElement>({ type: "scale-in", delay: 800 })

  const contactTitleRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up" })
  const contactInfoRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-left", delay: 300 })
  const contactFormRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-right", delay: 500 })

  const ctaTitleRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up" })
  const ctaButtonsRef = useScrollAnimation<HTMLDivElement>({ type: "fade-in-up", delay: 300 })

  // Staggered animation refs
  const statsContainerRef = useStaggeredAnimation(".stat-item", {
    type: "fade-in-up",
    baseDelay: 100,
    staggerDelay: 150,
  })

  // Initialize default data
  useEffect(() => {
    // Load settings if available
    const storedSettings = localStorage.getItem("websaathy_settings")
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings)
        // Ensure years of experience is 5 instead of 12
        if (parsedSettings.stats && parsedSettings.stats.yearsExperience === 12) {
          parsedSettings.stats.yearsExperience = 5
        }
        setSettings(parsedSettings)
      } catch (error) {
        console.error("Error parsing settings:", error)
      }
    }

    // Initialize images if not already set
    if (!localStorage.getItem("websaathy_images")) {
      const defaultImages = {
        hero: [],
        services: [],
        portfolio: [],
        testimonials: [],
        team: [],
        blog: [],
        logo: [
          {
            id: 1,
            title: "Websaathy Logo",
            alt: "Websaathy Logo",
            url: "/images/logo.png",
          },
        ],
        background: [],
      }
      localStorage.setItem("websaathy_images", JSON.stringify(defaultImages))
    }

    // Also initialize settings if not already set:
    if (!localStorage.getItem("websaathy_settings")) {
      const defaultSettings = {
        siteName: "Websaathy",
        siteDescription: "Web Design & Development Solutions",
        contactEmail: "websathy@gmail.com",
        contactPhone: "+977 9805740156",
        address: "Attariya, Kailali, Nepal",
        enableDarkMode: true,
        enableRatings: true,
        enableContactForm: true,
        enableBlog: true,
        stats: {
          projectsCompleted: 150,
          clientSatisfaction: 98,
          yearsExperience: 5, // Changed from 12 to 5
          support: "24/7",
        },
      }
      localStorage.setItem("websaathy_settings", JSON.stringify(defaultSettings))
    }

    // Initialize team members if not already set
    if (!localStorage.getItem("websaathy_team")) {
      const defaultTeam = [
        {
          id: 1,
          name: "Aryan Thapa",
          role: "Founder & CEO",
          bio: "Aryan has over 5 years of experience in web development and digital marketing.", // Changed from 15 to 5
          image:
            "https://images.pexels.com/photos/7054524/pexels-photo-7054524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          social: {
            facebook: "#",
            instagram: "#",
            whatsapp: "9779805740156",
          },
        },
        {
          id: 2,
          name: "Kamal Viswokarma",
          role: "Lead Designer",
          bio: "Kamal brings creativity and user-centered design principles to every project.",
          image:
            "https://images.pexels.com/photos/5239880/pexels-photo-5239880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          social: {
            facebook: "#",
            instagram: "#",
            whatsapp: "9779805740156",
          },
        },
      ]
      localStorage.setItem("websaathy_team", JSON.stringify(defaultTeam))
    }

    // Initialize portfolio items if not already set
    if (!localStorage.getItem("websaathy_portfolio")) {
      const defaultPortfolio = [
        {
          id: 1,
          title: "E-commerce Website",
          description: "A sleek, user-friendly online store with advanced filtering and seamless checkout.",
          category: "web-design",
          image:
            "https://images.pexels.com/photos/5240544/pexels-photo-5240544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          link: "/portfolio/1",
        },
        {
          id: 2,
          title: "Corporate Rebrand & Website",
          description: "Complete visual identity refresh and responsive website for a financial services firm.",
          category: "web-design",
          image:
            "https://images.pexels.com/photos/5239880/pexels-photo-5239880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          link: "/portfolio/2",
        },
      ]
      localStorage.setItem("websaathy_portfolio", JSON.stringify(defaultPortfolio))
    }

    // Initialize testimonials if not already set
    if (!localStorage.getItem("websaathy_testimonials")) {
      const defaultTestimonials = [
        {
          id: 1,
          name: "Ram Bahadur Thapa",
          company: "Tech Solutions Inc.",
          quote:
            "Working with this team was a game-changer for our business. Our new website has increased our leads by 150%!",
          image: "/placeholder.svg?height=100&width=100",
          stars: 5,
        },
        {
          id: 2,
          name: "Manoj Bhatta",
          company: "Retail Innovations",
          quote: "The SEO services provided have dramatically improved our search rankings and online visibility.",
          image: "/placeholder.svg?height=100&width=100",
          stars: 5,
        },
      ]
      localStorage.setItem("websaathy_testimonials", JSON.stringify(defaultTestimonials))
    }

    // Initialize blog posts if not already set
    if (!localStorage.getItem("websaathy_blog")) {
      const defaultBlogPosts = [
        {
          id: 1,
          title: "10 Web Design Trends to Watch in 2023",
          excerpt:
            "Stay ahead of the curve with these emerging web design trends that are shaping the digital landscape.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "/placeholder.svg?height=400&width=600",
          date: "June 15, 2023",
          author: "Sarah Johnson",
          category: "Web Design",
          link: "/blog/web-design-trends-2023",
        },
        {
          id: 2,
          title: "How to Improve Your Website's Loading Speed",
          excerpt:
            "Discover practical tips to optimize your website's performance and provide a better user experience.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "/placeholder.svg?height=400&width=600",
          date: "May 28, 2023",
          author: "Michael Chen",
          category: "Web Development",
          link: "/blog/improve-website-loading-speed",
        },
      ]
      localStorage.setItem("websaathy_blog", JSON.stringify(defaultBlogPosts))
    }

    // Dispatch events to notify components about the data
    const refreshEvent = new Event("websaathy:data_refresh")
    document.dispatchEvent(refreshEvent)

    // Dispatch individual events
    const events = [
      "websaathy_images",
      "websaathy_team",
      "websaathy_portfolio",
      "websaathy_testimonials",
      "websaathy_blog",
    ]

    events.forEach((key) => {
      const event = new Event(`storage:${key}`)
      document.dispatchEvent(event)
    })

    // Set a short timeout to ensure data is loaded before rendering
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  // If still loading, show the creative loader
  if (isLoading) {
    return <CreativeLoader />
  }

  // Render the home page content
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <ScrollProgress />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div ref={heroTitleRef} className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                    <AnimatedText text="Websaathy -" type="gradient" className="block mb-2" />
                    <AnimatedText text="Web Design & Development" type="typing" delay={500} className="block" />
                    <AnimatedText text="Solutions" type="typing" delay={1500} className="block" />
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    We create stunning websites that drive results for your business. Our team of experts will help you
                    stand out online.
                  </p>
                </div>
                <div ref={heroButtonsRef} className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className={`animate-pulse-slow transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      isDarkMode
                        ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white font-bold shadow-md"
                        : "bg-primary hover:bg-primary/90 shadow-md"
                    }`}
                  >
                    <a href="/contact">Get Started</a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="group transition-all duration-300 hover:scale-105 hover:border-primary/50"
                  >
                    <a href="/portfolio" className="flex items-center gap-2">
                      View Portfolio
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
              <div ref={heroImageRef} className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 opacity-75 blur-xl"></div>
                <img
                  src="/images/logo.png"
                  alt="Websaathy Logo"
                  className="relative mx-auto aspect-auto overflow-hidden rounded-xl object-contain shadow-2xl p-4 bg-white"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="w-full py-12 bg-muted/10">
          <div ref={statsContainerRef} className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="stat-item text-center p-4">
                <AnimatedCounter
                  end={settings.stats.projectsCompleted}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold text-primary"
                />
                <p className="text-sm md:text-base text-muted-foreground mt-2">Projects Completed</p>
              </div>
              <div className="stat-item text-center p-4">
                <AnimatedCounter
                  end={settings.stats.clientSatisfaction}
                  suffix="%"
                  className="text-4xl md:text-5xl font-bold text-primary"
                />
                <p className="text-sm md:text-base text-muted-foreground mt-2">Client Satisfaction</p>
              </div>
              <div className="stat-item text-center p-4">
                <AnimatedCounter
                  end={settings.stats.yearsExperience}
                  suffix="+"
                  className="text-4xl md:text-5xl font-bold text-primary"
                />
                <p className="text-sm md:text-base text-muted-foreground mt-2">Years Experience</p>
              </div>
              <div className="stat-item text-center p-4">
                <div className="text-4xl md:text-5xl font-bold text-primary">{settings.stats.support}</div>
                <p className="text-sm md:text-base text-muted-foreground mt-2">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <div type="gradient" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div ref={servicesTitleRef} className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  <AnimatedText text="Our Services" type="highlight" className="inline-block" />
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We offer a comprehensive range of web services to help your business succeed online.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {/* Service Card 1 */}
              <div ref={servicesCard1Ref}>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="h-40 w-full mb-4 overflow-hidden rounded-t-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Web Design Services"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-primary mb-2"
                    >
                      <circle cx="13.5" cy="6.5" r="2.5" />
                      <path d="M17 18a5 5 0 0 0-10 0" />
                      <circle cx="9" cy="13" r="2" />
                      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    </svg>
                    <CardTitle>Web Design</CardTitle>
                    <CardDescription>Beautiful, responsive websites that engage your audience</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p>
                      Our expert designers create stunning, user-friendly websites that reflect your brand and engage
                      your visitors.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <a href="/services/web-design">Learn More</a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Service Card 2 */}
              <div ref={servicesCard2Ref}>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="h-40 w-full mb-4 overflow-hidden rounded-t-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Web Development Services"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-primary mb-2"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <CardTitle>Web Development</CardTitle>
                    <CardDescription>Custom web applications and functionality</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p>
                      From simple websites to complex web applications, our developers build solutions that meet your
                      business needs.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <a href="/services/web-development">Learn More</a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Service Card 3 */}
              <div ref={servicesCard3Ref}>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="h-40 w-full mb-4 overflow-hidden rounded-t-lg">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="SEO and Marketing Services"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-primary mb-2"
                    >
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    <CardTitle>SEO & Marketing</CardTitle>
                    <CardDescription>Increase visibility and drive more traffic</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p>Our digital marketing strategies help you reach more customers and grow your business online.</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <a href="/services/seo">Learn More</a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <div ref={servicesButtonRef} className="flex justify-center mt-8">
              <Button asChild size="lg">
                <a href="/services">View All Services</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Section with Parallax */}
        <div type="wave" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div
              ref={portfolioTitleRef}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                <AnimatedText text="Our Portfolio" type="highlight" className="inline-block" />
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Check out some of our recent projects and see what we can do for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Portfolio Item 1 */}
              <div ref={portfolioItem1Ref}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                      <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="E-commerce Website"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="text-lg sm:text-xl font-bold">E-commerce Website</h3>
                          <p className="text-sm text-white/80">Web Design</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold">E-commerce Website</h3>
                      <Button asChild variant="link" className="px-0 group">
                        <a href="/portfolio/1" className="flex items-center gap-1">
                          View Project
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Portfolio Item 2 */}
              <div ref={portfolioItem2Ref}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative w-full h-48 sm:h-56 md:h-64">
                      <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="Corporate Website"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="text-lg sm:text-xl font-bold">Corporate Website</h3>
                          <p className="text-sm text-white/80">Web Development</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold">Corporate Website</h3>
                      <Button asChild variant="link" className="px-0 group">
                        <a href="/portfolio/2" className="flex items-center gap-1">
                          View Project
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div ref={portfolioButtonRef} className="flex justify-center mt-8">
              <Button asChild size="lg">
                <a href="/portfolio">View All Projects</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div type="dots" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div
              ref={testimonialsTitleRef}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-8"
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                <AnimatedText text="What Our Clients Say" type="highlight" className="inline-block" />
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Don't just take our word for it. Here's what our clients have to say about working with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div ref={testimonial1Ref}>
                <Card className="flex flex-col h-full">
                  <CardContent className="flex-grow pt-6">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 fill-primary"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="italic mb-4">
                      "Working with this team was a game-changer for our business. Our new website has increased our
                      leads by 150%!"
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 pt-2">
                    <img
                      src="/placeholder.svg?height=50&width=50"
                      alt="Ram Bahadur Thapa"
                      className="rounded-full w-[50px] h-[50px]"
                    />
                    <div>
                      <h4 className="font-semibold">Ram Bahadur Thapa</h4>
                      <p className="text-sm text-muted-foreground">Tech Solutions Inc.</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Testimonial 2 */}
              <div ref={testimonial2Ref}>
                <Card className="flex flex-col h-full">
                  <CardContent className="flex-grow pt-6">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 fill-primary"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="italic mb-4">
                      "The SEO services provided have dramatically improved our search rankings and online visibility."
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 pt-2">
                    <img
                      src="/placeholder.svg?height=50&width=50"
                      alt="Manoj Bhatta"
                      className="rounded-full w-[50px] h-[50px]"
                    />
                    <div>
                      <h4 className="font-semibold">Manoj Bhatta</h4>
                      <p className="text-sm text-muted-foreground">Retail Innovations</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* Testimonial 3 */}
              <div ref={testimonial3Ref}>
                <Card className="flex flex-col h-full">
                  <CardContent className="flex-grow pt-6">
                    <div className="flex mb-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 fill-primary"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-gray-300"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                    <p className="italic mb-4">
                      "The web design team created a beautiful, functional site that perfectly represents our brand."
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 pt-2">
                    <img
                      src="/placeholder.svg?height=50&width=50"
                      alt="Gehendra Bohara"
                      className="rounded-full w-[50px] h-[50px]"
                    />
                    <div>
                      <h4 className="font-semibold">Gehendra Bohara</h4>
                      <p className="text-sm text-muted-foreground">Creative Studios</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div ref={testimonialsButtonRef} className="flex justify-center mt-8">
              <Button asChild size="lg">
                <a href="/testimonials">Read More Testimonials</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <HomeContactSection />

        {/* CTA Section */}
        <section
          className="w-full py-12 md:py-24 lg:py-32 text-white relative"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/221043/pexels-photo-221043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div ref={ctaTitleRef} className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
                  Ready to Start Your Project?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl text-white">
                  Let's discuss your project and how we can help you achieve your business goals with a custom web
                  solution.
                </p>
              </div>
              <div ref={ctaButtonsRef} className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className={`transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isDarkMode
                      ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white font-bold shadow-md"
                      : "bg-white text-black hover:bg-white/90 shadow-md"
                  }`}
                >
                  <a href="/contact">Get Your Free Consultation</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white hover:bg-white/20 text-white hover:text-white"
                >
                  <a href="/about/process">See Our Process</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

