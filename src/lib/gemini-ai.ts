"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateContents(prompt: string) {
  const { text } = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  if (!text) {
    return;
  }

  const cleanedText = text.replace(/```json|```/g, "").trim();
  const json = JSON.parse(cleanedText);

  return json;
}
