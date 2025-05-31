import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  showRegisterLink?: boolean;
  showLoginLink?: boolean;
}

export default function AuthLayout({
  children,
  showRegisterLink = true,
  showLoginLink = false,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-indigo-500" />
            <span className="font-cal-sans text-xl font-bold">SecureAccess</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              {showLoginLink && (
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Login
                </Link>
              )}
              {showRegisterLink && (
                <Link
                  href="/register"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Register
                </Link>
              )}
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container relative">
        <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center py-10">
          {children}
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with <Shield className="inline-block h-4 w-4" /> by SecureAccess. All rights reserved. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}