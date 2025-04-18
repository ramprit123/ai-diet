import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Clock, Star } from 'lucide-react-native';

export function RecipeRecommendations() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommended Recipes</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <RecipeCard 
          name="Quinoa Buddha Bowl"
          time={25}
          difficulty="Easy"
          calories={420}
          imageUrl="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
        <RecipeCard 
          name="Green Smoothie Bowl"
          time={10}
          difficulty="Easy"
          calories={280}
          imageUrl="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
      </ScrollView>
    </View>
  );
}

interface RecipeCardProps {
  name: string;
  time: number;
  difficulty: string;
  calories: number;
  imageUrl: string;
}

function RecipeCard({ name, time, difficulty, calories, imageUrl }: RecipeCardProps) {
  return (
    <View style={styles.recipeCard}>
      <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
      <Text style={styles.recipeName}>{name}</Text>
      <View style={styles.recipeDetails}>
        <View style={styles.detailItem}>
          <Clock size={16} color="#a0a0a0" />
          <Text style={styles.detailText}>{time} min</Text>
        </View>
        <View style={styles.detailItem}>
          <Star size={16} color="#a0a0a0" />
          <Text style={styles.detailText}>{difficulty}</Text>
        </View>
      </View>
      <Text style={styles.recipeCalories}>{calories} kcal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  recipeCard: {
    width: 180,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  recipeImage: {
    width: '100%',
    height: 120,
  },
  recipeName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  recipeDetails: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
    marginLeft: 4,
  },
  recipeCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#5ee6b8',
    marginHorizontal: 12,
    marginBottom: 12,
  },
});