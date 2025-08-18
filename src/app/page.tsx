
"use client";

import ToolDashboard from '@/components/tool-dashboard';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Code, FileImage, FileText, LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const FloatingIcon = ({ 
  Icon, 
  className 
}: { 
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  className?: string;
 }) => {
  return (
    <div className={cn("absolute rounded-full p-3 glass-card animate-float", className)}>
      <Icon className="w-8 h-8 text-primary/80" />
    </div>
  );
};


export default function Home() {

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-8 py-12 md:py-16">
      <section className="relative text-center py-16 md:py-24 flex flex-col items-center overflow-hidden">
        
        {/* Floating Icons Background */}
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <FloatingIcon Icon={FileText} className="top-[10%] left-[15%] animation-delay-[-2s] scale-90" />
            <FloatingIcon Icon={FileImage} className="top-[20%] right-[10%] animation-delay-[-4s] scale-110" />
            <FloatingIcon Icon={Code} className="bottom-[25%] left-[20%]" />
            <FloatingIcon Icon={BrainCircuit} className="bottom-[15%] right-[25%] animation-delay-[-6s] scale-95" />
          </div>
        </div>

        <div className="mb-3">
          <span className="text-sm font-bold text-primary">AlgroAI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground animate-gradient-text bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
          All your digital tools.
          <br />
          One beautiful place.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
          Convert, edit, and iterate. Fast. Friendly. Magical.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#tools" onClick={handleScroll} passHref>
              <Button size="lg" className="font-bold text-lg group transition-transform active:scale-95">
                  Explore Tools
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="font-bold text-lg group transition-transform active:scale-95">
                Try Demo 
            </Button>
        </div>
      </section>

      <ToolDashboard />
    </div>
  );
}
