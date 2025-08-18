import { Logo } from '@/components/logo';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Logo className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by your friendly neighborhood AI.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} OmniToolbox. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
