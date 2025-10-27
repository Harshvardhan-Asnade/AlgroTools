# Supabase Integration Guide

This guide shows you how to integrate Supabase as your database backend with Clerk authentication.

## 🎯 Overview

You're using:
- **Clerk** for authentication
- **Supabase** for database storage
- **Next.js Server Actions** for backend logic

This combination gives you the best of both worlds: Clerk's excellent auth UX and Supabase's powerful database features.

## 🚀 Quick Setup

### Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign up or log in

2. **Create New Project**
   - Click "New Project"
   - Fill in project details:
     - **Name:** `algrotools` (or your preferred name)
     - **Database Password:** Choose a strong password (save it!)
     - **Region:** Choose closest to your users
   - Click "Create new project"
   - Wait 2-3 minutes for setup

### Step 2: Get API Keys

1. **Go to Project Settings**
   - Click the gear icon (⚙️) in the left sidebar
   - Select "API"

2. **Copy Your Keys**
   - **Project URL:** Copy the URL (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key:** Copy the "anon" `public` key
   - **service_role key:** Copy the "service_role" key (keep this secret!)

### Step 3: Set Up Database Schema

1. **Open SQL Editor**
   - In Controls, go to SQL Editor
   - Click "New Query"

2. **Run the Schema**
   - Open `supabase-schema.sql` from your project
   - Copy all the SQL
   - Paste it into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)

This creates:
- `users` table (synced from Clerk)
- `user_preferences` table
- `tool_usage` table (track tool usage)
- Row Level Security (RLS) policies
- Automatic triggers for timestamps

### Step 4: Add Environment Variables

Add these to your `.env.local`:

```env
# Clerk Authentication (already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 5: Test the Integration

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Sign in to your app**
   - Go to http://localhost:3000
   - Click "Sign Up" or "Log In"
   - Complete authentication

3. **Check Supabase Dashboard**
   - Go to Table Editor in Supabase
   - Click on `users` table
   - You should see your user record automatically synced!

## 📁 Project Structure

```
src/
├── lib/
│   └── supabase/
│       ├── client.ts              # Client-side Supabase client
│       ├── server.ts              # Server-side Supabase client
│       ├── database.types.ts      # TypeScript types
│       ├── user-sync.ts           # Clerk → Supabase sync
│       └── db-helpers.ts          # Database helper functions
├── components/
│   └── auth/
│       └── user-sync.tsx          # Auto-sync user on login
├── app/
│   └── api/
│       ├── sync-user/
│       │   └── route.ts           # API endpoint for user sync
│       └── track-usage/
│           └── route.ts           # API endpoint for usage tracking
```

## 🎨 How It Works

### User Authentication Flow

1. **User signs in** via Clerk
2. **`UserSync` component** detects the sign-in
3. **Calls `/api/sync-user`** endpoint
4. **Server syncs user data** to Supabase
5. **User data** is now available in your database

### Using Supabase in Your Code

#### Server-Side (Server Actions, API Routes)

```typescript
import { getCurrentUser, trackToolUsage } from '@/lib/supabase/db-helpers';

// Get current user
const user = await getCurrentUser();

// Track tool usage
await trackToolUsage('qr-code-generator');

// Get user preferences
import { getUserPreferences, setUserPreference } from '@/lib/supabase/db-helpers';

const prefs = await getUserPreferences();
await setUserPreference('theme', 'dark');
```

#### Client-Side

```typescript
import { supabase } from '@/lib/supabase/client';

// Example: Subscribe to changes
const channel = supabase
  .channel('changes')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'users' },
    (payload) => console.log('Change!', payload)
  )
  .subscribe();
```

## 🔧 Available Functions

### User Management

```typescript
// Sync Clerk user to Supabase (automatic on login)
await syncClerkUserToSupabase();

// Get current user's Supabase ID
const userId = await getSupabaseUserId();

// Get full user record
const user = await getCurrentUser();
```

### Preferences

```typescript
// Get all preferences
const prefs = await getUserPreferences();
// Returns: { theme: 'dark', language: 'en', ... }

