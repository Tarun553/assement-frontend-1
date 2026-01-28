import { GoogleGenAI, Type } from "@google/genai";
import type { FormField } from "../types";

// Helper to generate a unique ID (since AI won't generate perfect UUIDs usually)
const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateFormWithGemini = async (
  prompt: string,
): Promise<FormField[]> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY not found in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a form structure for the following request: "${prompt}". 
      Ensure the fields are appropriate for the user's request. 
      For 'select' types, provide at least 3 reasonable options.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: {
                type: Type.STRING,
                enum: [
                  "text",
                  "number",
                  "email",
                  "select",
                  "checkbox",
                  "date",
                  "textarea",
                ],
              },
              label: { type: Type.STRING },
              placeholder: { type: Type.STRING },
              required: { type: Type.BOOLEAN },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ["type", "label", "required"],
          },
        },
      },
    });

    const rawFields = JSON.parse(response.text || "[]");

    // Post-process to add IDs and ensure safety
    return rawFields.map((field: FormField) => ({
      ...field,
      id: generateId(),
      options: field.options || [],
    }));
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate form. Please try again.");
  }
};
