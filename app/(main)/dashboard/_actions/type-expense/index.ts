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
    },
    orderBy: {
      name: 'asc'
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


const getTotalExpensesByDay = async () => {
  const session = await auth();

  const expenses = await db.expense.groupBy({
    by: ['date'],
    _sum: {
      value: true
    },
    where: {
      typeExpense: {
        userId: session?.user?.id
      }
    },
    orderBy: {
      date: 'desc'
    },
    take: 7
  });

  return expenses.reverse().map(expense => ({
    date: expense.date,
    totalValue: expense._sum.value
  }));
};

const getLastSixExpenses = async () => {
  const session = await auth();

  const lastExpenses = await db.expense.findMany({
    where: {
      typeExpense: {
        userId: session?.user?.id
      }
    },
    include: {
      category: true,
      typeExpense: true
    },
    orderBy: {
      date: 'desc'
    },
    take: 6
  });

  return lastExpenses.map(expense => ({
    name: expense.name,
    value: expense.value,
    date: expense.date,
    category: expense.category.name,
    typeExpense: expense.typeExpense.name
  }));
};

const getTotalValueOfExpenses = async () => {
  const session = await auth();
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const total = await db.expense.aggregate({
    _sum: {
      value: true
    },
    where: {
      typeExpense: {
        userId: session?.user?.id
      },
      date: {
        gte: firstDayOfMonth,
        lte: lastDayOfMonth
      }
    }
  });

  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(total._sum.value ?? 0);

  return valorFormatado;
};

export { getTypeExpenses, createExpense, getTotalExpensesByDay, getLastSixExpenses, getTotalValueOfExpenses };

