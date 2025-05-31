'use client';

import { useHostel } from '@/contexts/HostelContext';
import { useRouter } from 'next/navigation';

export function RoomsList() {
  const { rooms, currentUser, checkIn, checkOut } = useHostel();
  const router = useRouter();

  const handleRoomAction = (roomId: string) => {
    if (!currentUser) {
      alert('Please login with your fingerprint first');
      return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    if (room.occupants.includes(currentUser)) {
      checkOut(roomId, currentUser);
      alert('Checked out successfully');
    } else {
      if (room.occupants.length >= room.capacity) {
        alert('Room is at full capacity');
        return;
      }
      checkIn(roomId, currentUser);
      alert('Checked in successfully');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="border rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold">Room {room.number}</h3>
            <p className="text-gray-600">
              Capacity: {room.occupants.length}/{room.capacity}
            </p>
            <p className="text-gray-600">
              Status: {room.occupants.length >= room.capacity ? 'Full' : 'Available'}
            </p>
            <button
              onClick={() => handleRoomAction(room.id)}
              disabled={room.occupants.length >= room.capacity && !room.occupants.includes(currentUser || '')}
              className={`mt-4 w-full py-2 px-4 rounded-md ${
                room.occupants.includes(currentUser || '')
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white disabled:bg-gray-300`}
            >
              {room.occupants.includes(currentUser || '') ? 'Check Out' : 'Check In'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
