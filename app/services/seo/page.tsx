import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import SeoHero from "@/components/seo-hero"
import SeoDetails from "@/components/seo-details"
import SeoPortfolio from "@/components/seo-portfolio"
import CTASection from "@/components/cta-section"

export default function SeoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <SeoHero />
        <SeoDetails />
        <SeoPortfolio />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

