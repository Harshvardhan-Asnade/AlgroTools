
"use client";

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Download, Palette, ScanLine } from 'lucide-react';
import { useDebounce } from 'use-debounce';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://firebase.google.com/');
  const [debouncedText] = useDebounce(text, 500);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Dynamic import for the QR code library to avoid server-side issues
  const qrCodeLibRef = useRef<any>(null);
  useEffect(() => {
    import('qrcode').then(lib => {
        qrCodeLibRef.current = lib;
    });
  }, []);

  useEffect(() => {
    if (qrCodeLibRef.current && debouncedText) {
      qrCodeLibRef.current.toDataURL(debouncedText, { 
        width: 256,
        margin: 2,
        errorCorrectionLevel: 'H'
      }, (err: any, url: string) => {
        if (err) {
          console.error(err);
          return;
        }
        setQrCodeDataUrl(url);
      });
    }
  }, [debouncedText]);
  
  const handleDownload = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="w-full max-w-md space-y-2">
        <Label htmlFor="qr-input" className="text-lg font-medium">
            Enter Text or URL
        </Label>
        <Input
          id="qr-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., https://example.com"
          className="h-12 text-base"
        />
      </div>

      <div className="p-4 bg-white rounded-lg shadow-lg">
          {qrCodeDataUrl ? (
            <img src={qrCodeDataUrl} alt="Generated QR Code" width={256} height={256} />
          ) : (
             <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-md">
                 <ScanLine className="w-16 h-16 text-gray-400" />
            </div>
          )}
      </div>

      <div className="flex gap-4">
        <Button size="lg" onClick={handleDownload} disabled={!qrCodeDataUrl}>
          <Download className="mr-2" />
          Download PNG
        </Button>
      </div>
    </div>
  );
}
