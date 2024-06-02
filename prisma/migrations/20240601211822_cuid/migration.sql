-- CreateTable
CREATE TABLE "FixedExpense" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dueDate" TEXT NOT NULL,
    "fixedExpensesId" TEXT NOT NULL,

    CONSTRAINT "FixedExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedExpenses" (
    "id" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "targetPercentage" DOUBLE PRECISION NOT NULL,
    "targetPercentageValue" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "targetPercentageMonthValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FixedExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Percentages" (
    "id" TEXT NOT NULL,
    "fixedExpensesPercentage" DOUBLE PRECISION NOT NULL,
    "variableExpensesPercentage" DOUBLE PRECISION NOT NULL,
    "investmentsPercentage" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Percentages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariableExpense" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dueDate" TEXT NOT NULL,
    "variableExpensesId" TEXT NOT NULL,

    CONSTRAINT "VariableExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariableExpenses" (
    "id" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "targetPercentage" DOUBLE PRECISION NOT NULL,
    "targetPercentageValue" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "targetPercentageMonthValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "VariableExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FixedExpenses_userId_key" ON "FixedExpenses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Percentages_userId_key" ON "Percentages"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VariableExpenses_userId_key" ON "VariableExpenses"("userId");

-- AddForeignKey
ALTER TABLE "FixedExpense" ADD CONSTRAINT "FixedExpense_fixedExpensesId_fkey" FOREIGN KEY ("fixedExpensesId") REFERENCES "FixedExpenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedExpenses" ADD CONSTRAINT "FixedExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Percentages" ADD CONSTRAINT "Percentages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariableExpense" ADD CONSTRAINT "VariableExpense_variableExpensesId_fkey" FOREIGN KEY ("variableExpensesId") REFERENCES "VariableExpenses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariableExpenses" ADD CONSTRAINT "VariableExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
