"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
import { PlusCircle, Edit, Trash2, User, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const adminSchema = z
  .object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
    role: z.enum(["admin", "editor"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Mock admins data
const mockAdmins = [
  {
    id: 1,
    username: "Rahul",
    role: "admin",
    lastLogin: "2023-03-15T10:30:00Z",
  },
  {
    id: 2,
    username: "Editor1",
    role: "editor",
    lastLogin: "2023-03-10T14:45:00Z",
  },
]

export default function AdminsPage() {
  const [admins, setAdmins] = useState(mockAdmins)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      role: "editor",
    },
  })

  async function onSubmit(values: z.infer<typeof adminSchema>) {
    setIsLoading(true)

    try {
      // In a real app, you would save the admin to your database
      console.log("Creating admin:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add the new admin to the list
      const newAdmin = {
        id: admins.length + 1,
        username: values.username,
        role: values.role,
        lastLogin: new Date().toISOString(),
      }

      setAdmins([...admins, newAdmin])

      toast({
        title: "Admin created",
        description: "The admin user has been created successfully.",
      })

      // Reset the form and close the dialog
      form.reset()
      setIsAddDialogOpen(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create admin. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleBadgeClass = (role: string) => {
    return role === "admin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Users</h1>
          <p className="text-muted-foreground">Manage admin users and their permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Admin User</DialogTitle>
              <DialogDescription>Create a new admin user with specific permissions</DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="admin_username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        Must be at least 8 characters with uppercase, lowercase, and numbers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin (Full Access)</SelectItem>
                          <SelectItem value="editor">Editor (Limited Access)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Admins have full access, while editors can only manage content</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    {isLoading ? "Creating..." : "Create Admin"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>View and manage admin users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-2 rounded-full">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{admin.username}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getRoleBadgeClass(admin.role)}`}
                      >
                        <Shield className="h-3 w-3" />
                        {admin.role === "admin" ? "Administrator" : "Editor"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Last login: {new Date(admin.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                    disabled={admin.username === "Rahul"}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

