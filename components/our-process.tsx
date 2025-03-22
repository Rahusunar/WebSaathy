export default function OurProcess() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your business, goals, and target audience to create a tailored strategy.",
    },
    {
      number: "02",
      title: "Planning",
      description: "We develop a detailed project plan including sitemap, wireframes, and content strategy.",
    },
    {
      number: "03",
      title: "Design",
      description: "Our designers create visually appealing mockups that align with your brand identity.",
    },
    {
      number: "04",
      title: "Development",
      description: "We build your website using clean, efficient code that ensures fast loading and responsiveness.",
    },
    {
      number: "05",
      title: "Testing",
      description: "We thoroughly test your website across devices and browsers to ensure everything works perfectly.",
    },
    {
      number: "06",
      title: "Launch",
      description: "After your approval, we deploy your website and ensure everything is running smoothly.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Process</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We follow a structured approach to deliver exceptional results for every project
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col space-y-2 p-6 bg-background rounded-lg shadow-sm border">
              <div className="text-4xl font-bold text-primary">{step.number}</div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

