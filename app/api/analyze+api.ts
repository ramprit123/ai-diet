import { GoogleGenerativeAI } from '@google/generative-ai';

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request): Promise<Response> {
  try {
    // Validate request
    if (!req.body) {
      return Response.json(
        { error: 'Request body is missing' },
        { status: 400 }
      );
    }

    const { image } = await req.json();
    if (!image) {
      return Response.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    const model = genAi.getGenerativeModel({
      model: 'gemini-pro-vision',
      generationConfig: {
        temperature: 0.5,
        topP: 0.95,
        maxOutputTokens: 2000,
      },
    });

    const prompt = `Act as a professional nutritionist analyzing a food image. Provide:

    1. Detailed nutritional analysis
    2. Health impact assessment
    3. Personalized recommendations

    Return in this exact JSON format:
    {
      "analysis": {
        "foodIdentification": {
          "name": "Food name",
          "description": "Detailed description including ingredients if visible",
          "confidenceScore": 0-100,
          "components": ["List of identifiable components"]
        },
        "nutritionalData": {
          "estimatedPortion": {
            "weight": "grams",
            "dimensions": "size description if applicable"
          },
          "perPortion": {
            "calories": { "value": number, "accuracy": "low/medium/high" },
            "macros": {
              "protein": { "value": number, "unit": "g" },
              "carbs": { "value": number, "unit": "g", "fiber": number, "sugars": number },
              "fat": { "value": number, "unit": "g", "saturated": number, "unsaturated": number }
            },
            "micronutrients": {
              "sodium": { "value": number, "unit": "mg" },
              "cholesterol": { "value": number, "unit": "mg" },
              "keyVitamins": ["List any identifiable vitamins"],
              "keyMinerals": ["List any identifiable minerals"]
            }
          },
          "per100g": {
            // Same structure as perPortion
          }
        },
        "healthAssessment": {
          "positiveAttributes": ["List of beneficial nutritional aspects"],
          "concerns": ["List of potential health concerns"],
          "allergens": ["List of potential allergens"],
          "dietaryCompatibility": {
            "vegetarian": boolean,
            "vegan": boolean,
            "glutenFree": boolean,
            "keto": boolean,
            "paleo": boolean
          }
        }
      },
      "recommendations": {
        "servingSuggestions": "Ideal serving size recommendations",
        "pairings": ["List of foods that would complement nutritionally"],
        "alternatives": ["Healthier alternative suggestions if applicable"],
        "consumptionFrequency": "Recommended frequency of consumption",
        "preparationTips": ["Tips for healthier preparation methods"],
        "targetGroups": {
          "beneficialFor": ["List of groups who would benefit"],
          "cautionFor": ["List of groups who should consume cautiously"]
        }
      },
      "metadata": {
        "analysisTimestamp": "ISO8601 timestamp",
        "dataSources": "Nutritional databases used for reference",
        "disclaimer": "Estimates based on visual analysis only"
      }
    }

    Guidelines:
    - Be extremely specific about food identification
    - Provide confidence levels for estimations
    - Include both positive and negative health aspects
    - Offer practical, actionable recommendations
    - Use professional nutritional databases for reference values
    - Maintain strict JSON format without any markdown`;

    // Process the image and generate content
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;

    if (!response.text) {
      throw new Error('Empty response from Gemini API');
    }

    // Clean and parse response
    const cleanedText = response
      .text()
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (error) {
      console.error(
        'JSON parsing error:',
        error,
        'Response text:',
        cleanedText
      );
      throw new Error('Failed to parse API response');
    }

    // Validate response structure
    if (!parsedResponse.analysis || !parsedResponse.recommendations) {
      throw new Error('Invalid response structure from Gemini');
    }

    // Add server-side metadata
    parsedResponse.metadata = {
      ...parsedResponse.metadata,
      generatedAt: new Date().toISOString(),
      apiVersion: '1.2',
      modelUsed: 'gemini-pro-vision',
    };

    return Response.json({
      success: true,
      data: parsedResponse,
      warnings: response.candidates?.[0]?.safetyRatings
        ? response.candidates[0].safetyRatings.filter(
            (r) => r.probability !== 'NEGLIGIBLE'
          )
        : [],
    });
  } catch (error) {
    console.error('API Error:', error);
    // Determine if the error is an Error object
    const isError = error instanceof Error;
    const errorMessage = isError ? error.message : 'An unknown error occurred';
    const errorDetails =
      process.env.NODE_ENV === 'development'
        ? isError
          ? error.stack
          : JSON.stringify(error)
        : undefined;

    const statusCode = isError && error.message.includes('parse') ? 502 : 500;
    const clientErrorMessage =
      statusCode === 502
        ? 'Failed to process API response'
        : 'Internal server error';

    return Response.json(
      {
        error: clientErrorMessage,
        details: errorDetails,
      },
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
          'X-Error-Type': isError ? error.name : 'UnknownError',
        },
      }
    );
  }
}
// This is response of this API
// {
//   "analysis": {
//     "foodIdentification": {
//       "name": "Grilled Chicken Salad",
//       "description": "Mixed greens with grilled chicken breast, cherry tomatoes, cucumbers, and olive oil dressing",
//       "confidenceScore": 85,
//       "components": ["chicken breast", "lettuce", "tomatoes", "cucumbers", "olive oil"]
//     },
//     "nutritionalData": {
//       "estimatedPortion": {
//         "weight": 350,
//         "dimensions": "Standard dinner plate"
//       },
//       "perPortion": {
//         "calories": { "value": 420, "accuracy": "medium" },
//         "macros": {
//           "protein": { "value": 35, "unit": "g" },
//           "carbs": { "value": 12, "unit": "g", "fiber": 4, "sugars": 6 },
//           "fat": { "value": 25, "unit": "g", "saturated": 4, "unsaturated": 18 }
//         },
//         "micronutrients": {
//           "sodium": { "value": 320, "unit": "mg" },
//           "cholesterol": { "value": 85, "unit": "mg" },
//           "keyVitamins": ["A", "C", "K"],
//           "keyMinerals": ["iron", "potassium"]
//         }
//       }
//     }
//   },
//   "recommendations": {
//     "servingSuggestions": "Consider adding quinoa for complete protein",
//     "pairings": ["Avocado", "Walnuts"],
//     "consumptionFrequency": "3-4 times weekly"
//   }
// }