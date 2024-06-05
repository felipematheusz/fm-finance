'use server'

import db from '@/lib/db'
import { z } from 'zod'
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';
import { RegisterSchema } from '@/schemas/auth';


export const register = async (userData: z.infer<typeof RegisterSchema>) => {
  const { name, email, password } = userData

  const existingUser = await db.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return {
      error: "Usuário já existe",
    }
  }

  const hashedPassword = hashSync(password, 10)

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      FixedExpenses: {
        create: {
          totalValue: 0,
          targetPercentage: 0,
          targetPercentageValue: 0,
          targetPercentageMonthValue: 0
        }
      },
      VariableExpenses: {
        create: {
          totalValue: 0,
          targetPercentage: 0,
          targetPercentageValue: 0,
          targetPercentageMonthValue: 0
        }
      },
      Investments: {
        create: {
          totalValue: 0,
          targetPercentage: 0,
          targetPercentageValue: 0,
          targetPercentageMonthValue: 0
        }
      },
      Goals: {
        create: {
          totalValue: 0,
          targetPercentage: 0,
          targetPercentageValue: 0,
          targetPercentageMonthValue: 0
        }
      }
    }
  })

  return redirect(`/register/${newUser.id}`)
}

