/*
  Warnings:

  - Added the required column `goalsPercentage` to the `Percentages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Percentages" ADD COLUMN     "goalsPercentage" DOUBLE PRECISION NOT NULL;
