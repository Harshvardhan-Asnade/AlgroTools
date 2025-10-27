'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

/**
 * Automatically syncs Clerk user to Supabase when user signs in
 */
export function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Sync user to Supabase
    const syncUser = async () => {
      try {
        await fetch('/api/sync-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Failed to sync user to Supabase:', error);
      }
    };

    syncUser();
  }, [user, isLoaded]);

  return null; // This component doesn't render anything
}

