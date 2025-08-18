import { tools } from "@/lib/tool-definitions";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = tool.component;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {tool.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {tool.description}
        </p>
      </div>

      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 w-full">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <ToolComponent />
        </CardContent>
      </Card>
    </div>
  );
}
