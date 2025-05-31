'use client';

import { useRouter } from 'next/navigation';
import { useHostel } from '@/contexts/HostelContext';
import { Home, User, Users, LogIn, LogOut, Key } from 'lucide-react';
import { useEffect } from 'react';

export default function RoomsPage() {
  const router = useRouter();
  const { currentUser, rooms, checkIn, checkOut } = useHostel();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      router.push('/auth/login');
    }
  }, [currentUser, router]);

  const userRoom = rooms.find(room => 
    room.occupants.includes(currentUser || '')
  );

  const handleRoomAction = (roomId: string) => {
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    if (userRoom?.id === roomId) {
      // Already in this room, check out
      if (confirm('Are you sure you want to check out of this room?')) {
        checkOut(roomId, currentUser);
      }
    } else if (room.occupants.length >= room.capacity) {
      alert('This room is at full capacity');
    } else {
      // Check into new room
      if (userRoom) {
        if (confirm('You are already checked into another room. Would you like to check out and check into this room?')) {
          checkOut(userRoom.id, currentUser);
          checkIn(roomId, currentUser);
          router.push('/dashboard');
        }
      } else {
        checkIn(roomId, currentUser);
        router.push('/dashboard');
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Available Rooms</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {userRoom && (
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Home className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  You are currently checked into <span className="font-medium">Room {userRoom.number}</span>.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {rooms.map((room) => {
              const isCheckedIn = userRoom?.id === room.id;
              const isFull = room.occupants.length >= room.capacity;
              
              return (
                <li key={room.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-lg font-medium text-blue-600">
                          Room {room.number}
                        </div>
                        {isCheckedIn && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Your Room
                          </span>
                        )}
                        {isFull && !isCheckedIn && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Full
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        <Users className="inline-block h-4 w-4 mr-1" />
                        {room.occupants.length} / {room.capacity}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="mr-6 flex items-center text-sm text-gray-500">
                          <Key className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {room.fingerprintId || 'No fingerprint registered'}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <button
                          onClick={() => handleRoomAction(room.id)}
                          disabled={isFull && !isCheckedIn}
                          className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white ${
                            isCheckedIn
                              ? 'bg-red-600 hover:bg-red-700'
                              : 'bg-blue-600 hover:bg-blue-700'
                          } ${
                            isFull && !isCheckedIn ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {isCheckedIn ? (
                            <>
                              <LogOut className="h-3 w-3 mr-1" />
                              Check Out
                            </>
                          ) : (
                            <>
                              <LogIn className="h-3 w-3 mr-1" />
                              Check In
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
