'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useHostel } from '@/contexts/HostelContext';
import { User, LogOut, Fingerprint, Home, Bed, LayoutDashboard, Wrench, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Rooms', href: '/rooms', icon: Bed },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, protected: true },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench, protected: true },
  { name: 'Visitors', href: '/visitors', icon: Users, protected: true },
];

export function Header() {
  const { currentUser, authenticateUser, logout } = useHostel();
  const router = useRouter();

  const handleFingerprintLogin = async () => {
    try {
      // For demo purposes, we'll use a prompt but any input will work
      const fingerprintId = prompt('Enter your fingerprint ID (any input works for demo)') || 'demo-user';
      
      // Always authenticate for demo purposes
      const success = authenticateUser(fingerprintId);
      if (success) {
        router.push('/dashboard');
      } else {
        // This shouldn't happen with our updated authenticateUser function
        console.error('Unexpected authentication failure');
        router.push('/dashboard'); // Still redirect for demo purposes
      }
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
      // For demo purposes, redirect even if there's an error
      router.push('/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex
          ">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Fingerprint className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Hostel Access</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                if (item.protected && !currentUser) return null;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-10 w-10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleFingerprintLogin}
                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Fingerprint className="mr-2 h-4 w-4" />
                Fingerprint Login
              </Button>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => {
            if (item.protected && !currentUser) return null;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                  {item.name}
                </div>
              </Link>
            );
          })}
          {!currentUser && (
            <button
              onClick={handleFingerprintLogin}
              className="w-full text-left border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              <div className="flex items-center">
                <Fingerprint className="mr-3 h-5 w-5 text-gray-500" />
                Fingerprint Login
              </div>
            </button>
          )}
        </div>
        {currentUser && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-400" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {currentUser}
                </div>
                <div className="text-sm font-medium text-gray-500">Room Member</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                  Sign out
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
