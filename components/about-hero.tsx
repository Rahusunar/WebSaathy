export default function AboutHero() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 relative"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/221043/pexels-photo-221043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">About Us</h1>
            <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
              We're a team of passionate web designers and developers dedicated to creating exceptional digital
              experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

