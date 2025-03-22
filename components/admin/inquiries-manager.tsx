"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MailOpen,
  Clock,
  CheckCircle,
  Archive,
  Search,
  Filter,
  Download,
  Trash2,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react"

interface InquiriesManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

// Sample inquiry data
const sampleInquiries = [
  {
    id: "inq-001",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 555-123-4567",
    subject: "Website Redesign Project",
    message: "I'm looking to redesign my company website. Can you provide a quote?",
    date: "2023-11-15T10:30:00",
    status: "new",
    assignedTo: null,
    notes: [],
    followUp: null,
  },
  {
    id: "inq-002",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    phone: "+1 555-987-6543",
    subject: "SEO Services Inquiry",
    message: "We need help improving our search rankings. What services do you offer?",
    date: "2023-11-14T14:45:00",
    status: "in-progress",
    assignedTo: "team-member-1",
    notes: ["Initial call scheduled for Nov 16"],
    followUp: "2023-11-16T15:00:00",
  },
  {
    id: "inq-003",
    name: "Michael Brown",
    email: "michael@startup.io",
    phone: "+1 555-456-7890",
    subject: "Mobile App Development",
    message: "We're a startup looking to develop a mobile app. Can we discuss our requirements?",
    date: "2023-11-10T09:15:00",
    status: "completed",
    assignedTo: "team-member-2",
    notes: ["Proposal sent", "Client accepted quote"],
    followUp: null,
  },
  {
    id: "inq-004",
    name: "Emily Davis",
    email: "emily@nonprofit.org",
    phone: "+1 555-789-0123",
    subject: "Nonprofit Website Donation System",
    message: "Our nonprofit needs a new donation system integrated into our website. Can you help?",
    date: "2023-11-05T11:20:00",
    status: "archived",
    assignedTo: null,
    notes: ["Not a good fit for our services", "Referred to another agency"],
    followUp: null,
  },
]

