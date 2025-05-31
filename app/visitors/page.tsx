'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VisitorForm } from '@/components/visitors/visitor-form';
import { Users, Clock, Calendar } from 'lucide-react';

export default function VisitorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-8 w-8 text-purple-600" />
        <h1 className="text-3xl font-bold">Visitor Management</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Log a New Visitor</CardTitle>
              <CardDescription>
                Register all visitors entering the hostel premises.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VisitorForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Visitors</CardTitle>
              <CardDescription>Visitors checked in today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">John Doe</h3>
                      <p className="text-sm text-gray-500">Meeting with Room 101</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 14:30
                      </p>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                        Checked In
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Jane Smith</h3>
                      <p className="text-sm text-gray-500">Delivery for Room 205</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 10:15
                      </p>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                        Checked Out
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Visitor Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>All visitors must present valid ID upon check-in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Visiting hours are from 8:00 AM to 10:00 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Maximum 2 visitors per resident at a time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Visitors must be signed out by their host</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
