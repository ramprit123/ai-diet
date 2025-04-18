import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '@/components/Header';
import { NutritionProgress } from '@/components/NutritionProgress';
import { MealPlan } from '@/components/MealPlan';
import { RecipeRecommendations } from '@/components/RecipeRecommendations';
import { ToolCards } from '@/components/ToolCards';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <NutritionProgress />
        <MealPlan />
        <RecipeRecommendations />
        <ToolCards />
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
