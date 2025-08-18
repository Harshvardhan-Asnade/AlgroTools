import ToolDashboard from '@/components/tool-dashboard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-400 to-accent-foreground text-transparent bg-clip-text">
          OmniToolbox
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your ultimate destination for a complete suite of tools. From PDF and
          image manipulation to developer utilities and AI-powered assistants,
          we have everything you need in one place.
        </p>
      </section>

      <ToolDashboard />
    </div>
  );
}
