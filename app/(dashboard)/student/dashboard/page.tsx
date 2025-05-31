"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityIcon, Key, KeyRound, ShieldAlert, UserPlus } from "lucide-react"
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
import { BarChart } from "@/components/ui/chart"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for access history
  const accessHistory = [
    { id: 1, location: "Main Entrance", timestamp: "Today, 9:30 AM", status: "granted" },
    { id: 2, location: "Library", timestamp: "Today, 11:45 AM", status: "granted" },
    { id: 3, location: "Cafeteria", timestamp: "Today, 1:15 PM", status: "granted" },
    { id: 4, location: "Computer Lab", timestamp: "Yesterday, 3:30 PM", status: "denied" },
    { id: 5, location: "Main Entrance", timestamp: "Yesterday, 5:00 PM", status: "granted" },
  ]

  // Mock data for visitor requests
  const visitorRequests = [
    { id: 1, name: "Jane Smith", purpose: "Project Meeting", date: "Tomorrow, 2:00 PM", status: "approved" },
    { id: 2, name: "Michael Brown", purpose: "Study Session", date: "May 15, 1:30 PM", status: "pending" },
  ]

  // Mock chart data
  const chartData = [
    { name: "Mon", value: 5 },
    { name: "Tue", value: 7 },
    { name: "Wed", value: 4 },
    { name: "Thu", value: 8 },
    { name: "Fri", value: 6 },
    { name: "Sat", value: 2 },
    { name: "Sun", value: 1 },
  ]

  return (
    <DashboardLayout userRole="student">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-cal-sans font-bold text-primary">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's your access overview.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Access Status</CardTitle>
              <KeyRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">Valid through May 31, 2025</p>
              <Badge className="mt-2 bg-green-500">Active</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Access Events</CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Visitors</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Access Alerts</CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No active alerts</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="access-history">Access History</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-2 md:col-span-1">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Your access events over the past week</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <BarChart
                    data={chartData}
                    index="name"
                    categories={["value"]}
                    colors={["#3B82F6"]}
                    valueFormatter={(value) => `${value} events`}
                    yAxisWidth={30}
                    height={300}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-2 md:col-span-1">
                <CardHeader>
                  <CardTitle>Recent Access</CardTitle>
                  <CardDescription>Your last 5 access attempts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accessHistory.slice(0, 5).map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.location}</TableCell>
                          <TableCell>{item.timestamp}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={item.status === "granted" ? "default" : "destructive"}
                              className={item.status === "granted" ? "bg-green-500" : ""}
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="access-history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Access History</CardTitle>
                <CardDescription>
                  Complete record of your access attempts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.location}</TableCell>
                        <TableCell>{item.timestamp}</TableCell>
                        <TableCell>
                          <Badge
                            variant={item.status === "granted" ? "default" : "destructive"}
                            className={item.status === "granted" ? "bg-green-500" : ""}
                          >
                            {item.status}
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
          <TabsContent value="visitors" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Visitor Requests</CardTitle>
                  <CardDescription>
                    Manage your visitor access requests
                  </CardDescription>
                </div>
                <Button>New Request</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visitor</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitorRequests.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.purpose}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "approved"
                                ? "default"
                                : item.status === "pending"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              item.status === "approved" ? "bg-green-500" : ""
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
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