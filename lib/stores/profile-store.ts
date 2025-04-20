import { create } from 'zustand';
import { supabase } from '../supabase';

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
}

interface UserStats {
  workouts_count: number;
  recipes_count: number;
  calories_burned: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
}

interface ProfileState {
  profile: UserProfile | null;
  stats: UserStats | null;
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAchievements: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  stats: null,
  achievements: [],
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      set({ profile });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch profile' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data: stats, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      set({ stats });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch stats' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAchievements: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data: achievements, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', user.id);

      if (error) throw error;
      set({ achievements: achievements || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch achievements' });
    } finally {
      set({ isLoading: false });
    }
  },
}));