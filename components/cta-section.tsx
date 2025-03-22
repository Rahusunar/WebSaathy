import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 text-white relative"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/221043/pexels-photo-221043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 reveal">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl text-white">
              Let's discuss your project and how we can help you achieve your business goals with a custom web solution.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row reveal-scale animation-delay-300">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get Your Free Consultation</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white hover:bg-white/20 text-white hover:text-white"
            >
              <Link href="/about/process">See Our Process</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

