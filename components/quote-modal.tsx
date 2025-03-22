"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function QuoteModal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false)
        setIsOpen(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          budget: "",
          description: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Request a Free Quote</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request a Free Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll provide you with a custom quote for your project.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <h3 className="text-xl font-semibold text-primary">Thank You!</h3>
            <p className="mt-2">We'll prepare your quote and contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modal-name">Name</Label>
              <Input
                id="modal-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-phone">Phone (Optional)</Label>
              <Input
                id="modal-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-projectType">Project Type</Label>
              <Select value={formData.projectType} onValueChange={(value) => handleSelectChange("projectType", value)}>
                <SelectTrigger id="modal-projectType">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="web-app">Web Application</SelectItem>
                  <SelectItem value="redesign">Website Redesign</SelectItem>
                  <SelectItem value="seo">SEO Services</SelectItem>
                  <SelectItem value="social-media">Social Media Management</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-budget">Budget Range</Label>
              <Select value={formData.budget} onValueChange={(value) => handleSelectChange("budget", value)}>
                <SelectTrigger id="modal-budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-plus">$50,000+</SelectItem>
                  <SelectItem value="not-sure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-description">Project Description</Label>
              <Textarea
                id="modal-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your project requirements..."
                className="min-h-[100px]"
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

