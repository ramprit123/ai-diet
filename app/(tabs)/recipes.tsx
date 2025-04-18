import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Clock, Users, ChefHat } from 'lucide-react-native';

export default function RecipesScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <Text style={styles.title}>Recipes</Text>
          <View style={styles.searchContainer}>
            <Search color="#a0a0a0" size={20} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search recipes..."
              placeholderTextColor="#a0a0a0"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Popular Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          <CategoryChip label="Breakfast" active />
          <CategoryChip label="Lunch" />
          <CategoryChip label="Dinner" />
          <CategoryChip label="Snacks" />
          <CategoryChip label="Desserts" />
        </ScrollView>

        <Text style={styles.sectionTitle}>Trending Recipes</Text>
        <View style={styles.recipesGrid}>
          <RecipeCard 
            name="Mediterranean Bowl"
            time={25}
            servings={2}
            difficulty="Medium"
            imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
          />
          <RecipeCard 
            name="Acai Smoothie Bowl"
            time={15}
            servings={1}
            difficulty="Easy"
            imageUrl="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg"
          />
          <RecipeCard 
            name="Grilled Salmon"
            time={30}
            servings={4}
            difficulty="Medium"
            imageUrl="https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg"
          />
          <RecipeCard 
            name="Quinoa Salad"
            time={20}
            servings={2}
            difficulty="Easy"
            imageUrl="https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryChip({ label, active = false }) {
  return (
    <TouchableOpacity style={[styles.categoryChip, active && styles.categoryChipActive]}>
      <Text style={[styles.categoryLabel, active && styles.categoryLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

interface RecipeCardProps {
  name: string;
  time: number;
  servings: number;
  difficulty: string;
  imageUrl: string;
}

function RecipeCard({ name, time, servings, difficulty, imageUrl }: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.recipeCard}>
      <Image source={{ uri: imageUrl }} style={styles.recipeImage} />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeName}>{name}</Text>
        <View style={styles.recipeDetails}>
          <View style={styles.detailItem}>
            <Clock size={14} color="#a0a0a0" />
            <Text style={styles.detailText}>{time}m</Text>
          </View>
          <View style={styles.detailItem}>
            <Users size={14} color="#a0a0a0" />
            <Text style={styles.detailText}>{servings}</Text>
          </View>
          <View style={styles.detailItem}>
            <ChefHat size={14} color="#a0a0a0" />
            <Text style={styles.detailText}>{difficulty}</Text>
          </View>
        </View>
      </View>
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
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: 'white',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'white',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#5ee6b8',
  },
  categoryLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#a0a0a0',
  },
  categoryLabelActive: {
    color: '#121212',
  },
  recipesGrid: {
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 16,
  },
  recipeCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeContent: {
    padding: 16,
  },
  recipeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  recipeDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
  },
});