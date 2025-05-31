import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { ScannerInterface } from "@/components/security/scanner-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { QrCode, CreditCard, Smartphone } from "lucide-react"

export default function ScanPage() {
  return (
    <DashboardLayout userRole="security">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-cal-sans font-bold text-primary">Access Scanner</h1>
          <p className="text-muted-foreground">Scan ID cards or access tokens to verify and grant access.</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Scanner Interface</CardTitle>
                <CardDescription>
                  Scan access credentials and view authorization status
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Card
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <QrCode className="mr-2 h-4 w-4" />
                  QR Code
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="main-entrance">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="main-entrance">Main Entrance</TabsTrigger>
                  <TabsTrigger value="library">Library</TabsTrigger>
                  <TabsTrigger value="restricted">Restricted Areas</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="main-entrance">
                <ScannerInterface />
              </TabsContent>
              
              <TabsContent value="library">
                <ScannerInterface />
              </TabsContent>
              
              <TabsContent value="restricted">
                <ScannerInterface />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scanner Instructions</CardTitle>
            <CardDescription>
              Guidelines for using the access control scanner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Standard Scanning Procedure</h3>
              <p className="text-sm text-muted-foreground">
                1. Select the appropriate location from the tabs above.<br />
                2. Have the individual present their access card to the scanner.<br />
                3. Verify the information displayed matches the individual.<br />
                4. For any issues, use the "Report Issue" button.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Handling Access Denial</h3>
              <p className="text-sm text-muted-foreground">
                If an individual is denied access but believes they should have access:<br />
                • First, verify they have the correct access card<br />
                • Check if their access has expired<br />
                • Direct them to the Security Office for assistance<br />
                • For emergencies, contact the Security Supervisor
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Scanner Troubleshooting</h3>
              <p className="text-sm text-muted-foreground">
                If the scanner isn't working properly:<br />
                • Refresh the page<br />
                • Check network connectivity<br />
                • Try restarting the scanner hardware<br />
                • Call IT support at ext. 1234 if issues persist
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}