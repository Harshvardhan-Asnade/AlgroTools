
"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRightLeft, Clipboard, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [activeTab, setActiveTab] = useState("encode");
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const handleEncode = () => {
    try {
      if (typeof window !== "undefined") {
        setBase64(window.btoa(text));
      }
    } catch (e) {
      toast({ title: "Encoding Error", description: "Could not encode text.", variant: "destructive" });
    }
  };

  const handleDecode = () => {
    try {
      if (typeof window !== "undefined") {
        setText(window.atob(base64));
      }
    } catch (e) {
      toast({ title: "Decoding Error", description: "Invalid Base64 string.", variant: "destructive" });
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
    toast({ title: "Copied to clipboard!" });
  };
  
  return (
    <div className="flex flex-col gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="encode">Encode</TabsTrigger>
                <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
            <TabsContent value="encode">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="text-input-encode">Text</Label>
                        <Textarea id="text-input-encode" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here" className="min-h-[200px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                         <div className="flex justify-between items-center">
                            <Label htmlFor="base64-output-encode">Base64</Label>
                             <Button variant="ghost" size="icon" onClick={() => handleCopy(base64)}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea id="base64-output-encode" value={base64} readOnly placeholder="Base64 output" className="min-h-[200px] bg-muted/30" />
                    </div>
                </div>
                 <div className="mt-4 flex justify-center">
                    <Button onClick={handleEncode}>Encode</Button>
                </div>
            </TabsContent>
             <TabsContent value="decode">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="base64-input-decode">Base64</Label>
                        <Textarea id="base64-input-decode" value={base64} onChange={(e) => setBase64(e.target.value)} placeholder="Type or paste Base64 here" className="min-h-[200px]" />
                    </div>
                     <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                           <Label htmlFor="text-output-decode">Text</Label>
                           <Button variant="ghost" size="icon" onClick={() => handleCopy(text)}>
                                {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                            </Button>
                        </div>
                        <Textarea id="text-output-decode" value={text} readOnly placeholder="Decoded text output" className="min-h-[200px] bg-muted/30" />
                    </div>
                </div>
                 <div className="mt-4 flex justify-center">
                    <Button onClick={handleDecode}>Decode</Button>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
