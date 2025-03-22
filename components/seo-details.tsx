import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, BarChart, Search, Globe, MessageSquare, Mail, LineChart } from "lucide-react"
import Image from "next/image"

export default function SeoDetails() {
  const services = [
    {
      icon: <Search className="h-8 w-8 text-primary mb-2" />,
      title: "Search Engine Optimization",
      description:
        "We improve your website's visibility in search engine results through on-page and off-page optimization techniques.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary mb-2" />,
      title: "Pay-Per-Click Advertising",
      description:
        "We create and manage targeted ad campaigns on Google, Bing, and other platforms to drive immediate traffic.",
    },
    {
      icon: <Globe className="h-8 w-8 text-primary mb-2" />,
      title: "Content Marketing",
      description: "We develop high-quality content that attracts, engages, and converts your target audience.",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary mb-2" />,
      title: "Social Media Marketing",
      description:
        "We help you build and engage with your audience on social media platforms relevant to your business.",
    },
    {
      icon: <Mail className="h-8 w-8 text-primary mb-2" />,
      title: "Email Marketing",
      description: "We create effective email campaigns to nurture leads, retain customers, and drive repeat business.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary mb-2" />,
      title: "Analytics & Reporting",
      description: "We track and analyze your marketing performance to continuously improve results and ROI.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Comprehensive Digital Marketing Services</h2>
            <p className="text-muted-foreground mb-6">
              Our digital marketing team helps businesses increase their online visibility, drive more qualified
              traffic, and convert visitors into customers. We develop customized strategies based on your business
              goals, target audience, and competitive landscape.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you're looking to improve your search engine rankings, run effective ad campaigns, or engage with
              your audience on social media, we have the expertise to help you succeed online.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Customized digital marketing strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Keyword research and optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Competitor analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Regular performance reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Continuous optimization and improvement</span>
              </li>
            </ul>
          </div>
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/12899140/pexels-photo-12899140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Digital Marketing"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

