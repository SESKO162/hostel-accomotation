"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ChevronDown, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  UserPlus,
  Trash,
  Edit,
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  XCircle
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock user data
const mockUsers = [
  {
    id: "USR001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "student",
    status: "active",
    accessLevel: "standard",
    lastLogin: "Today at 9:45 AM",
    photo: ""
  },
  {
    id: "USR002",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "student",
    status: "active",
    accessLevel: "restricted",
    lastLogin: "Yesterday at 3:30 PM",
    photo: ""
  },
  {
    id: "USR003",
    name: "Michael Johnson",
    email: "mjohnson@example.com",
    role: "faculty",
    status: "active",
    accessLevel: "extended",
    lastLogin: "Apr 20, 2025 at 10:15 AM",
    photo: ""
  },
  {
    id: "USR004",
    name: "Sarah Williams",
    email: "swilliams@example.com",
    role: "security",
    status: "active",
    accessLevel: "full",
    lastLogin: "Today at 8:00 AM",
    photo: ""
  },
  {
    id: "USR005",
    name: "Robert Brown",
    email: "rbrown@example.com",
    role: "admin",
    status: "active",
    accessLevel: "full",
    lastLogin: "Today at 9:05 AM",
    photo: ""
  },
  {
    id: "USR006",
    name: "Jessica Miller",
    email: "jmiller@example.com",
    role: "student",
    status: "suspended",
    accessLevel: "standard",
    lastLogin: "Apr 15, 2025 at 2:45 PM",
    photo: ""
  },
  {
    id: "USR007",
    name: "David Wilson",
    email: "dwilson@example.com",
    role: "student",
    status: "inactive",
    accessLevel: "standard",
    lastLogin: "Apr 10, 2025 at 11:30 AM",
    photo: ""
  },
  {
    id: "USR008",
    name: "Jennifer Taylor",
    email: "jtaylor@example.com",
    role: "faculty",
    status: "active",
    accessLevel: "extended",
    lastLogin: "Yesterday at 1:20 PM",
    photo: ""
  },
]

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter(user => {
    // Search filter
    const matchesSearch = 
      searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Role filter
    const matchesRole = roleFilter === null || user.role === roleFilter
    
    // Status filter
    const matchesStatus = statusFilter === null || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // Clear all filters
  const clearFilters = () => {
    setRoleFilter(null)
    setStatusFilter(null)
    setSearchQuery("")
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-cal-sans font-bold text-primary">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts, permissions, and access control settings.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>
                  View and manage all user accounts in the system
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account in the system
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                          <Input id="firstName" placeholder="John" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                          <Input id="lastName" placeholder="Smith" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" placeholder="john.smith@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium">Role</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="accessLevel" className="text-sm font-medium">Access Level</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select access level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restricted">Restricted</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="extended">Extended</SelectItem>
                            <SelectItem value="full">Full Access</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button type="submit">Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                    <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Role</p>
                      <div className="grid grid-cols-2 gap-1">
                        <Button 
                          variant={roleFilter === "student" ? "default" : "outline"}
                          size="sm"
                          className="h-8 justify-start"
                          onClick={() => setRoleFilter(roleFilter === "student" ? null : "student")}
                        >
                          Student
                        </Button>
                        <Button 
                          variant={roleFilter === "faculty" ? "default" : "outline"}
                          size="sm"
                          className="h-8 justify-start"
                          onClick={() => setRoleFilter(roleFilter === "faculty" ? null : "faculty")}
                        >
                          Faculty
                        </Button>
                        <Button 
                          variant={roleFilter === "security" ? "default" : "outline"}
                          size="sm"
                          className="h-8 justify-start"
                          onClick={() => setRoleFilter(roleFilter === "security" ? null : "security")}
                        >
                          Security
                        </Button>
                        <Button 
                          variant={roleFilter === "admin" ? "default" : "outline"}
                          size="sm"
                          className="h-8 justify-start"
                          onClick={() => setRoleFilter(roleFilter === "admin" ? null : "admin")}
                        >
                          Admin
                        </Button>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <p className="text-sm font-medium mb-2">Status</p>
                      <div className="grid grid-cols-2 gap-1">
                        <Button 
                          variant={statusFilter === "active" ? "default" : "outline"}
                          size="sm"
                          className="h-8 justify-start"
                          onClick={() => setStatusFilter(statusFilter === "active" ? null : "active")}
                        >
                          Active
                        </Button>
                        <Button 
                          variant={statusFilter === "inactive" ? "default" : "outline"}
                          size="sm"
                          className="h-8 justify-start"
                          onClick={() => setStatusFilter(statusFilter === "inactive" ? null : "inactive")}
                        >
                          Inactive
                        </Button>
                        <Button 
                          variant={statusFilter === "suspended" ? "default" : "outline"}
                          size="sm"
                          className="h-8 justify-start"
                          onClick={() => setStatusFilter(statusFilter === "suspended" ? null : "suspended")}
                        >
                          Suspended
                        </Button>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full" 
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Active filters */}
            {(roleFilter || statusFilter) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {roleFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Role: {roleFilter}
                    <XCircle 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setRoleFilter(null)} 
                    />
                  </Badge>
                )}
                {statusFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Status: {statusFilter}
                    <XCircle 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setStatusFilter(null)} 
                    />
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs" 
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>
            )}
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.photo} alt={user.name} />
                          <AvatarFallback className="bg-primary/10">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="capitalize">{user.role}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active"
                            ? "default"
                            : user.status === "inactive"
                            ? "outline"
                            : "destructive"
                        }
                        className={
                          user.status === "active" ? "bg-green-500" : ""
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          user.accessLevel === "full" 
                            ? "bg-blue-500 text-white" 
                            : user.accessLevel === "extended"
                            ? "bg-indigo-500 text-white"
                            : user.accessLevel === "restricted"
                            ? "bg-amber-500 text-white"
                            : ""
                        }
                      >
                        {user.accessLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <KeyRound className="mr-2 h-4 w-4" />
                            Manage Access
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                            Activate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShieldAlert className="mr-2 h-4 w-4 text-amber-600" />
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="h-8 w-8 mb-2" strokeWidth={1.5} />
                        <p>No users found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                        {(roleFilter || statusFilter || searchQuery) && (
                          <Button 
                            variant="link" 
                            onClick={clearFilters} 
                            className="mt-2"
                          >
                            Clear all filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}