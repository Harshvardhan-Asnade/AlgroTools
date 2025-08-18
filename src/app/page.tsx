import ToolDashboard from '@/components/tool-dashboard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-slate-50 via-slate-300 to-slate-50 text-transparent bg-clip-text font-mono">
          AlgroTools
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
          Convert, edit, and iterate. Fast. Friendly. Magical.
        </p>
      </section>

      <ToolDashboard />
    </div>
  );
}
