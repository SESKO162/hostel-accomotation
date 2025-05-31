"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, User, Shield, CalendarClock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAccessInfo {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "suspended" | "expired"
  access: {
    [key: string]: boolean
  }
  photo?: string
  validUntil: string
}

export function ScannerInterface() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"success" | "denied" | "warning" | null>(null)
  const [scannedUser, setScannedUser] = useState<UserAccessInfo | null>(null)
  const [scanLocation, setScanLocation] = useState("Main Entrance")
  const { toast } = useToast()

  // Mock function to simulate a card scan
  const simulateScan = () => {
    setIsScanning(true)
    setScanResult(null)
    setScannedUser(null)
    
    // Simulate scan taking some time
    setTimeout(() => {
      setIsScanning(false)
      
      // Randomly determine scan result
      const result = Math.random()
      
      if (result > 0.7) {
        // Denied access
        setScanResult("denied")
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "User does not have access to this location.",
        })
      } else if (result > 0.1) {
        // Successful scan
        setScanResult("success")
        
        // Mock user data
        setScannedUser({
          id: "STU12345",
          name: "John Student",
          email: "john.student@university.edu",
          role: "Student",
          status: "active",
          access: {
            "Main Entrance": true,
            "Library": true,
            "Cafeteria": true,
            "Computer Lab": result > 0.5,
            "Dormitory A": true,
            "Gymnasium": false,
          },
          validUntil: "May 31, 2025",
        })
        
        toast({
          title: "Access Granted",
          description: "User authenticated successfully.",
        })
      } else {
        // Warning - card readable but has issues
        setScanResult("warning")
        toast({
          variant: "destructive",
          title: "Card Issue Detected",
          description: "Card is readable but may need replacement.",
        })
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Scanner Interface */}
        <Card className={cn(
          "border-2 transition-all duration-300",
          isScanning ? "border-blue-500 shadow-lg shadow-blue-100 dark:shadow-none" : "border-border",
          scanResult === "success" ? "border-green-500 shadow-lg shadow-green-100 dark:shadow-none" : "",
          scanResult === "denied" ? "border-red-500 shadow-lg shadow-red-100 dark:shadow-none" : "",
          scanResult === "warning" ? "border-amber-500 shadow-lg shadow-amber-100 dark:shadow-none" : ""
        )}>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center space-y-6">
            {isScanning ? (
              <>
                <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
                <div className="text-xl font-medium">Scanning Card...</div>
                <p className="text-muted-foreground">Please hold the card steady</p>
              </>
            ) : scanResult ? (
              <>
                {scanResult === "success" && (
                  <>
                    <CheckCircle2 className="w-20 h-20 text-green-500" strokeWidth={1.5} />
                    <div className="text-xl font-medium text-green-600 dark:text-green-500">Access Granted</div>
                    <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-500">Authenticated</Badge>
                  </>
                )}
                {scanResult === "denied" && (
                  <>
                    <XCircle className="w-20 h-20 text-red-500" strokeWidth={1.5} />
                    <div className="text-xl font-medium text-red-600 dark:text-red-500">Access Denied</div>
                    <Badge variant="outline" className="border-red-500 text-red-600 dark:text-red-500">Unauthorized</Badge>
                  </>
                )}
                {scanResult === "warning" && (
                  <>
                    <AlertCircle className="w-20 h-20 text-amber-500" strokeWidth={1.5} />
                    <div className="text-xl font-medium text-amber-600 dark:text-amber-500">Card Issue</div>
                    <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-500">Needs Attention</Badge>
                  </>
                )}
                <Button onClick={simulateScan} className="mt-4" variant="outline">Scan Again</Button>
              </>
            ) : (
              <>
                <Shield className="w-20 h-20 text-muted-foreground" strokeWidth={1.5} />
                <div className="text-xl font-medium">Ready to Scan</div>
                <p className="text-muted-foreground">Present access card to scanner</p>
                <Button onClick={simulateScan} size="lg" className="mt-4">
                  Simulate Card Scan
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* User Information */}
        <Card className={cn(
          scannedUser ? "opacity-100" : "opacity-70"
        )}>
          <CardContent className="p-6">
            {scannedUser ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={scannedUser.photo} />
                    <AvatarFallback className="bg-primary/10 text-lg">
                      {scannedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-medium">{scannedUser.name}</h3>
                    <p className="text-muted-foreground">{scannedUser.id} • {scannedUser.role}</p>
                    <Badge 
                      className={cn(
                        "mt-1",
                        scannedUser.status === "active" ? "bg-green-500" : 
                        scannedUser.status === "suspended" ? "bg-amber-500" : 
                        "bg-red-500"
                      )}
                    >
                      {scannedUser.status.charAt(0).toUpperCase() + scannedUser.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">ID: {scannedUser.id}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Valid until: {scannedUser.validUntil}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Access Permissions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(scannedUser.access).map(([location, hasAccess]) => (
                      <div 
                        key={location}
                        className={cn(
                          "px-3 py-1 rounded-md text-sm",
                          location === scanLocation ? "bg-secondary font-medium" : "bg-muted",
                          hasAccess ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                        )}
                      >
                        {location}: {hasAccess ? "✓" : "✗"}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    View History
                  </Button>
                  <Button variant="destructive" size="sm">
                    Report Issue
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-4">
                <User className="h-16 w-16 text-muted-foreground/50" strokeWidth={1.5} />
                <div>
                  <h3 className="text-xl font-medium">No User Data</h3>
                  <p className="text-muted-foreground mt-1">Scan a card to display user information</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}