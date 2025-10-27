-- ============================================
-- Supabase Database Schema for AlgroTools
-- ============================================
-- This schema integrates with Clerk authentication
-- Run this SQL in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Users Table (synced from Clerk)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on clerk_user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ============================================
-- User Preferences Table
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  preference_key TEXT NOT NULL,
  preference_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, preference_key)
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- ============================================
-- Tool Usage Tracking Table
-- ============================================
CREATE TABLE IF NOT EXISTS tool_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tool_slug TEXT NOT NULL,
  usage_count INTEGER DEFAULT 1,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, tool_slug)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_slug ON tool_usage(tool_slug);
CREATE INDEX IF NOT EXISTS idx_tool_usage_count ON tool_usage(usage_count DESC);

-- ============================================
-- User History Table (Chat & File Upload History)
-- ============================================
CREATE TABLE IF NOT EXISTS user_history (
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

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_history_user_id ON user_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_history_type ON user_history(type);
CREATE INDEX IF NOT EXISTS idx_user_history_created_at ON user_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_history_user_type ON user_history(user_id, type);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_history ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies
-- ============================================

-- Users can read their own data
CREATE POLICY "Users can read their own data"
  ON users FOR SELECT
  USING (auth.uid()::text = clerk_user_id);

-- Users can update their own data
CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid()::text = clerk_user_id);

-- User preferences policies
CREATE POLICY "Users can manage their own preferences"
  ON user_preferences FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_preferences.user_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- Tool usage policies
CREATE POLICY "Users can manage their own tool usage"
  ON tool_usage FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = tool_usage.user_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- User history policies
CREATE POLICY "Users can view their own history"
  ON user_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_history.user_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert their own history"
  ON user_history FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_history.user_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can delete their own history"
  ON user_history FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = user_history.user_id
      AND users.clerk_user_id = auth.uid()::text
    )
  );

-- ============================================
-- Functions and Triggers
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at automatically
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tool_usage_updated_at
  BEFORE UPDATE ON tool_usage
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample Data (Optional)
-- ============================================
-- Uncomment to add sample data for testing
-- INSERT INTO users (clerk_user_id, email, full_name)
-- VALUES 
--   ('user_sample_1', 'test@example.com', 'Test User');

