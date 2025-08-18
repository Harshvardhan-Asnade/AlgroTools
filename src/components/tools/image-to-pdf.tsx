
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, FileImage, X, Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

export default function ImageToPdfTool() {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const addFiles = (files: File[]) => {
    const newImageFiles = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

    if (newImageFiles.length !== files.length) {
      toast({
        title: "Invalid File Type",
        description: "Some files were not images and were ignored.",
        variant: "destructive",
      });
    }

    setImageFiles((prevFiles) => [...prevFiles, ...newImageFiles]);
    setPdfUrl(null); // Reset PDF if new files are added
  };

  const removeFile = (id: string) => {
    setImageFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };
  
  const generatePdf = useCallback(async () => {
    if (imageFiles.length === 0) {
      toast({ title: "No Images Selected", description: "Please upload at least one image.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setPdfUrl(null);
    
    try {
      const doc = new jsPDF();
      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        const img = new Image();
        img.src = imageFile.preview;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const pageInfo = doc.internal.pageSize;
            const pageWidth = pageInfo.getWidth();
            const pageHeight = pageInfo.getHeight();
            
            const imgWidth = img.width;
            const imgHeight = img.height;
            
            const ratio = Math.min((pageWidth * 0.9) / imgWidth, (pageHeight * 0.9) / imgHeight);
            
            const newWidth = imgWidth * ratio;
            const newHeight = imgHeight * ratio;

            const x = (pageWidth - newWidth) / 2;
            const y = (pageHeight - newHeight) / 2;

            if (i > 0) {
              doc.addPage();
            }
            // Pass the image source directly and let jsPDF handle the format.
            doc.addImage(img.src, '', x, y, newWidth, newHeight);
            resolve();
          };
          img.onerror = (err) => {
            console.error("Image loading error:", err);
            reject(new Error(`Failed to load image: ${imageFile.file.name}`));
          };
        });
      }
      const uri = doc.output('datauristring');
      setPdfUrl(uri);
      toast({ title: "PDF Generated!", description: "Your PDF is ready for download." });
    } catch (error: any) {
        console.error("PDF Generation Error:", error);
        toast({ title: "PDF Generation Failed", description: error.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [imageFiles, toast]);


  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "images.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div
        className="w-full max-w-3xl p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors hover:border-primary/50"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 font-semibold text-foreground">
          Click to upload or drag and drop images here
        </p>
        <p className="text-sm text-muted-foreground">PNG, JPG, WEBP, etc.</p>
      </div>

      {imageFiles.length > 0 && (
        <>
          <div className="w-full max-w-5xl">
            <h3 className="text-lg font-semibold mb-4 text-center">Image Preview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {imageFiles.map((imageFile) => (
                <div key={imageFile.id} className="relative group aspect-square">
                  <img
                    src={imageFile.preview}
                    alt={imageFile.file.name}
                    className="w-full h-full object-cover rounded-md"
                    onLoad={() => URL.revokeObjectURL(imageFile.preview)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFile(imageFile.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-center mt-1 truncate">{imageFile.file.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Button size="lg" onClick={generatePdf} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Convert to PDF"
              )}
            </Button>
            <Button size="lg" onClick={handleDownload} disabled={!pdfUrl || isLoading}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
