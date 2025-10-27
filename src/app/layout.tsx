import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AiChatWidget from '@/components/ai/ai-chat-widget';
import { ClerkProvider } from '@clerk/nextjs';
import { UserSync } from '@/components/auth/user-sync';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AlgroTools - Your All-in-One Toolkit',
  description: 'A comprehensive suite of tools for PDF, images, text, development, and more. Powered by AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            inter.variable,
            spaceGrotesk.variable
          )}
        >
          <UserSync />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <AiChatWidget />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
