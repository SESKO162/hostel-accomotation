'use client';

import { useRouter } from 'next/navigation';
import { useHostel } from '@/contexts/HostelContext';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';

export default function LoginPage() {
  const { authenticateUser } = useHostel();
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Sign in using your fingerprint
          </p>
        </div>
        <div className="mt-8">
          <Button
            onClick={handleFingerprintLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Fingerprint className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
            </span>
            Sign in with Fingerprint
          </Button>
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Demo Mode: Any input will work</p>
        </div>
      </div>
    </div>
  );
}
