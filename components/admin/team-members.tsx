"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Sample team members data
const initialTeamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO & Founder",
    bio: "John has over 15 years of experience in digital marketing and web development.",
    image: "/team/member1.jpg",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      tiktok: "https://tiktok.com",
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Creative Director",
    bio: "Sarah leads our creative team with her innovative design approach and strategic thinking.",
    image: "/team/member2.jpg",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      tiktok: "https://tiktok.com",
    },
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Lead Developer",
    bio: "Michael specializes in front-end development and creating responsive, user-friendly websites.",
    image: "/team/member3.jpg",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      tiktok: "https://tiktok.com",
    },
  },
]

export function TeamMembersAdmin() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [editMember, setEditMember] = useState(null)
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      tiktok: "",
    },
  })
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMember, setViewMember] = useState(null)

  const handleEditClick = (member) => {
    setEditMember({ ...member })
    setIsEditDialogOpen(true)
  }

  const handleViewClick = (member) => {
    setViewMember(member)
    setIsViewDialogOpen(true)
  }

  const handleDeleteClick = (id) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id))
      toast({
        title: "Team member deleted",
        description: "The team member has been successfully removed.",
      })
    }
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    setTeamMembers(teamMembers.map((member) => (member.id === editMember.id ? editMember : member)))
    setIsEditDialogOpen(false)
    toast({
      title: "Team member updated",
      description: "The team member has been successfully updated.",
    })
  }

  const handleAddSubmit = (e) => {
    e.preventDefault()
    const newId = Math.max(...teamMembers.map((m) => m.id), 0) + 1
    setTeamMembers([...teamMembers, { ...newMember, id: newId }])
    setNewMember({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: {
        facebook: "",
        instagram: "",
        linkedin: "",
        tiktok: "",
      },
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Team member added",
      description: "The new team member has been successfully added.",
    })
  }

  return (
    <Tabs defaultValue="members" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="members">Team Members</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="members">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team members information that appears on the website.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90 text-white">
                Add New Member
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <img
                      src={member.image || "/placeholder.svg?height=300&width=300"}
                      alt={member.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between p-4 pt-0">
                    <Button variant="outline" size="sm" onClick={() => handleViewClick(member)}>
                      View
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(member)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(member.id)}>
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Team Section Settings</CardTitle>
            <CardDescription>Customize the team section display settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sectionTitle">Section Title</Label>
              <Input id="sectionTitle" defaultValue="Meet Our Team" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sectionDescription">Section Description</Label>
              <Textarea
                id="sectionDescription"
                defaultValue="Our talented team of professionals is dedicated to bringing your vision to life."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayStyle">Display Style</Label>
              <Select defaultValue="grid">
                <SelectTrigger id="displayStyle">
                  <SelectValue placeholder="Select display style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="membersPerRow">Members Per Row</Label>
              <Select defaultValue="3">
                <SelectTrigger id="membersPerRow">
                  <SelectValue placeholder="Select members per row" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* View Member Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Team Member Details</DialogTitle>
          </DialogHeader>
          {viewMember && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={viewMember.image || "/placeholder.svg?height=96&width=96"} alt={viewMember.name} />
                  <AvatarFallback>{viewMember.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">{viewMember.name}</h3>
                <p className="text-muted-foreground">{viewMember.role}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Bio</h4>
                <p className="text-sm text-muted-foreground">{viewMember.bio}</p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Social Media</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Facebook:</span> {viewMember.social.facebook}
                  </div>
                  <div>
                    <span className="font-medium">Instagram:</span> {viewMember.social.instagram}
                  </div>
                  <div>
                    <span className="font-medium">LinkedIn:</span> {viewMember.social.linkedin}
                  </div>
                  <div>
                    <span className="font-medium">TikTok:</span> {viewMember.social.tiktok}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Make changes to the team member information here.</DialogDescription>
          </DialogHeader>
          {editMember && (
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={editMember.name}
                    onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">
                    Role
                  </Label>
                  <Input
                    id="edit-role"
                    value={editMember.role}
                    onChange={(e) => setEditMember({ ...editMember, role: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-image" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="edit-image"
                    value={editMember.image}
                    onChange={(e) => setEditMember({ ...editMember, image: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-bio" className="text-right">
                    Bio
                  </Label>
                  <Textarea
                    id="edit-bio"
                    value={editMember.bio}
                    onChange={(e) => setEditMember({ ...editMember, bio: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-facebook" className="text-right">
                    Facebook
                  </Label>
                  <Input
                    id="edit-facebook"
                    value={editMember.social.facebook}
                    onChange={(e) =>
                      setEditMember({
                        ...editMember,
                        social: { ...editMember.social, facebook: e.target.value },
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-instagram" className="text-right">
                    Instagram
                  </Label>
                  <Input
                    id="edit-instagram"
                    value={editMember.social.instagram}
                    onChange={(e) =>
                      setEditMember({
                        ...editMember,
                        social: { ...editMember.social, instagram: e.target.value },
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-linkedin" className="text-right">
                    LinkedIn
                  </Label>
                  <Input
                    id="edit-linkedin"
                    value={editMember.social.linkedin}
                    onChange={(e) =>
                      setEditMember({
                        ...editMember,
                        social: { ...editMember.social, linkedin: e.target.value },
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-tiktok" className="text-right">
                    TikTok
                  </Label>
                  <Input
                    id="edit-tiktok"
                    value={editMember.social.tiktok}
                    onChange={(e) =>
                      setEditMember({
                        ...editMember,
                        social: { ...editMember.social, tiktok: e.target.value },
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add New Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Team Member</DialogTitle>
            <DialogDescription>Fill in the details for the new team member.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="new-name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-role" className="text-right">
                  Role
                </Label>
                <Input
                  id="new-role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="new-image"
                  value={newMember.image}
                  onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                  className="col-span-3"
                  placeholder="/team/member4.jpg"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="new-bio"
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-facebook" className="text-right">
                  Facebook
                </Label>
                <Input
                  id="new-facebook"
                  value={newMember.social.facebook}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      social: { ...newMember.social, facebook: e.target.value },
                    })
                  }
                  className="col-span-3"
                  placeholder="https://facebook.com/username"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-instagram" className="text-right">
                  Instagram
                </Label>
                <Input
                  id="new-instagram"
                  value={newMember.social.instagram}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      social: { ...newMember.social, instagram: e.target.value },
                    })
                  }
                  className="col-span-3"
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-linkedin" className="text-right">
                  LinkedIn
                </Label>
                <Input
                  id="new-linkedin"
                  value={newMember.social.linkedin}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      social: { ...newMember.social, linkedin: e.target.value },
                    })
                  }
                  className="col-span-3"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-tiktok" className="text-right">
                  TikTok
                </Label>
                <Input
                  id="new-tiktok"
                  value={newMember.social.tiktok}
                  onChange={(e) =>
                    setNewMember({
                      ...newMember,
                      social: { ...newMember.social, tiktok: e.target.value },
                    })
                  }
                  className="col-span-3"
                  placeholder="https://tiktok.com/@username"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}

