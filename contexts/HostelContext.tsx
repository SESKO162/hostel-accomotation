'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Room {
  id: string;
  number: string;
  capacity: number;
  occupants: string[];
  fingerprintId?: string;
}

interface HostelContextType {
  rooms: Room[];
  currentUser: string | null;
  authenticateUser: (fingerprintId: string) => boolean;
  registerFingerprint: (roomId: string, fingerprintId: string) => void;
  checkIn: (roomId: string, userId: string) => void;
  checkOut: (roomId: string, userId: string) => void;
  logout: () => void;
}

const HostelContext = createContext<HostelContextType | undefined>(undefined);

export function HostelProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', number: '101', capacity: 2, occupants: [], fingerprintId: 'fingerprint1' },
    { id: '2', number: '102', capacity: 3, occupants: [], fingerprintId: 'fingerprint2' },
    { id: '3', number: '201', capacity: 2, occupants: [], fingerprintId: 'fingerprint3' },
  ]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const authenticateUser = (fingerprintId: string): boolean => {
    // For demo purposes, always authenticate with any input or empty input
    const demoFingerprintId = fingerprintId || `demo-${Math.random().toString(36).substring(2, 9)}`;
    const room = rooms[0]; // Use the first room by default for demo
    
    const userData = { 
      id: demoFingerprintId, 
      roomId: room?.id || 'demo-room', 
      timestamp: new Date().toISOString() 
    };
    
    setCurrentUser(demoFingerprintId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(userData));
    }
    return true;
  };

  const registerFingerprint = (roomId: string, fingerprintId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? { ...room, fingerprintId } : room
      )
    );
  };

  const checkIn = (roomId: string, userId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId && !room.occupants.includes(userId) && room.occupants.length < room.capacity
          ? { ...room, occupants: [...room.occupants, userId] }
          : room
      )
    );
  };

  const checkOut = (roomId: string, userId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId
          ? { ...room, occupants: room.occupants.filter(id => id !== userId) }
          : room
      )
    );
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  };

  return (
    <HostelContext.Provider
      value={{
        rooms,
        currentUser,
        authenticateUser,
        registerFingerprint,
        checkIn,
        checkOut,
        logout,
      }}
    >
      {children}
    </HostelContext.Provider>
  );
}

export const useHostel = () => {
  const context = useContext(HostelContext);
  if (context === undefined) {
    throw new Error('useHostel must be used within a HostelProvider');
  }
  return context;
};
