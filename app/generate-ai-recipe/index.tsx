import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { ChefHat } from 'lucide-react-native';

const GenerateAIRecipe = () => {
  const [formData, setFormData] = useState({
    dietaryPreferences: '',
    ingredients: '',
    cookingTime: '',
    cuisineType: '',
  });
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    // TODO: Implement AI recipe generation logic
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <ChefHat color="#5ee6b8" size={24} />
        </View>
        <Text style={styles.title}>AI Recipe Generator</Text>
        <Text style={styles.subtitle}>Create personalized recipes with AI</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dietary Preferences</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., vegetarian, gluten-free"
            placeholderTextColor="#6e7781"
            value={formData.dietaryPreferences}
            onChangeText={(text) => setFormData({ ...formData, dietaryPreferences: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Main Ingredients</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., chicken, rice, vegetables"
            placeholderTextColor="#6e7781"
            value={formData.ingredients}
            onChangeText={(text) => setFormData({ ...formData, ingredients: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cooking Time (minutes)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 30"
            placeholderTextColor="#6e7781"
            keyboardType="numeric"
            value={formData.cookingTime}
            onChangeText={(text) => setFormData({ ...formData, cookingTime: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cuisine Type</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Italian, Asian, Mexican"
            placeholderTextColor="#6e7781"
            value={formData.cuisineType}
            onChangeText={(text) => setFormData({ ...formData, cuisineType: text })}
          />
        </View>

        <TouchableOpacity
          style={[styles.generateButton, loading && styles.disabledButton]}
          onPress={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.generateButtonText}>Generate Recipe</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6e7781',
    marginBottom: 32,
  },
  form: {
    padding: 20,
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#fff',
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  generateButton: {
    backgroundColor: '#5ee6b8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  generateButtonText: {
    color: '#000',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default GenerateAIRecipe;