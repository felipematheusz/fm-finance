'use server'

import { auth } from "@/auth";
import db from "@/lib/db"
import { incomeSchema } from "@/schemas";
import { z } from "zod";

const income = async () => {
  const session = await auth()

  const income = await db.income.findMany({
    where: {
      userId: session?.user?.id
    }
  })

  return income
}

const createIncome = async (input: z.infer<typeof incomeSchema>) => {
  const session = await auth()

  const income = await db.income.create({
    data: {
      name: input.name,
      value: input.value,
      userId: session?.user?.id
    }
  })

  return income
}

const getTotalValueOfIncome = async () => {
  const session = await auth();
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const total = await db.income.aggregate({
    _sum: {
      value: true
    },
    where: {
      userId: session?.user?.id,
      createdAt: {
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

const getTotalValueOfAllIncome = async () => {
  const session = await auth();

  const totalIncome = await db.income.aggregate({
    _sum: {
      value: true
    },
    where: {
      userId: session?.user?.id
    }
  });

  const totalExpenses = await db.expense.aggregate({
    _sum: {
      value: true
    },
    where: {
      typeExpense: {
        userId: session?.user?.id
      }
    }
  });

  const totalNet = (totalIncome._sum.value ?? 0) - (totalExpenses._sum.value ?? 0);

  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalNet);

  return valorFormatado;
};

export { income, createIncome, getTotalValueOfIncome, getTotalValueOfAllIncome }
