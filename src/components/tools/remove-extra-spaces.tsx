
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard, Check, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RemoveExtraSpacesTool() {
  const [text, setText] = useState("");
  const [hasCopied, setHasCopied] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const { toast } = useToast();

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  const handleProcess = () => {
    let processedText = text.replace(/ +/g, ' ');
    if (trimLines) {
        processedText = processedText.split('\n').map(line => line.trim()).join('\n');
    }
    if(removeEmpty) {
        processedText = processedText.split('\n').filter(line => line.trim() !== '').join('\n');
    }
    setText(processedText);
  };

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 md:gap-8 flex-wrap">
            <div className="flex items-center space-x-2">
                <Checkbox id="trim-lines" checked={trimLines} onCheckedChange={(checked) => setTrimLines(Boolean(checked))} />
                <Label htmlFor="trim-lines" className="cursor-pointer">Trim extra spaces from lines</Label>
            </div>
             <div className="flex items-center space-x-2">
                <Checkbox id="remove-empty" checked={removeEmpty} onCheckedChange={(checked) => setRemoveEmpty(Boolean(checked))} />
                <Label htmlFor="remove-empty" className="cursor-pointer">Remove empty lines</Label>
            </div>
        </div>

      <div className="relative">
        <Textarea
          placeholder="Start typing or paste your text here..."
          className="min-h-[350px] text-base pr-24"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={handleCopy}
                >
                {hasCopied ? <Check className="h-5 w-5 text-primary" /> : <Clipboard className="h-5 w-5" />}
            </Button>
             <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                onClick={handleClear}
                >
                <Trash2 className="h-5 w-5" />
            </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleProcess} size="lg">Process Text</Button>
      </div>
    </div>
  );
}
