
"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clipboard, Check, RotateCw, Trash2 } from "lucide-react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (input.trim() === "") {
      setFormatted("");
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setFormatted("");
    }
  }, [input]);

  const handleCopy = () => {
    if (!formatted || error) {
        toast({
            title: "Nothing to Copy",
            description: "There is no valid formatted JSON to copy.",
            variant: "destructive"
        });
        return;
    };
    navigator.clipboard.writeText(formatted);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
    toast({
        title: "Copied to Clipboard",
        description: "Formatted JSON has been copied."
    });
  };

  const handleClear = () => {
    setInput("");
    setFormatted("");
    setError(null);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Input JSON</h3>
                <Button variant="ghost" size="icon" onClick={handleClear} className="text-muted-foreground">
                    <Trash2 className="h-5 w-5" />
                </Button>
            </div>
            <Textarea
            placeholder="Paste your JSON here..."
            className={`min-h-[500px] text-base font-mono ${error ? 'border-destructive' : ''}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </div>
         <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Formatted JSON</h3>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="text-muted-foreground">
                     {hasCopied ? <Check className="h-5 w-5 text-primary" /> : <Clipboard className="h-5 w-5" />}
                </Button>
            </div>
            <Textarea
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="min-h-[500px] text-base bg-muted/30 font-mono"
            value={formatted}
            />
        </div>
    </div>
  );
}
