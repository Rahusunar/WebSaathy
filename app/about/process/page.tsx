import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import ProcessHero from "@/components/process-hero"
import DetailedProcess from "@/components/detailed-process"
import CTASection from "@/components/cta-section"

export default function ProcessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <ProcessHero />
        <DetailedProcess />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

