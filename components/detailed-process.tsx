import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DetailedProcess() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description:
        "We begin with a thorough consultation to understand your business, goals, target audience, and project requirements. This phase includes market research, competitor analysis, and defining project scope and timeline.",
      details: [
        "Initial consultation and requirement gathering",
        "Market and competitor research",
        "Project scope definition",
        "Timeline and milestone planning",
        "Budget estimation and approval",
      ],
    },
    {
      number: "02",
      title: "Strategy & Wireframing",
      description:
        "Based on our research, we develop a strategic plan for your website. We create wireframes and information architecture to establish the foundation of your site's structure and user flow.",
      details: [
        "Content strategy development",
        "User journey mapping",
        "Information architecture planning",
        "Wireframe creation and approval",
        "Functionality specification",
      ],
    },
    {
      number: "03",
      title: "Design",
      description:
        "Our designers create visual mockups that align with your brand identity. We focus on creating an engaging user interface that provides an excellent user experience across all devices.",
      details: [
        "Brand integration and visual identity",
        "UI/UX design for all pages",
        "Responsive design for mobile, tablet, and desktop",
        "Interactive element design",
        "Design review and refinement",
      ],
    },
    {
      number: "04",
      title: "Development",
      description:
        "Our development team brings the designs to life, building your website with clean, efficient code. We implement all functionality and ensure your site is optimized for performance.",
      details: [
        "Front-end development (HTML, CSS, JavaScript)",
        "Back-end development and database integration",
        "CMS implementation if required",
        "Custom functionality development",
        "Integration of third-party services",
      ],
    },
    {
      number: "05",
      title: "Testing & Quality Assurance",
      description:
        "We thoroughly test your website across different devices, browsers, and screen sizes to ensure everything works flawlessly. We check for bugs, performance issues, and usability problems.",
      details: [
        "Cross-browser and cross-device testing",
        "Performance optimization",
        "Security testing",
        "Functionality testing",
        "User acceptance testing",
      ],
    },
    {
      number: "06",
      title: "Launch & Training",
      description:
        "Once approved, we deploy your website to your server and ensure everything is working perfectly. We provide training on how to use your content management system if applicable.",
      details: [
        "Server setup and configuration",
        "Website deployment",
        "DNS configuration",
        "CMS training and documentation",
        "Final review and launch",
      ],
    },
    {
      number: "07",
      title: "Post-Launch Support",
      description:
        "Our relationship doesn't end at launch. We provide ongoing support and maintenance to keep your website secure, up-to-date, and performing optimally.",
      details: [
        "Regular security updates",
        "Performance monitoring",
        "Content updates as needed",
        "Technical support",
        "Analytics review and optimization",
      ],
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {steps.map((step, index) => (
          <div key={index} className="mb-12 last:mb-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="text-5xl font-bold text-primary mb-2">{step.number}</div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              </div>
              <div className="md:w-2/3">
                <p className="mb-4">{step.description}</p>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What happens in this phase:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {step.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

