"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  words: number;
  characters: number;
  lines: number;
}

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats: Stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    return { words, characters, lines };
  }, [text]);

  return (
    <div className="flex flex-col gap-6">
      <Textarea
        placeholder="Start typing or paste your text here..."
        className="min-h-[250px] text-base"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Words" value={stats.words} />
        <StatCard title="Characters" value={stats.characters} />
        <StatCard title="Lines" value={stats.lines} />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="text-center bg-background/50">
      <CardHeader>
        <CardTitle className="text-lg text-muted-foreground font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}
