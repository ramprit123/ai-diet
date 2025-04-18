import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bitcoin as PlaceholderIcon } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <PlaceholderIcon size={64} color="#5ee6b8" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.title}>AI Diet Planner</Text>
        <Text style={styles.subtitle}>Your Smart Path to Healthy Eating</Text>
      </View>

      <View style={styles.getStartedContainer}>
        <TouchableOpacity style={[styles.signInButton]} onPress={() => router.push("/(auth)/signin")}>
          <Text style={styles.signInButtonText}>{'Get Started'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Version 2.0.1</Text>
        <Text style={styles.copyright}>© 2025 AI Diet Planner</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background, seems fine
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  signInButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#5ee6b8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1e1e1e', // Dark circle for logo background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8, // Spacing between text elements
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#fff', // White text
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    color: '#5ee6b8', // Accent color for the title
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#a0a0a0', // Slightly muted color for subtitle (adjusted from #6e7781 for potentially better contrast on dark bg)
    textAlign: 'center',
    marginTop: 4, // Added slight margin top for better spacing
  },
  footer: {
    position: 'absolute',
    bottom: 40, // Positioned at the bottom
    alignItems: 'center',
    gap: 4, // Spacing between version and copyright
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6e7781', // Grey color for footer text
  },
  copyright: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6e7781', // Grey color for footer text
  },
});
