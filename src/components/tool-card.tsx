import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Tool } from "@/lib/tool-definitions";
import { cn } from "@/lib/utils";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  const cardRef = React.useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width/2);
    const y = (e.clientY - top - height / 2) / (height/2);
    
    card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.05, 1.05, 1.05)`;
    card.style.transition = "none";
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    
    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
  };


  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full [perspective:1000px]">
      <Card
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "h-full transition-all duration-500 ease-out glass-card will-change-transform",
          "hover:shadow-primary/20 hover:border-primary/50"
        )}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
              <Icon className="w-8 h-8 text-primary/80 transition-all duration-300 group-hover:text-primary group-hover:[filter:drop-shadow(0_0_8px_hsl(var(--primary)))]" />
            </div>
            {tool.tag && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {tool.tag}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg font-bold text-foreground/90 transition-all duration-300 group-hover:text-primary">
            {tool.name}
          </CardTitle>
          <CardDescription className="mt-1 h-10 text-foreground/70 transition-colors duration-300 group-hover:text-foreground/90">
            {tool.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
