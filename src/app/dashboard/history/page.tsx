'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getUserHistory, deleteHistoryEntry } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageSquare, 
  FileText, 
  Trash2, 
  Download, 
  Calendar,
  AlertCircle 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import type { Database } from '@/lib/supabase/database.types';

type HistoryEntry = Database['public']['Tables']['user_history']['Row'];

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'chat' | 'file'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadHistory = async (type?: 'chat' | 'file') => {
    if (!isLoaded) return;

    setLoading(true);
    const result = await getUserHistory(type ? { type } : undefined);
    
    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      setHistory(result.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoaded && user) {
      loadHistory();
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (activeTab === 'all') {
      loadHistory();
    } else if (activeTab === 'chat') {
      loadHistory('chat');
    } else if (activeTab === 'file') {
      loadHistory('file');
    }
  }, [activeTab]);

  const handleDelete = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setDeletingId(entryId);
    const result = await deleteHistoryEntry(entryId);

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Item deleted successfully',
      });
      loadHistory(activeTab === 'all' ? undefined : activeTab as 'chat' | 'file');
    }
    setDeletingId(null);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  if (!isLoaded) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-12 w-64 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please sign in to view your history.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const chatHistory = history.filter((item) => item.type === 'chat');
  const fileHistory = history.filter((item) => item.type === 'file');

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My History</h1>
        <p className="text-muted-foreground">
          View and manage your chat conversations and uploaded files
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All ({history.length})</TabsTrigger>
          <TabsTrigger value="chat">Chat ({chatHistory.length})</TabsTrigger>
          <TabsTrigger value="file">Files ({fileHistory.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {loading ? (
            <HistorySkeleton />
          ) : history.length === 0 ? (
            <EmptyState type="all" />
          ) : (
            <HistoryList items={history} onDelete={handleDelete} deletingId={deletingId} formatFileSize={formatFileSize} />
          )}
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          {loading ? (
            <HistorySkeleton />
          ) : chatHistory.length === 0 ? (
            <EmptyState type="chat" />
          ) : (
            <HistoryList items={chatHistory} onDelete={handleDelete} deletingId={deletingId} formatFileSize={formatFileSize} />
          )}
        </TabsContent>

        <TabsContent value="file" className="mt-6">
          {loading ? (
            <HistorySkeleton />
          ) : fileHistory.length === 0 ? (
            <EmptyState type="file" />
          ) : (
            <HistoryList items={fileHistory} onDelete={handleDelete} deletingId={deletingId} formatFileSize={formatFileSize} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HistoryList({ 
  items, 
  onDelete, 
  deletingId,
  formatFileSize 
}: { 
  items: HistoryEntry[]; 
  onDelete: (id: string) => void;
  deletingId: string | null;
  formatFileSize: (bytes: number | null) => string;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {item.type === 'chat' ? (
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                ) : (
                  <FileText className="h-5 w-5 text-green-500" />
                )}
                <div>
                  <CardTitle className="text-lg">
                    {item.title || 'Untitled'}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={item.type === 'chat' ? 'default' : 'secondary'}>
                      {item.type === 'chat' ? 'Chat' : 'File'}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item.id)}
                disabled={deletingId === item.id}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {item.type === 'chat' ? (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.content || 'No content'}
              </p>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">File: {item.file_name || 'Unknown'}</span>
                  {item.file_size && (
                    <span className="text-sm text-muted-foreground">
                      {formatFileSize(item.file_size)}
                    </span>
                  )}
                </div>
                {item.file_url && (
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    Download File
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function HistorySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ type }: { type: 'all' | 'chat' | 'file' }) {
  const messages = {
    all: { title: 'No history yet', description: 'Start using the app to see your history here.' },
    chat: { title: 'No chat history', description: 'Your chat conversations will appear here.' },
    file: { title: 'No files uploaded', description: 'Your uploaded files will appear here.' },
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        {type === 'chat' ? (
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
        ) : type === 'file' ? (
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        ) : (
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        )}
        <h3 className="text-lg font-semibold mb-2">{messages[type].title}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          {messages[type].description}
        </p>
      </CardContent>
    </Card>
  );
}

