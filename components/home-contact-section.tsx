"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { WhatsAppIcon } from "./whatsapp-icon"

export default function HomeContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      try {
        // Store inquiry in localStorage
        const inquiries = JSON.parse(localStorage.getItem("websaathy_inquiries") || "[]")
        const newInquiry = {
          id: Date.now(),
          ...formData,
          date: new Date().toISOString(),
          status: "new",
        }
        inquiries.push(newInquiry)
        localStorage.setItem("websaathy_inquiries", JSON.stringify(inquiries))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          message: "",
        })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } catch (err) {
        console.error("Error submitting form:", err)
        setIsSubmitting(false)
      }
    }, 1000)
  }

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Contact Us</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Get in touch with our team to discuss your project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Address</h4>
                <p className="text-muted-foreground">
                  Attariya
                  <br />
                  Kailali
                  <br />
                  Nepal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-muted-foreground">
                  <a href="tel:+9779805740156" className="hover:text-primary">
                    +977 9805740156
                  </a>
                </p>
                <p className="text-muted-foreground mt-1">
                  <a
                    href="https://wa.me/9779805740156"
                    className="hover:text-primary flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>WhatsApp: +977 9805740156</span>
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-muted-foreground">
                  <a href="mailto:websathy@gmail.com" className="hover:text-primary">
                    websathy@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Business Hours</h4>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 5:00 PM
                  <br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>

            <div className="w-full h-[200px] rounded-lg overflow-hidden border mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d452.1235743567868!2d80.552420113645!3d28.81803778692563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1742188440129!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Websaathy Location"
              />
            </div>
          </div>

          <div className="bg-background rounded-lg border p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>

            {isSubmitted ? (
              <div className="rounded-lg border bg-green-50 p-6 text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Send className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-green-800">Thank You!</h3>
                <p className="mt-2 text-green-700">
                  Your message has been sent successfully. We will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

