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
          "h-full transition-all duration-200 ease-out glass-card",
          "hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50"
        )}
      >
        <CardHeader>
          <div className="mb-3">
            <Icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors duration-200" />
          </div>
          <CardTitle className="text-lg font-bold text-foreground/90">{tool.name}</CardTitle>
          <CardDescription className="mt-1 h-10 text-foreground/70">
            {tool.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