export default function InquiriesManager({ setError, setSuccess }: InquiriesManagerProps) {
  const [inquiries, setInquiries] = useState(sampleInquiries)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [followUpDate, setFollowUpDate] = useState("")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry)
  }

  const handleStatusChange = (inquiryId, newStatus) => {
    setInquiries((prev) => prev.map((inq) => (inq.id === inquiryId ? { ...inq, status: newStatus } : inq)))

    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus })
    }

    setSuccess(`Inquiry status updated to ${newStatus}`)
  }

  const handleAddNote = () => {
    if (!newNote.trim()) return

    const updatedInquiries = inquiries.map((inq) =>
      inq.id === selectedInquiry.id ? { ...inq, notes: [...inq.notes, newNote] } : inq,
    )

    setInquiries(updatedInquiries)
    setSelectedInquiry({ ...selectedInquiry, notes: [...selectedInquiry.notes, newNote] })
    setNewNote("")
    setSuccess("Note added successfully")
  }

  const handleSetFollowUp = () => {
    if (!followUpDate) return

    const updatedInquiries = inquiries.map((inq) =>
      inq.id === selectedInquiry.id ? { ...inq, followUp: followUpDate } : inq,
    )

    setInquiries(updatedInquiries)
    setSelectedInquiry({ ...selectedInquiry, followUp: followUpDate })
    setFollowUpDate("")
    setSuccess("Follow-up reminder set")
  }

  const handleDeleteInquiry = (inquiryId) => {
    if (confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== inquiryId))

      if (selectedInquiry && selectedInquiry.id === inquiryId) {
        setSelectedInquiry(null)
      }

      setSuccess("Inquiry deleted successfully")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
      case "archived":
        return <Badge variant="outline">Archived</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <MailOpen className="h-4 w-4 text-blue-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "archived":
        return <Archive className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-7 w-40 bg-muted animate-pulse rounded-md mb-2"></div>
          <div className="h-5 w-64 bg-muted animate-pulse rounded-md"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 bg-muted animate-pulse rounded-md"></div>
            <div className="h-10 bg-muted animate-pulse rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Inquiries</CardTitle>
            <CardDescription>Manage contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search inquiries..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-md divide-y max-h-[500px] overflow-y-auto">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`p-3 cursor-pointer hover:bg-muted transition-colors ${
                        selectedInquiry?.id === inquiry.id ? "bg-muted" : ""
                      }`}
                      onClick={() => handleSelectInquiry(inquiry)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{inquiry.name}</div>
                          <div className="text-sm text-muted-foreground truncate">{inquiry.subject}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(inquiry.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div>{getStatusBadge(inquiry.status)}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">No inquiries found</div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1" /> Export
            </Button>
            <div className="text-xs text-muted-foreground">
              {filteredInquiries.length} of {inquiries.length} inquiries
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-2">
        {selectedInquiry ? (
          <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>{selectedInquiry.subject}</CardTitle>
                <CardDescription>
                  From: {selectedInquiry.name} ({selectedInquiry.email})
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedInquiry.status)}
                {getStatusBadge(selectedInquiry.status)}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="notes">Notes & Follow-up</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Email</Label>
                        <div className="text-sm">{selectedInquiry.email}</div>
                      </div>
                      <div>
                        <Label className="text-xs">Phone</Label>
                        <div className="text-sm">{selectedInquiry.phone}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Message</h3>
                    <div className="p-3 border rounded-md text-sm whitespace-pre-wrap">{selectedInquiry.message}</div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-1">Received</h3>
                    <div className="text-sm">{new Date(selectedInquiry.date).toLocaleString()}</div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Notes</h3>
                    {selectedInquiry.notes.length > 0 ? (
                      <div className="space-y-2 mb-4">
                        {selectedInquiry.notes.map((note, index) => (
                          <div key={index} className="p-3 border rounded-md text-sm">
                            {note}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground mb-4">No notes yet</div>
                    )}

                    <div className="flex items-start gap-2">
                      <Textarea
                        placeholder="Add a note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button onClick={handleAddNote}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Follow-up Reminder</h3>
                    {selectedInquiry.followUp ? (
                      <div className="p-3 border rounded-md text-sm mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <span>Scheduled for {new Date(selectedInquiry.followUp).toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground mb-4">No follow-up scheduled</div>
                    )}

                    <div className="flex items-start gap-2">
                      <Input
                        type="datetime-local"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                      />
                      <Button onClick={handleSetFollowUp}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Change Status</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={selectedInquiry.status === "new" ? "default" : "outline"}
                        onClick={() => handleStatusChange(selectedInquiry.id, "new")}
                      >
                        <MailOpen className="h-4 w-4 mr-2" />
                        Mark as New
                      </Button>
                      <Button
                        variant={selectedInquiry.status === "in-progress" ? "default" : "outline"}
                        onClick={() => handleStatusChange(selectedInquiry.id, "in-progress")}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        In Progress
                      </Button>
                      <Button
                        variant={selectedInquiry.status === "completed" ? "default" : "outline"}
                        onClick={() => handleStatusChange(selectedInquiry.id, "completed")}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                      <Button
                        variant={selectedInquiry.status === "archived" ? "default" : "outline"}
                        onClick={() => handleStatusChange(selectedInquiry.id, "archived")}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Assign To</h3>
                    <Select
                      value={selectedInquiry.assignedTo || ""}
                      onValueChange={(value) => {
                        const updatedInquiries = inquiries.map((inq) =>
                          inq.id === selectedInquiry.id ? { ...inq, assignedTo: value || null } : inq,
                        )
                        setInquiries(updatedInquiries)
                        setSelectedInquiry({ ...selectedInquiry, assignedTo: value || null })
                        setSuccess("Inquiry assigned successfully")
                      }}
                    >
                      <SelectTrigger>
                        <User className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        <SelectItem value="team-member-1">John Doe</SelectItem>
                        <SelectItem value="team-member-2">Jane Smith</SelectItem>
                        <SelectItem value="team-member-3">Alex Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Delete Inquiry</h3>
                    <Button variant="destructive" onClick={() => handleDeleteInquiry(selectedInquiry.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Permanently
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
              <div className="rounded-full bg-muted p-6 mb-4">
                <MailOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Inquiry Selected</h3>
              <p className="text-muted-foreground max-w-md">
                Select an inquiry from the list to view details, add notes, set follow-up reminders, and manage its
                status.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

