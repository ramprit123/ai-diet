import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressProps {
  value: number;
  maxValue: number;
  radius: number;
  strokeWidth: number;
}

export function CircularProgress({ value, maxValue, radius, strokeWidth }: CircularProgressProps) {
  const percentage = value / maxValue;
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDashoffset = circumference * (1 - percentage);
  
  const diameter = radius * 2;
  const center = radius + strokeWidth;
  const viewBoxSize = center * 2;

  return (
    <View style={styles.container}>
      <Svg width={viewBoxSize} height={viewBoxSize} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#2a2a2a"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#5ee6b8"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progressStrokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${center}, ${center})`}
        />
      </Svg>
      <View style={[styles.textContainer, { width: diameter, height: diameter }]}>
        <Text style={styles.valueText}>{value.toLocaleString()}</Text>
        <Text style={styles.maxValueText}>/ {maxValue.toLocaleString()} kcal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#5ee6b8',
  },
  maxValueText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#a0a0a0',
  },
});