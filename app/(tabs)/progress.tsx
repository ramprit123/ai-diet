import { CircularProgress } from '@/components/CircularProgress';
import { ProgressBar } from '@/components/ProgressBar';
import { Dumbbell, Flame, Heart } from 'lucide-react-native';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.header]}>
          <Text style={styles.title}>Progress</Text>
          <Text style={styles.subtitle}>Track your fitness journey</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            icon={<Flame color="#5ee6b8" size={24} />}
            label="Calories Burned"
            value="486"
            target="600"
            progress={0.81}
          />
          <StatCard
            icon={<Dumbbell color="#5ee6b8" size={24} />}
            label="Protein Goal"
            value="82g"
            target="120g"
            progress={0.68}
          />
          <StatCard
            icon={<Heart color="#5ee6b8" size={24} />}
            label="Active Minutes"
            value="42"
            target="60"
            progress={0.7}
          />
        </View>

        <View style={styles.weeklyProgress}>
          <Text style={styles.sectionTitle}>Weekly Overview</Text>
          <View style={styles.calorieProgress}>
            <CircularProgress
              value={12450}
              maxValue={14000}
              radius={60}
              strokeWidth={10}
            />
            <View style={styles.weeklyStats}>
              <WeeklyStat label="Daily Average" value="1,779" unit="kcal" />
              <WeeklyStat label="Total Burned" value="4,890" unit="kcal" />
              <WeeklyStat label="Best Day" value="2,145" unit="kcal" />
            </View>
          </View>
        </View>

        <View style={styles.nutritionProgress}>
          <Text style={styles.sectionTitle}>Nutrition Goals</Text>
          <View style={styles.nutritionCard}>
            <NutritionGoal
              label="Protein"
              current={82}
              target={120}
              unit="g"
              color="#5ee6b8"
            />
            <NutritionGoal
              label="Carbs"
              current={180}
              target={250}
              unit="g"
              color="#5ee6b8"
            />
            <NutritionGoal
              label="Fat"
              current={45}
              target={65}
              unit="g"
              color="#5ee6b8"
            />
            <NutritionGoal
              label="Water"
              current={1.8}
              target={2.5}
              unit="L"
              color="#5ee6b8"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  target: string;
  progress: number;
}

function StatCard({ icon, label, value, target, progress }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        {icon}
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTarget}>Target: {target}</Text>
      <ProgressBar progress={progress} color="#5ee6b8" />
    </View>
  );
}

interface WeeklyStatProps {
  label: string;
  value: string;
  unit: string;
}

function WeeklyStat({ label, value, unit }: WeeklyStatProps) {
  return (
    <View style={styles.weeklyStat}>
      <Text style={styles.weeklyStatLabel}>{label}</Text>
      <Text style={styles.weeklyStatValue}>{value}</Text>
      <Text style={styles.weeklyStatUnit}>{unit}</Text>
    </View>
  );
}

interface NutritionGoalProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

function NutritionGoal({
  label,
  current,
  target,
  unit,
  color,
}: NutritionGoalProps) {
  const progress = current / target;

  return (
    <View style={styles.nutritionGoal}>
      <View style={styles.nutritionGoalHeader}>
        <Text style={styles.nutritionGoalLabel}>{label}</Text>
        <Text style={styles.nutritionGoalValue}>
          {current}{' '}
          <Text style={styles.nutritionGoalUnit}>
            / {target}
            {unit}
          </Text>
        </Text>
      </View>
      <ProgressBar progress={progress} color={color} />
    </View>
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
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#a0a0a0',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#a0a0a0',
  },
  statValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: 'white',
    marginBottom: 4,
  },
  statTarget: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 12,
  },
  weeklyProgress: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  calorieProgress: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklyStats: {
    flex: 1,
    marginLeft: 24,
  },
  weeklyStat: {
    marginBottom: 16,
  },
  weeklyStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  weeklyStatValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'white',
  },
  weeklyStatUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
  },
  nutritionProgress: {
    paddingHorizontal: 16,
  },
  nutritionCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
  },
  nutritionGoal: {
    marginBottom: 20,
  },
  nutritionGoalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nutritionGoalLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
  nutritionGoalValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#5ee6b8',
  },
  nutritionGoalUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
  },
});
