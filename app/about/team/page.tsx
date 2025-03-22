import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import TeamHero from "@/components/team-hero"
import TeamMembers from "@/components/team-members"
import CTASection from "@/components/cta-section"

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <TeamHero />
        <TeamMembers />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

