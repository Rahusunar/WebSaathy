import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Image from "next/image"

export default function WebDevDetails() {
  const technologies = [
    {
      title: "Front-End Development",
      items: ["React", "Next.js", "Vue.js", "Angular", "HTML5/CSS3", "JavaScript/TypeScript"],
    },
    {
      title: "Back-End Development",
      items: ["Node.js", "PHP", "Python", "Ruby on Rails", "Java", ".NET"],
    },
    {
      title: "Content Management Systems",
      items: ["WordPress", "Drupal", "Shopify", "Magento", "Custom CMS Solutions"],
    },
    {
      title: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "SQL Server", "Oracle"],
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Professional Web Development</h2>
            <p className="text-muted-foreground mb-6">
              Our web development team builds robust, scalable websites and web applications that provide exceptional
              user experiences. We use the latest technologies and best practices to ensure your website is fast,
              secure, and easy to maintain.
            </p>
            <p className="text-muted-foreground mb-6">
              From simple brochure websites to complex e-commerce platforms and custom web applications, we have the
              expertise to bring your vision to life. Our developers work closely with our designers to ensure seamless
              integration of design and functionality.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Custom web application development</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>E-commerce development</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Content management system implementation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>API development and integration</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Database design and optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5" />
                <span>Performance optimization</span>
              </li>
            </ul>
          </div>
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/11358939/pexels-photo-11358939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Web Development Services"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {technologies.map((tech, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle>{tech.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {tech.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

