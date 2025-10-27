"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  SignedIn, 
  SignedOut 
} from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold sm:inline-block">
              AlgroTools
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/#tools"
              className="transition-colors text-foreground/60 hover:text-foreground/80"
            >
              Tools
            </Link>
            <SignedIn>
              <Link
                href="/dashboard/history"
                className="transition-colors text-foreground/60 hover:text-foreground/80"
              >
                History
              </Link>
            </SignedIn>
            <Link
              href="#"
              className="transition-colors text-foreground/60 hover:text-foreground/80"
            >
              Workflows
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost">Log In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
