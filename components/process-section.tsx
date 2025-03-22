import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start by understanding your business, goals, and target audience to create a strategic plan.",
      image:
        "https://images.pexels.com/photos/5239885/pexels-photo-5239885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      number: "02",
      title: "Design",
      description: "Our designers create wireframes and mockups that align with your brand and meet user expectations.",
      image:
        "https://images.pexels.com/photos/5239880/pexels-photo-5239880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      number: "03",
      title: "Development",
      description: "Our developers build your website or application using the latest technologies and best practices.",
      image:
        "https://images.pexels.com/photos/7480236/pexels-photo-7480236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      number: "04",
      title: "Testing",
      description: "We thoroughly test your website across devices and browsers to ensure a flawless user experience.",
      image:
        "https://images.pexels.com/photos/11358939/pexels-photo-11358939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      number: "05",
      title: "Launch",
      description: "Once approved, we deploy your website and ensure everything is working perfectly.",
      image:
        "https://images.pexels.com/photos/12899140/pexels-photo-12899140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      number: "06",
      title: "Support",
      description: "We provide ongoing support and maintenance to keep your website secure and up-to-date.",
      image:
        "https://images.pexels.com/photos/6804080/pexels-photo-6804080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Process</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            How we work to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 w-full relative">
                <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
              </div>
              <CardHeader className="pb-2">
                <div className="text-4xl font-bold text-primary mb-2">{step.number}</div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

