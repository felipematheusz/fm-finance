/*
  Warnings:

  - You are about to drop the column `salary` on the `User` table. All the data in the column will be lost.
  - Added the required column `salary` to the `Percentages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Percentages" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "salary";
