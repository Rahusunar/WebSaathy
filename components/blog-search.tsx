"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function BlogSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push("/blog")
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

