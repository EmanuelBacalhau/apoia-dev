/*
  Warnings:

  - You are about to drop the column `buttonLabel` on the `TrendInsight` table. All the data in the column will be lost.
  - Added the required column `borderColor` to the `TrendInsight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrendInsight" DROP COLUMN "buttonLabel",
ADD COLUMN     "borderColor" TEXT NOT NULL;
