/**
 * Utility to refresh data across components
 */

// Create a custom event for localStorage changes
export const refreshData = (key: string) => {
  // Update localStorage timestamp to force refresh
  const timestamp = Date.now()
  localStorage.setItem(`${key}_timestamp`, timestamp.toString())

  // Dispatch custom event
  const event = new Event(`storage:${key}`)
  document.dispatchEvent(event)

  // Also dispatch a general refresh event
  const generalEvent = new Event("websaathy:data_refresh")
  document.dispatchEvent(generalEvent)

  return timestamp
}

// Hook to listen for data refresh events
export const setupDataRefreshListeners = (callback: () => void) => {
  // Listen for custom storage events
  const handleCustomStorageChange = () => {
    callback()
  }

  document.addEventListener("websaathy:data_refresh", handleCustomStorageChange)

  return () => {
    document.removeEventListener("websaathy:data_refresh", handleCustomStorageChange)
  }
}

