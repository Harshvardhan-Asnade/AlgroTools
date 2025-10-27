# Backend Setup Guide

This guide explains how to set up the AlgroTools backend, which includes AI features powered by Google Genkit.

## 📋 Backend Architecture

Your AlgroTools backend consists of:

1. **Next.js Server Actions** (`src/app/actions.ts`)
   - Handle frontend-to-backend communication
   - Process AI requests and tool suggestions

2. **Google Genkit AI Flows** (`src/ai/flows/`)
   - AI Chat Support
   - Smart Tool Suggestions
   - Audio Transcription
   - Text to PDF

3. **Clerk Authentication** (Already configured)
   - User authentication and authorization
   - Protected routes and API calls

## 🚀 Quick Setup

### Step 1: Get Google AI API Key

1. **Go to Google AI Studio**
   - Visit: https://aistudio.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key" or "Get API Key"
   - Copy the generated API key
   - Example: `AIzaSyAbc123...`

3. **Important Notes:**
   - The API key is free to use with limits
   - You can set usage quotas in Google Cloud Console
   - Keep your API key secure (don't commit to git)

### Step 2: Add API Key to Environment Variables

Add your Google AI API key to `.env.local`:

```bash
# Open .env.local and add:
GOOGLE_GENAI_API_KEY=your_api_key_here
```

**Full `.env.local` should now contain:**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aW1wcm92ZWQtZHJ1bS0zNS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_ulxGlYpGJ95hRg1bO4p11pxdjt072PIU2ytdxMokGhC8
GOOGLE_GENAI_API_KEY=AIzaSyAbc123...
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Run Backend Development Server

```bash
# Terminal 1: Run Next.js app
npm run dev

# Terminal 2: Run Genkit AI server (optional, for AI features)
npm run genkit:dev
```

**Note:** The Genkit server is optional for local development. Next.js Server Actions can call AI flows directly in production.

## 🧪 Testing the Backend

### Test AI Chat Support

1. Open your app at `http://localhost:3000`
2. Use the AI chat widget (if available)
3. Or test via browser console:

```javascript
fetch('/api/test-ai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'What tools are available?' })
})
```

### Test Audio Transcription

The audio transcription feature uses Google's Gemini 2.0 Flash model to convert audio to text.

### Test Smart Tool Suggestions

The tool suggestion feature analyzes user input and recommends relevant tools from your toolkit.

## 📁 Backend File Structure

```
src/
├── ai/
│   ├── genkit.ts              # Genkit AI configuration
│   ├── dev.ts                 # Development entry point
│   └── flows/
│       ├── ai-chat-support.ts          # AI chatbot
│       ├── smart-tool-suggestions.ts   # Tool recommendations
│       ├── audio-transcription.ts      # Audio to text
│       └── text-to-pdf.ts              # Text to PDF conversion
├── app/
│   ├── actions.ts             # Server Actions (API handlers)
│   └── ...
└── middleware.ts              # Authentication middleware
```

## 🔧 Backend Configuration

### Genkit Configuration (`src/ai/genkit.ts`)

```typescript
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',  // Using Gemini 2.0 Flash
});
```

### Available AI Models

You can change the model in `src/ai/genkit.ts`:

- `googleai/gemini-2.0-flash` (default) - Fast and efficient
- `googleai/gemini-1.5-pro` - More capable
- `googleai/gemini-1.5-flash` - Alternative fast model

## 🌐 Deploying Backend to Vercel

### Step 1: Add Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your Clerk key | Production, Preview, Development |
| `CLERK_SECRET_KEY` | Your Clerk secret | Production, Preview, Development |
| `GOOGLE_GENAI_API_KEY` | Your Google AI key | Production, Preview, Development |

### Step 2: Deploy

```bash
# Commit your changes
git add .
git commit -m "Add backend configuration"
git push origin main

# Vercel will auto-deploy
```

### Step 3: Verify Deployment

1. Check build logs in Vercel dashboard
2. Test your deployed app's AI features
3. Monitor for any errors

## 🔐 Environment Variables Reference

### Required for Local Development

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Google AI (for Genkit flows)
GOOGLE_GENAI_API_KEY=AIzaSy...
```

### Required for Production (Vercel)

Same as local development. Add all three variables in Vercel dashboard.

## 🎨 Customizing Backend Features

### Add New AI Flow

1. Create a new file in `src/ai/flows/`
2. Define your flow using Genkit:

```typescript
'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MyFlowInputSchema = z.object({
  input: z.string(),
});

export const myFlow = ai.defineFlow({
  name: 'myFlow',
  inputSchema: MyFlowInputSchema,
  outputSchema: z.object({ result: z.string() }),
  async (input) => {
    // Your logic here
    return { result: 'output' };
  }
});
```

3. Export from `src/ai/dev.ts`:

```typescript
import './my-flow';
```

4. Create a Server Action in `src/app/actions.ts`:

```typescript
export async function handleMyFlow(input: MyFlowInput) {
  const result = await myFlow(input);
  return result;
}
```

### Modify AI Prompts

Edit prompt templates in flow files:

```typescript
const prompt = ai.definePrompt({
  name: 'myPrompt',
  input: {schema: InputSchema},
  output: {schema: OutputSchema},
  prompt: `Your custom prompt here with {{{variables}}}`,
});
```

## 🐛 Troubleshooting

### Issue: "API key not found"

**Solution:**
1. Verify `GOOGLE_GENAI_API_KEY` is in `.env.local`
2. Restart the development server
3. Ensure no spaces or quotes around the key

### Issue: AI features not working

**Solution:**
1. Check browser console for errors
2. Verify API key is valid in Google AI Studio
3. Check quota limits in Google Cloud Console
4. Verify environment variables are set in Vercel

### Issue: Server Actions failing

**Solution:**
1. Check `src/app/actions.ts` for proper "use server" directive
2. Verify imports are correct
3. Check browser network tab for errors
4. Review server logs in terminal

### Issue: Genkit server won't start

**Solution:**
```bash
# Ensure Genkit CLI is installed
npm install -g genkit-cli

# Or use npx
npx genkit start -- tsx src/ai/dev.ts
```

## 📚 Additional Resources

### Google Genkit Documentation
- [Genkit Docs](https://genkit.dev/)
- [Google AI Studio](https://aistudio.google.com/)
- [Gemini Models](https://ai.google.dev/models/gemini)

### Next.js Server Actions
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### Clerk Authentication
- See `CLERK_SETUP.md` for authentication setup
- [Clerk Docs](https://clerk.com/docs)

## 📋 Backend Checklist

Before deploying:

- [ ] Google AI API key obtained
- [ ] `GOOGLE_GENAI_API_KEY` added to `.env.local`
- [ ] Dependencies installed (`npm install`)
- [ ] Local development server runs (`npm run dev`)
- [ ] AI features tested locally
- [ ] Environment variables added to Vercel
- [ ] Production deployment verified

## 🎉 You're All Set!

Your backend is now configured and ready to power AI features in AlgroTools!

**Summary:**
- ✅ Next.js Server Actions configured
- ✅ Google Genkit AI integrated
- ✅ Clerk authentication ready
- ✅ AI flows defined and exported
- ⏳ Add `GOOGLE_GENAI_API_KEY` to start using AI features

