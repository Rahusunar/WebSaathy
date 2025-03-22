"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash, User, Mail, Phone, MessageSquare } from "lucide-react"
import { createStorageEvent } from "@/hooks/use-site-images"

interface InquiryManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function InquiryManager({ setError, setSuccess }: InquiryManagerProps) {
  const [inquiries, setInquiries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadInquiries = () => {
      setIsLoading(true)
      try {
        const storedInquiries = localStorage.getItem("websaathy_inquiries")
        if (storedInquiries) {
          setInquiries(JSON.parse(storedInquiries))
        }
      } catch (error) {
        console.error("Error loading inquiries:", error)
        setError("Failed to load inquiries")
      } finally {
        setIsLoading(false)
      }
    }

    loadInquiries()

    // Listen for storage changes
    const handleStorageChange = () => {
      loadInquiries()
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [setError])

  const handleDeleteInquiry = (id) => {
    try {
      const updatedInquiries = inquiries.filter((inquiry) => inquiry.id !== id)
      setInquiries(updatedInquiries)
      localStorage.setItem("websaathy_inquiries", JSON.stringify(updatedInquiries))
      createStorageEvent("websaathy_inquiries")
      setSuccess("Inquiry deleted successfully!")
    } catch (error) {
      console.error("Error deleting inquiry:", error)
      setError("Failed to delete inquiry")
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
          <CardDescription>Manage all inquiries from the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded-md mb-2"></div>
                  <div className="h-4 w-48 bg-muted animate-pulse rounded-md"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                    <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                    <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Submissions</CardTitle>
        <CardDescription>Manage all inquiries from the website</CardDescription>
      </CardHeader>
      <CardContent>
        {inquiries.length > 0 ? (
          <div className="space-y-4">
            {inquiries.map((inquiry, index) => (
              <Card key={index} className="mb-4">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        {inquiry.projectType ? `${inquiry.projectType} Inquiry` : "Website Inquiry"}
                      </CardTitle>
                      <CardDescription>Submitted on {new Date(inquiry.date).toLocaleDateString()}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteInquiry(inquiry.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 mt-1 text-primary" />
                      <div>
                        <p className="font-medium">Name</p>
                        <p>{inquiry.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 mt-1 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p>{inquiry.email}</p>
                      </div>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 mt-1 text-primary" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p>{inquiry.phone}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 mt-1 text-primary" />
                      <div>
                        <p className="font-medium">Message</p>
                        <p>{inquiry.message}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No inquiries yet. When users submit the contact form, their submissions will appear here.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

