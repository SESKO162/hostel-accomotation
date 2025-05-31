'use client';

import { useHostel } from '@/contexts/HostelContext';
import { Fingerprint, Home, Hotel, User } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { currentUser } = useHostel();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Smart Hostel</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Secure and convenient hostel management with fingerprint authentication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Fingerprint className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fingerprint Access</h3>
            <p className="text-gray-600">
              Secure and convenient room access using your fingerprint
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Hotel className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Room Management</h3>
            <p className="text-gray-600">
              Easily check in and out of your assigned room
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <User className="text-purple-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
            <p className="text-gray-600">
              View your room details and access history
            </p>
          </div>
        </div>

        {!currentUser ? (
          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              <Fingerprint className="mr-2 h-5 w-5" />
              Login with Fingerprint
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              <Home className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
