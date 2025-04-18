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
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/signin');
      }
    }
  }, [user, authLoading, segments, router]);
  return <CustomSplashScreen />;
};

export default InitialLoadingPage;