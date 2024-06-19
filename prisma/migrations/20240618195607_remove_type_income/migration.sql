/*
  Warnings:

  - You are about to drop the column `typeIncomeId` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the `TypeIncome` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_typeIncomeId_fkey";

-- DropForeignKey
ALTER TABLE "TypeIncome" DROP CONSTRAINT "TypeIncome_userId_fkey";

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "typeIncomeId";

-- DropTable
DROP TABLE "TypeIncome";
