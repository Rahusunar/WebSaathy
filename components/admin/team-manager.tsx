"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash, Save, Users } from "lucide-react"
import { createStorageEvent } from "@/hooks/use-site-images"

interface TeamManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function TeamManager({ setError, setSuccess }: TeamManagerProps) {
  const [teamMembers, setTeamMembers] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Team member form state
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    social: {
      facebook: "",
      instagram: "",
      whatsapp: "",
    },
  })

  // File upload ref
  const teamImageRef = useRef(null)

  useEffect(() => {
    const loadTeamMembers = () => {
      setIsLoading(true)
      try {
        const storedTeamMembers = localStorage.getItem("websaathy_team")
        if (storedTeamMembers) {
          setTeamMembers(JSON.parse(storedTeamMembers))
        }
      } catch (error) {
        console.error("Error loading team members:", error)
        setError("Failed to load team members")
      } finally {
        setIsLoading(false)
      }
    }

    loadTeamMembers()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "websaathy_team" || !e.key) {
        loadTeamMembers()
      }
    }

    // Listen for custom storage events
    const handleCustomStorageChange = () => {
      loadTeamMembers()
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("storage:websaathy_team", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener("storage:websaathy_team", handleCustomStorageChange)
    }
  }, [setError])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTeamMember((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setNewTeamMember((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.includes("image/")) {
      setError("Please upload an image file")
      return
    }

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result
      setNewTeamMember((prev) => ({
        ...prev,
        image: imageData,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.role || !newTeamMember.bio) {
      setError("Please fill in all required fields")
      return
    }

    const newMember = {
      id: Date.now(),
      ...newTeamMember,
    }

    const updatedTeam = [...teamMembers, newMember]
    setTeamMembers(updatedTeam)
    localStorage.setItem("websaathy_team", JSON.stringify(updatedTeam))
    createStorageEvent("websaathy_team")

    // Reset form
    setNewTeamMember({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: {
        facebook: "",
        instagram: "",
        whatsapp: "",
      },
    })

    if (teamImageRef.current) {
      teamImageRef.current.value = ""
    }

    setSuccess("Team member added successfully!")
  }

  const handleEditTeamMember = (member) => {
    setEditingItem(member)
    setNewTeamMember({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      social: {
        facebook: member.social.facebook,
        instagram: member.social.instagram,
        whatsapp: member.social.whatsapp,
      },
    })
  }

  const handleUpdateTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.role || !newTeamMember.bio) {
      setError("Please fill in all required fields")
      return
    }

    const updatedTeam = teamMembers.map((member) =>
      member.id === editingItem.id ? { ...member, ...newTeamMember } : member,
    )

    setTeamMembers(updatedTeam)
    localStorage.setItem("websaathy_team", JSON.stringify(updatedTeam))
    createStorageEvent("websaathy_team")

    // Reset form
    setEditingItem(null)
    setNewTeamMember({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: {
        facebook: "",
        instagram: "",
        whatsapp: "",
      },
    })

    if (teamImageRef.current) {
      teamImageRef.current.value = ""
    }

    setSuccess("Team member updated successfully!")
  }

  const handleDeleteTeamMember = (id) => {
    const updatedTeam = teamMembers.filter((member) => member.id !== id)
    setTeamMembers(updatedTeam)
    localStorage.setItem("websaathy_team", JSON.stringify(updatedTeam))
    createStorageEvent("websaathy_team")

    setSuccess("Team member deleted successfully!")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="h-7 w-40 bg-muted animate-pulse rounded-md mb-2"></div>
            <div className="h-5 w-64 bg-muted animate-pulse rounded-md"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              <div className="h-32 bg-muted animate-pulse rounded-md"></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-40 bg-muted animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded-md mb-4"></div>
                <div className="h-16 bg-muted animate-pulse rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{editingItem ? "Edit Team Member" : "Add New Team Member"}</CardTitle>
          <CardDescription>
            {editingItem ? "Update existing team member information" : "Add a new team member to your website"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newTeamMember.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label htmlFor="role">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={newTeamMember.role}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">
                Bio <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={newTeamMember.bio}
                onChange={handleInputChange}
                placeholder="Short biography"
              />
            </div>

            <div>
              <Label htmlFor="teamImage">Profile Image</Label>
              <div className="flex items-center gap-4 mt-1">
                {newTeamMember.image && (
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img
                      src={newTeamMember.image || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input id="teamImage" type="file" accept="image/*" ref={teamImageRef} onChange={handleFileUpload} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={newTeamMember.social.facebook}
                  onChange={handleSocialChange}
                  placeholder="Facebook URL"
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={newTeamMember.social.instagram}
                  onChange={handleSocialChange}
                  placeholder="Instagram URL"
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={newTeamMember.social.whatsapp}
                  onChange={handleSocialChange}
                  placeholder="WhatsApp Number"
                />
              </div>
            </div>

            <div className="flex justify-end">
              {editingItem ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingItem(null)
                      setNewTeamMember({
                        name: "",
                        role: "",
                        bio: "",
                        image: "",
                        social: {
                          facebook: "",
                          instagram: "",
                          whatsapp: "",
                        },
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateTeamMember}>
                    <Save className="h-4 w-4 mr-2" />
                    Update Team Member
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAddTeamMember}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditTeamMember(member)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteTeamMember(member.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                {member.image ? (
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <p className="text-sm">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

