import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import WebDesignHero from "@/components/web-design-hero"
import WebDesignDetails from "@/components/web-design-details"
import WebDesignPortfolio from "@/components/web-design-portfolio"
import CTASection from "@/components/cta-section"

export default function WebDesignPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <WebDesignHero />
        <WebDesignDetails />
        <WebDesignPortfolio />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

