import { Header } from '@/components/Header';
import { MealPlan } from '@/components/MealPlan';
import { NutritionProgress } from '@/components/NutritionProgress';
import { RecipeRecommendations } from '@/components/RecipeRecommendations';
import { ToolCards } from '@/components/ToolCards';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
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
