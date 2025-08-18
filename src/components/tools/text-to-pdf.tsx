
"use client";

import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useDebounce } from "use-debounce";

export default function TextToPdfTool() {
  const [text, setText] = useState("Start typing or paste your text here... Your text will be converted into a PDF document.");
  const [fontSize, setFontSize] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [debouncedText] = useDebounce(text, 300);
  const [debouncedFontSize] = useDebounce(fontSize, 300);

  const generatePdf = useCallback(() => {
    if (!debouncedText) {
      setPdfUri(null);
      return;
    };

    setIsLoading(true);
    try {
      // Use a worker or a timeout to prevent blocking the main thread for too long
      setTimeout(() => {
        const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
        const docWidth = doc.internal.pageSize.getWidth();
        const margin = 40;
        const usableWidth = docWidth - margin * 2;
        
        doc.setFontSize(debouncedFontSize);
        
        const lines = doc.splitTextToSize(debouncedText, usableWidth);
        
        let cursorY = margin;
        // Use pt for font size which is the default for jsPDF
        const lineHeight = doc.getLineHeight(); 

        lines.forEach((line: string) => {
          if (cursorY + lineHeight > doc.internal.pageSize.getHeight() - margin) {
            doc.addPage();
            cursorY = margin;
          }
          doc.text(line, margin, cursorY);
          cursorY += lineHeight;
        });

        const pdfDataUri = doc.output('datauristring');
        setPdfUri(pdfDataUri);
        setIsLoading(false);
      }, 50); // Small delay to allow UI to update

    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast({
        title: "Preview Failed",
        description: "Could not generate PDF preview. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [debouncedText, debouncedFontSize, toast]);

  useEffect(() => {
    generatePdf();
  }, [generatePdf]);


  const handleDownload = () => {
    if (!pdfUri) {
        toast({
            title: "PDF not ready",
            description: "Please wait for the PDF to be generated before downloading.",
            variant: "destructive",
        });
        return;
    };
    const link = document.createElement("a");
    link.href = pdfUri;
    link.download = "converted-document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
            <Label htmlFor="font-size-slider">Font Size: {fontSize}pt</Label>
            <Slider
                id="font-size-slider"
                min={8}
                max={32}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
            />
        </div>
        <Textarea
          placeholder="Start typing or paste your text here..."
          className="min-h-[600px] text-base flex-grow"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-center">
            <Button onClick={handleDownload} size="lg" disabled={!pdfUri || isLoading}>
                <Download className="mr-2 h-5 w-5" />
                Download PDF
            </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label>Live Preview</Label>
        <div className="relative border rounded-lg bg-background/50 min-h-[650px] flex-grow">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
            {pdfUri ? (
                <iframe 
                    src={pdfUri} 
                    className="w-full h-full rounded-lg"
                    title="PDF Preview"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <p>PDF preview will appear here.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
