import ToolCard from "./tool-card";
import type { Tool } from "@/lib/tool-definitions";

interface ToolCategorySectionProps {
  title: string;
  tools: Tool[];
}

export default function ToolCategorySection({
  title,
  tools,
}: ToolCategorySectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
