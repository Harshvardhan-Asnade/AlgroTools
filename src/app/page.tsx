import ToolDashboard from '@/components/tool-dashboard';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-br from-slate-50 via-slate-300 to-primary text-transparent bg-clip-text font-mono animate-gradient-xy">
          Power Generative AI With Your Data
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          Convert, edit, and iterate. Fast. Friendly. Magical.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="font-bold text-lg group bg-primary/90 text-primary-foreground hover:bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                Book a Demo 
            </Button>
            <Button size="lg" variant="outline" className="font-bold text-lg group bg-transparent border-accent text-accent hover:bg-accent/10 hover:text-white hover:border-accent transition-all duration-300">
                Build AI 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-12">
          <div className="animate-bounce">
            <ArrowDown className="h-8 w-8 text-slate-500" />
          </div>
        </div>
      </section>

      <ToolDashboard />
    </div>
  );
}