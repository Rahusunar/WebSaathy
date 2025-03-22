/**
 * Optimizes image URLs by adding width and height parameters
 * @param url The original image URL
 * @param width The desired width
 * @param height The desired height
 * @returns The optimized image URL
 */
export function optimizeImageUrl(url: string, width: number, height: number): string {
  // If it's a placeholder, use the width and height parameters
  if (url.includes("/placeholder.svg")) {
    return `/placeholder.svg?width=${width}&height=${height}`
  }

  // If it's a Vercel Blob Storage URL, we can't modify it
  if (url.includes("vercel-storage.com")) {
    return url
  }

  // If it's a Pexels URL, we can add the auto=compress parameter
  if (url.includes("pexels.com")) {
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}auto=compress&cs=tinysrgb&w=${width}&h=${height}&dpr=1`
  }

  // For other URLs, return as is
  return url
}

/**
 * Generates a placeholder image URL
 * @param width The width of the placeholder
 * @param height The height of the placeholder
 * @returns The placeholder image URL
 */
export function getPlaceholderImage(width: number, height: number): string {
  return `/placeholder.svg?width=${width}&height=${height}`
}

/**
 * Checks if an image URL is valid
 * @param url The image URL to check
 * @returns True if the URL is valid, false otherwise
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false

  // Check if it's a data URL
  if (url.startsWith("data:image/")) return true

  // Check if it's a valid URL
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

