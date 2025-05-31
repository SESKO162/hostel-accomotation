"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart4,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Settings,
  ShieldAlert,
  ShieldCheck,
  User,
  UserPlus,
  Users,
  Key,
  Menu,
  X,
  LogOut
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  userRole: "student" | "security" | "admin"
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Define navigation items based on user role
  const studentNavItems = [
    {
      title: "Dashboard",
      href: "/student/dashboard",
      icon: Home,
    },
    {
      title: "Request Visitor",
      href: "/student/request-visitor",
      icon: UserPlus,
    },
    {
      title: "Report Incident",
      href: "/student/report-incident",
      icon: ShieldAlert,
    },
  ]

  const securityNavItems = [
    {
      title: "Dashboard",
      href: "/security/dashboard",
      icon: Home,
    },
    {
      title: "Scan",
      href: "/security/scan",
      icon: CreditCard,
    },
    {
      title: "Access Logs",
      href: "/security/logs",
      icon: FileText,
    },
  ]

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  // Select the appropriate navigation items
  let navItems = studentNavItems
  if (userRole === "security") navItems = securityNavItems
  if (userRole === "admin") navItems = adminNavItems

  return (
    <>
      {/* Mobile Menu Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden absolute top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 transform border-r bg-background transition-all duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-indigo-500" />
            <span className="font-cal-sans text-xl font-bold">SecureAccess</span>
          </Link>
        </div>
        <div className="py-4">
          <div className="px-4 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Menu
          </div>
          <nav className="mt-2 px-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-4 px-2 absolute bottom-4 w-full">
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}