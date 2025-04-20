import { create } from 'zustand';
import { supabase } from '../supabase';

interface UserProfile {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
}

interface UserStats {
  workout_count: number;
  recipe_count: number;
  total_calories: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  created_at: string;
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      set({ profile });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to fetch profile',
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    try {
      set({ isLoading: true, error: null });
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data: stats, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      set({ stats });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAchievements: async () => {
    try {
      set({ isLoading: true, error: null });
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');
      console.log(user.id);
      const { data: achievements, error } = await supabase
        .from('user_achievements')
        .select(
          `
          achievements (
            id,
            title,
            description,
            icon_name,
            created_at
          )
        `
        )
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedAchievements =
        achievements?.map((item) => item.achievements) || [];

      console.log('formattedAchievements', formattedAchievements);
      set({ achievements: formattedAchievements.flat() as Achievement[] });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch achievements',
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));