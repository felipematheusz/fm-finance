"use server";

import db from "@/lib/db";

const updatePercentages = async (typeExpenseId: string) => {

  const totalValueResult = await db.expense.aggregate({
    _sum: {
      value: true
    },
    where: {
      typeExpenseId
    }
  });

  const totalValue = totalValueResult._sum.value || 0;

  const typeExpense = await db.typeExpense.findUnique({
    where: {
      id: typeExpenseId
    }
  });

  const targetPercentageValue = typeExpense?.targetPercentageValue || 0;

  const targetPercentageMonthValue = (totalValue / targetPercentageValue) * 100;

  await db.typeExpense.update({
    where: {
      id: typeExpenseId
    },
    data: {
      totalValue,
      targetPercentageMonthValue
    }
  });
};

export { updatePercentages };

