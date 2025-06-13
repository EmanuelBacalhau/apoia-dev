-- CreateTable
CREATE TABLE "TrendInsight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "searchGrowth" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "trendLabel" TEXT NOT NULL,
    "platforms" TEXT NOT NULL,
    "badgeColor" TEXT NOT NULL,
    "buttonLabel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrendInsight_pkey" PRIMARY KEY ("id")
);
