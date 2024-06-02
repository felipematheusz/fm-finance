'use server'

import db from '@/lib/db'
import { z } from 'zod'
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export default async function register(formData: FormData) {
  const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
  })

  const parsedData = createUserSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  const user = await db.user.findUnique({
    where: {
      email: parsedData.email
    }
  })

  if (user) {
    throw new Error('Email já está cadastrado')
  }

  await db.user.create({
    data: {
      name: parsedData.name,
      email: parsedData.email,
      password: hashSync(parsedData.password, 10),
      // FixedExpenses: {
      //   create: {
      //     totalValue: 0,
      //     targetPercentage: 0,
      //     targetPercentageValue: 0,
      //     targetPercentageMonthValue: 0
      //   }
      // },
      // VariableExpenses: {
      //   create: {
      //     totalValue: 0,
      //     targetPercentage: 0,
      //     targetPercentageValue: 0,
      //     targetPercentageMonthValue: 0
      //   }
      // }
    }
  })

  return redirect('/login')
}