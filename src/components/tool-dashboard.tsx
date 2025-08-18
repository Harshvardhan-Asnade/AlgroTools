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
    <div id="tools">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for a tool..."
          className="w-full pl-10 text-lg h-14"
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
