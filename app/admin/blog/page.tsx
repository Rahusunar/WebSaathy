import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react"

export default function BlogPage() {
  // Sample data (in a real app, this would come from your database)
  const blogPosts = [
    {
      id: 1,
      title: "10 Web Design Trends for 2023",
      excerpt: "Discover the latest web design trends that are dominating the digital landscape in 2023.",
      date: "2023-03-15T10:30:00Z",
      author: "Rahul",
      status: "published",
    },
    {
      id: 2,
      title: "How to Optimize Your Website for SEO",
      excerpt: "Learn the essential techniques to improve your website's search engine ranking and visibility.",
      date: "2023-03-10T14:45:00Z",
      author: "Rahul",
      status: "published",
    },
    {
      id: 3,
      title: "The Importance of Mobile-First Design",
      excerpt: "Why designing for mobile devices first is crucial for modern websites and applications.",
      date: "2023-03-05T09:15:00Z",
      author: "Rahul",
      status: "draft",
    },
    {
      id: 4,
      title: "Choosing the Right CMS for Your Business",
      excerpt: "A comparison of popular content management systems to help you make the right choice.",
      date: "2023-02-28T16:20:00Z",
      author: "Rahul",
      status: "published",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>View and manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                    <span
                      className={`text-xs mt-1 px-2 py-1 rounded-full ${
                        post.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

