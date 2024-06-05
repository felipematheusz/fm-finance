'use server'

import db from '@/lib/db'
import { z } from 'zod'
import { redirect } from 'next/navigation';
import { updatePercentages } from './updatePercentages';
import { PercentagesSchema } from '@/schemas/auth';

export const registerPercentages = async (data: z.infer<typeof PercentagesSchema>) => {

  const { salary, fixedExpensesPercentage, variableExpensesPercentage, investmentsPercentage, goalsPercentage, userId } = data

  if (!salary || !fixedExpensesPercentage || !variableExpensesPercentage || !investmentsPercentage || !goalsPercentage || !userId) {
    return {
      error: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.'
    }
  }

  await db.percentages.create({
    data: {
      salary,
      fixedExpensesPercentage,
      variableExpensesPercentage,
      investmentsPercentage,
      goalsPercentage,
      userId
    }
  })

  await Promise.all([
    updatePercentages(userId, 'fixed'),
    updatePercentages(userId, 'variable'),
    updatePercentages(userId, 'investments'),
    updatePercentages(userId, 'goals')
  ])

  return redirect('/login')
}