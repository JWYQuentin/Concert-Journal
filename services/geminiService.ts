import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeConcertMemory = async (notes: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this concert memory. Memory: "${notes}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A short summary (max 20 words)."
            },
            emojis: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 emoji characters that represent the vibe."
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 3 string tags (e.g., 'Euphoric', 'Nostalgic')."
            }
          },
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};