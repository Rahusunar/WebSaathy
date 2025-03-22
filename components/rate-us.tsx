"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function RateUs() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("websaathy_current_user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserName(user.name)
        setUserEmail(user.email)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const handleRatingClick = (selectedRating: number) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true)
      return
    }
    setRating(selectedRating)
  }

  const handleLogin = () => {
    if (!userName.trim() || !userEmail.trim()) {
      setLoginError("Please enter both name and email")
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userEmail)) {
      setLoginError("Please enter a valid email address")
      return
    }

    // Store user info
    const user = { name: userName, email: userEmail }
    localStorage.setItem("websaathy_current_user", JSON.stringify(user))

    setIsLoggedIn(true)
    setIsLoginOpen(false)
    setLoginError("")
  }

  const handleSubmit = () => {
    if (rating > 0 && isLoggedIn) {
      // Store the rating in localStorage
      try {
        const ratings = JSON.parse(localStorage.getItem("websaathy_ratings") || "[]")
        ratings.push({
          id: Date.now(),
          rating,
          feedback,
          userName,
          userEmail,
          date: new Date().toISOString(),
        })
        localStorage.setItem("websaathy_ratings", JSON.stringify(ratings))

        // Dispatch custom event to notify components about the change
        const event = new Event("storage:websaathy_ratings")
        document.dispatchEvent(event)

        setSubmitted(true)
      } catch (error) {
        console.error("Error saving rating:", error)
      }
    }
  }

  if (submitted) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Thank You, {userName}!</h3>
          <p className="text-sm text-muted-foreground mt-1">Your feedback helps us improve our services.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-center">Rate Our Services</CardTitle>
          <CardDescription className="text-center">
            {isLoggedIn
              ? `Hello ${userName}, how would you rate your experience with us?`
              : "Please log in to rate our services"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {!isLoggedIn && (
            <Button onClick={() => setIsLoginOpen(true)} className="w-full">
              Log in to Rate
            </Button>
          )}

          {isLoggedIn && rating > 0 && (
            <div className="space-y-2">
              <textarea
                placeholder="Share your feedback (optional)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                rows={2}
              />
            </div>
          )}
        </CardContent>
        {isLoggedIn && (
          <CardFooter>
            <Button onClick={handleSubmit} disabled={rating === 0} className="w-full">
              Submit Rating
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log in to Rate</DialogTitle>
            <DialogDescription>Please provide your name and email to submit a rating.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {loginError && <div className="text-sm font-medium text-red-500 mb-2">{loginError}</div>}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLoginOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogin}>Log In</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

