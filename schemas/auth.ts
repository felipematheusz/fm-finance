import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
});

export const PercentagesSchema = z.object({
  salary: z.coerce.number().min(1),
  fixedExpensesPercentage: z.coerce.number().min(1),
  variableExpensesPercentage: z.coerce.number().min(1),
  investmentsPercentage: z.coerce.number().min(1),
  goalsPercentage: z.coerce.number().min(1),
  userId: z.coerce.string().min(1)
})