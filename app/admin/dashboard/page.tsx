import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, FileText, Briefcase, Users, Star, BarChart2 } from "lucide-react"

export default function DashboardPage() {
  // Sample data (in a real app, this would come from your database)
  const stats = [
    {
      title: "Inquiries",
      value: 12,
      icon: MessageSquare,
      description: "Total contact form submissions",
      href: "/admin/inquiries",
    },
    {
      title: "Blog Posts",
      value: 8,
      icon: FileText,
      description: "Published articles",
      href: "/admin/blog",
    },
    {
      title: "Projects",
      value: 15,
      icon: Briefcase,
      description: "Portfolio items",
      href: "/admin/portfolio",
    },
    {
      title: "Team Members",
      value: 6,
      icon: Users,
      description: "Staff profiles",
      href: "/admin/team",
    },
    {
      title: "Testimonials",
      value: 9,
      icon: Star,
      description: "Client reviews",
      href: "/admin/testimonials",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, Rahul</h1>
        <p className="text-muted-foreground">Here's an overview of your website content and performance</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.title} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
                <div className="bg-primary/10 py-2 px-4">
                  <a href={stat.href} className="text-xs text-primary hover:underline">
                    View details →
                  </a>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Latest messages from your contact form</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">John Smith</h3>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="mt-2 text-sm">
                    I'm interested in your web development services. Can you provide a quote for an e-commerce website?
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">sarah@example.com</p>
                    </div>
                    <span className="text-xs text-muted-foreground">5 days ago</span>
                  </div>
                  <p className="mt-2 text-sm">
                    Do you offer SEO services for existing websites? I'd like to improve my site's ranking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
              <CardDescription>Traffic and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect your analytics account to view website performance metrics
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes to your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-2 border-b pb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New blog post published</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 2:45 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-2 border-b pb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Team member profile updated</p>
                    <p className="text-xs text-muted-foreground">3 days ago at 11:30 AM</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-2 border-b pb-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New portfolio project added</p>
                    <p className="text-xs text-muted-foreground">1 week ago at 9:15 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

