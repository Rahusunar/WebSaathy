"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  Settings,
  MessageSquare,
  FileText,
  Briefcase,
  Users,
  Star,
  BarChart2,
  Globe,
  LogOut,
  User,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Portfolio",
    href: "/admin/portfolio",
    icon: Briefcase,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Globe,
  },
  {
    title: "Team",
    href: "/admin/team",
    icon: Users,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart2,
  },
  {
    title: "Admins",
    href: "/admin/admins",
    icon: User,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    // Clear the admin session cookie
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    // Redirect to login page
    router.push("/admin/login")
  }

  if (!mounted) {
    return (
      <div className="flex flex-col h-screen">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage your website</p>
        </div>
        <div className="p-4">
          {/* Skeleton loading state */}
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded-md mb-2 animate-pulse" />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">Manage your website</p>
      </div>
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="flex flex-col space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}

