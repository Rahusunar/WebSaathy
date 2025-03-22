import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VideoTestimonials() {
  const videos = [
    {
      id: 1,
      title: "How Our Website Redesign Increased Conversions",
      client: "Tech Solutions Inc.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Our SEO Success Story",
      client: "Retail Innovations",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "From Concept to Launch: Our Web Development Journey",
      client: "Creative Studios",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Video Testimonials</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Hear directly from our clients about their experience working with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardHeader className="pb-2">
                <CardTitle>{video.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{video.client}</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md">
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.embedUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

