import { AuthWrapper } from '@/components/AuthWrapper';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CrossIcon, EyeClosed, X } from 'lucide-react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthWrapper>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <StatusBar
          style="dark" // Light text (white)
        />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 200,
            presentation: 'card',
            animationTypeForReplace: 'push',
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
          <Stack.Screen
            name="generate-ai-recipe/index"
            options={{
              headerShown: true,
              title: 'Generate AI Recipe',
              animation: 'fade_from_bottom',
              presentation: 'modal',
              animationTypeForReplace: 'push',
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.dismiss()}>
                  <X size={24} color={'#5ee6b8'} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </SafeAreaView>
    </AuthWrapper>
  );
}
