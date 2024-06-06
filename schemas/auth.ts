import { z } from "zod";

export const CredentialsSchema = z.object({
  registerData: z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(6),
  }),
})

export const RegisterSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(6),
  categories: z.array(z.object({
    name: z.string().min(1),
  })),
  typeExpenses: z.array(z.object({
    name: z.string().min(1),
    percentage: z.coerce.number().min(1),
  })),
  salary: z.coerce.number().min(1),
});

export const SalarySchema = z.object({
  salaryData: z.object({
    salary: z.coerce.number().min(1),
  }),
})

export const CategoriesArraySchema = z.object({
  categoriesData: z.array(z.object({
    name: z.string().min(1),
  })),
})

export const TypeExpenseArraySchema = z.object({
  typeExpenseData: z.array(z.object({
    name: z.string(),
    percentage: z.coerce.number()
  }))
});



