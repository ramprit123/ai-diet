import { GoogleGenerativeAI } from '@google/generative-ai';

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request): Promise<Response> {
  try {
    const { 
      age,
      gender,
      weight,
      height,
      activityLevel,
      dietaryGoals,
      dietaryRestrictions,
      foodPreferences,
      timeframe
    } = await req.json();

    const model = genAi.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Create a personalized diet plan based on the following user inputs:
    - Age: ${age}
    - Gender: ${gender}
    - Current Weight: ${weight} kg
    - Height: ${height} cm
    - Activity Level: ${activityLevel}
    - Dietary Goals: ${dietaryGoals}
    - Dietary Restrictions: ${dietaryRestrictions}
    - Food Preferences: ${foodPreferences}
    - Timeframe: ${timeframe}

    Provide the response in the following comprehensive JSON format:
    {
      "dietPlan": {
        "overview": {
          "goal": "Primary dietary goal",
          "estimatedDailyCalories": "Calculated daily calorie target",
          "macronutrientSplit": {
            "protein": "Recommended protein intake in grams",
            "carbs": "Recommended carbs intake in grams",
            "fats": "Recommended fats intake in grams"
          },
          "keyNutritionalFocus": ["List of key nutrients to focus on"]
        },
        "dailyMealPlan": {
          "monday": [
            {
              "mealType": "Breakfast",
              "mealName": "Meal name",
              "description": "Meal description",
              "ingredients": ["List of ingredients"],
              "nutritionalInfo": {
                "calories": "Calorie count",
                "protein": "Protein in grams",
                "carbs": "Carbs in grams",
                "fats": "Fats in grams"
              },
              "preparationTime": "Time needed"
            }
          ],
          "tuesday": [...],
          "wednesday": [...],
          "thursday": [...],
          "friday": [...],
          "saturday": [...],
          "sunday": [...]
        },
        "shoppingList": {
          "proteins": ["List of protein sources needed"],
          "vegetables": ["List of vegetables needed"],
          "fruits": ["List of fruits needed"],
          "grains": ["List of grains needed"],
          "dairy": ["List of dairy products needed"],
          "other": ["Other items needed"]
        },
        "additionalRecommendations": {
          "hydration": "Hydration recommendations",
          "mealTiming": "Optimal meal timing advice",
          "supplements": ["Recommended supplements if any"],
          "exercisePairing": "Recommended exercise pairing"
        },
        "progressTracking": {
          "metricsToTrack": ["List of metrics to monitor"],
          "weeklyCheckpoints": "Key progress indicators"
        }
      }
    }

    Guidelines:
    1. Create a realistic, balanced meal plan tailored to the user's inputs
    2. Include varied meals throughout the week to prevent monotony
    3. Account for all dietary restrictions and preferences
    4. Provide precise nutritional information for each meal
    5. Make the shopping list comprehensive yet practical
    6. Include helpful lifestyle recommendations
    7. Ensure the response is valid JSON without markdown formatting
    8. Base recommendations on established nutritional science`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up the response
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

    // Validate JSON format
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      throw new Error('Invalid response format from Gemini');
    }

    return Response.json({
      success: true,
      data: parsedResponse,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ 
      error: 'Failed to generate diet plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// {
//   "age": 32,
//   "gender": "female",
//   "weight": 68,
//   "height": 165,
//   "activityLevel": "moderately active",
//   "dietaryGoals": "weight loss",
//   "dietaryRestrictions": ["lactose intolerant"],
//   "foodPreferences": ["vegetarian", "no seafood"],
//   "timeframe": "4 weeks"
// }