import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MailOpen, Trash2 } from "lucide-react"

export default function InquiriesPage() {
  // Sample data (in a real app, this would come from your database)
  const inquiries = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      subject: "Web Development Inquiry",
      message: "I'm interested in your web development services. Can you provide a quote for an e-commerce website?",
      date: "2023-03-15T10:30:00Z",
      read: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      subject: "SEO Services",
      message: "Do you offer SEO services for existing websites? I'd like to improve my site's ranking.",
      date: "2023-03-12T14:45:00Z",
      read: false,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      subject: "Website Redesign",
      message: "I need to redesign my current website. It's outdated and not mobile-friendly. Can you help?",
      date: "2023-03-10T09:15:00Z",
      read: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      subject: "Portfolio Website",
      message: "I'm a photographer looking to create a portfolio website to showcase my work. What would be the cost?",
      date: "2023-03-08T16:20:00Z",
      read: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-muted-foreground">Manage contact form submissions from your website</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="secondary" className="ml-2">
                {inquiries.filter((i) => !i.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <MailOpen className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Inquiries</CardTitle>
              <CardDescription>View and manage all contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className={`border rounded-lg p-4 ${!inquiry.read ? "bg-primary/5" : ""}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {!inquiry.read ? (
                          <Mail className="h-4 w-4 text-primary mr-2" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-muted-foreground mr-2" />
                        )}
                        <div>
                          <h3 className="font-medium">{inquiry.name}</h3>
                          <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="mt-2 font-medium">{inquiry.subject}</h4>
                    <p className="mt-1 text-sm">{inquiry.message}</p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Inquiries</CardTitle>
              <CardDescription>View and manage unread contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inquiries
                  .filter((i) => !i.read)
                  .map((inquiry) => (
                    <div key={inquiry.id} className="border rounded-lg p-4 bg-primary/5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-primary mr-2" />
                          <div>
                            <h3 className="font-medium">{inquiry.name}</h3>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(inquiry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="mt-2 font-medium">{inquiry.subject}</h4>
                      <p className="mt-1 text-sm">{inquiry.message}</p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="read">
          <Card>
            <CardHeader>
              <CardTitle>Read Inquiries</CardTitle>
              <CardDescription>View and manage read contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inquiries
                  .filter((i) => i.read)
                  .map((inquiry) => (
                    <div key={inquiry.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <MailOpen className="h-4 w-4 text-muted-foreground mr-2" />
                          <div>
                            <h3 className="font-medium">{inquiry.name}</h3>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(inquiry.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="mt-2 font-medium">{inquiry.subject}</h4>
                      <p className="mt-1 text-sm">{inquiry.message}</p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

