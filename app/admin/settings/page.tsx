"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const generalFormSchema = z.object({
  siteName: z.string().min(1, { message: "Site name is required" }),
  siteDescription: z.string().min(1, { message: "Site description is required" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
})

const seoFormSchema = z.object({
  metaTitle: z.string().min(1, { message: "Meta title is required" }),
  metaDescription: z.string().min(1, { message: "Meta description is required" }),
  ogImage: z.string().url({ message: "Please enter a valid URL" }).optional(),
  googleAnalyticsId: z.string().optional(),
})

export default function SettingsPage() {
  const [isGeneralLoading, setIsGeneralLoading] = useState(false)
  const [isSeoLoading, setIsSeoLoading] = useState(false)

  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      siteName: "Websaathy",
      siteDescription: "Professional web design and development services",
      contactEmail: "websathy@gmail.com",
      contactPhone: "+1 (555) 123-4567",
      address: "123 Web Street, Digital City, 12345",
    },
  })

  const seoForm = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      metaTitle: "Websaathy | Web Design & Development",
      metaDescription: "Professional web design and development services to help your business grow online.",
      ogImage: "https://websaathy.com/og-image.jpg",
      googleAnalyticsId: "UA-123456789-1",
    },
  })

  async function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    setIsGeneralLoading(true)

    try {
      // In a real app, this would save to your database
      console.log("Saving general settings:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings updated",
        description: "Your general settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings. Please try again.",
      })
    } finally {
      setIsGeneralLoading(false)
    }
  }

  async function onSeoSubmit(values: z.infer<typeof seoFormSchema>) {
    setIsSeoLoading(true)

    try {
      // In a real app, this would save to your database
      console.log("Saving SEO settings:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings updated",
        description: "Your SEO settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings. Please try again.",
      })
    } finally {
      setIsSeoLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your website settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's basic information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                  <FormField
                    control={generalForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The name of your website</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>A brief description of your website</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormDescription>The email address where contact form submissions will be sent</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>Your business phone number (optional)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>Your business address (optional)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isGeneralLoading}>
                    {isGeneralLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your website for search engines</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...seoForm}>
                <form onSubmit={seoForm.handleSubmit(onSeoSubmit)} className="space-y-6">
                  <FormField
                    control={seoForm.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>The title that appears in search engine results</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormDescription>A brief description that appears in search engine results</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="ogImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Open Graph Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The image that appears when your site is shared on social media
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={seoForm.control}
                    name="googleAnalyticsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>Your Google Analytics tracking ID (optional)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSeoLoading}>
                    {isSeoLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Enable dark mode option for your website</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Logo</h3>
                    <p className="text-sm text-muted-foreground">Display your logo in the header</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sticky Header</h3>
                    <p className="text-sm text-muted-foreground">Keep the header visible when scrolling</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced options for your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-muted-foreground">Put your website in maintenance mode</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cache Control</h3>
                    <p className="text-sm text-muted-foreground">Enable browser caching for better performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">GDPR Cookie Consent</h3>
                    <p className="text-sm text-muted-foreground">Show cookie consent banner for GDPR compliance</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

