import MainNavigation from "@/components/main-navigation"
import WebDevHero from "@/components/web-dev-hero"
import WebDevDetails from "@/components/web-dev-details"
import WebDevPortfolio from "@/components/web-dev-portfolio"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"

export default function WebDevelopmentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <WebDevHero />
        <WebDevDetails />
        <WebDevPortfolio />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

