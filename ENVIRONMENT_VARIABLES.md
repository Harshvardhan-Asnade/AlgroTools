# Environment Variables Setup Guide

## Required Variables

### Clerk Authentication
```env
# Get these from https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
```

### Supabase Database
```env
# Get these from https://app.supabase.com > Your Project > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Local Development Setup

### 1. Create `.env.local` file in project root:
```bash
touch .env.local
```

### 2. Add all variables:
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
```

### 3. Restart your development server:
```bash
npm run dev
```

## Vercel Deployment Setup

### 1. Go to Vercel Dashboard
Navigate to your project settings: [vercel.com](https://vercel.com)

### 2. Open Environment Variables
- Go to your project
- Click "Settings"
- Click "Environment Variables"

### 3. Add Variables for Production
Add each variable for the "Production" environment:
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

### 4. Repeat for Preview Environment (Optional)
If you want staging/preview deployments, add the same variables for "Preview" environment.

### 5. Redeploy
- Click "Deployments"
- Click the three dots (⋮) on the latest deployment
- Click "Redeploy"

## Getting Your Keys

### Clerk Keys
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to "API Keys"
4. Copy the Publishable Key and Secret Key

### Supabase Keys
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings (gear icon) > API
4. Copy:
   - Project URL (for NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (for NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - service_role key (for SUPABASE_SERVICE_ROLE_KEY) ⚠️ **Keep this secret!**

## Security Notes

### 🔒 Public Variables (can be exposed to browser)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 🔐 Secret Variables (server-only)
- `CLERK_SECRET_KEY` - Never expose to browser
- `SUPABASE_SERVICE_ROLE_KEY` - Never expose to browser (bypasses RLS!)

### ⚠️ Important
The `SUPABASE_SERVICE_ROLE_KEY` has admin privileges and bypasses Row Level Security. 
- Only use it in server-side code
- Never expose it in client-side code
- Keep it secret in your `.env.local` file (which is gitignored)

## Verification

After setting up environment variables, verify they work:

1. **Check Clerk**: Sign in/out should work
2. **Check Supabase**: User sync should work (users table should populate)
3. **Check History**: 
   - Navigate to `/dashboard/history`
   - You should see the page without errors

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure all 3 Supabase variables are set
- Restart your dev server after adding variables

### "User not authenticated"
- Check Clerk variables are correct
- Ensure you're signed in

### "Supabase admin client not configured"
- Missing `SUPABASE_SERVICE_ROLE_KEY`
- This is required for user history feature

### "Permission denied"
- RLS policies might not be set up
- Run the `supabase-schema.sql` migration in Supabase SQL Editor

