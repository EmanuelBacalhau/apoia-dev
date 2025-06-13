-- AlterTable
ALTER TABLE "TrendInsight" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "TrendInsight" ADD CONSTRAINT "TrendInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
