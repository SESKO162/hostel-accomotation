"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityIcon, AlertTriangle, KeyRound, Settings, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, DonutChart } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  // Mock data for system stats
  const userTypeData = [
    { name: "Students", value: 1250 },
    { name: "Faculty", value: 175 },
    { name: "Staff", value: 320 },
    { name: "Security", value: 45 },
    { name: "Admins", value: 12 },
  ]
  
  // Mock data for access activity
  const activityData = [
    { name: "Apr 12", count: 125 },
    { name: "Apr 13", count: 147 },
    { name: "Apr 14", count: 118 },
    { name: "Apr 15", count: 152 },
    { name: "Apr 16", count: 165 },
    { name: "Apr 17", count: 87 },
    { name: "Apr 18", count: 95 },
    { name: "Apr 19", count: 132 },
    { name: "Apr 20", count: 142 },
    { name: "Apr 21", count: 155 },
    { name: "Apr 22", count: 168 },
    { name: "Today", count: 143 },
  ]
  
  // Mock data for recent system events
  const systemEvents = [
    { id: 1, event: "System Update Completed", timestamp: "Today, 3:30 AM", status: "success" },
    { id: 2, event: "Database Backup", timestamp: "Today, 1:15 AM", status: "success" },
    { id: 3, event: "Failed Login Attempts (3)", timestamp: "Yesterday, 11:42 PM", status: "warning" },
    { id: 4, event: "New User Registration", timestamp: "Yesterday, 4:23 PM", status: "info" },
    { id: 5, event: "Server Maintenance", timestamp: "Apr 21, 2:00 AM", status: "info" },
  ]
  
  // Mock data for recent user activities
  const userActivities = [
    { id: 1, user: "John Admin", action: "Modified User Permissions", target: "Security Group", timestamp: "Today, 10:15 AM" },
    { id: 2, user: "Sarah Admin", action: "Created New User", target: "Emily Student", timestamp: "Today, 9:32 AM" },
    { id: 3, user: "John Admin", action: "Changed System Settings", target: "Access Control Rules", timestamp: "Yesterday, 5:47 PM" },
    { id: 4, user: "System", action: "Automated User Deactivation", target: "3 Expired Accounts", timestamp: "Yesterday, 1:00 AM" },
  ]

  return (
    <DashboardLayout userRole="admin">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-cal-sans font-bold text-primary">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management console</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,802</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+24</span> since last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
              <KeyRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,653</div>
              <div className="mt-2">
                <Progress value={92} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  92% of total users
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Optimal</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
              <Badge className="mt-2 bg-green-500">Online</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Low severity</p>
              <Badge variant="outline" className="mt-2">Monitoring</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>
                Breakdown of users by type
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <DonutChart 
                data={userTypeData}
                colors={["#3B82F6", "#6366F1", "#F97316", "#22C55E", "#EF4444"]}
                width="100%"
                height={320}
                innerRadius="60%"
                outerRadius="80%"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>
                Daily access events (last 30 days)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={activityData}
                dataKeys={["count"]}
                colors={["#3B82F6"]}
                width="100%"
                height={320}
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="system" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="system">System Events</TabsTrigger>
            <TabsTrigger value="user">User Activities</TabsTrigger>
          </TabsList>
          <TabsContent value="system" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Events</CardTitle>
                <CardDescription>
                  Recent system-level events and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.event}</TableCell>
                        <TableCell>{event.timestamp}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              event.status === "success"
                                ? "default"
                                : event.status === "warning"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              event.status === "success" 
                                ? "bg-green-500" 
                                : event.status === "warning"
                                ? "border-amber-500 text-amber-500"
                                : ""
                            }
                          >
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="user" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Admin Activities</CardTitle>
                  <CardDescription>
                    Recent actions performed by administrative users
                  </CardDescription>
                </div>
                <Button variant="outline">
                  Export Log
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.user}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.target}</TableCell>
                        <TableCell>{activity.timestamp}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}