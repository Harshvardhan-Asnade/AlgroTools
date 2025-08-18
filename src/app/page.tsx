
"use client";

import ToolDashboard from '@/components/tool-dashboard';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Code, FileImage, FileText, LucideProps, Search, Layers, Settings2, Sparkles, Wand2 } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { handleSuggestTools } from './actions';
import type { SuggestToolsOutput } from '@/ai/flows/smart-tool-suggestions';
import { AnimatePresence, motion } from 'framer-motion';
import { useDebounce } from 'use-debounce';

const FloatingIcon = ({ 
  Icon, 
  className 
}: { 
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  className?: string;
 }) => {
  return (
    <div className={cn("absolute rounded-full p-3 border-2 border-cyan-400/30 animate-float", className)}>
      <Icon className="w-12 h-12 text-cyan-400" />
    </div>
  );
};


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestToolsOutput>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toolsSection = document.getElementById('tools');
    toolsSection?.scrollIntoView({ behavior: 'smooth' });
  }

  const getSuggestions = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoadingSuggestions(true);
    const result = await handleSuggestTools({ userInput: query });
    setSuggestions(result);
    setLoadingSuggestions(false);
  }, []);

  useEffect(() => {
    getSuggestions(debouncedSearchQuery);
  }, [debouncedSearchQuery, getSuggestions]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="relative text-center py-16 md:py-24 flex flex-col items-center overflow-hidden">
        
        {/* Floating Icons Background */}
        <div className="absolute inset-0 -z-10">
          <div className="relative h-full w-full">
            <FloatingIcon Icon={FileText} className="top-[5%] left-[10%] animation-delay-[-2s] scale-90" />
            <FloatingIcon Icon={FileImage} className="top-[15%] right-[5%] animation-delay-[-4s] scale-110" />
            <FloatingIcon Icon={Code} className="bottom-[20%] left-[15%]" />
            <FloatingIcon Icon={BrainCircuit} className="bottom-[10%] right-[20%] animation-delay-[-6s] scale-95" />
            <FloatingIcon Icon={Layers} className="top-[50%] left-[2%] animation-delay-[-1s] scale-80" />
            <FloatingIcon Icon={Settings2} className="top-[60%] right-[10%] animation-delay-[-5s] scale-100" />
          </div>
        </div>

        <div className="mb-4">
          <span className="text-lg font-bold" style={{color: '#00CFFF'}}>AlgoAI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#B14EFF]">
          All your digital tools.
          <br />
          One beautiful place.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto" style={{color: '#CCCCCC'}}>
          Convert, edit, and create in seconds. Fast. Friendly. Magical.
        </p>
        <div className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-4">
            <form id="hero-form" onSubmit={handleSearchSubmit} className="relative w-full group">
                <Input
                id="hero-search"
                type="search"
                placeholder="Find your tool..."
                className="w-full pl-4 pr-12 text-lg h-14 rounded-full bg-[#1A1A1C] border-white/10 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-primary/80 transition-shadow shadow-inner placeholder:text-[#777777]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                 <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-transparent"
                  variant="ghost"
                >
                  <Search className="h-5 w-5 text-muted-foreground group-hover:text-cyan-400 group-hover:[filter:drop-shadow(0_0_8px_#00E6FF)] transition-all" />
                </Button>
            </form>
            <AnimatePresence>
              {(loadingSuggestions || suggestions.length > 0) && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full max-w-2xl text-left"
                >
                  <div className="glass-card p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-primary" />
                      Smart Suggestions
                    </h3>
                    {loadingSuggestions && (
                      <div className="flex items-center gap-3 p-2">
                        <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    {!loadingSuggestions && suggestions.length > 0 && (
                       <div className="flex flex-col gap-1">
                        {suggestions.map(suggestion => (
                           <Link href={`/tools/${suggestion.slug}`} key={suggestion.slug}>
                            <div className="flex justify-between items-center p-2 rounded-md hover:bg-accent transition-colors cursor-pointer">
                              <div>
                                <p className="font-semibold text-foreground/90">{suggestion.name}</p>
                                <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                           </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Link href="#tools" onClick={handleScroll} passHref>
              <Button size="lg" className="font-bold text-lg group transition-all duration-300 active:scale-95 bg-[#00AFFF] hover:bg-[#00AFFF] hover:shadow-[0_0_20px_#00E6FF]">
                  Explore Tools
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
        </div>
         <p className="mt-8 text-sm text-muted-foreground">
          ✨ Trusted by creators, students & professionals worldwide.
        </p>
      </section>

      <ToolDashboard />
    </div>
  );
}
