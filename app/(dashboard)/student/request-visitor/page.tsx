import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { VisitorRequestForm } from "@/components/student/visitor-request-form"

export default function RequestVisitorPage() {
  return (
    <DashboardLayout userRole="student">
      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-cal-sans font-bold text-primary">Request Visitor Access</h1>
          <p className="text-muted-foreground">Request temporary access for a visitor to campus facilities.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Request Form</CardTitle>
            <CardDescription>
              Complete this form to request visitor access. Requests must be submitted at least 24 hours in advance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VisitorRequestForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Guidelines</CardTitle>
            <CardDescription>
              Important information for bringing visitors to campus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Approval Process</h3>
              <p className="text-muted-foreground">
                All visitor requests are reviewed by security personnel and are subject to approval. You will receive an email notification once your request has been processed.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold text-lg">Check-in Procedure</h3>
              <p className="text-muted-foreground">
                Visitors must check in at the main security desk upon arrival. They will need to present a valid ID and will be issued a temporary visitor badge.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold text-lg">Visitor Responsibilities</h3>
              <p className="text-muted-foreground">
                You are responsible for your visitor during their entire stay. Visitors must be escorted at all times and should adhere to all campus rules and regulations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}