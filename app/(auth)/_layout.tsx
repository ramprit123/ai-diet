import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#121212' },
    }}>
      <Stack.Screen name="signup" />
      <Stack.Screen name="signin" />
    </Stack>
  );
}