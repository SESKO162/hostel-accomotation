'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHostel } from '@/contexts/HostelContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Bed, User, UserPlus, Key } from 'lucide-react';

export default function RoomManagement() {
  const router = useRouter();
  const { rooms, checkIn, checkOut, registerFingerprint } = useHostel();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ number: '', capacity: 2, fingerprintId: '' });
  const [editingRoom, setEditingRoom] = useState<string | null>(null);

  const filteredRooms = rooms.filter(room => 
    room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.occupants.some(occupant => occupant.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddRoom = () => {
    // In a real app, you would add the room to your database here
    console.log('Adding new room:', newRoom);
    setNewRoom({ number: '', capacity: 2, fingerprintId: '' });
    setIsAddingRoom(false);
  };

  const handleEditRoom = (roomId: string) => {
    setEditingRoom(roomId);
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setNewRoom({
        number: room.number,
        capacity: room.capacity,
        fingerprintId: room.fingerprintId || ''
      });
    }
  };

  const handleSaveEdit = () => {
    // In a real app, you would save the changes to your database here
    console.log('Saving changes for room:', editingRoom, newRoom);
    if (editingRoom) {
      registerFingerprint(editingRoom, newRoom.fingerprintId);
    }
    setEditingRoom(null);
    setNewRoom({ number: '', capacity: 2, fingerprintId: '' });
  };

  const handleCheckIn = (roomId: string) => {
    // In a real app, you would handle the check-in process
    router.push(`/host/check-in?roomId=${roomId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Room Management</h1>
          <p className="text-muted-foreground">Manage all rooms and their occupancy status</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search rooms or guests..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddingRoom(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Room
          </Button>
        </div>
      </div>

      {/* Add/Edit Room Form */}
      {(isAddingRoom || editingRoom) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium leading-none mb-1 block">Room Number</label>
                <Input 
                  placeholder="e.g., 101" 
                  value={newRoom.number}
                  onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
                  disabled={!!editingRoom}
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none mb-1 block">Capacity</label>
                <Input 
                  type="number" 
                  min="1" 
                  max="10"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="text-sm font-medium leading-none mb-1 block">Fingerprint ID</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Fingerprint ID"
                    value={newRoom.fingerprintId}
                    onChange={(e) => setNewRoom({...newRoom, fingerprintId: e.target.value})}
                  />
                  <Button variant="outline" size="icon" title="Register Fingerprint">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingRoom(false);
                  setEditingRoom(null);
                  setNewRoom({ number: '', capacity: 2, fingerprintId: '' });
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={editingRoom ? handleSaveEdit : handleAddRoom}
                disabled={!newRoom.number || !newRoom.capacity}
              >
                {editingRoom ? 'Save Changes' : 'Add Room'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Occupants</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Fingerprint</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
                        {room.number}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={room.occupants.length > 0 ? 'destructive' : 'default'}>
                        {room.occupants.length > 0 ? 'Occupied' : 'Available'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-muted-foreground" />
                        {room.occupants.length} guest{room.occupants.length !== 1 ? 's' : ''}
                      </div>
                    </TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Key className="h-4 w-4 mr-1 text-muted-foreground" />
                        {room.fingerprintId || 'Not set'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditRoom(room.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCheckIn(room.id)}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No rooms found. {searchTerm ? 'Try a different search term.' : 'Add your first room to get started.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
