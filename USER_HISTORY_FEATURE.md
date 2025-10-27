# User History Feature Documentation

## Overview
This feature allows users to view and manage their previous chat conversations and uploaded files after logging in with Clerk authentication. All data is securely stored in Supabase and linked to the user's Clerk ID.

## Features
- ✅ View chat history
- ✅ View file upload history
- ✅ Delete history entries
- ✅ Download previously uploaded files
- ✅ Filter by type (All, Chat, Files)
- ✅ Secure authentication with Clerk
- ✅ Row Level Security (RLS) in Supabase

## Database Schema

### user_history Table
```sql
CREATE TABLE user_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('chat', 'file')),
  title TEXT,
  content TEXT,
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Security
- Row Level Security (RLS) enabled
- Users can only view their own history
- Users can only insert their own history
- Users can only delete their own history
- Clerk authentication required for all operations

## Setup Instructions

### 1. Run the Supabase Migration
Execute the updated `supabase-schema.sql` file in your Supabase SQL Editor to create the `user_history` table and RLS policies.

### 2. Environment Variables
Ensure you have the following environment variables configured:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 3. Deploy to Vercel
Make sure all environment variables are set in your Vercel project settings.

## Server Actions

### saveChatHistory
Save a chat message to user history.

```typescript
const result = await saveChatHistory({
  title: 'Chat Title',
  content: 'Chat message content...'
});
```

### saveFileHistory
Save a file upload to user history.

```typescript
const result = await saveFileHistory({
  title: 'File Title',
  fileUrl: 'https://...',
  fileName: 'document.pdf',
  fileSize: 1024000,
  metadata: { optional: 'data' }
});
```

### getUserHistory
Retrieve user history with optional filters.

```typescript
// Get all history
const result = await getUserHistory();

// Get only chat history
const result = await getUserHistory({ type: 'chat' });

// Get only file history
const result = await getUserHistory({ type: 'file' });

// With pagination
const result = await getUserHistory({ 
  limit: 20, 
  offset: 0 
});
```

### deleteHistoryEntry
Delete a specific history entry.

```typescript
const result = await deleteHistoryEntry(entryId);
```

## Frontend Usage

### Accessing the History Page
Navigate to `/dashboard/history` or click the "History" link in the header (visible to signed-in users).

### Features
- **All Tab**: Shows all history entries (chats and files)
- **Chat Tab**: Shows only chat conversations
- **Files Tab**: Shows only uploaded files
- **Delete**: Click the trash icon to delete an entry
- **Download**: Click "Download File" to download uploaded files
- **Timestamps**: See when each entry was created with relative time (e.g., "2 hours ago")

## Route Protection

The dashboard routes are protected by Clerk middleware. Users must be authenticated to access:
- `/dashboard/history`

Unauthenticated users are redirected to the sign-in page.

## Implementation in Your Tools

### Saving Chat History
When a user interacts with AI chat or text tools, save the conversation:

```typescript
import { saveChatHistory } from '@/app/actions';

// Example: After AI chat
const result = await saveChatHistory({
  title: 'AI Chat Conversation',
  content: 'User: Hello\nAssistant: Hi there!'
});
```

### Saving File History
When a user uploads a file, save the details:

```typescript
import { saveFileHistory } from '@/app/actions';

// Example: After file upload
const result = await saveFileHistory({
  title: 'Uploaded Document',
  fileUrl: fileUrl,
  fileName: file.name,
  fileSize: file.size,
  metadata: {
    tool: 'pdf-converter',
    format: 'pdf'
  }
});
```

## Security Considerations

1. **Authentication**: All operations require Clerk authentication
2. **Authorization**: Row Level Security ensures users can only access their own data
3. **Validation**: Input validation is performed on the server side
4. **Error Handling**: All errors are logged and user-friendly messages are shown

## Troubleshooting

### "User not authenticated"
- Ensure the user is signed in with Clerk
- Check that Clerk environment variables are set correctly

### "User not found in database"
- The user needs to be synced to Supabase
- The `UserSync` component should handle this automatically
- You can manually trigger sync by calling `/api/sync-user`

### "Supabase admin client not configured"
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set in your environment variables

## Future Enhancements

Potential features to add:
- Search/filter by keywords
- Export history to CSV/JSON
- Archive old entries
- Pagination for large history lists
- File previews in the history view

