# Supabase Quick Start Guide

## ✅ Step 1: Your Credentials are Added

I've added your Supabase credentials to `.env.local`:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Added
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Added
- ⏳ `SUPABASE PowerShell_ROLE_KEY` - **You need to add this**

## 🔑 Step 2: Get Your Service Role Key

You provided the **anon** key, but you also need the **service_role** key:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open Settings → API**
   - Click the gear icon (⚙️) in left sidebar
   - Select "API"

3. **Copy the service_role key**
   - Look for the key labeled **"service_role"** and **"secret"**
   - **Do not share this key publicly!**
   - It's different from the anon key

4. **Add it to `.env.local`**
   ```bash
   # Open .env.local and replace the placeholder with your actual key:
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
   ```

## 🗄️ Step 3: Set Up Your Database Schema

Now you need to run the database schema:

1. **Open SQL Editor in Supabase**
   - In your Supabase Dashboard, go to "SQL Editor" (📝 icon in left sidebar)
   - Click "New Query"

2. **Copy the Schema**
   - Open `supabase-schema.sql` in your project
   - Select all the SQL (Ctrl+A / Cmd+A)
   - Copy it

3. **Paste and Run**
   - Paste into the SQL Editor
   - Click "Run" button (or press Ctrl+Enter / Cmd+Enter)
   - Wait for success message

4. **Verify Tables**
   - Go to "Table Editor" in left sidebar
   - You should see three tables:
     - `users`
     - `user_preferences`
     - `tool_usage`

## 🧪 Step 4: Test the Integration

1. **Start your dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Visit your app**:
   - Go to http://localhost:3000
   - Click "Sign Up" or "Log In"
   - Complete authentication

3. **Check Supabase**:
   - Go to Supabase Dashboard → Table Editor
   - Click on `users` table
   - **You should see your user record automatically created!**

## 🚀 Step 5: Deploy to Vercel

Once testing works locally:

1. **Add environment variables to Vercel**:
   - Go to Vercel Dashboard → Your Project
   - Settings → Environment Variables
   - Add all 5 variables:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - `CLERK_SECRET_KEY`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

2. **Enable for all environments**:
   - Check Production, Preview, and Development
   - Click "Save"

3. **Redeploy**:
   ```bash
   git add .
   git commit -m "Add Supabase integration"
   git push origin main
   ```

## 📋 Quick Checklist

- [ ] Added `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- [ ] Ran `supabase-schema.sql` in SQL Editor
- [ ] Verified tables were created
- [ ] Tested user sync locally
- [ ] Added env vars to Vercel
- [ ] Redeployed and tested on production

## 🐛 Troubleshooting

### "Missing Supabase environment variables" error
- Make sure all 3 variables are in `.env.local`
- Restart your dev server after adding them

### User not syncing
- Check browser console for errors
- Verify `/api/sync-user` endpoint exists
- Check Supabase logs (Dashboard → Logs)

### Service role key doesn't work
- Make sure you copied the correct key (service_role, not anon)
- No extra spaces or quotes
- Restart dev server after updating

## 📚 Next Steps

- Read `SUPABASE_INTEGRATION.md` for detailed documentation
- Check available database functions in `src/lib/supabase/db-helpers.ts`
- Start building user features!

## 🎉 You're Almost There!

Just follow the steps above to complete your Supabase setup. The integration is ready - you just need to:
1. Add the service_role key
2. Run the database schema
3. Test it!

