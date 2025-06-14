/*
  Warnings:

  - Added the required column `contentType` to the `TrendInsight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keys` to the `TrendInsight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tom` to the `TrendInsight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrendInsight" ADD COLUMN     "contentType" TEXT NOT NULL,
ADD COLUMN     "keys" TEXT NOT NULL,
ADD COLUMN     "tom" TEXT NOT NULL;
