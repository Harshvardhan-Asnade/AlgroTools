"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Download, FileText } from "lucide-react";
import { textToPdf } from "@/ai/flows/text-to-pdf";
import { useToast } from "@/hooks/use-toast";

export default function TextToPdfTool() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!text.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setPdfUri(null);

    try {
      const result = await textToPdf({ text });
      setPdfUri(result.pdfDataUri);
      toast({
        title: "Conversion Successful",
        description: "Your PDF is ready for download.",
      });
    } catch (error) {
      console.error("PDF Conversion Error:", error);
      toast({
        title: "Conversion Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUri) return;
    const link = document.createElement("a");
    link.href = pdfUri;
    link.download = "converted-document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleNewConversion = () => {
    setText("");
    setPdfUri(null);
  }

  if (pdfUri) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
            <FileText className="w-16 h-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Your PDF is Ready!</h2>
            <p className="text-muted-foreground mb-6">Click the button below to download your file.</p>
            <div className="flex gap-4">
                <Button onClick={handleDownload} size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                </Button>
                <Button onClick={handleNewConversion} size="lg" variant="outline">
                    New Conversion
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Textarea
        placeholder="Start typing or paste your text here... Your text will be converted into a PDF document."
        className="min-h-[350px] text-base"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      <div className="flex justify-center">
        <Button
          onClick={handleConvert}
          disabled={isLoading || !text.trim()}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Converting...
            </>
          ) : (
            "Convert to PDF"
          )}
        </Button>
      </div>
    </div>
  );
}
