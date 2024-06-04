-- CreateTable
CREATE TABLE "Investment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dueDate" TEXT NOT NULL,
    "investmentsId" TEXT NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investments" (
    "id" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "targetPercentage" DOUBLE PRECISION NOT NULL,
    "targetPercentageValue" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "targetPercentageMonthValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "dueDate" TEXT NOT NULL,
    "goalsId" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "targetPercentage" DOUBLE PRECISION NOT NULL,
    "targetPercentageValue" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "targetPercentageMonthValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Investments_userId_key" ON "Investments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Goals_userId_key" ON "Goals"("userId");

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investmentsId_fkey" FOREIGN KEY ("investmentsId") REFERENCES "Investments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investments" ADD CONSTRAINT "Investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_goalsId_fkey" FOREIGN KEY ("goalsId") REFERENCES "Goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
