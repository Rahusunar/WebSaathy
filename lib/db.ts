import fs from "fs"
import path from "path"

// Define the database file path
const DB_PATH = path.join(process.cwd(), "data")
const SETTINGS_FILE = path.join(DB_PATH, "settings.json")
const INQUIRIES_FILE = path.join(DB_PATH, "inquiries.json")
const POSTS_FILE = path.join(DB_PATH, "posts.json")
const PROJECTS_FILE = path.join(DB_PATH, "projects.json")
const TEAM_FILE = path.join(DB_PATH, "team.json")
const TESTIMONIALS_FILE = path.join(DB_PATH, "testimonials.json")

// Ensure the data directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true })
}

// Initialize files if they don't exist
const initializeFile = (filePath, defaultData = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData), "utf8")
  }
}

// Initialize settings file with default structure
const initializeSettingsFile = () => {
  if (!fs.existsSync(SETTINGS_FILE)) {
    const defaultSettings = {
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        github: "",
      },
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings), "utf8")
  }
}

// Initialize all database files
initializeFile(INQUIRIES_FILE)
initializeFile(POSTS_FILE)
initializeFile(PROJECTS_FILE)
initializeFile(TEAM_FILE)
initializeFile(TESTIMONIALS_FILE)
initializeSettingsFile()

// Helper functions to read and write data
const readData = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading from ${filePath}:`, error)
    return []
  }
}

const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
    return true
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error)
    return false
  }
}

// Settings specific functions
const readSettings = () => {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading settings:`, error)
    return {
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        github: "",
      },
    }
  }
}

const updateSettings = (key, value) => {
  try {
    const settings = readSettings()
    settings[key] = value
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf8")
    return true
  } catch (error) {
    console.error(`Error updating settings:`, error)
    return false
  }
}

// Database API
export const db = {
  // Settings
  settings: {
    findUnique: async ({ where }) => {
      const settings = readSettings()
      if (where.key === "socialLinks") {
        return { key: "socialLinks", value: JSON.stringify(settings.socialLinks) }
      }
      return null
    },
    upsert: async ({ where, update, create }) => {
      const key = where.key || create.key
      const value = update.value || create.value

      if (key === "socialLinks") {
        updateSettings("socialLinks", JSON.parse(value))
      }

      return { key, value }
    },
  },

  // Inquiries
  inquiry: {
    count: async () => {
      return readData(INQUIRIES_FILE).length
    },
    findMany: async () => {
      return readData(INQUIRIES_FILE)
    },
    create: async (data) => {
      const inquiries = readData(INQUIRIES_FILE)
      const newInquiry = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...data.data,
      }
      inquiries.push(newInquiry)
      writeData(INQUIRIES_FILE, inquiries)
      return newInquiry
    },
  },

  // Posts
  post: {
    count: async () => {
      return readData(POSTS_FILE).length
    },
    findMany: async () => {
      return readData(POSTS_FILE)
    },
  },

  // Projects
  project: {
    count: async () => {
      return readData(PROJECTS_FILE).length
    },
    findMany: async () => {
      return readData(PROJECTS_FILE)
    },
  },

  // Team
  team: {
    count: async () => {
      return readData(TEAM_FILE).length
    },
    findMany: async () => {
      return readData(TEAM_FILE)
    },
  },

  // Testimonials
  testimonial: {
    count: async () => {
      return readData(TESTIMONIALS_FILE).length
    },
    findMany: async () => {
      return readData(TESTIMONIALS_FILE)
    },
  },
}

