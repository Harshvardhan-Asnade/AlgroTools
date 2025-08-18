
"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2, Clipboard, Check, Trash2 } from "lucide-react";
import { handleAudioTranscription } from "@/app/actions";
import { Textarea } from "../ui/textarea";

export default function AudioTranscriptsTool() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) { // 25MB limit
        toast({
          title: "File Too Large",
          description: "Please upload an audio file smaller than 25MB.",
          variant: "destructive",
        });
        return;
      }
      setAudioFile(file);
      setTranscript("");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("audio/")) {
       if (file.size > 25 * 1024 * 1024) { // 25MB limit
        toast({
          title: "File Too Large",
          description: "Please upload an audio file smaller than 25MB.",
          variant: "destructive",
        });
        return;
      }
      setAudioFile(file);
      setTranscript("");
    } else {
        toast({
            title: "Invalid File Type",
            description: "Please drop an audio file.",
            variant: "destructive",
        });
    }
  };

  const convertFileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  }

  const handleTranscribe = useCallback(async () => {
    if (!audioFile) {
      toast({ title: "No Audio File", description: "Please upload an audio file first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setTranscript("");
    
    try {
      const audioDataUri = await convertFileToDataUri(audioFile);
      const result = await handleAudioTranscription({ audioDataUri });
      setTranscript(result.transcript);
      toast({ title: "Transcription Complete!" });
    } catch (error: any) {
      console.error("Transcription Error:", error);
      toast({ title: "Transcription Failed", description: error.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [audioFile, toast]);

  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    setHasCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setHasCopied(false), 2000);
  };
  
  const handleClear = () => {
    setAudioFile(null);
    setTranscript('');
  }

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div
        className="w-full max-w-3xl p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors hover:border-primary/50"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("audio-upload")?.click()}
      >
        <input
          type="file"
          id="audio-upload"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 font-semibold text-foreground">
          {audioFile ? audioFile.name : "Click to upload or drag and drop an audio file"}
        </p>
        <p className="text-sm text-muted-foreground">Max file size: 25MB</p>
      </div>

      {audioFile && (
        <Button size="lg" onClick={handleTranscribe} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Transcribing...
            </>
          ) : (
            "Transcribe Audio"
          )}
        </Button>
      )}

      {transcript && (
          <div className="w-full max-w-3xl flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Transcript</h3>
                <div className="flex items-center gap-1">
                     <Button variant="ghost" size="icon" onClick={handleCopy}>
                        {hasCopied ? <Check className="h-4 w-4 text-primary" /> : <Clipboard className="h-4 w-4" />}
                    </Button>
                     <Button variant="ghost" size="icon" onClick={handleClear}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <Textarea 
                value={transcript}
                readOnly
                className="min-h-[300px] bg-muted/30"
            />
          </div>
      )}
    </div>
  );
}
