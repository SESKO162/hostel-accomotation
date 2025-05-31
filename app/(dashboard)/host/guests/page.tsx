'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHostel } from '@/contexts/HostelContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, User, UserPlus, UserCheck, UserX, Mail, Phone, Calendar, Clock, Bed, Key } from 'lucide-react';

// Mock data for guest history and upcoming reservations
const mockGuestHistory = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    room: '101',
    checkIn: '2023-05-15',
    checkOut: '2023-05-20',
    status: 'checked-out',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 234-5678',
    room: '205',
    checkIn: '2023-05-10',
    checkOut: '2023-05-15',
    status: 'checked-out',
  },
];

const mockUpcomingReservations = [
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 345-6789',
    room: '302',
    checkIn: '2023-06-01',
    checkOut: '2023-06-07',
    status: 'upcoming',
  },
];

export default function GuestManagement() {
  const router = useRouter();
  const { rooms, currentUser } = useHostel();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  
  // Get current guests from rooms
  const currentGuests = rooms.flatMap(room => 
    room.occupants.map(occupant => ({
      id: `${room.id}-${occupant}`,
      name: occupant,
      email: `${occupant.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      room: room.number,
      checkIn: '2023-05-25',
      checkOut: '2023-06-05',
      status: 'checked-in',
      roomId: room.id,
    }))
  );

  const allGuests = [...currentGuests, ...mockGuestHistory, ...mockUpcomingReservations];
  
  const filteredGuests = allGuests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.phone.includes(searchTerm) ||
    guest.room.includes(searchTerm)
  );

  const handleCheckIn = (guestId: string) => {
    // In a real app, you would handle the check-in process
    console.log('Checking in guest:', guestId);
  };

  const handleCheckOut = (guestId: string) => {
    // In a real app, you would handle the check-out process
    console.log('Checking out guest:', guestId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>;
      case 'checked-out':
        return <Badge variant="outline">Checked Out</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Guest Management</h1>
          <p className="text-muted-foreground">Manage guest check-ins, check-outs, and information</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search guests..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => router.push('/host/check-in')}>
            <UserPlus className="mr-2 h-4 w-4" /> New Check-in
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="current" className="flex items-center gap-1">
            <UserCheck className="h-4 w-4" /> Current Guests ({currentGuests.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Upcoming ({mockUpcomingReservations.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <UserX className="h-4 w-4" /> History ({mockGuestHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Guests</CardTitle>
              <CardDescription>Guests currently checked into the hostel</CardDescription>
            </CardHeader>
            <CardContent>
              {currentGuests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentGuests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">{guest.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">{guest.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <Bed className="h-3 w-3 mr-1" /> {guest.room}
                          </Badge>
                        </TableCell>
                        <TableCell>{guest.checkIn}</TableCell>
                        <TableCell>{guest.checkOut}</TableCell>
                        <TableCell>{getStatusBadge(guest.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => handleCheckOut(guest.id)}
                            >
                              <UserX className="h-4 w-4 mr-1" /> Check Out
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserX className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No current guests found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
              <CardDescription>Guests with upcoming check-ins</CardDescription>
            </CardHeader>
            <CardContent>
              {mockUpcomingReservations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUpcomingReservations.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">{guest.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">{guest.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <Bed className="h-3 w-3 mr-1" /> {guest.room}
                          </Badge>
                        </TableCell>
                        <TableCell>{guest.checkIn}</TableCell>
                        <TableCell>{guest.checkOut}</TableCell>
                        <TableCell>{getStatusBadge(guest.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 px-2"
                              onClick={() => handleCheckIn(guest.id)}
                            >
                              <UserCheck className="h-4 w-4 mr-1" /> Check In
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No upcoming reservations found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest History</CardTitle>
              <CardDescription>Previous guests and their stay information</CardDescription>
            </CardHeader>
            <CardContent>
              {mockGuestHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Guest</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockGuestHistory.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">{guest.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs">{guest.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <Bed className="h-3 w-3 mr-1" /> {guest.room}
                          </Badge>
                        </TableCell>
                        <TableCell>{guest.checkIn}</TableCell>
                        <TableCell>{guest.checkOut}</TableCell>
                        <TableCell>{getStatusBadge(guest.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserX className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No guest history found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
