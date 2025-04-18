import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from '@/components/CircularProgress';
import { ProgressBar } from '@/components/ProgressBar';

export function NutritionProgress() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Today's Progress</Text>
      <View style={styles.content}>
        <View style={styles.calorieCircleContainer}>
          <CircularProgress 
            value={1450} 
            maxValue={2000} 
            radius={50} 
            strokeWidth={8} 
          />
        </View>
        <View style={styles.macrosContainer}>
          <MacroProgressBar label="Protein" value={65} maxValue={150} color="#5ee6b8" />
          <MacroProgressBar label="Carbs" value={180} maxValue={300} color="#5ee6b8" />
          <MacroProgressBar label="Fat" value={48} maxValue={70} color="#5ee6b8" />
        </View>
      </View>
    </View>
  );
}

function MacroProgressBar({ label, value, maxValue, color }) {
  const progress = value / maxValue;
  
  return (
    <View style={styles.macroRow}>
      <View style={styles.macroLabelContainer}>
        <Text style={styles.macroLabel}>{label}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar progress={progress} color={color} />
      </View>
      <Text style={styles.macroValue}>{value}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'white',
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 16,
  },
  calorieCircleContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  macrosContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  macroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  macroLabelContainer: {
    width: 60,
  },
  macroLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#e0e0e0',
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  macroValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#5ee6b8',
    textAlign: 'right',
    width: 40,
  },
});