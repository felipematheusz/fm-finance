'use server'

import db from '@/lib/db'
import { z } from 'zod'
import { redirect } from 'next/navigation';
import { updatePercentages } from './updatePercentages';

export default async function registerPercentages(formData: FormData) {

  const createUserSchema = z.object({
    salary: z.coerce.number().min(1),
    fixedExpensesPercentage: z.coerce.number().min(1),
    variableExpensesPercentage: z.coerce.number().min(1),
    investmentsPercentage: z.coerce.number().min(1),
    goalsPercentage: z.coerce.number().min(1),
    userId: z.coerce.string().min(1)
  })

  const parsedData = createUserSchema.parse({
    salary: formData.get('salary'),
    fixedExpensesPercentage: formData.get('fixed-expenses'),
    variableExpensesPercentage: formData.get('variable-expenses'),
    investmentsPercentage: formData.get('investments'),
    goalsPercentage: formData.get('goals'),
    userId: formData.get('userId')
  });

  await db.percentages.create({
    data: {
      salary: parsedData.salary,
      fixedExpensesPercentage: parsedData.fixedExpensesPercentage,
      variableExpensesPercentage: parsedData.variableExpensesPercentage,
      investmentsPercentage: parsedData.investmentsPercentage,
      goalsPercentage: parsedData.goalsPercentage,
      userId: parsedData.userId
    }
  })

  await Promise.all([
    updatePercentages(parsedData.userId, 'fixed'),
    updatePercentages(parsedData.userId, 'variable'),
    updatePercentages(parsedData.userId, 'investments'),
    updatePercentages(parsedData.userId, 'goals')
  ]);

  return redirect('/login')
}