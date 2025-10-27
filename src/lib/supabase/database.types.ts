export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          preference_key: string;
          preference_value: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          preference_key: string;
          preference_value: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          preference_key?: string;
          preference_value?: string;
          updated_at?: string;
        };
      };
      tool_usage: {
        Row: {
          id: string;
          user_id: string;
          tool_slug: string;
          usage_count: number;
          last_used_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tool_slug: string;
          usage_count?: number;
          last_used_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tool_slug?: string;
          usage_count?: number;
          last_used_at?: string | null;
          updated_at?: string;
        };
      };
      user_history: {
        Row: {
          id: string;
          user_id: string;
          type: 'chat' | 'file';
          title: string | null;
          content: string | null;
          file_url: string | null;
          file_name: string | null;
          file_size: number | null;
          metadata: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'chat' | 'file';
          title?: string | null;
          content?: string | null;
          file_url?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          metadata?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'chat' | 'file';
          title?: string | null;
          content?: string | null;
          file_url?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          metadata?: any | null;
        };
      };
    };
  };
}

