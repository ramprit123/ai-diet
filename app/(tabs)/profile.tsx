import { useAuth } from '@/lib/auth-context';
import { useProfileStore } from '@/lib/stores/profile-store';
import { useRouter } from 'expo-router';
import { Award, ChevronRight, Settings } from 'lucide-react-native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useEffect } from 'react';

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const {
    profile,
    stats,
    achievements,
    isLoading,
    error,
    fetchProfile,
    fetchStats,
    fetchAchievements,
  } = useProfileStore();

  useEffect(() => {
    fetchProfile();
    fetchStats();
    fetchAchievements();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.header]}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings color="white" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#5ee6b8" />
            ) : error ? (
              <Text style={[styles.bio, { color: '#ff4444' }]}>{error}</Text>
            ) : (
              <>
                <Image
                  source={{
                    uri:
                      profile?.avatar_url ||
                      'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
                  }}
                  style={styles.profileImage}
                />
                <Text style={styles.name}>{profile?.full_name || 'User'}</Text>
                <Text style={styles.bio}>
                  {profile?.bio || 'No bio available'}
                </Text>
              </>
            )}

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {stats?.workouts_count || 0}
                </Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {stats?.recipes_count || 0}
                </Text>
                <Text style={styles.statLabel}>Recipes</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statValue}>
                  {(stats?.calories_burned || 0).toLocaleString()}
                </Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsContainer}
          >
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                icon={<Award color="#5ee6b8" size={24} />}
                title={achievement.title}
                description={achievement.description}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsContainer}>
            <SettingsItem label="Personal Information" />
            <SettingsItem label="Notifications" />
            <SettingsItem label="Privacy" />
            <SettingsItem label="Help & Support" />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsContainer}>
            <TouchableOpacity
              style={[styles.settingsItem, { borderBottomWidth: 0 }]}
              onPress={() => {
                signOut();
                router.push('/(auth)/signin');
              }}
            >
              <Text style={[styles.settingsLabel, { color: '#ff4444' }]}>
                Sign Out
              </Text>
              <ChevronRight color="#ff4444" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface AchievementCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function AchievementCard({ icon, title, description }: AchievementCardProps) {
  return (
    <View style={styles.achievementCard}>
      <View style={styles.achievementIcon}>{icon}</View>
      <Text style={styles.achievementTitle}>{title}</Text>
      <Text style={styles.achievementDescription}>{description}</Text>
    </View>
  );
}

function SettingsItem({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.settingsItem}>
      <Text style={styles.settingsLabel}>{label}</Text>
      <ChevronRight color="#a0a0a0" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: 'white',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2a2a2a',
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#5ee6b8',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  achievementsContainer: {
    paddingRight: 16,
  },
  achievementCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 160,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
  },
  settingsContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  settingsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'white',
  },
});
