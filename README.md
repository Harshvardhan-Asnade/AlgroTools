# AlgroTools

Your All-in-One Toolkit powered by AI.

A comprehensive suite of developer tools for PDF processing, image manipulation, text utilities, and more.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Clerk account (for authentication)
- Supabase account (for database)
- Google AI API key (for AI features - optional)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd AlgroTools
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

**Required environment variables:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Get from [Clerk Dashboard](https://dashboard.clerk.com/)
- `CLERK_SECRET_KEY` - Get from Clerk Dashboard
- `NEXT_PUBLIC_SUPABASE_URL` - Get from [Supabase Dashboard](https://supabase.com/dashboard)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Get from Supabase Dashboard
- `SUPABASE_SERVICE_ROLE_KEY` - Get from Supabase Dashboard
- `GOOGLE_GENAI_API_KEY` - Get from [Google AI Studio](https://aistudio.google.com/app/apikey) (optional, for AI features)

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📚 Documentation

- **[Supabase Integration Guide](SUPABASE_INTEGRATION.md)** - Set up Supabase database (Start here!)
- **[Backend Setup Guide](BACKEND_SETUP.md)** - Configure AI features and backend services
- **[Clerk Setup Guide](CLERK_SETUP.md)** - Set up authentication
- **[Vercel Deployment Guide](VERCEL_DEPLOYMENT.md)** - Deploy to production

## 🛠️ Available Tools

### PDF Tools
- Text to PDF Converter
- Image to PDF Converter

### Text Tools
- Case Converter
- Word Counter
- Remove Extra Spaces
- JSON Formatter

### Image Tools
- QR Code Generator
- Base64 Encoder/Decoder

### Development Tools
- URL Encoder/Decoder
- Timestamp Converter
- Case Converter
- And more...

### AI Tools
- AI Chatbot Assistant
- Smart Tool Suggestions
- Audio Transcription

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Authentication:** Clerk
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Genkit with Gemini 2.0 Flash
- **Deployment:** Vercel

## 📖 Development

```bash
# Run development server
npm run dev

# Run Genkit AI server (optional)
npm run genkit:dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🌐 Deployment

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy to Vercel:**

1. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `GOOGLE_GENAI_API_KEY`

2. Push to main branch (auto-deploys)

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `GOOGLE_GENAI_API_KEY` | Google AI API key for Genkit | Optional (for AI features) |

## 📝 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]

## 📧 Contact

[Add your contact information here]