// Set a preference
await setUserPreference('theme', 'dark');
await setUserPreference('notifications', 'enabled');
```

### Usage Tracking

```typescript
// Track when a user uses a tool
await trackToolUsage('qr-code-generator');

// Get most used tools
const tools = await getMostUsedTools(10);
```

## 🌐 Deploying to Vercel

### Step 1: Add Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk key | Production, Preview, Development |
| `CLERK_SECRET_KEY` | Your Clerk secret | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service key | Production, Preview, Development |

### Step 2: Deploy

```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

Vercel will automatically deploy your changes.

### Step 3: Verify

1. Visit your deployed app
2. Sign in
3. Check Supabase dashboard to see the user sync

## 🔐 Security

### Row Level Security (RLS)

Your database tables have RLS enabled, which means:
- Users can only see/modify their own data
- Even if someone gets your API keys, they can't access other users' data

### Environment Variables

- **Never commit** `.env.local` to git
- `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS - use with caution
- Only use service role key on the server-side
- Keep service role key secure

## 🧪 Testing

### Test User Sync

```bash
# Sign up in your app
# Check Supabase → Table Editor → users
# Should see your user record
```

### Test Tool Usage

```typescript
// In your component
import { trackToolUsage } from '@/lib/supabase/db-helpers';

const handleGenerateQR = async () => {
  // Your QR generation logic
  await trackToolUsage('qr-code-generator');
};
```

### Test from Browser Console

```javascript
// Check if user is synced
fetch('/api/sync-user', { method: 'POST' })
  .then(r => r.json())
  .then(console.log);

// Track usage
fetch('/api/track-usage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ toolSlug: 'test-tool' })
})
  .then(r => r.json())
  .then(console.log);
```

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution:**
1. Check `.env.local` has all three Supabase variables
2. Restart your dev server
3. Ensure no extra spaces or quotes around values

### Issue: User not syncing to Supabase

**Solution:**
1. Check browser console for errors
2. Verify `/api/sync-user` endpoint is working
3. Check Supabase logs (Dashboard → Logs → Postgres Logs)
4. Ensure RLS policies are correct

### Issue: RLS blocking queries

**Solution:**
- Check that `clerk_user_id` in users table matches `auth.uid()`
- Verify RLS policies are properly set up
- For admin operations, use `supabaseAdmin` client

### Issue: Service role key not working

**Solution:**
1. Verify key is correct in Supabase Dashboard
2. Ensure it's named `SUPABASE_SERVICE_ROLE_KEY`
3. Check it's added to Vercel environment variables
4. Restart dev server if testing locally

## 📊 Database Schema

### users
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| clerk_user_id | TEXT | Clerk user ID (unique) |
| email | TEXT | User email |
| full_name | TEXT | User's full name |
| avatar_url | TEXT | Profile picture URL |
| created_at | TIMESTAMP | Account creation time |
| updated_at | TIMESTAMP | Last update time |

### user_preferences
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| preference_key | TEXT | Preference name |
| preference_value | TEXT | Preference value |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

### tool_usage
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| tool_slug | TEXT | Tool identifier |
| usage_count | INTEGER | Number of times used |
| last_used_at | TIMESTAMP | Last usage time |
| created_at | TIMESTAMP | First use time |
| updated_at | TIMESTAMP | Last update time |

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Supabase + Clerk Guide](https://supabase.com/docs/guides/auth/clerk)

## ✅ Checklist

Before deploying:

- [ ] Supabase project created
- [ ] Database schema run in SQL editor
- [ ] Environment variables added to `.env.local`
- [ ] Tested user sync locally
- [ ] Environment variables added to Vercel
- [ ] Verified RLS policies
- [ ] Tested on production deployment

## 🎉 You're All Set!

Your Supabase integration is complete! You now have:
- ✅ User data syncing from Clerk to Supabase
- ✅ Tool usage tracking
- ✅ User preferences storage
- ✅ Secure Row Level Security policies
- ✅ Ready for production deployment

Start building amazing features with your Supabase database!

