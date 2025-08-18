import ToolDashboard from '@/components/tool-dashboard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-8 py-12 md:py-16">
      <section className="text-center py-16 md:py-24 flex flex-col items-center">
        <div className="mb-3">
          {/* Brand placeholder */}
          <span className="text-sm font-bold text-primary">OMNIBOX</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          All your digital tools.
          <br />
          One beautiful place.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
          Convert, edit, and iterate. Fast. Friendly. Magical.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="font-bold text-lg group transition-transform active:scale-95">
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="ghost" className="font-bold text-lg group transition-transform active:scale-95">
                Try Demo 
            </Button>
        </div>
      </section>

      <ToolDashboard />
    </div>
  );
}
