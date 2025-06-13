import { generateContents } from "@/lib/gemini-ai";
import { prisma } from "@/lib/prisma";
import { getTop3Trend } from "@/prompts/get-top-3-trend";

export async function getTopMy3Trend(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return;
  }

  const trendInsightCreatedToDay = await prisma.trendInsight.findMany({
    where: {
      userId: user.id,
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  if (trendInsightCreatedToDay.length > 0) {
    return trendInsightCreatedToDay.map((card) => ({
      title: card.title,
      searchGrowth: card.searchGrowth,
      competition: card.competition,
      platforms: card.platforms,
      badgeColor: card.badgeColor,
      borderColor: card.borderColor,
      trendLabel: card.trendLabel,
    }));
  }

  const prompt = getTop3Trend(user);

  const trends = await generateContents(prompt);

  if (!trends || !Array.isArray(trends)) {
    return;
  }

  await prisma.trendInsight.createMany({
    data: trends.map((trend) => ({
      title: trend.title,
      searchGrowth: trend.searchGrowth,
      competition: trend.competition,
      platforms: trend.platforms.join(","),
      badgeColor: trend.badgeColor,
      borderColor: trend.borderColor,
      trendLabel: trend.trendLabel,
      userId: user.id,
    })),
  });

  return trends.map((trend) => ({
    title: trend.title,
    searchGrowth: trend.searchGrowth,
    competition: trend.competition,
    platforms: trend.platforms,
    badgeColor: trend.badgeColor,
    borderColor: trend.borderColor,
    trendLabel: trend.trendLabel,
  }));
}
