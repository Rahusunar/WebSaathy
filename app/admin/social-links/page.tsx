"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

const formSchema = z.object({
  facebook: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  twitter: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  instagram: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  linkedin: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  github: z.string().url("Please enter a valid URL").or(z.string().length(0)),
})

export default function SocialLinksPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "https://facebook.com/websaathy",
      twitter: "https://twitter.com/websaathy",
      instagram: "https://instagram.com/websaathy",
      linkedin: "https://linkedin.com/company/websaathy",
      github: "https://github.com/websaathy",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // In a real app, this would save to your database
      console.log("Saving social links:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Social links updated",
        description: "Your social media links have been updated successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update social media links. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const socialIcons = [
    { name: "facebook", icon: Facebook, label: "Facebook" },
    { name: "twitter", icon: Twitter, label: "Twitter" },
    { name: "instagram", icon: Instagram, label: "Instagram" },
    { name: "linkedin", icon: Linkedin, label: "LinkedIn" },
    { name: "github", icon: Github, label: "GitHub" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Links</h1>
        <p className="text-muted-foreground">Manage your social media links that appear in the website footer</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Profiles</CardTitle>
          <CardDescription>
            Enter the full URLs to your social media profiles. Leave empty to hide a specific platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {socialIcons.map(({ name, icon: Icon, label }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {label}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={`https://${name}.com/yourusername`} {...field} />
                      </FormControl>
                      <FormDescription>Enter the full URL including https://</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 flex justify-between">
          <p className="text-sm text-muted-foreground">These links will be displayed in the website footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}

