
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function TimestampConverter() {
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
    const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
    const [isTimestampValid, setIsTimestampValid] = useState(true);
    const [isDateValid, setIsDateValid] = useState(true);
    const { toast } = useToast();
    const [hasCopied, setHasCopied] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(Math.floor(Date.now() / 1000).toString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const convertedDate = useMemo(() => {
        const num = parseInt(timestamp, 10);
        if (isNaN(num) || num < 0) {
            setIsTimestampValid(false);
            return { utc: 'Invalid Timestamp', local: '' };
        }
        setIsTimestampValid(true);
        const date = new Date(num * 1000);
        return {
            utc: date.toUTCString(),
            local: date.toLocaleString()
        };
    }, [timestamp]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateTime(e.target.value);
        const date = new Date(e.target.value);
        if (isNaN(date.getTime())) {
            setIsDateValid(false);
        } else {
            setIsDateValid(true);
            setTimestamp(Math.floor(date.getTime() / 1000).toString());
        }
    };
    
    const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTimestamp(value);
        const num = parseInt(value, 10);
        if (!isNaN(num) && num >= 0) {
             const date = new Date(num * 1000);
             // Ensure ISO string has enough characters before slicing
             try {
                const isoString = date.toISOString();
                setDateTime(isoString.slice(0, 16));
                setIsDateValid(true);
             } catch (err) {
                // handle cases for invalid dates that throw on toISOString
                setIsDateValid(false);
             }
        } else {
            setIsDateValid(false);
        }
    }
    
    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setHasCopied(true);
        toast({ title: 'Copied!' });
        setTimeout(() => setHasCopied(false), 2000);
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Timestamp to Date</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="timestamp-input">Unix Timestamp</Label>
                        <Input id="timestamp-input" value={timestamp} onChange={handleTimestampChange} />
                        {!isTimestampValid && <p className="text-destructive text-sm">Please enter a valid positive integer.</p>}
                    </div>
                     <div className="space-y-2">
                        <Label>Converted Date (UTC)</Label>
                        <div className="flex items-center gap-2">
                            <Input readOnly value={convertedDate.utc} className="bg-muted/30" />
                            <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(convertedDate.utc)}>
                                <Clipboard className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Converted Date (Your Local Time)</Label>
                         <div className="flex items-center gap-2">
                             <Input readOnly value={convertedDate.local} className="bg-muted/30" />
                             <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(convertedDate.local)}>
                                <Clipboard className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Date to Timestamp</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="date-input">Date and Time</Label>
                        <Input id="date-input" type="datetime-local" value={dateTime} onChange={handleDateChange} />
                        {!isDateValid && <p className="text-destructive text-sm">Please enter a valid date.</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Converted Timestamp</Label>
                        <div className="flex items-center gap-2">
                            <Input readOnly value={isDateValid ? timestamp : 'Invalid Date'} className="bg-muted/30" />
                            <Button variant="ghost" size="icon" disabled={!isDateValid} onClick={() => handleCopyToClipboard(timestamp)}>
                                 <Clipboard className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
