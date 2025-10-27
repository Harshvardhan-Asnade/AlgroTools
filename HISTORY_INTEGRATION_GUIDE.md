# Quick Integration Guide: Adding History to Your Tools

This guide shows you how to integrate the user history feature into your existing tools.

## For Text-Based Tools (Chat, AI Tools)

When a user interacts with text or AI features, save the conversation:

```typescript
import { saveChatHistory } from '@/app/actions';

// In your component or handler
async function handleTextSubmission(text: string) {
  // ... your existing logic ...
  
  // Save to history
  await saveChatHistory({
    title: 'Text Processing Result',
    content: `Input: ${text}\n\nOutput: ${result}`
  });
}
```

### Example: Updating Text-to-PDF Tool

```typescript
// In src/components/tools/text-to-pdf.tsx

import { saveChatHistory } from '@/app/actions';
import { useAuth } from '@clerk/nextjs';

export function TextToPdfTool() {
  const { userId } = useAuth();
  
  const handleConvert = async (text: string) => {
    // ... convert text to PDF ...
    
    // Save to history if user is logged in
    if (userId) {
      await saveChatHistory({
        title: 'PDF Created from Text',
        content: `Created PDF from text (${text.length} characters)`
      });
    }
  };
  
  // ... rest of component
}
```

## For File Upload Tools

When a user uploads a file, save the file details:

```typescript
import { saveFileHistory } from '@/app/actions';

// In your component or handler
async function handleFileUpload(file: File) {
  // ... your existing file processing logic ...
  
  // Upload file to storage (e.g., Supabase Storage or other)
  const fileUrl = await uploadFile(file);
  
  // Save to history
  await saveFileHistory({
    title: 'Uploaded: ' + file.name,
    fileUrl: fileUrl,
    fileName: file.name,
    fileSize: file.size,
    metadata: {
      tool: 'pdf-converter',
      originalType: file.type
    }
  });
}
```

### Example: Updating Image-to-PDF Tool

```typescript
// In src/components/tools/image-to-pdf.tsx

import { saveFileHistory } from '@/app/actions';
import { useAuth } from '@clerk/nextjs';

export function ImageToPdfTool() {
  const { userId } = useAuth();
  
  const handleConvert = async (file: File) => {
    // ... convert image to PDF ...
    
    // Get the PDF URL
    const pdfUrl = await generatePdfUrl();
    
    // Save to history if user is logged in
    if (userId) {
      await saveFileHistory({
        title: 'PDF Created from Image',
        fileUrl: pdfUrl,
        fileName: file.name.replace(/\.[^/.]+$/, '.pdf'),
        fileSize: pdfFile.size,
        metadata: {
          tool: 'image-to-pdf',
          originalFile: file.name
        }
      });
    }
  };
  
  // ... rest of component
}
```

## For AI Chat Tools

Save complete conversations including both user and assistant messages:

```typescript
// In your AI chat component

const handleSendMessage = async (message: string) => {
  // ... send to AI and get response ...
  const response = await callAIService(message);
  
  // Update conversation state
  const conversation = `${conversation}\n\nUser: ${message}\nAssistant: ${response}`;
  
  // Save to history
  if (userId) {
    await saveChatHistory({
      title: 'AI Chat Conversation',
      content: conversation
    });
  }
};
```

## Conditional Saving

Always check if the user is authenticated before saving to history:

```typescript
import { useAuth } from '@clerk/nextjs';

function YourTool() {
  const { userId } = useAuth();
  
  const saveToHistory = async (data: any) => {
    // Only save if user is logged in
    if (!userId) {
      return;
    }
    
    // Save logic here...
  };
}
```

## Error Handling

Always handle errors gracefully when saving to history:

```typescript
const saveToHistory = async (data: any) => {
  try {
    if (!userId) return;
    
    const result = await saveChatHistory(data);
    
    if (result.error) {
      console.error('Failed to save history:', result.error);
      // Don't show error to user - history is supplementary
    }
  } catch (error) {
    console.error('Error saving to history:', error);
  }
};
```

## Best Practices

1. **Don't block the main flow**: Saving to history should be non-blocking
2. **Silent failures**: Don't show errors to users if history save fails
3. **Meaningful titles**: Use descriptive titles that help users identify their history
4. **Privacy**: Never save sensitive information without user consent
5. **File storage**: Store files securely (consider Supabase Storage or similar)

## Testing

Test the history feature:

1. Sign in with Clerk
2. Use a tool with history integration
3. Navigate to `/dashboard/history`
4. Verify the entry appears
5. Test deletion
6. Test file downloads (if applicable)

## Deployment Checklist

- [ ] Run Supabase migration
- [ ] Set environment variables in Vercel
- [ ] Test authentication flow
- [ ] Test history saving
- [ ] Test history retrieval
- [ ] Test history deletion
- [ ] Verify RLS policies
- [ ] Test with multiple users

