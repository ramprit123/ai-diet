import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';

export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  const [showResults, setShowResults] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Scan Food</Text>
          <Text style={styles.subtitle}>Take a photo of your food to get instant nutrition information</Text>
        </View>

        {!showResults ? (
          <>
            <View style={styles.cameraPreview}>
              <Camera color="#5ee6b8" size={48} />
              <Text style={styles.cameraText}>Camera preview will appear here</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setShowResults(true)}>
                <Camera color="white" size={24} />
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                <ImageIcon color="#5ee6b8" size={24} />
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Upload Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recentScans}>
              <Text style={styles.recentTitle}>Recent Scans</Text>
              <View style={styles.scansGrid}>
                <RecentScanItem 
                  imageUrl="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                  name="Mediterranean Bowl"
                  calories={420}
                />
                <RecentScanItem 
                  imageUrl="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg"
                  name="Acai Bowl"
                  calories={380}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={styles.resultsContainer}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowResults(false)}
            >
              <X color="white" size={24} />
            </TouchableOpacity>

            <Image 
              source={{ uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" }}
              style={styles.resultImage}
            />

            <View style={styles.nutritionCard}>
              <Text style={styles.foodName}>Mediterranean Bowl</Text>
              
              <View style={styles.nutritionGrid}>
                <NutritionItem label="Calories" value="420" unit="kcal" />
                <NutritionItem label="Protein" value="22" unit="g" />
                <NutritionItem label="Carbs" value="48" unit="g" />
                <NutritionItem label="Fat" value="18" unit="g" />
              </View>

              <TouchableOpacity style={styles.logButton}>
                <Text style={styles.logButtonText}>Log This Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

interface RecentScanItemProps {
  imageUrl: string;
  name: string;
  calories: number;
}

function RecentScanItem({ imageUrl, name, calories }: RecentScanItemProps) {
  return (
    <TouchableOpacity style={styles.scanItem}>
      <Image source={{ uri: imageUrl }} style={styles.scanImage} />
      <View style={styles.scanInfo}>
        <Text style={styles.scanName}>{name}</Text>
        <Text style={styles.scanCalories}>{calories} kcal</Text>
      </View>
    </TouchableOpacity>
  );
}

interface NutritionItemProps {
  label: string;
  value: string;
  unit: string;
}

function NutritionItem({ label, value, unit }: NutritionItemProps) {
  return (
    <View style={styles.nutritionItem}>
      <Text style={styles.nutritionValue}>{value}</Text>
      <Text style={styles.nutritionUnit}>{unit}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
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
  cameraPreview: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    aspectRatio: 3/4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  cameraText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#a0a0a0',
    marginTop: 16,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#5ee6b8',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5ee6b8',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  secondaryButtonText: {
    color: '#5ee6b8',
  },
  recentScans: {
    flex: 1,
  },
  recentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  scansGrid: {
    gap: 12,
  },
  scanItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  scanImage: {
    width: 80,
    height: 80,
  },
  scanInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  scanName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  scanCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#5ee6b8',
  },
  resultsContainer: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 16,
  },
  resultImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 24,
  },
  nutritionCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
  },
  foodName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: 'white',
    marginBottom: 24,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#5ee6b8',
  },
  nutritionUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#5ee6b8',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#a0a0a0',
  },
  logButton: {
    backgroundColor: '#5ee6b8',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});