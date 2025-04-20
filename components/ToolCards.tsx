import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function ToolCards() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.cardsRow}>
        <ToolCard
          onPress={() => router.push('/generate-ai-recipe')}
          title="Smart Recipe Generator"
          description="Generate personalized recipes"
          icon={<Sparkles color="#5ee6b8" size={24} />}
        />
        <ToolCard
          title="Meal Analysis"
          description="Scan food for instant nutrition info"
          icon={<Camera color="#5ee6b8" size={24} />}
        />
      </View>
    </View>
  );
}

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

function ToolCard({ title, description, icon, onPress }: ToolCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
    height: 160,
  },
  iconContainer: {
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#5ee6b8',
    marginBottom: 8,
  },
  cardDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
  },
});
