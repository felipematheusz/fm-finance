'use server'

import { auth } from "@/auth";
import db from "@/lib/db"
import { ExpenseSchema } from "@/schemas";
import { z } from "zod";
import { updatePercentages } from "./updatePercentages";

const getTypeExpenses = async () => {
  const session = await auth();

  const typeExpenses = await db.typeExpense.findMany({
    where: {
      userId: session?.user?.id
    }
  });

  return typeExpenses;
};

const createExpense = async (input: z.infer<typeof ExpenseSchema>) => {

  const expense = await db.expense.create({
    data: {
      date: input.date,
      name: input.name,
      value: input.value,
      categoryId: input.categoryId,
      typeExpenseId: input.typeExpenseId
    }
  });

  await updatePercentages(expense.typeExpenseId);

  return expense;
};

export { getTypeExpenses, createExpense };

