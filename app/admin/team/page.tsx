"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Upload, Edit, Trash2, ImageIcon } from "lucide-react"

const teamMemberSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  image: z.instanceof(File).optional().or(z.string().optional()),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
})

// Mock team members data
const mockTeamMembers = [
  {
    id: 1,
    name: "Rahul Kumar",
    position: "Lead Web Developer",
    bio: "Rahul has over 8 years of experience in web development and specializes in React and Next.js.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "UI/UX Designer",
    bio: "Priya is a talented designer with a keen eye for detail and a passion for creating intuitive user experiences.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "SEO Specialist",
    bio: "Amit helps businesses improve their online visibility through effective search engine optimization strategies.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof teamMemberSchema>>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      position: "",
      bio: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Set the file in the form
      form.setValue("image", file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof teamMemberSchema>) {
    setIsLoading(true)

    try {
      // In a real app, you would upload the image to a storage service
      // and save the team member data to your database
      console.log("Saving team member:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add the new team member to the list
      const newTeamMember = {
        id: teamMembers.length + 1,
        name: values.name,
        position: values.position,
        bio: values.bio,
        image: selectedImage || "/placeholder.svg?height=200&width=200",
      }

      setTeamMembers([...teamMembers, newTeamMember])

      toast({
        title: "Team member added",
        description: "The team member has been added successfully.",
      })

      // Reset the form and close the dialog
      form.reset()
      setSelectedImage(null)
      setIsAddDialogOpen(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add team member. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">Manage your team members and their profiles</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>Add a new team member to your website</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Web Developer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Write a short bio..." className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="image" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-40 h-40 border rounded-lg overflow-hidden bg-muted">
                          {selectedImage ? (
                            <img
                              src={selectedImage || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                              <ImageIcon className="h-12 w-12" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                              <Upload className="h-4 w-4" />
                              Upload Image
                            </div>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>

                          <p className="text-xs text-muted-foreground text-center">
                            Recommended size: 400x400px. Max file size: 2MB.
                            <br />
                            Supported formats: JPG, PNG, WebP
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="metaTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Team Member Name | Websaathy" {...field} />
                          </FormControl>
                          <FormDescription>
                            Optional. If left blank, the team member's name will be used.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A brief description for search engines..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional. If left blank, the team member's bio will be used.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="metaKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Keywords</FormLabel>
                          <FormControl>
                            <Input placeholder="team, web developer, websaathy" {...field} />
                          </FormControl>
                          <FormDescription>Optional. Comma-separated keywords for search engines.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Team Member"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>View and manage your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

