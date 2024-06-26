'use server'

import { auth } from "@/auth";
import db from "@/lib/db"
import { CategorySchema } from "@/schemas/category";
import { z } from "zod";

const getCategories = async () => {
  const session = await auth();

  const categories = await db.category.findMany({
    where: {
      userId: session?.user?.id
    }
  });

  return categories;
};

const upsertCategory = async (input: z.infer<typeof CategorySchema>) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Não autorizado"
    }
  }

  if (input.id) {
    const category = await db.category.findUnique({
      where: {
        id: input.id,
        userId: session.user.id
      },
      select: { id: true }
    });

    if (!category) {
      return {
        error: "Categoria não encontrada",
        data: null
      }
    }

    const updatedCategory = await db.category.update({
      where: {
        id: input.id,
        userId: session.user.id
      },
      data: {
        name: input.name,
      }
    });

    return {
      data: updatedCategory,
      error: null
    }
  }

  if (!input.name) {
    return {
      error: "Nome é obrigatório"
    }
  }

  const category = await db.category.create({
    data: {
      name: input.name,
      userId: session.user.id
    }
  });

  return category;


};

const getTotalExpensesByCategory = async () => {
  const session = await auth();

  const totalExpensesByCategory = await db.expense.groupBy({
    by: ['categoryId'],
    _sum: {
      value: true
    },
    where: {
      category: {
        userId: session?.user?.id
      }
    }
  });

  const categoryIds = totalExpensesByCategory.map(expense => expense.categoryId);
  const categories = await db.category.findMany({
    where: {
      id: {
        in: categoryIds
      }
    }
  });

  const results = totalExpensesByCategory.map(expense => {
    const category = categories.find(c => c.id === expense.categoryId);
    return {
      categoryName: category?.name,
      totalValue: expense._sum.value
    };
  });

  return results;
};


export { getCategories, upsertCategory, getTotalExpensesByCategory };

