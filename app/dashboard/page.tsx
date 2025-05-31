'use client';

import { useHostel } from '@/contexts/HostelContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Bed, Users, LogOut, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { currentUser, logout } = useHostel();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Welcome Back
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser || 'Guest'}</div>
            <p className="text-xs text-muted-foreground">
              You're signed in with fingerprint authentication
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Your Room
            </CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Room 101</div>
            <p className="text-xs text-muted-foreground">
              Capacity: 2 occupants
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Roommates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1/2</div>
            <p className="text-xs text-muted-foreground">
              Current room occupancy
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Authentication
            </CardTitle>
            <Fingerprint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Active
            </div>
            <p className="text-xs text-muted-foreground">
              Fingerprint authentication enabled
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent room access and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, action: 'Room accessed', time: 'Just now', icon: '🔑' },
                { id: 2, action: 'Lights turned on', time: '5 min ago', icon: '💡' },
                { id: 3, action: 'Temperature adjusted', time: '1 hour ago', icon: '🌡️' },
                { id: 4, action: 'Guest access granted', time: '2 hours ago', icon: '👥' },
              ].map((activity) => (
                <div key={activity.id} className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted mr-3">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Button variant="outline" className="w-full justify-start">
                🔑 Request room key
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🛏️ Request room service
              </Button>
              <Button variant="outline" className="w-full justify-start">
                🧹 Report maintenance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                👥 Invite guest
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
