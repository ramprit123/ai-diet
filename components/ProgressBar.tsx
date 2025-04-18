import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number;
  color: string;
  height?: number;
}

export function ProgressBar({ progress, color, height = 8 }: ProgressBarProps) {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, progress));
  
  return (
    <View style={[styles.container, { height }]}>
      <View 
        style={[
          styles.progressFill, 
          { width: `${clampedProgress * 100}%`, backgroundColor: color, height }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 4,
  },
});