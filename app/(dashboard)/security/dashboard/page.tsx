"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityIcon, AlertTriangle, ArrowUpDown, Shield, Users } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/ui/chart"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function SecurityDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for recent accesses
  const recentAccesses = [
    { 
      id: 1, 
      name: "John Smith", 
      userType: "Student", 
      location: "Main Entrance", 
      timestamp: "Today, 9:30 AM", 
      status: "granted",
      photo: ""
    },
    { 
      id: 2, 
      name: "Emily Davis", 
      userType: "Faculty", 
      location: "Faculty Building", 
      timestamp: "Today, 9:28 AM", 
      status: "granted",
      photo: ""
    },
    { 
      id: 3, 
      name: "Michael Johnson", 
      userType: "Student", 
      location: "Library", 
      timestamp: "Today, 9:15 AM", 
      status: "granted",
      photo: ""
    },
    { 
      id: 4, 
      name: "Sarah Williams", 
      userType: "Visitor", 
      location: "Admin Building", 
      timestamp: "Today, 9:05 AM", 
      status: "denied",
      photo: ""
    },
    { 
      id: 5, 
      name: "David Rodriguez", 
      userType: "Staff", 
      location: "Staff Entrance", 
      timestamp: "Today, 8:55 AM", 
      status: "granted",
      photo: ""
    },
  ]

  // Mock data for alerts
  const alerts = [
    { 
      id: 1, 
      type: "Multiple Failed Attempts", 
      location: "Computer Lab", 
      timestamp: "Today, 8:45 AM", 
      severity: "high" 
    },
    { 
      id: 2, 
      type: "Unauthorized Access Attempt", 
      location: "Server Room", 
      timestamp: "Today, 7:30 AM", 
      severity: "critical" 
    },
    { 
      id: 3, 
      type: "Door Held Open", 
      location: "South Wing", 
      timestamp: "Yesterday, 4:15 PM", 
      severity: "medium" 
    },
  ]

  // Mock chart data
  const chartData = [
    { name: "7AM", faculty: 5, students: 10, visitors: 0 },
    { name: "8AM", faculty: 15, students: 40, visitors: 2 },
    { name: "9AM", faculty: 20, students: 75, visitors: 5 },
    { name: "10AM", faculty: 25, students: 60, visitors: 8 },
    { name: "11AM", faculty: 22, students: 55, visitors: 10 },
    { name: "12PM", faculty: 30, students: 90, visitors: 15 },
    { name: "1PM", faculty: 28, students: 85, visitors: 12 },
  ]

  return (
    <DashboardLayout userRole="security">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-cal-sans font-bold text-primary">Security Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Officer Rodriguez. Live access control monitoring.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">Currently on premises</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Access Events</CardTitle>
              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">Today&apos;s total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Visitors</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Checked in today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Access Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">Requiring attention</p>
              <Badge variant="destructive" className="mt-2">Critical: 1</Badge>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Access Traffic</CardTitle>
            <CardDescription>
              Hourly breakdown of access events by user type
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <LineChart
              data={chartData}
              dataKeys={['faculty', 'students', 'visitors']}
              colors={['#3B82F6', '#6366F1', '#F97316']}
              height={300}
            />
          </CardContent>
        </Card>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="recent">Recent Access</TabsTrigger>
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Recent Access Events</CardTitle>
                    <CardDescription>
                      Live monitoring of access control events
                    </CardDescription>
                  </div>
                  <div className="w-full md:w-auto">
                    <Input 
                      placeholder="Search by name or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-[300px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Location
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          Time
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAccesses.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={item.photo} alt={item.name} />
                              <AvatarFallback className="bg-primary/10">
                                {item.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.userType}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
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
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>
                    Active security alerts requiring attention
                  </CardDescription>
                </div>
                <Button>
                  Clear Resolved
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.type}</TableCell>
                        <TableCell>{alert.location}</TableCell>
                        <TableCell>{alert.timestamp}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              alert.severity === "low"
                                ? "outline"
                                : alert.severity === "medium"
                                ? "secondary"
                                : alert.severity === "high"
                                ? "destructive"
                                : "destructive"
                            }
                            className={
                              alert.severity === "critical" ? "bg-purple-700" : ""
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="default" size="sm">
                            Respond
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