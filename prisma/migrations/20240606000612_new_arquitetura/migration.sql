/*
  Warnings:

  - You are about to drop the `FixedExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FixedExpenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Goals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Investment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Investments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Percentages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariableExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariableExpenses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `salary` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FixedExpense" DROP CONSTRAINT "FixedExpense_fixedExpensesId_fkey";

-- DropForeignKey
ALTER TABLE "FixedExpenses" DROP CONSTRAINT "FixedExpenses_userId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_goalsId_fkey";

-- DropForeignKey
ALTER TABLE "Goals" DROP CONSTRAINT "Goals_userId_fkey";

-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_investmentsId_fkey";

-- DropForeignKey
ALTER TABLE "Investments" DROP CONSTRAINT "Investments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Percentages" DROP CONSTRAINT "Percentages_userId_fkey";

-- DropForeignKey
ALTER TABLE "VariableExpense" DROP CONSTRAINT "VariableExpense_variableExpensesId_fkey";

-- DropForeignKey
ALTER TABLE "VariableExpenses" DROP CONSTRAINT "VariableExpenses_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "FixedExpense";

-- DropTable
DROP TABLE "FixedExpenses";

-- DropTable
DROP TABLE "Goal";

-- DropTable
DROP TABLE "Goals";

-- DropTable
DROP TABLE "Investment";

-- DropTable
DROP TABLE "Investments";

-- DropTable
DROP TABLE "Percentages";

-- DropTable
DROP TABLE "VariableExpense";

-- DropTable
DROP TABLE "VariableExpenses";

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "typeExpenseId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeExpense" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "targetPercentage" DOUBLE PRECISION NOT NULL,
    "targetPercentageValue" DOUBLE PRECISION NOT NULL,
    "targetPercentageMonthValue" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TypeExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Expense_typeExpenseId_key" ON "Expense"("typeExpenseId");

-- CreateIndex
CREATE UNIQUE INDEX "TypeExpense_userId_key" ON "TypeExpense"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userId_key" ON "Category"("userId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_typeExpenseId_fkey" FOREIGN KEY ("typeExpenseId") REFERENCES "TypeExpense"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeExpense" ADD CONSTRAINT "TypeExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
