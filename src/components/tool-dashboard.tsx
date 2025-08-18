"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { tools, toolCategoryNames, ToolCategory } from "@/lib/tool-definitions";
import ToolCategorySection from "./tool-category-section";
import { Search } from "lucide-react";

export default function ToolDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery) return tools;
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedTools = useMemo(() => {
    return filteredTools.reduce((acc, tool) => {
      (acc[tool.category] = acc[tool.category] || []).push(tool);
      return acc;
    }, {} as Record<ToolCategory, typeof tools>);
  }, [filteredTools]);

  return (
    <div id="tools" className="mt-9">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Find a tool — e.g., 'PDF to Word', 'JSON formatter'"
          className="w-full pl-12 text-lg h-14 rounded-full bg-white/5 backdrop-blur-sm border-white/10 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-primary/80 transition-shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-12">
        {Object.entries(groupedTools).length > 0 ? (
          Object.entries(groupedTools).map(([category, tools]) => (
            <ToolCategorySection
              key={category}
              title={toolCategoryNames[category as ToolCategory]}
              tools={tools}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Tools Found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
