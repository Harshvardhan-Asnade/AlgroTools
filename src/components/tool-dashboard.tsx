
"use client";

import { useState, useMemo, useEffect } from "react";
import { tools, toolCategoryNames, ToolCategory } from "@/lib/tool-definitions";
import ToolCategorySection from "./tool-category-section";

export default function ToolDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const searchInput = document.querySelector('#hero-search') as HTMLInputElement;
    if (searchInput) {
      const handleSearch = () => {
        setSearchQuery(searchInput.value);
      };
      // This is a bit of a hack to listen to changes from the hero input
      // A better solution would be to use a shared state management (e.g. Zustand, Redux, or Context)
      const observer = new MutationObserver(handleSearch);
      const heroForm = document.querySelector('#hero-form');
      if (heroForm) {
        const inputHandler = (e: Event) => setSearchQuery((e.target as HTMLInputElement).value)
        searchInput.addEventListener('input', inputHandler);

        return () => {
          searchInput.removeEventListener('input', inputHandler);
        }
      }
    }
  }, []);

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
