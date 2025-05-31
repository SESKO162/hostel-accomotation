"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Calculator, 
  Calendar, 
  CreditCard, 
  Settings, 
  Smile, 
  User, 
  FileText, 
  ShieldAlert, 
  Users, 
  Home, 
  Lock,
  Key
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/student/request-visitor"))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Request Visitor Access</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/security/scan"))}>
            <Lock className="mr-2 h-4 w-4" />
            <span>Scan Access Card</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Student">
          <CommandItem onSelect={() => runCommand(() => router.push("/student/dashboard"))}>
            <User className="mr-2 h-4 w-4" />
            <span>Student Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/student/request-visitor"))}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Request Visitor</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/student/report-incident"))}>
            <ShieldAlert className="mr-2 h-4 w-4" />
            <span>Report Incident</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Security">
          <CommandItem onSelect={() => runCommand(() => router.push("/security/dashboard"))}>
            <Key className="mr-2 h-4 w-4" />
            <span>Security Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/security/scan"))}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Scan</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/security/logs"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Access Logs</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Admin">
          <CommandItem onSelect={() => runCommand(() => router.push("/admin/dashboard"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Admin Dashboard</span>
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/admin/users"))}>
            <Users className="mr-2 h-4 w-4" />
            <span>User Management</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/admin/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>System Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}