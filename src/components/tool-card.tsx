import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Tool } from "@/lib/tool-definitions";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <Card
        className={cn(
          "h-full transition-all duration-300 ease-in-out",
          "bg-white/5 backdrop-blur-sm border border-white/10",
          "hover:border-white/20 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
        )}
      >
        <CardHeader>
          <div className="mb-3">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-lg">{tool.name}</CardTitle>
          <CardDescription className="mt-1 h-10">
            {tool.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
