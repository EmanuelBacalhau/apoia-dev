import { generateContents } from "@/lib/gemini-ai";
import {
  GenerateContentParams,
  generatePromptForContent,
} from "@/prompts/generate-prompt-for-content";

export interface CompleteContentPost {
  title: string;
  mainText: string;
  hashtags: string[];
  callToAction: string;
  bestTime: string;
  visualSuggestion: {
    type: string;
    description: string;
    style: string;
    suggestedColors: string[];
    dimensions: string;
  };
  variations: {
    short: string;
    question: string;
  };
  engagementRate: string;
  trendingScore: number;
}

export async function generateContent(
  props: GenerateContentParams
): Promise<CompleteContentPost> {
  const prompt = generatePromptForContent(props);

  const content = await generateContents(prompt);

  console.log("Generated content:", content);

  return content as CompleteContentPost;
}
