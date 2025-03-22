export type SearchableItem = {
  id: string | number
  title: string
  content?: string
  excerpt?: string
  tags?: string[]
  type: "blog" | "service" | "portfolio" | "team" | "page"
  url: string
  image?: string
  date?: string
}

// Advanced search algorithm with relevance scoring
export function searchItems(items: SearchableItem[], query: string): SearchableItem[] {
  if (!query || query.trim() === "") {
    return []
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/)

  return items
    .map((item) => {
      // Calculate relevance score
      let score = 0
      const titleLower = (item.title || "").toLowerCase()
      const contentLower = (item.content || "").toLowerCase()
      const excerptLower = (item.excerpt || "").toLowerCase()
      const tagsLower = (item.tags || []).map((tag) => tag.toLowerCase())

      // Title matches (highest weight)
      searchTerms.forEach((term) => {
        // Exact title match (highest score)
        if (titleLower === term) {
          score += 100
        }
        // Title contains term
        else if (titleLower.includes(term)) {
          score += 50
        }
        // Title word starts with term
        else if (titleLower.split(/\s+/).some((word) => word.startsWith(term))) {
          score += 30
        }

        // Tag exact match
        if (tagsLower.includes(term)) {
          score += 40
        }
        // Tag starts with term
        else if (tagsLower.some((tag) => tag.startsWith(term))) {
          score += 20
        }

        // Content/excerpt contains term
        if (contentLower.includes(term)) {
          score += 10
        }
        if (excerptLower.includes(term)) {
          score += 15
        }
      })

      // Boost recent items
      if (item.date) {
        const itemDate = new Date(item.date)
        const now = new Date()
        const daysDiff = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24))
        if (daysDiff < 30) {
          score += 5 // Boost items from the last 30 days
        }
      }

      // Boost by type (can prioritize certain content types)
      if (item.type === "blog") score += 2
      if (item.type === "service") score += 3

      return { ...item, score }
    })
    .filter((item) => item.score > 0) // Only return items with a positive score
    .sort((a, b) => (b.score || 0) - (a.score || 0)) // Sort by score (highest first)
}

