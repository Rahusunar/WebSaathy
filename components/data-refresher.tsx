"use client"

import { useEffect } from "react"

export default function DataRefresher() {
  useEffect(() => {
    // Force a refresh of all data when the page loads
    const refreshAllData = () => {
      // This will trigger a refresh of all components that listen for storage events
      const timestamp = Date.now()
      localStorage.setItem("websaathy_refresh_timestamp", timestamp.toString())

      // Dispatch a general refresh event
      const event = new Event("websaathy:data_refresh")
      document.dispatchEvent(event)
    }

    // Refresh data when the page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshAllData()
      }
    }

    // Initial refresh
    refreshAllData()

    // Set up event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Clean up
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return null
}

