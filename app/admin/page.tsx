"use client"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamMembersAdmin } from "@/components/admin/team-members"
import { InquiriesAdmin } from "@/components/admin/inquiries"
import { StatsSettings } from "@/components/admin/stats-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("admin_authenticated")

    if (isAuthenticated === "true") {
      router.push("/admin/dashboard")
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const [logoUrl, setLogoUrl] = useState("/logo.svg")
  const [darkLogoUrl, setDarkLogoUrl] = useState("/logo-dark.svg")
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your website's general settings and configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="Digital Agency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    defaultValue="We are a digital agency specializing in web design, development, and digital marketing services."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" defaultValue="123 Digital Street, Tech City, TC 12345" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo Settings</CardTitle>
              <CardDescription>Manage your website's logo for both light and dark modes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo-url">Light Mode Logo URL</Label>
                    <Input id="logo-url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                  </div>
                  <div className="border rounded-md p-4 flex justify-center items-center bg-white">
                    <img
                      src={logoUrl || "/placeholder.svg?height=60&width=120"}
                      alt="Light Mode Logo Preview"
                      className="max-h-16 object-contain"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dark-logo-url">Dark Mode Logo URL</Label>
                    <Input id="dark-logo-url" value={darkLogoUrl} onChange={(e) => setDarkLogoUrl(e.target.value)} />
                  </div>
                  <div className="border rounded-md p-4 flex justify-center items-center bg-gray-900">
                    <img
                      src={darkLogoUrl || "/placeholder.svg?height=60&width=120"}
                      alt="Dark Mode Logo Preview"
                      className="max-h-16 object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Manage your website's social media links.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" defaultValue="https://facebook.com/digitalagency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" defaultValue="https://instagram.com/digitalagency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" defaultValue="https://linkedin.com/company/digitalagency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input id="tiktok" defaultValue="https://tiktok.com/@digitalagency" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <TeamMembersAdmin />
        </TabsContent>

        <TabsContent value="inquiries">
          <InquiriesAdmin />
        </TabsContent>

        <TabsContent value="stats">
          <StatsSettings />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable dark mode option for your website visitors.</p>
                  </div>
                  <Switch id="dark-mode" checked={isDarkModeEnabled} onCheckedChange={setIsDarkModeEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable animations and transitions throughout the website.
                    </p>
                  </div>
                  <Switch id="animations" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    toast({
                      title: "Appearance settings saved",
                      description: "Your appearance settings have been saved successfully.",
                    })
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>Customize the color scheme of your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input id="primary-color" defaultValue="#3b82f6" />
                    <div className="w-10 h-10 rounded-md bg-blue-500 border"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <Input id="secondary-color" defaultValue="#10b981" />
                    <div className="w-10 h-10 rounded-md bg-green-500 border"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex space-x-2">
                    <Input id="accent-color" defaultValue="#f59e0b" />
                    <div className="w-10 h-10 rounded-md bg-yellow-500 border"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text-color">Text Color</Label>
                  <div className="flex space-x-2">
                    <Input id="text-color" defaultValue="#111827" />
                    <div className="w-10 h-10 rounded-md bg-gray-900 border"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    toast({
                      title: "Color scheme saved",
                      description: "Your color scheme has been saved successfully.",
                    })
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Customize the typography of your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heading-font">Heading Font</Label>
                  <Input id="heading-font" defaultValue="Inter" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-font">Body Font</Label>
                  <Input id="body-font" defaultValue="Inter" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base-font-size">Base Font Size</Label>
                  <Input id="base-font-size" defaultValue="16px" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="line-height">Line Height</Label>
                  <Input id="line-height" defaultValue="1.5" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    toast({
                      title: "Typography settings saved",
                      description: "Your typography settings have been saved successfully.",
                    })
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

