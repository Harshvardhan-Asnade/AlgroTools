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
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
      <Card
        className={cn(
          "h-full transition-all duration-300 ease-in-out",
          "bg-black/20 backdrop-blur-md border-white/10 shadow-lg",
          "hover:border-primary/50 hover:shadow-primary/20 hover:-translate-y-1"
        )}
      >
        <CardHeader>
          <div className="mb-3">
            <Icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
          </div>
          <CardTitle className="text-lg font-mono font-bold text-slate-50">{tool.name}</CardTitle>
          <CardDescription className="mt-1 h-10 text-slate-400">
            {tool.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
