import { GoogleGenerativeAI } from '@google/generative-ai';

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request): Promise<Response> {
  try {
    const { ingredients, cuisine, dietaryPreferences } = await req.json();

    const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Generate a detailed recipe based on the following input:
    - Ingredients: ${ingredients}
    - Cuisine style: ${cuisine}
    - Dietary preferences: ${dietaryPreferences}

    Provide the response in the following JSON format:
    {
      "recipe": {
        "title": "Creative recipe name",
        "description": "Brief description of the dish",
        "cuisineType": "Type of cuisine",
        "dietaryInfo": ["List of applicable dietary tags"],
        "prepTime": "Preparation time in minutes",
        "cookTime": "Cooking time in minutes",
        "totalTime": "Total time in minutes",
        "servings": "Number of servings",
        "ingredients": [
          {
            "name": "Ingredient name",
            "amount": "Quantity",
            "unit": "Measurement unit",
            "notes": "Preparation notes if needed"
          }
        ],
        "instructions": [
          {
            "step": 1,
            "instruction": "Detailed step-by-step instruction",
            "tips": "Optional tips for this step"
          }
        ],
        "nutritionalInfo": {
          "perServing": {
            "calories": "Estimated calories",
            "protein": "Protein in grams",
            "carbs": "Carbs in grams",
            "fat": "Fat in grams"
          }
        },
        "servingSuggestions": "How to best serve this dish",
        "storageTips": "How to store leftovers",
        "variations": "Possible variations or substitutions"
      }
    }

    Guidelines:
    - Be creative with the recipe name and description
    - Provide precise measurements and clear instructions
    - Include useful tips and variations
    - Give realistic nutritional estimates
    - Ensure the response is valid JSON without any markdown formatting
    - Make the recipe practical for home cooking`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean up the response text to remove any markdown formatting
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

    // Parse the response text as JSON to validate the format
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (error) {
      console.error('Failed to parse Gemini response as JSON:', error);
      throw new Error('Invalid response format from Gemini');
    }

    return Response.json({
      success: true,
      data: parsedResponse,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to generate recipe' }, { status: 500 });
  }
}


// {
//   "ingredients": "chicken, rice, vegetables",
//   "cuisine": "Asian",
//   "dietaryPreferences": "low-carb"
// }