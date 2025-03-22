"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PortfolioFilter({ onFilterChange }: { onFilterChange: (category: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("all")

  const handleFilterChange = (value: string) => {
    setActiveFilter(value)
    onFilterChange(value)
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex justify-center">
        <Tabs defaultValue="all" className="w-full max-w-md">
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start sm:justify-center p-1">
            <TabsTrigger
              value="all"
              onClick={() => handleFilterChange("all")}
              className={`flex-shrink-0 ${
                activeFilter === "all"
                  ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  : ""
              }`}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="web-design"
              onClick={() => handleFilterChange("web-design")}
              className={`flex-shrink-0 ${
                activeFilter === "web-design"
                  ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  : ""
              }`}
            >
              Web Design
            </TabsTrigger>
            <TabsTrigger
              value="development"
              onClick={() => handleFilterChange("development")}
              className={`flex-shrink-0 ${
                activeFilter === "development"
                  ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  : ""
              }`}
            >
              Development
            </TabsTrigger>
            <TabsTrigger
              value="marketing"
              onClick={() => handleFilterChange("marketing")}
              className={`flex-shrink-0 ${
                activeFilter === "marketing"
                  ? "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  : ""
              }`}
            >
              Marketing
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

