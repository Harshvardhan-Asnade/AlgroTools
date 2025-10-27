# Vercel Deployment Guide for Clerk Authentication

## 🔧 Issue
Login and signup not working on Vercel deployment.

## ✅ Solution: Configure Environment Variables in Vercel

Your local environment variables need to be added to your Vercel project.

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to your Vercel Project Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project (`AlgroTools`)

2. **Navigate to Settings**
   - Click on **Settings** in the top navigation
   - Select **Environment Variables** from the left sidebar

3. **Add the Environment Variables**
   
   Add these two variables:
   
   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_aW1wcm92ZWQtZHJ1bS0zNS5jbGVyay5hY2NvdW50cy5kZXYk` |
   | `CLERK_SECRET_KEY` | `sk_test_ulxGlYpGJ95hRg1bO4p11pxdjt7PIU2ytdxMokGhC8` |

   **Important Notes:**
   - For `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Check **"Production"**, **"Preview"**, and **"Development"**
   - For `CLERK_SECRET_KEY`: Check **"Production"**, **"Preview"**, and **"Development"**
   - Click **"Save"** after adding each variable

4. **Redeploy Your Application**
   - Go to the **Deployments** tab
   - Click the **"..."** (three dots) on the latest deployment
   - Select **"Redeploy"**
   - Or simply push a new commit to trigger a redeploy

### Method 2: Via Vercel CLI

If you have Vercel CLI installed:

```bash
# Login to Vercel
vercel login

# Link your project (if not already linked)
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
vercel env add CLERK_SECRET_KEY production
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY preview
vercel env add CLERK_SECRET_KEY preview
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY development
vercel env add CLERK_SECRET_KEY development

# Redeploy
vercel --prod
```

## 🔍 Verification Steps

After adding environment variables and redeploying:

1. **Check the deployment logs** in Vercel to ensure build succeeds
2. **Visit your Vercel URL** (e.g., `https://your-app.vercel.app`)
3. **Test the authentication:**
   - Click "Sign Up" button
   - Should see Clerk modal popup
   - Try creating an account
   - Should successfully authenticate

## 🐛 Troubleshooting

### Issue: "Invalid API Key" or similar errors

**Solution:**
1. Double-check you copied the keys correctly from `.env.local`
2. Ensure no extra spaces or quotes around the values in Vercel
3. Make sure keys are enabled for the right environments (Production, Preview, Development)

### Issue: Buttons not showing or modal not appearing

**Solution:**
1. Clear browser cache
2. Check browser console for errors
3. Verify `@clerk/nextjs` is listed in `package.json`
4. Check deployment logs for build errors

### Issue: CORS errors

**Solution:**
1. Make sure your Clerk dashboard has the correct frontend and backend URLs
2. In Clerk Dashboard → Settings → URLs:
   - Add your Vercel URL (e.g., `https://your-app.vercel.app`)
   - Frontend: `https://your-app.vercel.app`
   - Backend: `https://your-app.vercel.app`

## 📋 Checklist

Before deploying to Vercel:

- [ ] Created `.env.local` with Clerk keys (✅ Done)
- [ ] Added environment variables to Vercel dashboard
- [ ] Configured for Production, Preview, and Development environments
- [ ] Redeployed the application
- [ ] Tested login/signup functionality
- [ ] Verified user authentication works

## 🎯 Quick Fix Commands

```bash
# Check if environment variables are set in Vercel
vercel env ls

# Pull environment variables to verify
vercel env pull .env.local.pull

# Force redeploy
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

## 📚 Additional Resources

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Clerk + Vercel Guide](https://clerk.com/docs/deployments/vercel)
- [Clerk Dashboard](https://dashboard.clerk.com/)

## ✅ After Setting Up

Once environment variables are configured in Vercel and you've redeployed, your authentication should work perfectly! The login and signup buttons will function as they do locally.

