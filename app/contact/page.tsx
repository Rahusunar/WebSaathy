import MainNavigation from "@/components/main-navigation"
import ContactHero from "@/components/contact-hero"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import ContactMap from "@/components/contact-map"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1">
        <ContactHero />
        <div className="container mx-auto px-4 md:px-6 py-12 grid md:grid-cols-2 gap-12">
          <ContactForm />
          <div>
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

