'use server'

import db from '@/lib/db'
import { z } from 'zod'
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/schemas/auth';


const register = async (user: z.infer<typeof RegisterSchema>) => {
  const { name, email, password, categories, typeExpenses, salary } = user

  const hashedPassword = hashSync(password, 10)

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      salary
    }
  })

  await db.category.createMany({
    data: categories.map((category) => ({
      name: category.name,
      userId: newUser.id
    }))
  })

  await db.typeExpense.createMany({
    data: typeExpenses.map((typeExpense) => ({
      name: typeExpense.name,
      targetPercentage: typeExpense.percentage,
      totalValue: 0,
      targetPercentageValue: salary * (typeExpense.percentage / 100),
      targetPercentageMonthValue: 0,
      userId: newUser.id
    }))
  })

  return redirect('/login')
}

const verifyUser = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email }
  })

  if (user) {
    return {
      error: "Usuário já existe",
    }
  }

  return user

}



export { register, verifyUser }

