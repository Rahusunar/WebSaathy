"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { DialogDescription } from "@/components/ui/dialog"

import { DialogTitle } from "@/components/ui/dialog"

import { DialogHeader } from "@/components/ui/dialog"

import { DialogContent } from "@/components/ui/dialog"

import { Dialog } from "@/components/ui/dialog"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InquiriesAdminProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

// Sample inquiry data
const initialInquiries = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    subject: "Website Redesign",
    message:
      "I need a complete redesign of my company website. It's outdated and not mobile-friendly. Looking for a modern, responsive design that showcases our products better.",
    date: "2023-11-15T10:30:00",
    status: "new",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    subject: "SEO Services",
    message:
      "We're interested in your SEO services. Our website isn't ranking well for important keywords in our industry. Would like to discuss how you can help improve our search visibility.",
    date: "2023-11-14T14:45:00",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1 (555) 456-7890",
    subject: "Mobile App Development",
    message:
      "Looking to develop a mobile app for our retail business. Need both iOS and Android versions. The app should allow customers to browse products, make purchases, and track orders.",
    date: "2023-11-13T09:15:00",
    status: "completed",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+1 (555) 789-0123",
    subject: "Social Media Management",
    message:
      "Our company needs help with social media management. We're looking for someone to handle our Facebook, Instagram, and Twitter accounts, create content, and engage with our audience.",
    date: "2023-11-12T16:20:00",
    status: "new",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 234-5678",
    subject: "E-commerce Integration",
    message:
      "We need to add e-commerce functionality to our existing website. Looking for a solution that integrates with our inventory management system and provides secure payment processing.",
    date: "2023-11-11T11:00:00",
    status: "in-progress",
  },
]

export function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleViewClick = (inquiry) => {
    setSelectedInquiry(inquiry)
    setIsViewDialogOpen(true)
  }

  const handleStatusChange = (id, newStatus) => {
    setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry)))
    toast({
      title: "Status updated",
      description: "The inquiry status has been updated successfully.",
    })

    // If we're viewing this inquiry in the dialog, update the selected inquiry too
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus })
    }
  }

  const handleDeleteClick = (id) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      setInquiries(inquiries.filter((inquiry) => inquiry.id !== id))
      toast({
        title: "Inquiry deleted",
        description: "The inquiry has been successfully removed.",
      })

      // If we're viewing this inquiry in the dialog, close the dialog
      if (selectedInquiry && selectedInquiry.id === id) {
        setIsViewDialogOpen(false)
      }
    }
  }

  const filteredInquiries = inquiries
    .filter((inquiry) => {
      if (activeTab === "all") return true
      return inquiry.status === activeTab
    })
    .filter((inquiry) => {
      if (statusFilter === "all") return true
      return inquiry.status === statusFilter
    })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All Inquiries</TabsTrigger>
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab}>
        <Card>
          <CardHeader>
            <CardTitle>Inquiries</CardTitle>
            <CardDescription>Manage customer inquiries and requests.</CardDescription>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Filter by status:</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredInquiries.length} of {inquiries.length} inquiries
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <span className="mr-2">{inquiry.name}</span>
                            {getStatusBadge(inquiry.status)}
                          </CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground">{formatDate(inquiry.date)}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">{inquiry.message}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <Button variant="outline" size="sm" onClick={() => handleViewClick(inquiry)}>
                        View Details
                      </Button>
                      <div className="space-x-2">
                        <Select value={inquiry.status} onValueChange={(value) => handleStatusChange(inquiry.id, value)}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(inquiry.id)}>
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No inquiries found matching the current filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* View Inquiry Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>View complete information about this inquiry.</DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedInquiry.subject}</h3>
                {getStatusBadge(selectedInquiry.status)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">From:</span> {selectedInquiry.name}
                </div>
                <div>
                  <span className="font-medium">Date:</span> {formatDate(selectedInquiry.date)}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {selectedInquiry.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {selectedInquiry.phone}
                </div>
              </div>
              <div>
                <span className="font-medium">Message:</span>
                <p className="mt-1 text-sm whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
              <div className="mt-2">
                <span className="font-medium">Status:</span>
                <div className="mt-1">
                  <Select
                    value={selectedInquiry.status}
                    onValueChange={(value) => handleStatusChange(selectedInquiry.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteClick(selectedInquiry.id)
                setIsViewDialogOpen(false)
              }}
            >
              Delete
            </Button>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}

export default InquiriesAdmin

