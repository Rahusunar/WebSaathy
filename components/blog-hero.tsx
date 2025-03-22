export default function BlogHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Insights, tips, and industry news to help you succeed online.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

