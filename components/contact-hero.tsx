export default function ContactHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We'd love to hear from you. Get in touch with our team to discuss your project.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

