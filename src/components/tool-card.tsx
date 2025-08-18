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
          "bg-slate-900/40 backdrop-blur-md border-cyan-400/20",
          "hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10",
          "transform-gpu [transform-style:preserve-3d] hover:[transform:rotateX(5deg)_rotateY(-5deg)]"
        )}
      >
        <CardHeader>
          <div className="mb-3">
            <Icon className="w-8 h-8 text-cyan-400 group-hover:text-violet-400 transition-colors" />
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
