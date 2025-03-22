import MainNavigation from "@/components/main-navigation"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import FloatingCTA from "@/components/floating-cta"
import TestimonialsHero from "@/components/testimonials-hero"
import TestimonialsList from "@/components/testimonials-list"
import VideoTestimonials from "@/components/video-testimonials"
import CTASection from "@/components/cta-section"

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <TestimonialsHero />
        <TestimonialsList />
        <VideoTestimonials />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
    </div>
  )
}

