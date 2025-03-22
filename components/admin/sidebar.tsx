"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Settings,
  MessageSquare,
  FileText,
  Briefcase,
  Users,
  Star,
  BarChart,
  Menu,
  X,
  Home,
  Layers,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
  onLogout?: () => void
}

export function AdminSidebar({ className, onLogout }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    { name: "Services", href: "/admin/services", icon: Layers },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  ]

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem("admin_authenticated")
      window.location.href = "/admin/login"
    }
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="bg-background shadow-md"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-background border-r transition-all duration-300 overflow-y-auto",
          isMobile ? (isMobileMenuOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full") : "w-64",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Manage your website</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive(item.href) ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-muted",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t mt-auto space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Back to Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}

