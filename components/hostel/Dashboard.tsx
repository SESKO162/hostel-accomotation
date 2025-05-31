'use client';

import { useHostel } from '@/contexts/HostelContext';

export function Dashboard() {
  const { currentUser, rooms } = useHostel();
  
  const userRoom = rooms.find(room => 
    room.occupants.includes(currentUser || '')
  );

  if (!currentUser) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login with your fingerprint</h2>
        <p>You need to be logged in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Dashboard</h2>
      
      {userRoom ? (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
          <h3 className="text-xl font-semibold mb-4">Your Room: {userRoom.number}</h3>
          <div className="space-y-2">
            <p>Fingerprint ID: <span className="font-mono">{userRoom.fingerprintId}</span></p>
            <p>Capacity: {userRoom.occupants.length}/{userRoom.capacity}</p>
            <p>Room Status: {userRoom.occupants.length >= userRoom.capacity ? 'Full' : 'Available'}</p>
            <p>Your Status: <span className="text-green-600 font-semibold">Checked In</span></p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">You are not currently checked into any room.</p>
          <a 
            href="/rooms" 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            View Available Rooms
          </a>
        </div>
      )}
    </div>
  );
}
