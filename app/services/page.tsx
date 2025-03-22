import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import ServicesHero from "@/components/services-hero"
import AllServices from "@/components/all-services"
import CTASection from "@/components/cta-section"

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <ServicesHero />
        <AllServices />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

