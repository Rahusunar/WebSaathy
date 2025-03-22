import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import AboutHero from "@/components/about-hero"
import TeamSection from "@/components/team-section"
import ProcessSection from "@/components/process-section"
import CTASection from "@/components/cta-section"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <AboutHero />
        <TeamSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

