import { View, Text, StyleSheet, Image } from 'react-native';

export function MealPlan() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Meal Plan</Text>
      <View style={styles.mealsContainer}>
        <MealItem 
          time="7:30 AM"
          name="Avocado Toast with Eggs"
          calories={320}
          imageUrl="https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
        <MealItem 
          time="12:30 PM"
          name="Grilled Chicken Salad"
          calories={450} 
          imageUrl="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
        <MealItem 
          time="7:00 PM"
          name="Salmon with Quinoa"
          calories={580}
          imageUrl="https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        />
      </View>
    </View>
  );
}

interface MealItemProps {
  time: string;
  name: string;
  calories: number;
  imageUrl: string;
}

function MealItem({ time, name, calories, imageUrl }: MealItemProps) {
  return (
    <View style={styles.mealItem}>
      <Image source={{ uri: imageUrl }} style={styles.mealImage} />
      <View style={styles.mealInfo}>
        <Text style={styles.mealTime}>{time}</Text>
        <Text style={styles.mealName}>{name}</Text>
      </View>
      <Text style={styles.calories}>{calories} {'\n'}kcal</Text>
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
  mealsContainer: {
    gap: 8,
  },
  mealItem: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  mealImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  mealInfo: {
    flex: 1,
  },
  mealTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  mealName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
  },
  calories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#5ee6b8',
    textAlign: 'right',
  },
});