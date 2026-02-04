
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getGameCommentary(outcome: 'win' | 'lose' | 'start' | 'complete', levelName: string, levelNum: number) {
  try {
    const prompt = outcome === 'win' 
      ? `The player just beat level ${levelNum} (${levelName}) of a high-stakes neon maze game. Give a short, encouraging, and witty 1-sentence remark.`
      : outcome === 'lose'
      ? `The player just hit a wall and lost level ${levelNum} (${levelName}). Give a short, snarky but fun 1-sentence remark about their shaky hands.`
      : outcome === 'complete'
      ? `The player completed ALL 6 levels of the maze! Give a legendary 1-sentence congratulation.`
      : `The player is starting level ${levelNum} (${levelName}). Give a short, intimidating 1-sentence warning.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "Stay focused!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return outcome === 'lose' ? "Oops! The walls are unforgiving." : "Good luck!";
  }
}
