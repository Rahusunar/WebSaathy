import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import PortfolioHero from "@/components/portfolio-hero"
import PortfolioGrid from "@/components/portfolio-grid"
import CTASection from "@/components/cta-section"

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <PortfolioHero />
        <PortfolioGrid />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

