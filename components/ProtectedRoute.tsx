'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useHostel } from '@/contexts/HostelContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { currentUser } = useHostel();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (isClient && !currentUser) {
      // Redirect to home if not authenticated
      router.push('/');
    }
  }, [currentUser, isClient, router]);

  if (!isClient || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
