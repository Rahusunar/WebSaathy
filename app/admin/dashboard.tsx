"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import SettingsManager from "@/components/admin/settings-manager"
import InquiriesManager from "@/components/admin/inquiries-manager"
import BlogManager from "@/components/admin/blog-manager"
import PortfolioManager from "@/components/admin/portfolio-manager"
import ServicesManager from "@/components/admin/services-manager"
import TeamManager from "@/components/admin/team-manager"
import TestimonialsManager from "@/components/admin/testimonials-manager"
import AnalyticsManager from "@/components/admin/analytics-manager"

export default function AdminDashboard() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Admin Panel Guide</CardTitle>
          <CardDescription>Overview of all admin panel sections and their functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure website settings including logo, contact information, and feature toggles.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Inquiries</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and respond to contact form submissions and client inquiries. Track status and set reminders.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Blog</h3>
                <p className="text-sm text-muted-foreground">
                  Create, edit, and publish blog posts. Manage categories and tags.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  Showcase your work by adding and managing portfolio projects with images and details.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Services</h3>
                <p className="text-sm text-muted-foreground">
                  Add and edit services you offer, including descriptions, pricing, and features.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Team</h3>
                <p className="text-sm text-muted-foreground">
                  Manage team member profiles, roles, and contact information.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Testimonials</h3>
                <p className="text-sm text-muted-foreground">
                  Add and manage client testimonials and reviews to display on your website.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  View website traffic, user behavior, and conversion metrics.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="settings" className="w-full overflow-x-auto">
        <TabsList className="mb-4 flex flex-nowrap overflow-x-auto pb-1 w-full justify-start md:justify-center">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <SettingsManager setError={setError} setSuccess={setSuccess} />
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inquiries Management</CardTitle>
              <CardDescription>Manage contact form submissions and client inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <Info className="h-4 w-4" />
                <AlertTitle>About Inquiries Section</AlertTitle>
                <AlertDescription>
                  The Inquiries section allows you to:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>View and respond to all contact form submissions</li>
                    <li>Track inquiry status (New, In Progress, Completed, Archived)</li>
                    <li>Set follow-up reminders for potential clients</li>
                    <li>Export inquiry data for your CRM system</li>
                    <li>Assign inquiries to team members</li>
                    <li>Add notes and track communication history</li>
                  </ul>
                </AlertDescription>
              </Alert>
              <InquiriesManager setError={setError} setSuccess={setSuccess} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <BlogManager setError={setError} setSuccess={setSuccess} />
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <PortfolioManager setError={setError} setSuccess={setSuccess} />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServicesManager setError={setError} setSuccess={setSuccess} />
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <TeamManager setError={setError} setSuccess={setSuccess} />
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <TestimonialsManager setError={setError} setSuccess={setSuccess} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsManager setError={setError} setSuccess={setSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

