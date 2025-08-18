import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold sm:inline-block">
              OmniToolbox
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/#tools"
              className="transition-colors text-foreground/60 hover:text-foreground/80"
            >
              Tools
            </Link>
            <Link
              href="#"
              className="transition-colors text-foreground/60 hover:text-foreground/80"
            >
              Workflows
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
