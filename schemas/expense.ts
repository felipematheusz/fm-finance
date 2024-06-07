import { z } from "zod";

const ExpenseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.coerce.number(),
  date: z.date(),
  categoryId: z.string(),
  typeExpenseId: z.string(),
});

const TypeExpenseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  totalValue: z.number(),
  targetPercentage: z.number(),
  targetPercentageValue: z.number(),
  targetPercentageMonthValue: z.number(),
  userId: z.string()
})

export { ExpenseSchema, TypeExpenseSchema };

