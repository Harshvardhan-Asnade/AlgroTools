
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const toSentenceCase = () => {
    const sentences = text.toLowerCase().split('. ');
    const result = sentences.map(sentence => {
        const trimmed = sentence.trim();
        if (trimmed.length > 0) {
            return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        }
        return '';
    }).join('. ');
    setText(result);
  };
  
  const toTitleCase = () => {
    setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Textarea
          placeholder="Start typing or paste your text here..."
          className="min-h-[300px] text-base pr-12"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 text-muted-foreground"
            onClick={handleCopy}
            >
            {hasCopied ? <Check className="h-5 w-5 text-primary" /> : <Clipboard className="h-5 w-5" />}
        </Button>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        <Button onClick={() => setText(text.toUpperCase())}>UPPER CASE</Button>
        <Button onClick={() => setText(text.toLowerCase())}>lower case</Button>
        <Button onClick={toTitleCase}>Title Case</Button>
        <Button onClick={toSentenceCase}>Sentence case</Button>
      </div>
    </div>
  );
}
