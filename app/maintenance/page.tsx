'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MaintenanceRequestForm } from '@/components/maintenance/maintenance-request-form';
import { Wrench } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Wrench className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">Maintenance Requests</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Maintenance Request</CardTitle>
              <CardDescription>
                Report any issues with your room or common areas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MaintenanceRequestForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Requests</CardTitle>
              <CardDescription>Your recent maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Leaking Faucet</h3>
                      <p className="text-sm text-gray-500">Submitted: Today</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Broken Light</h3>
                      <p className="text-sm text-gray-500">Submitted: 2 days ago</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance Office:</span>
                  <span className="font-medium">+1 (555) 123-4567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24/7 Emergency:</span>
                  <span className="font-medium">+1 (555) 987-6543</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
