import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AdminSidebar } from "./components/admin-sidebar"

export const metadata = {
  title: "Admin Panel | Websaathy",
  description: "Manage your website content and settings",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're on the server side
  if (typeof window === "undefined") {
    // Server-side check for authentication
    const cookieStore = cookies()
    const isAuthenticated = cookieStore.has("admin_session")

    // If not authenticated and not on login page, redirect to login
    const isLoginPage = cookieStore.get("pathname")?.value === "/admin/login"
    if (!isAuthenticated && !isLoginPage) {
      redirect("/admin/login")
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      <div className="w-full md:w-64 flex-shrink-0 border-r md:min-h-screen overflow-y-auto">
        <AdminSidebar />
      </div>
      <div className="flex-grow p-4 md:p-6 overflow-x-hidden overflow-y-auto">{children}</div>
    </div>
  )
}

