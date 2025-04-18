import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { ArrowRight } from 'lucide-react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert('Success', 'Please check your email for reset instructions');
      router.replace('/(auth)/signin');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <ArrowRight color="#5ee6b8" size={24} />
        </View>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your email to reset password</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#6e7781"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity
          style={[styles.resetButton, loading && styles.disabledButton]}
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text style={styles.resetButtonText}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Text>
        </TouchableOpacity>

        <View style={styles.signin}>
          <Text style={styles.signinText}>Remember your password? </Text>
          <Link href="/(auth)/signin" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#3a9176',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6e7781',
  },
  form: {
    gap: 16,
    marginTop: 32,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#5ee6b8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: '#000',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  link: {
    color: '#5ee6b8',
    fontFamily: 'Inter-Medium',
  },
  signin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  signinText: {
    color: '#6e7781',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
});
