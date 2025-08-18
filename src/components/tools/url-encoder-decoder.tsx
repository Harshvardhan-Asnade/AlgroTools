
"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRightLeft, Clipboard, Check, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("https://example.com/?q=a sample query with spaces & special=chars@!");
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const encoded = useMemo(() => {
    try {
      return encodeURIComponent(input);
    } catch (e) {
      return "Invalid input for encoding.";
    }
  }, [input]);
  
  const decoded = useMemo(() => {
    try {
      return decodeURIComponent(input);
    } catch (e) {
        return "Invalid input for decoding.";
    }
  }, [input]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
    toast({ title: "Copied to clipboard!" });
  };
  
  return (
    <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Input/Output</h3>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleCopy(input)}>
                    {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setInput("")}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
        <Textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type or paste URL/text here" 
            className="min-h-[200px] font-mono" 
        />
        <div className="flex justify-center gap-4">
            <Button onClick={() => setInput(encoded)}>
                Encode
            </Button>
            <Button onClick={() => setInput(decoded)}>
                Decode
            </Button>
        </div>
    </div>
  );
}
