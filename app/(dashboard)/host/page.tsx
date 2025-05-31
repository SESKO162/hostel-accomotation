'use client';

import { useRouter } from 'next/navigation';
import { useHostel } from '@/contexts/HostelContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Bed, UserCheck, ClipboardList, BarChart3, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HostDashboard() {
  const router = useRouter();
  const { currentUser, rooms } = useHostel();

  // Calculate dashboard metrics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(room => room.occupants.length > 0).length;
  const availableRooms = totalRooms - occupiedRooms;
  const totalGuests = rooms.reduce((acc, room) => acc + room.occupants.length, 0);
  const checkInsToday = 5; // This would come from your API in a real app
  const pendingRequests = 3; // This would come from your API in a real app

  const quickActions = [
    { 
      title: 'Check-In Guest', 
      icon: <UserCheck className="h-5 w-5" />,
      onClick: () => router.push('/host/check-in')
    },
    { 
      title: 'Manage Rooms', 
      icon: <Bed className="h-5 w-5" />,
      onClick: () => router.push('/host/rooms')
    },
    { 
      title: 'View Reports', 
      icon: <BarChart3 className="h-5 w-5" />,
      onClick: () => router.push('/host/reports')
    },
    { 
      title: 'Guest Logs', 
      icon: <ClipboardList className="h-5 w-5" />,
      onClick: () => router.push('/host/guest-logs')
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Host Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date().toLocaleDateString()}
          </Button>
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            {new Date().toLocaleTimeString()}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
            <p className="text-xs text-muted-foreground">
              {availableRooms} available, {occupiedRooms} occupied
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-xs text-muted-foreground">
              {checkInsToday} new check-ins today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              {pendingRequests > 0 ? 'Action required' : 'All caught up!'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {occupiedRooms} of {totalRooms} rooms occupied
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center justify-center h-32 p-4 text-center"
              onClick={action.onClick}
            >
              <div className="mb-2">{action.icon}</div>
              <span>{action.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { id: 1, action: 'New booking request', time: '2 minutes ago', user: 'John Doe', room: '101' },
                { id: 2, action: 'Check-out', time: '1 hour ago', user: 'Jane Smith', room: '205' },
                { id: 3, action: 'Maintenance request', time: '3 hours ago', user: 'Room 107', room: '107' },
                { id: 4, action: 'New review received', time: '5 hours ago', user: 'Alex Johnson', room: '302' },
                { id: 5, action: 'Payment received', time: '1 day ago', user: 'Michael Brown', room: '108' },
              ].map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-gray-100">
                      <Clock className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">Room {activity.room} • {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
