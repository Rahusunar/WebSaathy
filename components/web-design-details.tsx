import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Image from "next/image"

export default function WebDesignDetails() {
  const features = [
    {
      title: "Responsive Design",
      description:
        "We create websites that look and function beautifully on all devices, from smartphones to desktop computers.",
    },
    {
      title: "User-Centered Approach",
      description:
        "Our designs focus on providing the best possible user experience, making it easy for visitors to find what they need.",
    },
    {
      title: "Brand Integration",
      description:
        "We ensure your website reflects your brand identity through colors, typography, imagery, and overall design aesthetic.",
    },
    {
      title: "Modern Aesthetics",
      description:
        "Our designs incorporate current trends while maintaining timeless principles that won't quickly become outdated.",
    },
    {
      title: "Conversion-Focused",
      description:
        "We strategically design elements to guide visitors toward your business goals, whether that's making a purchase or filling out a contact form.",
    },
    {
      title: "Accessibility",
      description:
        "We follow web accessibility guidelines to ensure your website is usable by people with various disabilities.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Expert Web Design Services</h2>
            <p className="text-muted-foreground mb-6">
              Our web design services focus on creating visually stunning, user-friendly websites that help you achieve
              your business goals. We combine aesthetics with functionality to deliver websites that not only look great
              but also perform exceptionally well.
            </p>
            <p className="text-muted-foreground mb-6">
              Whether you need a simple brochure website or a complex e-commerce platform, our designers have the skills
              and experience to bring your vision to life. We work closely with you throughout the design process to
              ensure the final product exceeds your expectations.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Custom designs tailored to your brand</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Mobile-first responsive approach</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>User experience (UX) optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Conversion rate optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Search engine friendly structure</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Fast loading speeds</span>
              </li>
            </ul>
          </div>
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/15717312/pexels-photo-15717312/free-photo-of-illuminated-screens-with-images.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Web Design Services"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-12">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

