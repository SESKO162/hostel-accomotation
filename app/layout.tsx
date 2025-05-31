'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { CommandMenu } from '@/components/command-menu';
import { HostelProvider, useHostel } from '@/contexts/HostelContext';
import { Header } from '@/components/hostel/Header';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Load Inter font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

// List of public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/register'];

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { currentUser } = useHostel();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the current route is protected
    const isProtectedRoute = !publicRoutes.includes(pathname || '');
    
    if (isProtectedRoute && !currentUser) {
      // Redirect to login if not authenticated and trying to access protected route
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [currentUser, pathname, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HostelProvider>
            <AuthWrapper>
              <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
              </div>
              <Toaster />
              <CommandMenu />
            </AuthWrapper>
          </HostelProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}