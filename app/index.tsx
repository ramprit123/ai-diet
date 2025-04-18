import CustomSplashScreen from '@/components/SplashScreen'; 
import { useAuth } from '@/lib/auth-context';
import { useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

const InitialLoadingPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!authLoading && router) {
      const inAuthGroup = segments[0] === '(auth)';
      if (user && inAuthGroup) {
        router.replace('/(tabs)'); // Or your main authenticated route group
      }
    }
  }, [user, authLoading, segments, router]);
  return <CustomSplashScreen />;
};

export default InitialLoadingPage;