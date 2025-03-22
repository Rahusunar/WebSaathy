"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash, Star } from "lucide-react"
import { createStorageEvent } from "@/hooks/use-site-images"

interface RatingsManagerProps {
  setError: (error: string) => void
  setSuccess: (success: string) => void
}

export default function RatingsManager({ setError, setSuccess }: RatingsManagerProps) {
  const [ratings, setRatings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [averageRating, setAverageRating] = useState(0)

  useEffect(() => {
    const loadRatings = () => {
      setIsLoading(true)
      try {
        const storedRatings = localStorage.getItem("websaathy_ratings")
        if (storedRatings) {
          const parsedRatings = JSON.parse(storedRatings)
          setRatings(parsedRatings)

          // Calculate average rating
          if (parsedRatings.length > 0) {
            const sum = parsedRatings.reduce((acc, rating) => acc + rating.rating, 0)
            setAverageRating(Number.parseFloat((sum / parsedRatings.length).toFixed(1)))
          }
        }
      } catch (error) {
        console.error("Error loading ratings:", error)
        setError("Failed to load ratings")
      } finally {
        setIsLoading(false)
      }
    }

    loadRatings()

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "websaathy_ratings" || !e.key) {
        loadRatings()
      }
    }

    // Listen for custom storage events
    const handleCustomStorageChange = () => {
      loadRatings()
    }

    window.addEventListener("storage", handleStorageChange)
    document.addEventListener("storage:websaathy_ratings", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      document.removeEventListener("storage:websaathy_ratings", handleCustomStorageChange)
    }
  }, [setError])

  const handleDeleteRating = (id) => {
    try {
      const updatedRatings = ratings.filter((rating) => rating.id !== id)
      setRatings(updatedRatings)
      localStorage.setItem("websaathy_ratings", JSON.stringify(updatedRatings))
      createStorageEvent("websaathy_ratings")

      // Recalculate average
      if (updatedRatings.length > 0) {
        const sum = updatedRatings.reduce((acc, rating) => acc + rating.rating, 0)
        setAverageRating(Number.parseFloat((sum / updatedRatings.length).toFixed(1)))
      } else {
        setAverageRating(0)
      }

      setSuccess("Rating deleted successfully!")
    } catch (error) {
      console.error("Error deleting rating:", error)
      setError("Failed to delete rating")
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 border rounded-md">
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-4 w-48 bg-muted animate-pulse rounded-md"></div>
                </div>
                <div className="h-8 w-8 bg-muted animate-pulse rounded-md"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Ratings</CardTitle>
        <CardDescription>
          Manage ratings submitted by users. Average rating: {averageRating} / 5 ({ratings.length} ratings)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {ratings.length > 0 ? (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="flex justify-between items-start p-4 border rounded-md">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {rating.userName || "Anonymous"} - {new Date(rating.date).toLocaleDateString()}
                    </span>
                  </div>
                  {rating.feedback && <p className="text-sm text-muted-foreground">{rating.feedback}</p>}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteRating(rating.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No ratings yet. When users rate your services, their ratings will appear here.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

