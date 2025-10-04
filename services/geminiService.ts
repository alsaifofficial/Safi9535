import { GoogleGenAI } from "@google/genai";

// WARNING: Hardcoding API keys is not secure for production applications.
// This key is set directly for demonstration purposes based on user request.
// In a real application, use environment variables.
const API_KEY = "AIzaSyBh2mAxyInqTPiodH8dMVhvJ73BI3VlPjE";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateToolDescription(toolName: string, subcategory: string): Promise<string> {
  const prompt = `Create a concise, one-sentence marketing description for an AI tool.
  The description should be engaging and highlight its primary function.

  Tool Name: ${toolName}
  Subcategory: ${subcategory}
  
  Description:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating tool description:", error);
    return "Failed to generate AI description. Please write one manually.";
  }
}
